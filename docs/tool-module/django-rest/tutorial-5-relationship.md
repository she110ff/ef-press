# 기초-관계 & 하이퍼링크
지금까지 API의 relationsihp은 기본 키(primary key)를 사용하여 표현했습니다. 이번 튜토리얼에서는 관계에 하이퍼링크(hyperlink)를 사용하여 API의 결합(cohesion)과 검색 용이성(discoverability )을 향상시키도록 하겠습니다.

## API 루트 엔드-포인트 작성
현재 'snippet' 및 'user'에 대한 엔드 포인트가 있지만 API에 대한 단일 진입점(entry point)이 없습니다. ``snippets/views.py`` 에 ``@api_view`` decorator를 사용하는 함수 기반 뷰(function-based view)를 추가해서 사용할 것 입니다.:
```python
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse


@api_view(['GET'])
def api_root(request, format=None):
    return Response({
        'users': reverse('user-list', request=request, format=format),
        'snippets': reverse('snippet-list', request=request, format=format)
    })
```
여기서 두 가지를 주목 해야합니다. 먼저 정규화 된 URL("http://localhost:8000/snippets/")을 반환하기 위해 REST 프레임워크의 ``reverse`` 기능을 사용하고 있습니다. 둘째, convenience names('user-list', 'snippet-list')에 의해 식별되는 URL 패턴은 나중에 ``snippets/urls.py`` 에서 정의합니다.



## highlight 엔드-포인트 작성
pastebin API에 코드 highlight 의 엔드-포인트가 누락되어 있습니다.

코드 highlight 는 다른 API 엔드-포인트와 달리 JSON을 사용하지 않고 HTML 표현만 제공할 것 입니다. REST 프레임워크에서 제공하는 두 가지 스타일의 HTML renderer 가 있습니다. 하나는 templates를 사용하여 렌더링 된 HTML을 처리하고 다른 하나는 pre-rendered HTML을 처리합니다. 이 엔드-포인트에서는 pre-rendered HTML를 사용하려고 합니다.

코드 highlight view를 만들 때 고려해야 할 또 다른 사항은 사용할 수 있는 기존의 구체적인 generic view가 없다는 것과 객체 인스턴스를 반환하지 않고 객체 인스턴스의 속성을 반환할 것 입니다.

구체적인 뷰를 사용하는 대신 기본 generic 클래스를 사용하는 SnippetHighlight 클래스를  ``snippets/views.py`` 에 작성하고 다음과 같이 ``.get()`` 메서드를 추가합니다.:

```python
from rest_framework import renderers
from rest_framework.response import Response

class SnippetHighlight(generics.GenericAPIView):
    queryset = Snippet.objects.all()
    renderer_classes = [renderers.StaticHTMLRenderer]

    def get(self, request, *args, **kwargs):
        snippet = self.get_object()
        return Response(snippet.highlighted)
```

평소와 같이 새로 작성한 뷰를 URLconf 에 추가해야 합니다. ``snippets/urls.py`` 파일에 API 루트에 대한 URL 패턴을 추가합니다.
```python
path('', views.api_root),
```

그런 다음 스니펫 highlight에 대한 URL 패턴을 추가하십시오.
```python
path('snippets/<int:pk>/highlight/', views.SnippetHighlight.as_view()),
```

## API 하이퍼링크
엔터티 간의 관계를 다루는 것은 웹 API 디자인에서 가장 어려운 측면 중 하나 입니다. 관계를 나타내기 위해 선택할 수 있는 여러 가지 방법이 있습니다.

* 기본 키 사용
* 엔터티 간 하이퍼링크 사용
* 관련 엔터티에서 고유 식별 슬러그 필드를 사용
* 관련 엔터티의 기본 문자열 표현을 사용
* 부모 표현 내에 관련 엔터티 중첩
* 사용자 지정 표현

REST 프레임워크는 이러한 모든 스타일을 지원하며 정방향 또는 역방향 관계에 적용하거나 일반 외래 키와 같은 사용자 정의 manager에서 적용 할 수 있습니다.

이 경우에는 엔터티 간에 하이퍼링크 스타일을 사용하려고 합니다. 그렇게하기 위해, serializer를   ``HyperlinkedModelSerializer``-기존의 ``ModelSerializer`` 대신하여-에 확장하도록 수정합니다.

