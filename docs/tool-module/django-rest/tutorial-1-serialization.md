# 직렬화(Tutorial 1)
이 튜토리얼은 웹 API를 뼈대가 되는 코드 작성을 다룹니다. 그 과정에서 REST 프레임워크를 구성하는 다양한 구성 요소를 소개하고 모든 구성 요소가 어떻게 결합되는지 포괄적으로 이해합니다.

이 튜토리얼의 코드는 GitHub 의 [encode/rest-framework-tutorial](https://github.com/encode/rest-framework-tutorial) 저장소에서 사용할 수 있습니다. 완성 된 구현은 테스트를 위해 샌드박스 버전으로 온라인으로 제공됩니다. [데모](https://restframework.herokuapp.com/)

## 환경 구성
다른 작업을하기 전에 venv를 사용하여 새로운 가상 환경을 만듭니다 . 이를 통해 현재 진행중인 다른 프로젝트와 패키지 구성을 분리하여 사용할 수 있습니다.
```bash
python3 -m venv env
source env/bin/activate
```

이제 가상 환경 내부에 있으므로 패키지 요구 사항을 설치할 수 있습니다.
```bash
pip install django
pip install djangorestframework
pip install pygments  # We'll be using this for the code highlighting
```
가상 환경을 종료하려면 deactivate를 입력 하십시오. 자세한 내용은 [venv](https://docs.python.org/3/library/venv.html) 설명서를 참조하십시오.


## 시작하기 
```bash
cd ~
django-admin startproject tutorial
cd tutorial
```

```python
python manage.py startapp snippets
```

```python
INSTALLED_APPS = [
    ...
    'rest_framework',
    'snippets.apps.SnippetsConfig',
]
```


## 작업 모듈 작성 
코드 스니펫을 저장하는 데 사용되는 간단한 Snippet 모델을 작성하여 시작하겠습니다. ``snippets/models.py`` 을 다음과 같이 작성하세요.

```python
from django.db import models
from pygments.lexers import get_all_lexers
from pygments.styles import get_all_styles

LEXERS = [item for item in get_all_lexers() if item[1]]
LANGUAGE_CHOICES = sorted([(item[1][0], item[0]) for item in LEXERS])
STYLE_CHOICES = sorted([(item, item) for item in get_all_styles()])


class Snippet(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=100, blank=True, default='')
    code = models.TextField()
    linenos = models.BooleanField(default=False)
    language = models.CharField(choices=LANGUAGE_CHOICES, default='python', max_length=100)
    style = models.CharField(choices=STYLE_CHOICES, default='friendly', max_length=100)

    class Meta:
        ordering = ['created']
```
또한 스니펫 모델의 마이그레이션을 작성하고 데이터베이스를 동기화해야 합니다.
```python
python manage.py makemigrations snippets
python manage.py migrate
```

```
LEXERS [
    ('ABAP', ('abap',), ('*.abap', '*.ABAP'), ('text/x-abap',)), 
    ('APL', ('apl',), ('*.apl',), ()), 
    ('ABNF', ('abnf',), ('*.abnf',), ('text/x-abnf',)), 
    ('ActionScript 3', ('as3', 'actionscript3'), ('*.as',), ('application/x-actionscript3', 'text/x-actionscript3', 'text/actionscript3')), 
    ('ActionScript', ('as', 'actionscript'), ('*.as',), ('application/x-actionscript', 'text/x-actionscript', 'text/actionscript')), 
    ('Ada', ('ada', 'ada95', 'ada2005'), ('*.adb', '*.ads', '*.ada'), ('text/x-ada',)), 
    ('ADL', ('adl',), ('*.adl', '*.adls', '*.adlf', '*.adlx'), ()),
    ...
]

LANGUAGE_CHOICES [
    ('abap', 'ABAP'), 
    ('abnf', 'ABNF'), 
    ('ada', 'Ada'), 
    ('adl', 'ADL'),
    ...
]

STYLE_CHOICES [
    ('abap', 'abap'), 
    ('algol', 'algol'), 
    ('algol_nu', 'algol_nu'), 
    ('arduino', 'arduino'), 
    ('autumn', 'autumn'), 
    ('borland', 'borland'), 
    ('bw', 'bw'), 
    ('colorful', 'colorful'), 
    ('default', 'default'), 
    ...
] 
```

## 직렬화 클래스 생성 
웹 API에서 시작해야 할 첫 번째 사항은 스니펫 인스턴스를 json 같은 표현으로 직렬화하고 역 직렬화하는 방법을 제공하는 것입니다. Django의 form과 매우 유사한 직렬 변환기를 선언하여 이를 수행 할 수 있습니다. snippets 디렉토리에 ``serializers.py`` 파일을 작성하고 다음을 추가하십시오.

```python
from rest_framework import serializers
from snippets.models import Snippet, LANGUAGE_CHOICES, STYLE_CHOICES


class SnippetSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    title = serializers.CharField(required=False, allow_blank=True, max_length=100)
    code = serializers.CharField(style={'base_template': 'textarea.html'})
    linenos = serializers.BooleanField(required=False)
    language = serializers.ChoiceField(choices=LANGUAGE_CHOICES, default='python')
    style = serializers.ChoiceField(choices=STYLE_CHOICES, default='friendly')

    def create(self, validated_data):
        """
        Create and return a new `Snippet` instance, given the validated data.
        """
        return Snippet.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """
        Update and return an existing `Snippet` instance, given the validated data.
        """
        instance.title = validated_data.get('title', instance.title)
        instance.code = validated_data.get('code', instance.code)
        instance.linenos = validated_data.get('linenos', instance.linenos)
        instance.language = validated_data.get('language', instance.language)
        instance.style = validated_data.get('style', instance.style)
        instance.save()
        return instance
```
직렬화 클래스의 첫 번째 부분은 직렬화/역 직렬화 되는 필드를 정의합니다. ``create()``는 인스턴스가 만들지고 ``update()``는 ``serializer.save()``를 호출 할 때 수정되는 방법을 정의합니다.

Serializer 클래스는 Django의 ``Form``클래스(Data Transform Object) 매우 유사합니다.  ``required``, ``max_length``, ``default`` 같은 검증 플래그를 포함하고 있습니다.

필드 플래그는 HTML로 렌더링 할 때와 같이 특정 상황에서 Serializer가 표시되는 방법을 제어 할 수도 있습니다. 위 의 플래그``{'base_template': 'textarea.html'}``는 ``widget=widgets.Textarea``를 Django Form 클래스에서 사용하는 것과 같습니다. 이 자습서의 뒷 부분에서 볼 수 있듯이 browsable  API가 표시되는 방법을 제어하는 ​​데 특히 유용합니다.

나중에는 실제로 시간을 절약을 위해 ``ModelSerializer`` 클래스를 사용할 수 있지만 지금은 serializer 정의를 명시적으로 유지합니다.




## 직렬화로 작업하기  
새로운 Serializer 클래스 사용에 익숙해 지기 위해 Django shell에서 살펴 보도록 하겠습니다.
```bash
python manage.py shell
```

필요한 모듈을 가져오기 한 후에 코드 스니펫을 만들어 보겠습니다.
```python
from snippets.models import Snippet
from snippets.serializers import SnippetSerializer
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser

snippet = Snippet(code='foo = "bar"\n')
snippet.save()

snippet = Snippet(code='print("hello, world")\n')
snippet.save()
```

이제 스니펫 인스턴스를 사용할 수 있습니다. 이러한 인스턴스 중 하나를 직렬화 하는 방법을 살펴 보겠습니다.
```bash
serializer = SnippetSerializer(snippet)
serializer.data
# {'id': 2, 'title': '', 'code': 'print("hello, world")\n', 'linenos': False, 'language': 'python', 'style': 'friendly'}
```

이 시점에서 모델 인스턴스를 Python 데이터 유형으로 변환했습니다. 다음은 직렬화 프로세스를 마무리하기 위해 데이터를 json로 렌더링합니다.
```bash
content = JSONRenderer().render(serializer.data)
content
# b'{"id": 2, "title": "", "code": "print(\\"hello, world\\")\\n", "linenos": false, "language": "python", "style": "friendly"}'
```

역 직렬화는 비슷합니다. 먼저 스트림을 Python 데이터 유형으로 구문 분석합니다.
```bash
import io

stream = io.BytesIO(content)
data = JSONParser().parse(stream)
```

... 그러면 원시 데이터 유형을 완전히 채워진 객체 인스턴스로 복원합니다.
```bash
serializer = SnippetSerializer(data=data)
serializer.is_valid()
# True
serializer.validated_data
# OrderedDict([('title', ''), ('code', 'print("hello, world")\n'), ('linenos', False), ('language', 'python'), ('style', 'friendly')])
serializer.save()
# <Snippet: Snippet object>
```

API가 양식을 사용하는 것과 비슷한 점에 유의하십시오. 시리얼 라이저를 사용하는 뷰를 작성하기 시작하면 유사성이 훨씬 더 분명 해져야합니다.

모델 인스턴스 대신 쿼리 세트를 직렬화 할 수도 있습니다. 그렇게하기 위해 단순히 many=Trueserializer 인수에 플래그를 추가합니다 .
```bash
serializer = SnippetSerializer(Snippet.objects.all(), many=True)
serializer.data
# [OrderedDict([('id', 1), ('title', ''), ('code', 'foo = "bar"\n'), ('linenos', False), ('language', 'python'), ('style', 'friendly')]), OrderedDict([('id', 2), ('title', ''), ('code', 'print("hello, world")\n'), ('linenos', False), ('language', 'python'), ('style', 'friendly')]), OrderedDict([('id', 3), ('title', ''), ('code', 'print("hello, world")'), ('linenos', False), ('language', 'python'), ('style', 'friendly')])]
```

## ModelSerializers 사용 
``SnippetSerializer`` 클래스는 ``Snippet`` 모델에 포함 된 많은 정보를 복제하고 있습니다. 코드를 좀 더 간결하게 유지할 수 있다면 좋을 것입니다.

Django에서 ``Form`` 클래스 및 ``ModelForm`` 클래스를 제공하는 것과 같은 방식으로 REST 프레임워크가 ``Serializer`` 클래스, ``ModelSerializer`` 클래스를 가지고 있습니다.

``ModelSerializer`` 클래스를 사용하여 ``Serializer``를 리팩토링 하려면 ``snippets/serializers.py``  파일을 다시 열고 ``SnippetSerializer`` 클래스를 다음으로 바꿉니다.

```python
from rest_framework import serializers
from snippets.models import Snippet


class SnippetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Snippet
        fields = ['id', 'title', 'code', 'linenos', 'language', 'style']
```

serializers 에 있는 좋은 특성 중 하나는 serializers 인스턴스의 모든 필드를 표시하여 인쇄 할 수 있다는 것입니다. 
```python
from snippets.serializers import SnippetSerializer
serializer = SnippetSerializer()
print(repr(serializer))
# SnippetSerializer():
#    id = IntegerField(label='ID', read_only=True)
#    title = CharField(allow_blank=True, max_length=100, required=False)
#    code = CharField(style={'base_template': 'textarea.html'})
#    linenos = BooleanField(required=False)
#    language = ChoiceField(choices=[('Clipper', 'FoxPro'), ('Cucumber', 'Gherkin'), ('RobotFramework', 'RobotFramework'), ('abap', 'ABAP'), ('ada', 'Ada')...
#    style = ChoiceField(choices=[('autumn', 'autumn'), ('borland', 'borland'), ('bw', 'bw'), ('colorful', 'colorful')...
```
``ModelSerializer`` 클래스는 특별히 마술 같은 일을 하는 것이 아니고 Serializer 클래스를 빠르게  만들기 위한 방법이라는 것을 기억해야 합니다.
* 자동으로 필드 세트를 결정 
* create(),  update() 메소드에 대한 간단한 기본 구현



## 일반 Django view 작성 
새로운 Serializer 클래스를 사용하여 일부 API의 뷰를 작성하는 방법을 살펴 보겠습니다. 현재로서는 REST 프레임워크의 다른 기능을 사용하지 않을 것입니다. 뷰를 일반 Django 뷰로 작성합니다.

``snippets/views.py`` 파일에 다음을 추가하십시오
```python
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from snippets.models import Snippet
from snippets.serializers import SnippetSerializer
```

기존의 모든 스니펫을 나열하거나 새 스니펫을 만드는 것을 지원하는 뷰가 될 것입니다.
```python
@csrf_exempt
def snippet_list(request):
    """
    List all code snippets, or create a new snippet.
    """
    if request.method == 'GET':
        snippets = Snippet.objects.all()
        serializer = SnippetSerializer(snippets, many=True)
        return JsonResponse(serializer.data, safe=False)

    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = SnippetSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)
```
CSRF 토큰이 없는 클라이언트에서 이 뷰에 POST를 수행하려면 뷰를 csrf_exempt로 표시해야 합니다. 이것은 일반적인 것은 아닙니다.

또한 개별 스니펫에 해당하는 뷰가 필요하며 스니펫을 검색, 업데이트 또는 삭제하는 데 사용할 수 있습니다.
```python
@csrf_exempt
def snippet_detail(request, pk):
    """
    Retrieve, update or delete a code snippet.
    """
    try:
        snippet = Snippet.objects.get(pk=pk)
    except Snippet.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        serializer = SnippetSerializer(snippet)
        return JsonResponse(serializer.data)

    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = SnippetSerializer(snippet, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)

    elif request.method == 'DELETE':
        snippet.delete()
        return HttpResponse(status=204)
```

마지막으로 이러한 뷰를 연결해야 합니다. ``snippets/urls.py`` 파일을 작성 하십시오.
```python
from django.urls import path
from snippets import views

urlpatterns = [
    path('snippets/', views.snippet_list),
    path('snippets/<int:pk>/', views.snippet_detail),
]
```

또한 스니펫 앱의 URL을 포함 시키려면 ``tutorial/urls.py`` 파일 에 루트 urlconf 를 연결해야 합니다.
```python
from django.urls import path, include

urlpatterns = [
    path('', include('snippets.urls')),
]
```
아직 다루지 않은 몇 가지 Edge 사례가 있습니다. malformed json를 보내거나 뷰가 처리하지 않는 메소드로 요청하면 500 "서버 오류" 응답으로 끝납니다.



## 웹 API 테스트  

이제 스니펫을 제공하는 샘플 서버를 시작할 수 있습니다. shell 을 종료하고
```python
quit()
```

Django의 개발 서버를 시작합니다.
```python
python manage.py runserver
```

curl 또는 httpie를 사용하여 API를 테스트 할 수 있습니다 . Httpie는 Python으로 작성된 사용자 친화적 인 http 클라이언트입니다. 

pip를 사용하여 httpie를 설치할 수 있습니다.
```python
pip install httpie
```

모든 스니펫 목록을 얻을 수 있습니다.
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

또는 id를 참조하여 특정 스니펫을 얻을 수 있습니다.
```python
http http://127.0.0.1:8000/snippets/2/

HTTP/1.1 200 OK
...
{
  "id": 2,
  "title": "",
  "code": "print(\"hello, world\")\n",
  "linenos": false,
  "language": "python",
  "style": "friendly"
}
```
마찬가지로 웹 브라우저에서 이러한 URL을 방문하여 동일한 json을 표시 할 수 있습니다.


## 진행 위치  
Django의 Forms API와 비슷한 느낌의 직렬화 API와 일부 Django 뷰가 있습니다.

우리의 API 뷰는 현재 json 응답을 제공하는 것 이상으로 특별한 작업을 수행하지 않으며 여전히 정리하고 싶은 오류 처리에 엣지 사례가 있지만 작동하는 웹 API입니다.
