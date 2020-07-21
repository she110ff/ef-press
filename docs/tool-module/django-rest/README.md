# Why Django REST?
Django REST framework 은 웹 API를 작성할 수 있는 강력하고 유연한 toolkit 입니다.

다음과 같은 이유로 REST framework을 사용할 수 있습니다.:
* 웹 browsable API 는 개발자에게 큰 사용성을 제공.
* OAuth1a과 OAuth2를 포함하는 인증 정책을 지원.  
* ORM 과 non-ORM 데이터 소스의 직렬화 지원.
* Customizable all the way down - just use regular function-based views if you don't need the more powerful features.
* 넓은 범위의 문서와 커뮤니티 제공.
* Mozilla , Red Hat , Heroku 및 Eventbrite를 포함하여 국제적으로 인정 된 회사에서 사용하고 신뢰.


## 요구사항
REST framework 은 다음의 패키기 수준을 요구합니다.:

Python (3.5, 3.6, 3.7, 3.8)
Django (1.11, 2.0, 2.1, 2.2, 3.0)
최신 버전의 파이썬과 django를 추천하고 지원합니다. 

선택적 패키지 :
coreapi (1.32.0+) - Schema generation support.
Markdown (3.0.0+) - Markdown support for the browsable API.
Pygments (2.4.0+) - Add syntax highlighting to Markdown processing.
django-filter (1.0.1+) - Filtering support.
django-guardian (1.1.1+) - Object level permissions support.


## 설치하기 
pip 을 사용하여 패키지를 설치합니다.

```bash
pip install djangorestframework
pip install markdown       # Markdown support for the browsable API.
pip install django-filter  # Filtering support
```

'rest_framework'를 INSTALLED_APPS 설정에 추가합니다.
```python
INSTALLED_APPS = [
    ...
    'rest_framework',
]
```

browsable API를 사용하려 한다면 REST framework의 login/logout view를 루트 urls.py 에 추가합니다. 
```python
urlpatterns = [
    ...
    url(r'^api-auth/', include('rest_framework.urls'))
]
```

## 간단한 예제 
Let's take a look at a quick example of using REST framework to build a simple model-backed API.

We'll create a read-write API for accessing information on the users of our project.

Any global settings for a REST framework API are kept in a single configuration dictionary named REST_FRAMEWORK. Start off by adding the following to your settings.py module:

REST 프레임 워크를 사용하여 간단한 모델 기반 API를 빌드하는 예를 살펴 보겠습니다.

프로젝트 사용자 정보에 액세스하기 위한 읽기-쓰기 API를 작성합니다.

REST 프레임 워크 API에 대한 모든 global 설정은 REST_FRAMEWORK 이라는 단일 구성 사전에 유지됩니다. settings.py모듈에 다음을 추가하여 시작하십시오 .
```python
REST_FRAMEWORK = {
    # Use Django's standard `django.contrib.auth` permissions,
    # or allow read-only access for unauthenticated users.
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.DjangoModelPermissionsOrAnonReadOnly'
    ]
}
```


이제 API를 만들 준비가 되었습니다. 프로젝트의 루트 urls.py 모듈을 다음과 같이 작성합니다.:
```bash
from django.conf.urls import url, include
from django.contrib.auth.models import User
from rest_framework import routers, serializers, viewsets

# Serializers define the API representation.
class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'is_staff']

# ViewSets define the view behavior.
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

# Routers provide an easy way of automatically determining the URL conf.
router = routers.DefaultRouter()
router.register(r'users', UserViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
```
브라우저에서 http://127.0.0.1:8000/ 을 열어서 'users' API를 볼 수 있습니다. 우측 상단에 로그인을 클릭하여 로그인하면 add, create,delete 를 할 수 있습니다.

