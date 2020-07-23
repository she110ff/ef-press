# Class 기반 View(Tutorial 3)
함수 기반 뷰가 아닌 클래스 기반 뷰를 사용하여 API 뷰를 작성할 수도 있습니다. 보시다시피 이것은 일반적인 기능을 재사용하고 코드를 DRY하게 유지하는 데 도움이 되는 강력한 패턴입니다.


## 클래스 기반 뷰를 사용하여 API 재 작성
뷰를 클래스 기반 뷰로 다시 작성합니다. views.py을 약간의 리팩토링 합니다.

```python
from snippets.models import Snippet
from snippets.serializers import SnippetSerializer
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


class SnippetList(APIView):
    """
    List all snippets, or create a new snippet.
    """
    def get(self, request, format=None):
        snippets = Snippet.objects.all()
        serializer = SnippetSerializer(snippets, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = SnippetSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
```
이전 사례와 매우 비슷해 보이지만 서로 다른 HTTP 메소드를 구분하는 방식이 다릅니다. views.py 의 SnippetDetail도 수정해 보세요.
```python
class SnippetDetail(APIView):
    """
    Retrieve, update or delete a snippet instance.
    """
    def get_object(self, pk):
        try:
            return Snippet.objects.get(pk=pk)
        except Snippet.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        snippet = self.get_object(pk)
        serializer = SnippetSerializer(snippet)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        snippet = self.get_object(pk)
        serializer = SnippetSerializer(snippet, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        snippet = self.get_object(pk)
        snippet.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
```
여전히 function based 뷰와 매우 유사합니다.

또한 클래스 기반 뷰를 사용하고 있으므로 ``snippets/urls.py`` 도 리팩토링 해야합니다.
```python
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from snippets import views

urlpatterns = [
    path('snippets/', views.SnippetList.as_view()),
    path('snippets/<int:pk>/', views.SnippetDetail.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)
```
개발 서버를 실행하여 모든 것이 이전처럼 작동하는지 살펴 보겠습니다.


## 믹스-인 사용
클래스 기반 뷰를 사용하는 것의 큰 장점 중 하나는 재사용 가능한 행동(behaviour)을 쉽게 구성할 수 있다는 것입니다.

지금까지 사용했던 생성(create)/검색(retrieve)/업데이트(update)/삭제(delete) 작업의 일반적인 동작은 REST 프레임워크의 믹스-인 클래스에서 구현되어 있습니다.

mixin 클래스를 사용하여 뷰를 작성하는 방법을 살펴 보겠습니다. 여기 ``views.py`` 모듈이 있습니다.
```python
from snippets.models import Snippet
from snippets.serializers import SnippetSerializer
from rest_framework import mixins
from rest_framework import generics

class SnippetList(mixins.ListModelMixin,
                  mixins.CreateModelMixin,
                  generics.GenericAPIView):
    queryset = Snippet.objects.all()
    serializer_class = SnippetSerializer

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)
```
``GenericAPIView`` 를 사용하는 뷰를 구축하고 ``ListModelMixin`` 과 ``CreateModelMixin`` 을 추가했습니다.
base 클래스는 핵심 기능을 제공하고 mixin 클래스는 ``.list()`` 및 ``.create()`` action을 제공합니다. 그런 다음 get 과 post 메소드에 적절한 action을 명시적으로 바인딩합니다.

다시 ``GenericAPIView`` 클래스를 사용하여 핵심 기능을 제공하고 ``.retrieve()``, ``.update()`` 및 ``.destroy()`` 액션을 제공하기 위해 믹스-인을 추가합니다.
```python
class SnippetDetail(mixins.RetrieveModelMixin,
                    mixins.UpdateModelMixin,
                    mixins.DestroyModelMixin,
                    generics.GenericAPIView):
    queryset = Snippet.objects.all()
    serializer_class = SnippetSerializer

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)
```




## 일반 클래스 기반 뷰 사용
mixin 클래스를 사용하여 이전보다 약간 적은 코드를 사용하도록 뷰를 다시 작성했지만 한 단계 더 나아갈 수 있습니다. REST 프레임워크는 ``views.py`` 모듈을 더 많이 정리하는 데 사용할 수 있는 이미 mixed-in generic 뷰를 제공합니다.
```python
from snippets.models import Snippet
from snippets.serializers import SnippetSerializer
from rest_framework import generics


class SnippetList(generics.ListCreateAPIView):
    queryset = Snippet.objects.all()
    serializer_class = SnippetSerializer


class SnippetDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Snippet.objects.all()
    serializer_class = SnippetSerializer
```
결과적으로 많은 양의 무료 코드를 얻었고 깨끗하고 간결합니다.
