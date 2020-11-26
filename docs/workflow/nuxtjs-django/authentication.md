우리는 Django 및 DRF를 사용하여 성공적으로 기본 API를 구축했습니다.인증을 추가하고 API 작성할 때, `django-allauth`를 사용하면 사용자 모델을 처음부터 완전히 작성하는 데 드는 시간을 절약합니다. 대부분의 앱이 소셜 또는 전화 인증을 사용하기 때문에 많은 사람들이 이 부분을 좋아하지 않을 것입니다. 하지만 제 의도는 처음부터 작업을 하는 것입니다. Django-rest-auth는 allauth 모델을 JSON 직렬화 가능하게 만듭니다.

이것들을 설치합시다

```bash
pip install django-allauth django-rest-auth
```

사용자 및 로그인을 위한 앱 만들기

```bash
django-admin startapp core
```

settings.py의 앱에 추가하는 것을 잊지 말아야 합니다.

Django-allauth는 사용자 이름을 필수적이고 고유 식별자로 사용합니다. BaseUserManager를 확장하여 CustomUserManager를 만들고 이메일 필드를 식별자로 사용하게 변경합니다. 또한 수퍼 유저의 생성 시에도 같은 변경이 필요합니다.

이것을 Managers.py 파일에 추가하십시오.

```python
from django.contrib.auth.base_user import BaseUserManager
from django.utils.translation import ugettext_lazy as _


class CustomUserManager(BaseUserManager):
    """
    Custom user model manager where email is the unique identifiers
    for authentication instead of usernames.
    """
    def create_user(self, email, password, **extra_fields):
        """
        Create and save a User with the given email and password.
        """
        if not email:
            raise ValueError(_('The Email must be set'))
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password, **extra_fields):
        """
        Create and save a SuperUser with the given email and password.
        """
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError(_('Superuser must have is_staff=True.'))
        if extra_fields.get('is_superuser') is not True:
            raise ValueError(_('Superuser must have is_superuser=True.'))
        return self.create_user(email, password, **extra_fields)
```

AbstractUser 클래스를 서브 클래싱하여 이메일을 고유 식별자로 만들어 보겠습니다. 사용자를위한 모델 파일이 있습니다.

```python
from django.db import models

# Create your models here.
from django.contrib.auth.models import AbstractUser
from django.utils.translation import ugettext_lazy as _

from .managers import CustomUserManager


class CustomUser(AbstractUser):
    username = None
    email = models.EmailField(_('email address'), unique=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    profile_name = models.CharField(blank=True, max_length=100)
    avatar = models.ImageField(upload_to='avatars/', null=True, blank=True)

    def set_avatar(self):
        avatar = self.avatar
    if not avatar:
        self.avatar="------REPLACE THIS WITH YOUR DEFAULT AVATAR URL-----"

    def __str__(self):
        return self.email
```

이제 나머지 프레임 워크를 사용하여 모델을 직렬화 할 차례입니다.

```python
from rest_framework import serializers
from users.models import CustomUser


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'email', 'profile_name', 'avatar',]
```

api / urls.py 파일을 업데이트하십시오. 사용자 URL을 API URL로 확장 할 수도 있습니다.

```python
from django.conf.urls import url
from django.conf import settings
from allauth.account.views import confirm_email
 url(r'^rest-auth/', include('rest_auth.urls')),
 url(r'^rest-auth/registration/', include('rest_auth.registration.urls')),
 url(r'^account/', include('allauth.urls')),
 url(r'^accounts-rest/registration/account-confirm-email/(?P<key>.+)/$', confirm_email, name='account_confirm_email'),
```

```python
#Now add this to api/settings.py

AUTH_USER_MODEL = 'users.CustomUser'

ACCOUNT_USER_MODEL_USERNAME_FIELD = None
#setting email field as required one
ACCOUNT_EMAIL_REQUIRED = True
ACCOUNT_UNIQUE_EMAIL = True
ACCOUNT_USERNAME_REQUIRED = False
ACCOUNT_AUTHENTICATION_METHOD = 'email'
#change optional to mandatory to mandate email verification.
ACCOUNT_EMAIL_VERIFICATION = 'optional'
ACCOUNT_CONFIRM_EMAIL_ON_GET = True
#Change these to set custom page to redirect user after email verification.
ACCOUNT_EMAIL_CONFIRMATION_ANONYMOUS_REDIRECT_URL = '/'
ACCOUNT_EMAIL_CONFIRMATION_AUTHENTICATED_REDIRECT_URL = '/

SITE_ID = 1

EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'

AUTHENTICATION_BACKENDS = (
    # default
    'django.contrib.auth.backends.ModelBackend',
    # email login
    'allauth.account.auth_backends.AuthenticationBackend',
)
```

