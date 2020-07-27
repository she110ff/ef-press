# 기초-뷰셋 & 라우터
REST 프레임워크에는 ``ViewSets``을 처리하기 위한 추상 객체가 포함되어 있어서 개발자가 API의 상태 및 상호 작용을 모델링 하는 부부에 집중하여 일반적인 규칙에 따라 URL 구성을 자동으로 처리할 수 ​​있습니다.

``ViewSet``클래스가 ``View``에 비해 read, 또는 update 같은 기능과 get, put 매소드 핸들러를 제공하는 것을 제외하고 거의 같습니다.


## ViewSet을 사용하기 위한 리팩토링
현재 뷰를 ViewSet로 리팩토링 하겠습니다.

우선 ``UserList``와 ``UserDetail`` view를 하나 ``UserViewSet``으로 리팩토링 하겠습니다. 두 개의 뷰를 제거하고 단일 클래스로 대체 할 수 있습니다.
```python
from rest_framework import viewsets

class UserViewSet(viewsets.ReadOnlyModelViewSet):
    """
    This viewset automatically provides `list` and `detail` actions.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
```

여기서는 '읽기 전용' 작업을 자동으로 제공하기 위해 ``ReadOnlyModelViewSet``클래스를 사용했습니다 . 일반 뷰를 사용할 때 ```queryset```와 ``serializer_class`` 을 똑같이 속성에 설정하고 있지만 더 이상 동일한 정보를 별도의 두 클래스에 제공 할 필요는 없습니다.

다음으로 ``SnippetList``, ``SnippetDetail`` 그리고 ``SnippetHighlight`` 세 개의 뷰를 제거하고 다시 단일 클래스로 바꿀 수 있습니다.
```python
from rest_framework.decorators import action
from rest_framework.response import Response

class SnippetViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list`, `create`, `retrieve`,
    `update` and `destroy` actions.

    Additionally we also provide an extra `highlight` action.
    """
    queryset = Snippet.objects.all()
    serializer_class = SnippetSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly,
                          IsOwnerOrReadOnly]

    @action(detail=True, renderer_classes=[renderers.StaticHTMLRenderer])
    def highlight(self, request, *args, **kwargs):
        snippet = self.get_object()
        return Response(snippet.highlighted)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
```
이번에 기본 읽기 및 쓰기 작업의 전체 세트를 얻기 위해 ``ModelViewSet``클래스를 사용했습니다.

또한 ``@action`` 데코레이터를 사용하여 ``highlight``라는 맞춤 액션을 만들었습니다. 이 데코레이터는 표준 ``create/ update/ delete`` 스타일에 맞지 않는 사용자 정의 엔드-포인트을 추가하는 데 사용할 수 있습니다.

``@action`` 데코레이터를 사용하는 사용자 지정 작업 GET은 기본적으로 요청(request)에 응답합니다. ``POST`` 에 응답하는 액션을 원하면 인수 ``methods``를 사용할 수 있습니다.

기본적으로 사용자 정의 액션의 URL은 메소드 이름 자체에 따라 다릅니다. url을 구성하는 방법을 변경하려면 url_path 키워드 인수를 데코레이터에 포함시킬 수 있습니다.



## ViewSet을 URL에 명시적으로 바인딩
핸들러 메소드는 URLConf를 정의할 때만 액션에 바인딩 됩니다.

``snippets/urls.py``파일에서 ViewSet 클래스를 실제 뷰 세트로 바인딩 합니다.
```python
from snippets.views import SnippetViewSet, UserViewSet, api_root
from rest_framework import renderers

snippet_list = SnippetViewSet.as_view({
    'get': 'list',
    'post': 'create'
})
snippet_detail = SnippetViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'patch': 'partial_update',
    'delete': 'destroy'
})
snippet_highlight = SnippetViewSet.as_view({
    'get': 'highlight'
}, renderer_classes=[renderers.StaticHTMLRenderer])
user_list = UserViewSet.as_view({
    'get': 'list'
})
user_detail = UserViewSet.as_view({
    'get': 'retrieve'
})
```
각 ``ViewSets``클래스의 개별 뷰를 http 메소드를 액션에 바인딩하여 작성하는 방법에 주목 하십시오.

리소스를 구체적 뷰에 바인딩 했으므로 평소처럼 URL conf로 뷰를 등록 할 수 있습니다.
```python
urlpatterns = format_suffix_patterns([
    path('', api_root),
    path('snippets/', snippet_list, name='snippet-list'),
    path('snippets/<int:pk>/', snippet_detail, name='snippet-detail'),
    path('snippets/<int:pk>/highlight/', snippet_highlight, name='snippet-highlight'),
    path('users/', user_list, name='user-list'),
    path('users/<int:pk>/', user_detail, name='user-detail')
])
```



## 라우터 사용
``View``클래스 대신 ``ViewSet``클래스를 사용하기 때문에 실제로 URL conf를 직접 디자인 할 필요는 없습니다. 뷰와 URL에 리소스를 연결하는 규칙은 ``Router``클래스를 사용하여 자동으로 처리 할 수 ​​있습니다. 라우터에 적절한 뷰 세트를 등록하고 나머지는 그대로 두면 됩니다.

snippets/urls.py파일을 다시 수정합니다.
```python
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from snippets import views

# Create a router and register our viewsets with it.
router = DefaultRouter()
router.register(r'snippets', views.SnippetViewSet)
router.register(r'users', views.UserViewSet)

# The API URLs are now determined automatically by the router.
urlpatterns = [
    path('', include(router.urls)),
]
```
라우터에 ViewSet을 등록하는 것은 urlpattern 을 제공하는 것과 유사합니다. 뷰의 URL 접두사와 ViewSet 두 가지 인수가 포함됩니다.

``DefaultRouter`` 클래스도 자동으로 루트 view API(entry point)를 생성하므로 views 모듈에서 ``api_root``메소드를 삭제할 수 있습니다.



## ViewSet와 ViewS 간의 Trade-offs
ViewSet을 사용하는 것은 정말 유용한 추상화 일 수 있습니다. 이를 통해 URL 규칙이 API 전체에서 일관성을 유지하고 작성해야 하는 코드의 양을 최소화하며 URL conf의 특성보다는 API가 제공하는 상호 작용 및 표현에 집중할 수 있습니다.

그렇다고 항상 올바른 접근 방식이라고 말할 수 있는 것은 아닙니다. 함수 기반 뷰 대신 클래스 기반 뷰를 사용할 때와 비슷한 단점이 있습니다. ViewSet를 사용하는 것은 뷰를 개별적으로 작성하는 것보다 코드의 명확성이 더 적습니다.
