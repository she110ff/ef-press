# First App

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

polls/views.py 파일에 당므과 같이 작성합니다.

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
모든 URL patterns 에서 url 참조를 위해서는 include() 항상 사용합니다. 그러나 admin.site.urls 는 예외입니다.
:::

<p>
```python
$ python manage.py runserver
```

http://localhost:8000/polls/ 이동하여 “Hello, world. You’re at the polls index.” 를 확인할 수 있습니다.

## Path()

he path() function is passed four arguments, two required: route and view, and two optional: kwargs, and name. At this point, it’s worth reviewing what these arguments are for.

### path() argument: route

route is a string that contains a URL pattern. When processing a request, Django starts at the first pattern in urlpatterns and makes its way down the list, comparing the requested URL against each pattern until it finds one that matches.

Patterns don’t search GET and POST parameters, or the domain name. For example, in a request to https://www.example.com/myapp/, the URLconf will look for myapp/. In a request to https://www.example.com/myapp/?page=3, the URLconf will also look for myapp/.

### path() argument: view

When Django finds a matching pattern, it calls the specified view function with an HttpRequest object as the first argument and any “captured” values from the route as keyword arguments. We’ll give an example of this in a bit.

### path() argument: kwargs

Arbitrary keyword arguments can be passed in a dictionary to the target view. We aren’t going to use this feature of Django in the tutorial.

### path() argument: name

Naming your URL lets you refer to it unambiguously from elsewhere in Django, especially from within templates. This powerful feature allows you to make global changes to the URL patterns of your project while only touching a single file.

When you’re comfortable with the basic request and response flow, read part 2 of this tutorial to start working with the database.
