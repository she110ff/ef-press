# 요청과 응답(Tutorial 2)
REST 프레임 워크의 핵심을 다루기 시작할 것 입니다. 몇 가지 필수 구성요소를 소개 하겠습니다.

## 요청 객체
REST 프레임 워크 ``Request``는 ``HttpRequest``을 확장하여 보다 유연한 요청-구문 분석을 제공하는 객체입니다. ``Request`` 객체의 핵심 기능은 ``request.data`` 속성입니다. ``request.POST`` 와 비슷하지만 웹 API 작업에 더 유용한 속성입니다.
```python
request.POST  # Only handles form data.  Only works for 'POST' method.
request.data  # Handles arbitrary data.  Works for 'POST', 'PUT' and 'PATCH' methods.
```

## 응답 객체
REST 프레임워크는 또한 렌더링 되지 않은 컨텐츠를 가져오고 클라이언트에 리턴할 올바른 컨텐츠 유형을 판별하는 TemplateResponse 유형의 Response 객체를를 제공합니다.
```python
return Response(data)  # Renders to content type as requested by the client.
```


## 상태 코드
뷰에서 숫자 형식의 HTTP 상태 코드를 사용하는 것은 항상 명확하게 이해할 수 있는 것은 아니며 오류 코드를 통해 무엇이 잘못 되었는지 쉽게 알 수 없는 경우가 많습니다. REST 프레임워크는 숫자 식별자 대신 각 상태 코드에 대해 ``HTTP_400_BAD_REQUEST`` 와 같은 더 명확한 식별자를 제공하는 status 모듈을 사용합니다.


## Wrapping API 뷰
REST 프레임워크는 API view를 작성하는 데 사용할 수 있는 두 개의 랩퍼를 제공합니다.

1. 함수 기반 뷰를 위한 @api_view decorator
2. 클래스 기반 뷰 작업을 위한 APIView 클래스

이 랩퍼들은 view에서 Request 인스턴스를 수신하고 컨텐츠 협상을 수행 할 수 있도록 context를 Response 오브젝트에 추가하는 것과 같은 몇 가지 기능을 제공합니다.

랩퍼들은 또한 ``405 Method Not Allowed`` 과 같은 적절한 응답을 리턴하고, ``request.data`` 를 액세스 할 때 발생하는 형태가 일치하는 않는 입력에 대한 ``ParseError`` 예외 처리와 같은 동작을 제공합니다.


## View 리팩토링 
이제 새로운 구성 요소를 사용하여 view를 약간 리팩터링 해 보겠습니다.
```python
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from snippets.models import Snippet
from snippets.serializers import SnippetSerializer


@api_view(['GET', 'POST'])
def snippet_list(request):
    """
    List all code snippets, or create a new snippet.
    """
    if request.method == 'GET':
        snippets = Snippet.objects.all()
        serializer = SnippetSerializer(snippets, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = SnippetSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
```
뷰 인스턴스를 이전 예제보다 개선 하었습니다. 조금 더 간결하고 코드는 Forms API로 작업하는 것과 매우 유사합니다. 또한 명명된 상태 코드를 사용하여 응답을 보다 명확하게 만듭니다.

다음은 ``views.py`` 에서 개별 스니펫에 대한 view 입니다.
```python
@api_view(['GET', 'PUT', 'DELETE'])
def snippet_detail(request, pk):
    """
    Retrieve, update or delete a code snippet.
    """
    try:
        snippet = Snippet.objects.get(pk=pk)
    except Snippet.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = SnippetSerializer(snippet)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = SnippetSerializer(snippet, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        snippet.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
```
매우 친숙하게 느껴질 것입니다-일반적인 Django 뷰와 크게 다르지 않습니다.

특정 콘텐츠 유형에 대해서 더 이상 요청이나 응답을 명시적으로 연결하지 않습니다. ``request.data`` 는 들어오는 ``json`` 요청뿐만 아니라 다른 형식도 처리할 수 ​​있습니다. 마찬가지로 데이터가 포함된 응답 객체를 반환할 때, REST 프레임워크가 응답을 올바른 컨텐츠 유형으로 렌더링합니다.