모든 것이 잘되면 계정을 등록하고 로그인 할 수 있습니다.

http://127.0.0.1:8000/rest-auth/register/에 대한 탐색은 등록
http://127.0.0.1:8000/rest-auth/login/를 로그인에

http://127.0.0.1:8000/rest-auth/user/- 사용자 세부 정보 표시

잘! jwt의 시간입니다. Django allauth는 각 사용자에게 세션 키를 제공합니다. 왜 JWT인지 물어볼 수 있습니다. jwt의 구조는 서명하여 보낸 사람을 확인하는 데 도움이되기 때문입니다. Jwt에는 두 개의 토큰 액세스 및 새로 고침 토큰이 있습니다. 그들의 이름 자체가 그들이하는 일을 말합니다. 액세스 토큰은 수명이 짧습니다 (5 분 정도는 사용자 지정할 수 있음). 갱신 토큰은 일반적으로 수명이 길며 24 시간 내에 만료되며 사용자 정의 할 수도 있습니다. 새로 고칠 토큰을 새로 고치려면 로그인 자격 증명을 사용해야합니다.
jwt를 설치합시다

```python
pip install djangorestframework-jwt == 1.11.0
```

설치 후 API로 이동하여 settings.py를 편집하고 이것을 추가하십시오.

```python
REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': (
        # By default we set everything to admin,
        #   then open endpoints on a case-by-case basis
        'rest_framework.permissions.IsAdminUser',
    ),
    'TEST_REQUEST_RENDERER_CLASSES': (
        'rest_framework.renderers.MultiPartRenderer',
        'rest_framework.renderers.JSONRenderer',
        'rest_framework.renderers.TemplateHTMLRenderer'
    ),
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_jwt.authentication.JSONWebTokenAuthentication',
        'rest_framework.authentication.SessionAuthentication',
    ),
 #sets the pagination to the API endpoint
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.LimitOffsetPagination',
    'PAGE_SIZE': 20,
}
from datetime import timedelta
JWT_AUTH = {
    'JWT_ALLOW_REFRESH': True,
    'JWT_EXPIRATION_DELTA': timedelta(hours=1),
     #expires in 1 day you can change according to your needs
    'JWT_REFRESH_EXPIRATION_DELTA': timedelta(days=1),
}
```

이제 api / urls.py에 추가하십시오.

```python
url(r'^api/v1/auth/obtain_token/', obtain_jwt_token),
url(r'^api/v1/auth/refresh_token/', refresh_jwt_token),
```

http://127.0.0.1:8000/api/v1/auth/obtain_token/ 으로 이동 하여 토큰을 얻습니다.
이제 이전 게시물에서 논의한 것처럼 음악보기에서 permission_classes = (permissions.IsAuthenticated,) 줄의 주석 처리를 제거하면 인증 된 사용자 만
음악 파일 에 액세스 할 수 있습니다.

드디어! Django, DRF, JWT를 사용하여 백엔드를 성공적으로 구축했습니다.

우리는 우리의 누 볐어 이전 게시물 우리는 성공적으로 우리의 음악이 장고, 장고 나머지 프레임 워크와 JWT 사용하여 강화 된 보안을 사용하여 응용 프로그램을 스트리밍을위한 백엔드를 구축. 여기에서는 vuejs를 사용하여 음악 API를위한 멋진 프런트 엔드를 구축 할 것입니다. 그러나이 가이드는 빌드 한 모든 백엔드에서 작동합니다. 이 게시물을 기존 UI로 지루하게 만들지 말고, 음악 스트리밍 앱을 전문적으로 보이게 만들어 보겠습니다. 이를 위해 vuejs 용 머티리얼 디자인 UI 프레임 워크 인 vuetify를 사용할 것입니다.

```bash
vue create ronix //using vue_cli
```

수동 사전 설정을 선택하고 vue 라우터, vuex, Babel을 선택하십시오.

```python
cd ronix
vue add vuetify //adding vuetify using Vue CLI
```

Vuex 문서는 " Vuex는 Vue.js 애플리케이션을위한 상태 관리 패턴 + 라이브러리입니다. 이는 상태가 예측 가능한 방식으로 만 변경 될 수 있도록 보장하는 규칙과 함께 애플리케이션의 모든 구성 요소에 대한 중앙 집중식 저장소 역할을합니다."라고 말합니다. 우리는 사용자가 매번 로그인하는 것을 원하지 않습니다. 그래서 vuex를 사용하여 jwt의 라이프 사이클에 따라 로그인 여부를 관리합니다.
사용자가 등록하고 로그인 할 수 있도록 홈페이지를 만들어 봅시다.