``HyperlinkedModelSerializer``는 ``ModelSerializer``과 다음과 같은 차이가 있습니다.:

* ``id`` 필드는 기본적으로 포함되지 않습니다.
* ``HyperlinkedIdentityField``를 사용하여 관련 ``url`` 필드를 포함합니다.
* 관계를 연결하기 위해 ``PrimaryKeyRelatedField`` 대신 ``HyperlinkedRelatedField`` 를 사용  합니다.

하이퍼링크를 사용하기 위해 ``snippets/serializers.py`` 에 기존 serializer 를 다시 작성합니다.:
```python
class SnippetSerializer(serializers.HyperlinkedModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username') #snippet에서 수정 불가 
    highlight = serializers.HyperlinkedIdentityField(view_name='snippet-highlight', format='html') # format을 html으로만 지정

    class Meta:
        model = Snippet
        fields = ['url', 'id', 'highlight', 'owner',
                  'title', 'code', 'linenos', 'language', 'style']


class UserSerializer(serializers.HyperlinkedModelSerializer):
    snippets = serializers.HyperlinkedRelatedField(many=True, view_name='snippet-detail', read_only=True)

    class Meta:
        model = User
        fields = ['url', 'id', 'username', 'snippets']

```
새로운 ``'highlight'`` 필드를 추가했습니다 . 이 필드는 ``'snippet-highlight'`` url 패턴을 가리키는 점을 제외하고는 url 필드와 동일한 유형입니다.

``'.json'`` 과 같은 형식 접미사 URL이 포함되어 있으므로 반환되는 형식 접미사 하이퍼링크에 해당 ``'.html'``  접미사를 사용해야 함을 highlight 필드에 표시해야 합니다.



## URL 패턴 지정 확인
하이퍼링크 된 API를 사용하려면 URL 패턴의 이름을 지정해야 합니다. 이름을 지정해야 하는 URL 패턴을 살펴 보겠습니다.

* API의 루트는 ``'user-list'`` 및 ``'snippet-list'``을 포함해야 합니다.
* snippet serializer 에는 ``'snippet-highlight'`` 를 나타내는 필드가 포함되어 있어야 합니다.
* user serializer 는 ``'snippet-detail'`` 를 나타내는 필드를 포함해야 합니다.
* snippet 및 user serializer 에는 '{model_name}-detail' 를 참조할 'url' 필드가 포함되어야 합니다. ( 이 경우 ``'snippet-detail'`` 및 ``'user-detail'``)

이러한 convenience name을 모두 URLconf 에 추가하여 snippets/urls.py 파일은 다음과 같아야 합니다.
```python
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from snippets import views

# API endpoints
urlpatterns = format_suffix_patterns([
    path('', views.api_root),
    path('snippets/',
        views.SnippetList.as_view(),
        name='snippet-list'),
    path('snippets/<int:pk>/',
        views.SnippetDetail.as_view(),
        name='snippet-detail'),
    path('snippets/<int:pk>/highlight/',
        views.SnippetHighlight.as_view(),
        name='snippet-highlight'),
    path('users/',
        views.UserList.as_view(),
        name='user-list'),
    path('users/<int:pk>/',
        views.UserDetail.as_view(),
        name='user-detail')
])
```


## 페이징 추가
사용자 및 코드 스니펫에 대한 목록은 많은 인스턴스를 리턴할 수 있으므로 결과를 페이징하고 클라이언트가 각 개별 페이지를 단계별로 실행하도록 하려고 합니다.

``project/settings.py`` 파일을 수정하여 페이징을 사용하도록 변경할 수 있습니다. 
```python
REST_FRAMEWORK = {
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 10
}
```
``REST_FRAMEWORK`` 지정된 단일 dictionary안에 REST 프레임워크의 설정을 모두 지정할 수 있으므로 다른 프로젝트 설정과 쉽게 구분됩니다.

필요한 경우 페이지징 스타일을 사용자 정의할 수 있습니다.

## API 찾아보기
브라우저를 열고 browsable API의 링크를 따라 가면서 API를 둘러 볼 수 있습니다.

또한 스니펫 인스턴스에서 'highlight' 링크를 볼 수 있으며 HTML 페이지로 이동합니다.