## URL에 선택적 형식 접미사 추가
단일 컨텐츠 유형에 고정되지 않는 응답을 이용하기 위해 API 엔드 포인트에 형식 접미사(format suffixes)에 대한 지원을 추가할 수 있습니다. 형식 접미사를 사용하면 지정된 형식을 명시적으로 참조하는 URL이 제공되며 API에서 http://example.com/api/items/4.json 과 같은 URL을 처리 할 수 ​​있습니다.

두 뷰 모두에 format 키워드 인수를 추가합니다.
```python
def snippet_list(request, format=None):
```

```python
def snippet_detail(request, pk, format=None):
```

이제 ``snippets/urls.py`` 파일을 수정하여 format_suffix_patterns을 기존 URL에 추가합니다.
```python
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from snippets import views

urlpatterns = [
    path('snippets/', views.snippet_list),
    path('snippets/<int:pk>', views.snippet_detail),
]

urlpatterns = format_suffix_patterns(urlpatterns)
```
이러한 추가 URL 패턴을 반드시 추가할 필요는 없지만 특정 형식을 간단하고 깔끔하게 참조할 수 있습니다.

## 실행하기 
명령 행에서 API를 테스트 하십시오. 유효하지 않은 요청을 보내면 오류 처리에 대한 응답이 변경된 것을 확인 할 수 있습니다.

이전과 같이 모든 스니펫 목록을 얻을 수 있습니다.
```python
http http://127.0.0.1:8000/snippets/

HTTP/1.1 200 OK
...
[
  {
    "id": 1,
    "title": "",
    "code": "foo = \"bar\"\n",
    "linenos": false,
    "language": "python",
    "style": "friendly"
  },
  {
    "id": 2,
    "title": "",
    "code": "print(\"hello, world\")\n",
    "linenos": false,
    "language": "python",
    "style": "friendly"
  }
]
```
Accept 헤더를 사용하여 응답의 형식을 제어할 수 있습니다.
```python
http http://127.0.0.1:8000/snippets/ Accept:application/json  # Request JSON
http http://127.0.0.1:8000/snippets/ Accept:text/html         # Request HTML
```

또는 형식 접미사를 추가하여 :
```python
http http://127.0.0.1:8000/snippets.json  # JSON suffix
http http://127.0.0.1:8000/snippets.api   # Browsable API suffix
```

마찬가지로 Content-Type 헤더를 사용하여 보내는 요청의 형식을 제어 할 수 있습니다.
```python
#POST using form data
http --form POST http://127.0.0.1:8000/snippets/ code="print(123)"

{
  "id": 3,
  "title": "",
  "code": "print(123)",
  "linenos": false,
  "language": "python",
  "style": "friendly"
}

#POST using JSON
http --json POST http://127.0.0.1:8000/snippets/ code="print(456)"

{
    "id": 4,
    "title": "",
    "code": "print(456)",
    "linenos": false,
    "language": "python",
    "style": "friendly"
}
```
위 http요청에 --debug 스위치를 추가하면 요청 헤더에서 요청 유형을 볼 수 있습니다.

이제 http://127.0.0.1:8000/snippets/ 를 방문하여 웹 브라우저에서 API를 실행해 보세요.


### Browsability
API는 클라이언트 요청에 따라 응답의 컨텐츠 유형을 선택하므로 기본적으로 웹 브라우저가 해당 자원을 요청할 때 HTML 형식의 자원 표시를 리턴합니다. 이를 통해 API는 완전히 웹 브라우징 가능한 HTML 표현을 반환 할 수 있습니다.

웹 브라우징 가능한 API를 사용하면 유용성이 크게 향상되고 API를 훨씬 쉽게 개발하고 사용할 수 있습니다. 또한 API를 검사하고 작업하려는 다른 개발자의 진입장벽을 크게 낮춥니다.