```js
<template lang="html" class="primary_bg">
<div class="primary_bg">
<v-container fluid class="mb-15">
  <v-layout row>
    <v-flex md6 lg6 sm12 xs12 x6>
      <img src="../assets/Chilling-at-Home/main_files/chilling.svg" width="95%">
     </v-flex>
    <v-flex md6 lg6 sm12 xs12 x6 pl-3>
      <h1 class="white--text font-weight-medium mt-16 d-sm-pl-8 d-xs-pl-6">Roni<span class="red--text">X</span></h1>
      <h2 class="white--text d-sm-pl-6">Discover great music <span class="yellow--text">that rules out </span></h2>
      <p class="white--text d-sm-pl-6">Music is eternal that has limitless potential in grasping and treating of great forces on the earth.However to get started login to your existing account or create one if you dont have.</p>
      <v-dialog v-model="dialog" scrollable max-width="300px">
        <!-- Login popup modal -->
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="black--text white"
            dark
            v-bind="attrs"
            v-on="on"
          >
            Login
          </v-btn>
        </template>
        <v-card>
          <v-card-title>Login</v-card-title>
          <v-divider></v-divider>
          <v-card-text class="mt-2">
            <v-text-field
            v-model="email"
            solo
            label="Email"
            prepend-inner-icon="mdi-email"
          ></v-text-field>

     <!-- Allowing user to toggle visibility of password -->
       <v-text-field
            v-model="password"
            :type="show1 ? 'text' : 'password'"
            name="input-10-1"
            @click:append="show1 = !show1"
            solo
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            label="Password"
            prepend-inner-icon="mdi-account-key"
         ></v-text-field>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
            <v-btn color="blue darken-1" text @click.prevent="authenticate">login</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
<v-btn class="ml-2" outlined color="white"> <router-link to="/signup" tag='span'>Create account</router-link> </v-btn>
        <p><v-chip
      color="black"
      text-color="white"
      class="mt-12"
    >
      <v-avatar
        left
        class="red darken-4"
      >
        <v-icon size="16">mdi-newspaper-plus</v-icon>
      </v-avatar>
      Updated with Private Music streams >
    </v-chip></p>
    </v-flex>
  </v-layout>
  </v-container>
  <v-footer
   color="primary_bg"
    padless
  >
    <v-row
      justify="center"
      no-gutters
    >
      <v-col
        class="text-center white--text"
        cols="12"
      >
        {{ new Date().getFullYear() }} — <strong>Ronix music</strong>
        <p>Glammingspace</p>
      </v-col>
    </v-row>
  </v-footer>
</div>

</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      show1: false,
      email: '',
      password: '',
      dialog: false,
    }
  },
  methods: {
    authenticate () {
      const payload = {
        email: this.email,
        password: this.password
      }
      axios.post(this.$store.state.endpoints.obtainJWT, payload)
        .then((response) => {
          this.$store.commit('updateToken', response.data.token)
          // get and set auth user

          const base = {
            baseURL: this.$store.state.endpoints.baseUrl,
            headers: {
            // Set your Authorization to 'JWT' !!
              Authorization: `JWT ${this.$store.state.jwt}`,
              'Content-Type': 'application/json'
            },
            xhrFields: {
                withCredentials: true
            }
          }
          const axiosInstance = axios.create(base)
          axiosInstance({
            url: "/rest-auth/user/",
            method: "get",
            params: {}
          })
            .then((response) => {
              this.$store.commit("setAuthUser",
                {authUser: response.data, isAuthenticated: true}
              )
              this.$router.push({name: 'Songs'})
            })
        })
        .catch((error) => {
          console.log(error);
          console.debug(error);
          console.dir(error);
        })
    }
  }
}
</script>

<style lang="css" scoped>
.primary_bg{
  background-color:#9921e8;
  background-image:linear-gradient(315deg, #9921e8 0%, #5f72be 74%);
}
.v-text-field{
      width: 400px;
}
</style>
```

이제 vuex를 사용하여 사용자 상태를 처리합니다.

