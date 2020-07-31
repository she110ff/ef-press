# Django Testing Cheat Sheet
[원문](https://www.valentinog.com/blog/testing-django/)

Django 애플리케이션의 일반적인 테스트 패턴과 모범 사례에 대한 치트 시트.

여기에 제시된 예제가 Django를 실행하는 "올바른 방법"으로 규정할 필요는 없습니다.

학습 목표
* 서론 : 테스트 대상을 어떻게 알 수 있습니까?
* 테스트 조직
* 다 대다 관계 테스트
* 테스트 모델 str
* 모델 필드 테스트
* POST 요청 테스트
* 테스트에서보다 강력한 URL
* Django 모델에서 데이터 사전 제공
* 인증 테스트
* 요청 헤더 테스트
* 장고 REST 프레임 워크 인터 루드
* DRF : POST 요청 테스트
* DRF : 인증 테스트


테스트를 위해 Django 프로젝트를 새로 만듭니다. 프로젝트에 library 라는 Django 앱을 만듭니다.
```python
django-admin startapp library
```

``settings.py``에 다음과 같이 코드를 추가하여 앱을 활성화하십시오.:
```python
INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    # enable the app
    "library.apps.LibraryConfig",
]
```


## 서론 : 테스트 대상을 어떻게 알 수 있습니까?
테스트를 위해 coverage를 사용하겠습니다. Django 프로젝트에 패키지를 설치하십시오:
```python
pip install coverage
```

프로젝트 폴더 내에서 도구를 실행하십시오.
```python
coverage run --omit='*/venv/*' manage.py test
```

첫 번째 통과 후 다음을 통해 보장 보고서를 얻을 수 있습니다.
```python
coverage report
```
다음과 유사한 결과를 볼 수 있습니다.
```txt
Name                             Stmts   Miss  Cover
----------------------------------------------------
library/__init__.py                  0      0   100%
library/admin.py                     1      0   100%
library/apps.py                      3      0   100%
library/migrations/__init__.py       0      0   100%
library/models.py                    1      0   100%
library/tests.py                     1      0   100%

...

manage.py                           15      2    87%
mysite/__init__.py                   0      0   100%
mysite/settings.py                  19      0   100%
mysite/urls.py                       3      0   100%
----------------------------------------------------
TOTAL                              790     49    94%
```

HTML 보고서를 생성 할 수도 있습니다(htmlcov라는 새 폴더가 프로젝트 루트 내에 생성됩니다).
```python
coverage html
```

## 테스트 조직
테스트 조직은 어렵고 팀 기본 설정에 크게 의존합니다. 좋은 시작점은 최소한 테스트 파일을 분할하는 것 입니다.

단일 ``tests.py`` 대신 ``tests`` 폴더를 생성하여 개별 파일이 애플리케이션의 단일 각 부분에 대한 테스트를 작성할 수 있도록 합니다.

```txt
library/
├── admin.py
├── apps.py
├── __init__.py
├── migrations
│   └── __init__.py
├── models.py
├── tests
│   ├── api.py
│   ├── __init__.py
│   └── models.py
│   └── web.py
└── views.py
```
여기 ``tests`` 폴더에서 ``api.py``, ``web.py`` 파일이 있습니다. ``api.py``는 API의 엔드-포인트에 대한 테스트를 하고 ``web.py``는 일반 HTML 페이지를 테스트 할 수 있습니다. ``models.py``는 모델 테스트를 위해 사용할 수 있습니다.

또 다른 일반적인 방법은 각 파일이 단일 앱 기능에 대한 테스트를 수행하는 ``feature`` 폴더를 만드는 것입니다.
```txt
library/
├── admin.py
├── apps.py
├── __init__.py
├── migrations
│   └── __init__.py
├── models.py
├── tests
│   ├── features
│   │   ├── search
│   │   ├── search_api
│   │   └── user_profile
│   ├── __init__.py
└── views.py
```
이 가이드에서는 첫 번째 방법을 사용합니다.



## 다 대다 관계 테스트
시나리오 : relationship 모델을 테스트 합니다.

Book과 의 두 개의 모델을 고려하십시오 . 책(Book)은 많은 저자(Author)를 가질 수 있고, 저자는 많은 책에 연결될 수 있습니다. ``ManyToManyField``를 사용하여 이 관계를 표현할 수 있습니다.

``library/models.py``에 다음에서 모델을 만드십시오.
```python
from django.db import models


class Author(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)


class Book(models.Model):
    title = models.CharField(max_length=100)
    authors = models.ManyToManyField(to=Author)
```

그런 다음 마이그레이션을 실행하고 적용하십시오.
```python
python manage.py makemigrations library
python manage.py migrate
```

첫 번째 테스트로 ``ManyToManyField``를 추가하는 것을 잊지 않았는지 확인할 수 있습니다. 우선 책에 몇 명의 저자가 연결되어 있는지 알고 싶습니다.

``library/tests/models.py``에서 다음 테스트를 만들 수 있습니다.
```python
from django.test import TestCase
from library.models import Author, Book


class TestModels(TestCase):
    def test_book_has_an_author(self):
        book = Book.objects.create(title="The man in the high castle")
        philip = Author.objects.create(first_name="Philip", last_name="K. Dick")
        juliana = Author.objects.create(first_name="Juliana", last_name="Crain")
        book.authors.set([philip.pk, juliana.pk])
        self.assertEqual(book.authors.count(), 2)
```
여기서 우리는 하나의 책과 두 명의 저자를 만들고 책에 저자를 할당합니다.:
```python
book.authors.set([philip.pk, juliana.pk])
```

또한 역으로 연결할 수 있으며, 각 저자에게 책을 할당합니다
```python
from django.test import TestCase
from library.models import Author, Book


class TestModels(TestCase):
    def test_book_has_an_author(self):
        book = Book.objects.create(title="The man in the high castle")
        philip = Author.objects.create(first_name="Philip", last_name="K. Dick")
        juliana = Author.objects.create(first_name="Juliana", last_name="Crain")
        philip.book_set.add(book)
        juliana.book_set.add(book)
        self.assertEqual(book.authors.count(), 2)
```

``library/tests/models.py``을 테스트에 추가하려면 ``library/tests/__init__.py``파일에서 가져오기를 실행합니다.:
```python
from .models import *
```

그런 다음 테스트를 실행하십시오.
```python
python manage.py test library
```

## 모델 __str__ 테스트 
시나리오 : 모델 문자열 표현을 테스트 합니다.

모델 ``__str__`` 메소드를 사용하여 모델을 문자열로 표현하는 방법이 있을 수 있습니다. 

저자(Author)를 first_name + last_name 으로 표시하고 Book을 title로 표시하기 위해 각 모델에 해당 __str__ 메소드를 추가 할 수 있습니다.
```python
from django.db import models


class Author(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"


class Book(models.Model):
    title = models.CharField(max_length=100)
    authors = models.ManyToManyField(to=Author)

    def __str__(self):
        return self.title
```

이름이 지정된 파일 library/tests/models.py에서 다음 테스트를 추가 할 수 있습니다.
```python
from django.test import TestCase
from library.models import Author, Book


class TestModels(TestCase):
    def test_model_str(self):
        book = Book.objects.create(title="The man in the high castle")
        philip = Author.objects.create(first_name="Philip", last_name="K. Dick")
        self.assertEqual(str(book), "The man in the high castle")
        self.assertEqual(str(philip), "Philip K. Dick")

        # More tests here
```

그런 다음 테스트를 실행하십시오.
```python
python manage.py test library -v 2
```

## 모델 필드 테스트 
시나리오 : 필드가 많은 모델을 테스트 합니다. 

많은 필드가 있는 모델을 있습니다.
```python
class Event(models.Model):
    title = models.CharField(max_length=60)
    seo_title = models.CharField(max_length=59)
    seo_description = models.CharField(max_length=160)
    abstract = models.CharField(max_length=160)
    body = models.TextField(default="")
    duration = models.IntegerField(default=0)
    slug = models.SlugField(max_length=20)
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    price = models.IntegerField()
    location = models.TextField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    published = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.title}"
```

테스트를 위해 각 필드의 값을 수동으로 채우는 것은 실용적이지 않습니다 
```python
from django.test import TestCase
from library.models import Author, Book, Event
from datetime import datetime


class TestModels(TestCase):
    def test_event_model(self):
        event = Event.objects.create(
            title="Some title",
            seo_title="Some Seo title",
            seo_description="Some description",
            abstract="The abstract",
            body="The body",
            duration=2,
            slug="the-slug",
            start_date=datetime.now(),
            end_date=datetime.now(),
            price=800,
            location="Rome",
            published=False,
        )
```
대신 Model Bakery 와 같은 도구를 사용하여 필드 생성을 위임할 수 있습니다. 
```python
pip install model_bakery
```

그런 다음 테스트에서
```python
from django.test import TestCase
from library.models import Author, Book, Event
from model_bakery import baker


class TestModels(TestCase):
    def test_event_model(self):
        event = baker.make(Event, title="The man in the high castle presentation")
        self.assertEqual(str(event), "The man in the high castle presentation")

        # More tests here
```
재정의해야 하는 경우 자신의 필드를 전달할 수 있습니다. 모델-베이커리는 또한 대량의 모델을 생성하는 데 편리합니다. 

일 대 다, 다 대 다, 일 대 일 드의 관계 모델이 아니라 하더라도 모든 모델은 테스트하는 이유는 데이터베이스의 테이블과 모델의 일치를 확인하는 데 있습니다.

[모델 베이커리](https://github.com/model-bakers/model_bakery)
[Django와 DRF에서 1,000 개의 객체를 생성하여 테스트하려면 어떻게해야합니까?](https://jefftriplett.com/2020/how-do-i-test-1000-objects-in-django/)



## POST 요청 테스트
시나리오 : HTML 양식을 사용하여 "/ contacts /"에 대한 POST 요청을 승인합니다.

Django에서 연락처 양식을 만들어 학생으로부터 연락처를 가져 오려고 한다고 가정하겠습니다 . 먼저 테스트를 작성해야 할 수도 있습니다.

테스트 구조에 따라 ``library/tests/web.py``파일에서 ``TestCase`` 테스트를 작성할 수 있습니다 .
```python
from django.test import TestCase
from .models import Contact


class TestStudentContactForm(TestCase):
    def test_can_send_message(self):
        pass
```
이 기능을 테스트 하려면 POST 요청과 함께 전송할 데이터를 만들어야 합니다. 데이터는 모델의 필드와 일치해야 합니다.

따라서 다음과 같은 모델이 생성합니다.
```python
class Contact(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    message = models.TextField(max_length=400)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"
```

뷰도 생성합니다. 
```python
from django.urls import reverse_lazy
from django.views.generic.edit import CreateView
from django.http import HttpResponse
from .models import Contact


class ContactView(CreateView):

    model = Contact
    fields = ['first_name', 'last_name', 'message']
    success_url = reverse_lazy("thanks")


def thanks(request):
    return HttpResponse("Thank you! Will get in touch soon.") 
```

Post 요청을 연결할 URL도 추가합니다.
```python
from django.urls import path
from .views import ContactView, thanks

urlpatterns = [
    path('',  ContactView.as_view(), name="contact"),
    path("thanks/", thanks, name="thanks"),
]
```

테스트에서 데이터 dictionary를 작성할 수 있습니다.
```python
from django.test import TestCase
from library.models import Contact


class TestStudentContactForm(TestCase):
    def test_can_send_message(self):
        data = {
            "first_name": "Juliana",
            "last_name": " Crain",
            "message": "Would love to talk about Philip K. Dick",
        }
```

클라이언트로 요청을 보냅니다 . 첫 번째 테스트로 Contact 인스턴스가 데이터베이스에 생성되었는지 확인할 수 있습니다.
```python
from django.test import TestCase
from library.models import Contact


class TestStudentContactForm(TestCase):
    def test_can_send_message(self):
        data = {
            "first_name": "Juliana",
            "last_name": " Crain",
            "message": "Would love to talk about Philip K. Dick",
        }
        response = self.client.post("/contact/", data=data)
        self.assertEqual(Contact.objects.count(), 1)
```

다음으로 뷰가 올바르게 리디렉션 되었는지 확인할 수 있습니다.
```python
from django.test import TestCase
from library.models import Contact


class TestStudentContactForm(TestCase):
    def test_can_send_message(self):
        data = {
            "first_name": "Juliana",
            "last_name": " Crain",
            "message": "Would love to talk about Philip K. Dick",
        }
        response = self.client.post("/contact/", data=data)
        self.assertEqual(Contact.objects.count(), 1)
        self.assertRedirects(response, "/thanks/")

```
웹 개발에서 일반적으로 사용되는 클래식 POST / Redirect / GET 패턴에 대한 테스트입니다.

위의 테스트는 HTML 양식을 통하지 않고 진행이 되었지만 다음과 같이 템플릿(또는 적어도 두 개의 HTML 입력)을 테스트 할 수도 있습니다.
```python
from django.test import TestCase
from library.models import Contact


class TestStudentContactForm(TestCase):
    def test_can_send_message(self):
        data = {
            "first_name": "Juliana",
            "last_name": " Crain",
            "message": "Would love to talk about Philip K. Dick",
        }
        response = self.client.get("/contact/")
        self.assertTemplateUsed(response, "library/contact_form.html")
        self.assertContains(response,"first_name")
        self.assertContains(response, "last_name")
        response = self.client.post("/contact/", data=data)
        self.assertEqual(Contact.objects.count(), 1)
        self.assertRedirects(response, "/thanks/")
```

다음은 HTML에서 두 개 필드를 테스트 합니다.
```python
        self.assertContains(response,"first_name")
        self.assertContains(response, "last_name")
```
HTML에 양식을 포함시키는 한 몇 가지 필드를 테스트하면 충분합니다. 명심해야 할 또 다른 사항은 테스트 클라이언트가 CSRF 유효성 검사를 건너 뛴다는 것 입니다. 템플릿에 토큰을 포함시켜야 합니다. 보다 현실적인 테스트를 위해 Selenium 또는 Splinter를 사용할 수도 있습니다.

``library/tests/web.py``의 테스트 코드를 실행하기 위해  ``library/tests/__init__.py`` 에 다음을 포함시킵니다.:
```python
from .web import *
```

그런 다음 테스트를 합니다.
```python
python manage.py test library
```

[POST / 리디렉션 / GET 패턴](https://en.wikipedia.org/wiki/Post/Redirect/Get)
[장고 테스트 클라이언트](https://docs.djangoproject.com/en/3.0/topics/testing/tools/#the-test-client)






## 테스트에서보다 강력한 URL
테스트에서 다음과 같이 URL을 호출할 수 있습니다.
```python
response = self.client.post("/contact/", data=data)
```

reverse 를 사용하여 더 효과적으로 테스트를 할 수 있습니다.
```python
from django.test import TestCase
from library.models import Contact
from django.urls import reverse


class TestStudentContactForm(TestCase):
    def test_can_send_message(self):
        data = {
            "first_name": "Juliana",
            "last_name": " Crain",
            "message": "Would love to talk about Philip K. Dick",
        }
        response = self.client.get(reverse("contact"))
        self.assertTemplateUsed(response, "library/contact_form.html")
        self.assertContains(response, "first_name")
        self.assertContains(response, "last_name")
        response = self.client.post(reverse("contact"), data=data)
        self.assertEqual(Contact.objects.count(), 1)
        self.assertRedirects(response, reverse("thanks"))
```

 ``urls.py``에서 URL에 name을 지정하면 경로가 아닌 이름으로 URL을 참조 할 수 있습니다. 예를 들어 library/urls.py은 다음과 같습니다.
```python
from django.urls import path
from .views import ContactCreate, thanks

urlpatterns = [
    path("contact/", ContactCreate.as_view(), name="contact"),
    path("thanks/", thanks, name="thanks"),
]
```
[구체적인 예제](https://www.valentinog.com/blog/django-widgets/)를 확인 할 수 있습니다.



## Django 모델 dictionary 제공
동일한 테스트 블록에서 모델 인스턴스를 테스트 하려는 상황이 있습니다. 이때 model_to_dict를 사용하여 모델 인스턴스에서 dictionary를 얻어 사용할 수 있습니다.
```python
from django.test import TestCase
from library.models import Contact
from django.urls import reverse
from django.forms.models import model_to_dict


class TestStudentContactForm(TestCase):
    def test_can_send_message(self):
        contact = Contact.objects.create(
            first_name="Juliana",
            last_name="Crain",
            message="Would love to talk about Philip K. Dick",
        )
        self.assertEqual(str(contact), "Juliana Crain")
        ## Convert the model to a dictionary
        data = model_to_dict(contact)
        # Post
        response = self.client.post(reverse("contact"), data=data)
        self.assertRedirects(response, reverse("thanks"))
```


## 인증 테스트
시나리오 : 인증된 사용자에게만 "/download/"페이지를 표시합니다.

뷰에 연결된 URL "/download/"가 있습니다. 인증된 사용자만 뷰에 액세스해야 합니다. 첫 번째 테스트로 익명 사용자가 ``settings.LOGIN_URL``(기본값 /accounts/login/은 ?next=/download/)에 정의된 로그인 페이지로 리디렉션되는지 확인할 수 있습니다.
```python
class TestDownloadView(TestCase):
    def test_anonymous_cannot_see_page(self):
        response = self.client.get(reverse("admin"))
        self.assertRedirects(response, "/admin/login/?next=/admin/")
```

인증된 사용자는 페이지에 액세스 할 수 있습니다. 인증된 사용자를 테스트하기 위해 테스트 블록에서 사용자를 생성하고 ``client.force_login()`` 을 사용합니다.
```python
from django.test import TestCase
from django.urls import reverse
from django.contrib.auth.models import User


class TestDownloadView(TestCase):
    def test_anonymous_cannot_see_page(self):
        response = self.client.get(reverse("download"))
        self.assertRedirects(response, "/accounts/login/?next=/download/")

    def test_authenticated_user_can_see_page(self):
        user = User.objects.create_user("Juliana," "juliana@dev.io", "some_pass")
        self.client.force_login(user=user)
        response = self.client.get(reverse("download"))
        self.assertEqual(response.status_code, 200)
        # Or assert you can see stuff on the page
```

[로그인 한 사용자에 대한 액세스 제한](https://docs.djangoproject.com/en/3.0/topics/auth/default/#limiting-access-to-logged-in-users)



## 요청 헤더 테스트
시나리오 : 요청 헤더에 따라 Django가 어떻게 동작하는지 테스트 합니다.

http-host 는 서버의 도메인 이름입니다. 

이 시나리오는 Django 미들웨어를 테스트 하거나 요청 헤더에 따라 뷰가 작동하는 방식에 대해서 테스트하는 데 유용합니다. 다음과 같은 뷰가 있습니다. 
```python
def index(request):
    if not request.META["HTTP_HOST"] == "www.my-domain.dev":
        return HttpResponse("Wrong host!")
    return HttpResponse("Correct host!")
```

HTTP_HOST의 값에 따라 두 가지 다른 응답을 반환 합니다.  get_host은 편의성을 제공합니다.:
```python
def index(request):
    if not request.get_host() == "www.my-domain.dev":
        return HttpResponse("Wrong host!")
    return HttpResponse("Correct host!")
```

첫 번째 테스트로 ``HTTP_HOST`` 지정되지 않았을 때, 응답에 "Wrong host!"가 포함되어 있는지 확인할 수 있습니다.  :
```python
from django.test import TestCase
from django.urls import reverse


class TestHostHeader(TestCase):
    def test_empty_host(self):
        response = self.client.get(reverse("index"))
        self.assertContains(response, "Wrong host!")
```

다른 테스트를 통해 "Wrong host!" 를 확인할 수 있습니다.  옵션 1 :
```python
    def test_wrong_host(self):
        response = self.client.get(reverse("index"), HTTP_HOST="www.wrong-domain.dev")
        self.assertContains(response, "Wrong host!")
```

Client 클래스를 사용하는 방식으로 인스턴스에 다음과 같이 추가 키워드 인수가 허용됩니다. 옵션 2 :
```python
    def test_wrong_host_construct(self):
        client = Client(HTTP_HOST="www.wrong-domain.dev")
        response = client.get(reverse("index"))
        self.assertContains(response, "Wrong host!")
```

여기서 우리는 커스텀 헤더로 클라이언트를 구성합니다. 둘 다 유효한 옵션 입니다. 약간의 컨텍스트에 대해 다음 세 가지 테스트가 있습니다.
```python
from django.test import TestCase, Client
from django.urls import reverse


class TestHostHeader(TestCase):
    def test_empty_host(self):
        response = self.client.get(reverse("index"))
        self.assertContains(response, "Wrong host!")

    def test_wrong_host(self):
        response = self.client.get(reverse("index"), HTTP_HOST="www.wrong-domain.dev")
        self.assertContains(response, "Wrong host!")

    def test_wrong_host_construct(self):
        client = Client(HTTP_HOST="www.wrong-domain.dev")
        response = client.get(reverse("index"))
        self.assertContains(response, "Wrong host!")
```

마지막으로 "올바른 호스트!"를 테스트 할 수 있습니다. HTTP_HOST다른 테스트 에서 예상 을 전달하여 (헤더를 전달하기 위해 자신의 스타일을 선택하십시오) :
```python
    def test_correct_host(self):
        response = self.client.get(reverse("index"), HTTP_HOST="www.my-domain.dev")
        self.assertContains(response, "Correct host!")
```
이 테스트의 일반적인 사용 사례는 여러 도메인 이름에 대한 요청을 처리하는 단일 Django 프로젝트이며 각 도메인은 하나의 Django 앱만 로드해야합니다.

[HttpRequest 메타](https://docs.djangoproject.com/en/3.0/ref/request-response/#django.http.HttpRequest.META)
[Django에서 여러 사이트 (가상 호스트)를 처리하는 방법](https://www.valentinog.com/blog/django-vhosts/)



## 장고 REST 프레임워크
Django REST 프레임워크 ( 이하 DRF )는 RESTful API 빌드를 위한 환상적인 Django 도구입니다. 프로젝트에 Django REST 프레임워크를 설치하려면 다음을 실행하십시오.

```python
pip install djangorestframework
```

``settings.py``에 DRF를 활성화하십시오 :
```python
INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "library.apps.LibraryConfig",
    # Enable Django REST
    "rest_framework",
]
```
DRF는 Django ``TestCase`` 또는 ``LiveServerTestCase`` 에 대한 맞춤형 테스트 클래스 그룹을 제공합니다. APITestCase는 DRF 엔드-포인트 테스트를위한 기본 클래스입니다.

## DRF : POST 요청 테스트
시나리오 : "api/contacts/"의 API 엔드-포인트에서 POST 요청을 승인하십시오.

API를 테스트하기 위해 ``library/tests/api.py`` 으로 새 파일을 만들 수 있습니다.
```python
from rest_framework.test import APITestCase
from library.models import Contact
from django.urls import reverse


class TestContactAPI(APITestCase):
    def test_post_request_can_create_new_entity(self):
        pass
```
이 기능을 테스트하려면 POST 요청과 함께 전송할 데이터를 만들어야 합니다. 데이터는 모델의 필드와 일치해야합니다.

DRF에서이 테스트를 통과 하려면 다음이 필요합니다.
* 모델
* 모델 시리얼 라이저
* CreateAPIView과 해당 URL

Django REST Framework 작업 지침은 여기에 요약되어 있습니다.

따라서 다음과 같은 가상의 모델이 주어집니다.
```python
class Contact(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    message = models.TextField(max_length=400)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"
```

다음과 같이 테스트 할 수 있습니다.
```python
from rest_framework.test import APITestCase
from library.models import Contact
from django.urls import reverse


class TestContactAPI(APITestCase):
    def test_post_request_can_create_new_entity(self):
        data = {
            "first_name": "Juliana",
            "last_name": " Crain",
            "message": "Would love to talk about Philip K. Dick",
        }
        self.client.post(reverse("contact_create"), data=data)
        self.assertEqual(Contact.objects.count(), 1)
```

다음과 같은 간단한 경우에는 테스트해야 할 것이 많지 않지만 나와 같은 편집증이라면 201 검사는 해를 끼치 지 않습니다.
```python
from rest_framework.test import APITestCase
from rest_framework import status
from library.models import Contact
from django.urls import reverse


class TestContactAPI(APITestCase):
    def test_post_request_can_create_new_entity(self):
        data = {
            "first_name": "Juliana",
            "last_name": " Crain",
            "message": "Would love to talk about Philip K. Dick",
        }
        response = self.client.post(reverse("contact_create"), data=data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Contact.objects.count(), 1)
```

다음에서 테스트 가져 오기 library/tests/api.py(및 이전에 작성한 테스트)를 실행하려면 다음을 수행하십시오 library/tests/__init__.py.
```python
from .models import *
from .web import *
from .api import *
```

그런 다음 API 테스트 만 실행하십시오.
```python
python manage.py test library.tests.api
```

## DRF : 인증 테스트
시나리오 : 인증 된 사용자에 대해서만 "api / secret /"의 API 엔드 포인트에서 GET 요청을 승인하십시오.

DRF ListView에 연결된 "api / secret /"엔드 포인트가 있습니다. 인증 된 사용자 만이보기에 액세스해야합니다 . 첫 번째 테스트로 익명의 사용자가 403이 금지 된 것을 확인할 수 있습니다.
```python
from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse


class TestContactAPI(APITestCase):
    def test_anonymous_cannot_see_contacts(self):
        response = self.client.get(reverse("contact_view"))
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
```

테스트 통과를위한 최소한의 관점은 다음과 같습니다.
```python
from rest_framework.generics import ListAPIView
from library.serializers import ContactSerializer
from library.models import Contact
from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import IsAuthenticated


class ContactViewAPI(ListAPIView):
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = ContactSerializer
    queryset = Contact.objects.all()
```
이보기는 가상 JavaScript 프론트 엔드와 동일한 컨텍스트에서 API를 사용하여 세션 인증을 가정합니다. 분리 된 아키텍처에서는 토큰 기반 인증을 사용합니다.

인증 된 사용자는 대신 페이지에 액세스 할 수 있습니다 . 인증 된 사용자를 테스트하기 위해 테스트 블록에서 사용자를 생성하고 client.force_login()이를 통과 시킵니다 .
```python
from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from django.contrib.auth.models import User


class TestContactAPI(APITestCase):
    def test_anonymous_cannot_see_contacts(self):
        response = self.client.get(reverse("contact_view"))
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_authenticated_user_can_see_contacts(self):
        user = User.objects.create_user("Juliana," "juliana@dev.io", "some_pass")
        self.client.force_login(user=user)
        response = self.client.get(reverse("contact_view"))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # Or assert the JSON response
```
from django.contrib.auth.models import User존재하는 경우 사용자 지정 Django 사용자와 교체해야합니다 .

[DRF에서 인증 체계 설정](https://www.django-rest-framework.org/api-guide/authentication/#setting-the-authentication-scheme)


[Writing and running tests](https://docs.djangoproject.com/en/2.1/topics/testing/overview/) (Django docs)
[Writing your first Django app, part 5 > Introducing automated testing](https://docs.djangoproject.com/en/2.1/intro/tutorial05/) (Django docs)
[Testing tools reference](https://docs.djangoproject.com/en/2.1/topics/testing/tools/) (Django docs)
[Advanced testing topics](https://docs.djangoproject.com/en/2.1/topics/testing/advanced/) (Django docs)
[A Guide to Testing in Django](http://toastdriven.com/blog/2011/apr/10/guide-to-testing-in-django/) (Toast Driven Blog, 2011)
[Workshop: Test-Driven Web Development with Django](http://test-driven-django-development.readthedocs.io/en/latest/index.html) (San Diego Python, 2014)
[Testing in Django (Part 1) - Best Practices and Examples](https://realpython.com/blog/python/testing-in-django-part-1-best-practices-and-examples/) (RealPython, 2013)