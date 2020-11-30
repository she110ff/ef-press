(window.webpackJsonp=window.webpackJsonp||[]).push([[59],{414:function(t,s,a){"use strict";a.r(s);var n=a(25),r=Object(n.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"why-django-rest"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#why-django-rest"}},[t._v("#")]),t._v(" Why Django REST?")]),t._v(" "),a("p",[t._v("Django REST framework 은 웹 API를 작성할 수 있는 강력하고 유연한 toolkit 입니다.")]),t._v(" "),a("p",[t._v("다음과 같은 이유로 REST framework을 사용할 수 있습니다.:")]),t._v(" "),a("ul",[a("li",[t._v("웹 browsable API 는 개발자에게 큰 사용성을 제공.")]),t._v(" "),a("li",[t._v("OAuth1a과 OAuth2를 포함하는 인증 정책을 지원.")]),t._v(" "),a("li",[t._v("ORM 과 non-ORM 데이터 소스의 직렬화 지원.")]),t._v(" "),a("li",[t._v("넓은 범위의 문서와 커뮤니티 제공.")]),t._v(" "),a("li",[t._v("Mozilla , Red Hat , Heroku 및 Eventbrite를 포함하여 국제적으로 인정 된 회사에서 사용하고 신뢰.")])]),t._v(" "),a("h2",{attrs:{id:"요구사항"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#요구사항"}},[t._v("#")]),t._v(" 요구사항")]),t._v(" "),a("p",[t._v("REST framework 은 다음의 패키기 수준을 요구합니다.:")]),t._v(" "),a("p",[t._v("Python (3.5, 3.6, 3.7, 3.8)\nDjango (1.11, 2.0, 2.1, 2.2, 3.0)\n최신 버전의 파이썬과 django를 추천하고 지원합니다.")]),t._v(" "),a("p",[t._v("선택적 패키지 :\ncoreapi (1.32.0+) - Schema generation support.\nMarkdown (3.0.0+) - Markdown support for the browsable API.\nPygments (2.4.0+) - Add syntax highlighting to Markdown processing.\ndjango-filter (1.0.1+) - Filtering support.\ndjango-guardian (1.1.1+) - Object level permissions support.")]),t._v(" "),a("h2",{attrs:{id:"설치하기"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#설치하기"}},[t._v("#")]),t._v(" 설치하기")]),t._v(" "),a("p",[t._v("pip 을 사용하여 패키지를 설치합니다.")]),t._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[t._v("pip "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("install")]),t._v(" djangorestframework\npip "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("install")]),t._v(" markdown       "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# Markdown support for the browsable API.")]),t._v("\npip "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("install")]),t._v(" django-filter  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# Filtering support")]),t._v("\n")])])]),a("p",[t._v("'rest_framework'를 INSTALLED_APPS 설정에 추가합니다.")]),t._v(" "),a("div",{staticClass:"language-python extra-class"},[a("pre",{pre:!0,attrs:{class:"language-python"}},[a("code",[t._v("INSTALLED_APPS "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'rest_framework'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n")])])]),a("p",[t._v("browsable API를 사용하려 한다면 REST framework의 login/logout view를 루트 urls.py 에 추가합니다.")]),t._v(" "),a("div",{staticClass:"language-python extra-class"},[a("pre",{pre:!0,attrs:{class:"language-python"}},[a("code",[t._v("urlpatterns "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("\n    url"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("r'^api-auth/'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" include"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'rest_framework.urls'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n")])])]),a("h2",{attrs:{id:"간단한-예제"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#간단한-예제"}},[t._v("#")]),t._v(" 간단한 예제")]),t._v(" "),a("p",[t._v("REST 프레임 워크를 사용하여 간단한 모델 기반 API를 빌드하는 예를 살펴 보겠습니다.")]),t._v(" "),a("p",[t._v("프로젝트 사용자 정보에 액세스하기 위한 읽기-쓰기 API를 작성합니다.")]),t._v(" "),a("p",[t._v("REST 프레임 워크 API에 대한 모든 global 설정은 REST_FRAMEWORK 이라는 단일 구성 사전에 유지됩니다. settings.py모듈에 다음을 추가하여 시작하십시오 .")]),t._v(" "),a("div",{staticClass:"language-python extra-class"},[a("pre",{pre:!0,attrs:{class:"language-python"}},[a("code",[t._v("REST_FRAMEWORK "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# Use Django's standard `django.contrib.auth` permissions,")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# or allow read-only access for unauthenticated users.")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'DEFAULT_PERMISSION_CLASSES'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'rest_framework.permissions.DjangoModelPermissionsOrAnonReadOnly'")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("p",[t._v("이제 API를 만들 준비가 되었습니다. 프로젝트의 루트 urls.py 모듈을 다음과 같이 작성합니다.:")]),t._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[t._v("from django.conf.urls "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("import")]),t._v(" url, include\nfrom django.contrib.auth.models "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("import")]),t._v(" User\nfrom rest_framework "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("import")]),t._v(" routers, serializers, viewsets\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# Serializers define the API representation.")]),t._v("\nclass UserSerializer"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("serializers.HyperlinkedModelSerializer"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(":\n    class Meta:\n        model "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" User\n        fields "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'url'")]),t._v(", "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'username'")]),t._v(", "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'email'")]),t._v(", "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'is_staff'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# ViewSets define the view behavior.")]),t._v("\nclass UserViewSet"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("viewsets.ModelViewSet"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(":\n    queryset "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" User.objects.all"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    serializer_class "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" UserSerializer\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# Routers provide an easy way of automatically determining the URL conf.")]),t._v("\nrouter "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" routers.DefaultRouter"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\nrouter.register"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("r"),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'users'")]),t._v(", UserViewSet"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# Wire up our API using automatic URL routing.")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# Additionally, we include login URLs for the browsable API.")]),t._v("\nurlpatterns "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n    url"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("r"),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'^'")]),t._v(", include"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("router.urls"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("))")]),t._v(",\n    url"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("r"),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'^api-auth/'")]),t._v(", include"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'rest_framework.urls'")]),t._v(", "),a("span",{pre:!0,attrs:{class:"token assign-left variable"}},[t._v("namespace")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'rest_framework'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("))")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n")])])]),a("p",[t._v("브라우저에서 http://127.0.0.1:8000/ 을 열어서 'users' API를 볼 수 있습니다. 우측 상단에 로그인을 클릭하여 로그인하면 add, create,delete 를 할 수 있습니다.")])])}),[],!1,null,null,null);s.default=r.exports}}]);