```js
//add to store/index.js

import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

// Make Axios good with django csrf
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

export default new Vuex.Store({
  state: {
    authUser: {},
    isAuthenticated: false,
    jwt: localStorage.getItem("token"),
    APIData: "",
    endpoints: {
      // Change these with your endpoints.
      obtainJWT: "https://127.0.0.1/api/v1/auth/obtain_token/",
      refreshJWT: "https://127.0.0.1/api/v1/auth/refresh_token/",
      baseUrl: "https://127.0.0.1/",
    },
  },

  mutations: {
    setAuthUser(state, { authUser, isAuthenticated }) {
      Vue.set(state, "authUser", authUser);
      Vue.set(state, "isAuthenticated", isAuthenticated);
    },
    //You should find a better alternative to storing in local storage
    updateToken(state, newToken) {
      localStorage.setItem("token", newToken);
      state.jwt = newToken;
    },
    removeToken(state) {
      localStorage.removeItem("token");
      state.jwt = null;
    },
  },
});
```

views / App.vue에 아름다운 navbar를 추가합시다.

```js
<template>
  <v-app>
    <v-app-bar
      app
      color="primary_bg"
      dark
      dense
    >
      <div class="d-flex align-center">
       <v-toolbar-title>Ronix</v-toolbar-title>
      </div>

      <v-spacer></v-spacer>

     <v-btn icon>
        <router-link to="/" tag="icon"><v-icon>mdi-home</v-icon></router-link>
      </v-btn>

      <v-btn icon>
         <router-link to="/songs" tag="icon"><v-icon>mdi-playlist-music</v-icon></router-link>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-account-circle</v-icon>
      </v-btn>

    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>
<script>
export default {
  name: 'App',
  components: {
  },
  data: () => ({
        links: [
        'Home',
        'About Us',
        'Team',
        'Services',
        'Blog',
        'Contact Us',
      ],
  }),
};
</script>

<style lang="css">
.primary_bg{
  background-color:#9921e8;
  background-image:linear-gradient(315deg, #9921e8 0%, #5f72be 74%);
}
</style>
```

뷰에서 가입 뷰를 만들어 보겠습니다.

```js
<!--add to views/signup.vue-->
<template lang="html">
  <v-form>
    <v-container>
      <v-row>
       <v-col cols="12" sm="12" md="12" lg="6">

        <p  class="mx-auto" justify-center>Login</p>
     <v-text-field
            v-model="email"
            solo
            label="Email"
            prepend-inner-icon="mdi-email"
          ></v-text-field>

       <v-text-field
            v-model="password1"
            :type="show1 ? 'text' : 'password'"
            name="input-10-1"
            @click:append="show1 = !show1"
            solo
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            label="Password"
            prepend-inner-icon="mdi-lock"
         ></v-text-field>

         <v-text-field
            v-model="password2"
            :type="show2 ? 'text' : 'password'"
            name="input-10-1"
            @click:append="show2 = !show2"
            solo
            :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
            label="Repeat Password"
            prepend-inner-icon="mdi-lock-reset"
         ></v-text-field>

  <v-btn
      :loading="loading3"
      :disabled="loading3"
      color="blue-grey"
      class="ma-2 white--text"
      @click.prevent="register"
    >
      signup
      <v-icon right dark>mdi-account</v-icon>
    </v-btn>
  <p class="ma-3 ma-md-1">Have an account ?</p>
 <v-btn> <router-link to="/" tag='span'>Login</router-link> </v-btn>
    </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      email: '',
      password1: '',
      password2: '',
    }
  },
  methods: {
    register () {
      const payload = {
        email: this.email,
        password1: this.password1,
        password2:this.password2
      }
      axios.post('https://127.0.0.1/rest-auth/registration/', payload)

  }
}
}
</script>

<style lang="css">
</style>
```

이제 Components에서 노래 구성 요소를 만듭니다.

```python

```

그러나 그는 네이티브 미디어 플레이어, 재생 목록 등 대신 음악 플레이어를 구축하는 것과 같은 많은 개선이 필요합니다.이 블로그에 계속 연결하여 업데이트 할 예정입니다.

마지막으로 vue 라우터를 사용하여 페이지에 대한 경로를 만들어 보겠습니다.

```js
import Vue from "vue";
import VueRouter from "vue-router";
import Signup from "../views/Signup.vue";
import Portfolio from "@/components/Portfolio";
import Songs from "@/components/Songs";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Portfolio,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },
  {
    path: "/songs",
    name: "Songs",
    component: Songs,
  },

  /*{
    path: '',
    name: '',
    component: ,
  }*/
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
```

[Music Streaming app with vuejs](https://glammingspace.blogspot.com/2020/08/lets-build-music-streaming-app-with_4.html)

[Creating a Custom User Model in Django](https://testdriven.io/blog/django-custom-user-model/)
