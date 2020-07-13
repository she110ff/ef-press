# First App - 1.Requests and responses

학습 목표

1. 프로젝트 구조의 이해
2. 서버의 실행과 포트 변경
3. 요청에 의한 간단한 응답

## 초기 파일 구조

startproject 명령은 다음과 같은 파일과 디렉토리를 생성합니다.:

```txt
backend/
    manage.py
    site_name/
        __init__.py
        settings.py
        urls.py
        asgi.py
        wsgi.py
```

| Dir or File               | Description                                                                                                                         |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| backend/                  | root directory입니다. 이름은 사용자가 결정할 수 있습니다.                                                                           |
| manage.py                 | A command-line utility 는 Django project 와 상호작용을 합니다. [manage.py](https://docs.djangoproject.com/en/3.0/ref/django-admin/) |
| site_name/                | 실제 프로젝트를 위한 Python package 입니다. 이름은 프로젝트를 생성할 때 임으로 정할 수 있습니다.                                    |
| site_name/\_\_init\_\_.py | 빈 파일로 Python에게 directory 임을 알려 줍니다.                                                                                    |
| site_name/settings.py     | Django project 설정 파일입니다.                                                                                                     |
| site_name/urls.py         | Root 라우팅 파일입니다.                                                                                                             |
| site_name/asgi.py         | ASGI-compatible web servers entry-point                                                                                             |
| site_name/wsgi.py         | WSGI-compatible web servers entry-point                                                                                             |

## 개발 서버 실행

포트와 IP를 변경하여 서버를 실행할 수 있습니다. :

```bash
$ python manage.py runserver
$ python manage.py runserver 8080 # 포트 변경
$ python manage.py runserver 0:8000 # ip 변경
```

## App 생성

App 을 생성하기 위해 manage.py 를 실행할 때, startapp app_name 을 전달합니다.

```bash
$ python manage.py startapp polls
```

app_name 에 해당하는 폴터와 다음과 같은 하위 파일들이 생성됩니다.

```txt
polls/
    __init__.py
    admin.py
    apps.py
    migrations/
        __init__.py
    models.py
    tests.py
    views.py
```

## View 작성

polls/views.py 파일에 다음과 같이 작성합니다.

```python
# polls/views.py
from django.http import HttpResponse

def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")
```

위의 코드는 django에서 가장 단순한 view를 작성한 예입니다. view 를 호출하기 위해서는 URL과 매핑해야 합니다.

## URL 작성

URLconf 를 작성하기 위해 polls 폴더 안에 urls.py 파일을 생성합니다. polls 루트 경로를 view 의 index 함수와 매핑합니다.

```python
# polls/urls.py
from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
]
```

그런 다음 루트 URL 파일에 polls 라우트를 등록하고 polls App의 url 파일에 위임합니다.

```python
# site_name/urls.py
from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('polls/', include('polls.urls')),
    path('admin/', admin.site.urls),
]
```

include() 함수는 다른 URLconfs에 참조할 수 있는 기능입니다.
이 기능은 plug-and-play URLs을 위해 사용되며, “/polls/”, 또는 “/fun_polls/”, “/content/polls/” 등 App의 경로를 사용자가 지정할 수 있게 합니다.

::: warning
모든 URL patterns 에서 url 참조를 위해서는 항상 include() 사용합니다. 그러나 admin.site.urls 는 예외입니다.
:::

<p>

```python
$ python manage.py runserver
```

http://localhost:8000/polls/ 이동하여 “Hello, world. You’re at the polls index.” 를 확인할 수 있습니다.

## Path()

path 함수에는 4개의 인자를 전달할 수 있습니다. 처음 두개는 route와 view로 필수입니다. 다음 두개는 kwargs와 name으로 옵션입니다.

### path() argument: route

route는 URL pattern 을 포함할 수 있는 문자열입니다. 요청이 들어오면 Django는 첫번째 url pattern에서 시작하여 비교하면서 요청 url과 일치하는 것을 찾습니다.
패턴은 요청의 Method(GET, POST...), domain 을 구분하여 찾지 않습니다. 오직 path 만을 찾습니다. 예를 들어 https://www.example.com/myapp/ 요청을 반은 경우, URLconf 는 myapp/ 을 찾을 것 입니다. https://www.example.com/myapp/?page=3 요청의 경우에도, URLconf 는 myapp/ 을 찾을 것 입니다. .

### path() argument: view

Django 가 패턴을 찾으면 view 로 요청 객체를 첫 번째 인자로 전달합니다. 경로에서 캡쳐 된 값들은 키워드 유형의 인자로 전달 됩니다.

### path() argument: kwargs

그 밖에 전달하고자 하는 값 들을 dictionary 형태로 추가 전달 할 수 있습니다.

### path() argument: name

URL 에 이름을 지으면, Django 어디에서나 명확하게 참조할 수 있습니다.
