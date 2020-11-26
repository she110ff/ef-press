# Customizing authentication in Django

Django와 함께 제공되는 인증은 대부분의 일반적인 경우에 충분하지만 기본 기본값으로는 ​​충족되지 않을 수 있습니다. 프로젝트에서 인증을 사용자 지정하려면 제공된 시스템의 어떤 지점이 확장 가능하거나 교체 가능한지 이해해야합니다. 이 문서는 인증 시스템을 사용자 정의 할 수있는 방법에 대한 세부 정보를 제공합니다.

인증 백엔드 는 사용자 모델과 함께 저장된 사용자 이름과 비밀번호를 Django의 기본값과 다른 서비스에 대해 인증해야 할 때 확장 가능한 시스템을 제공합니다.

Django의 인증 시스템을 통해 확인할 수있는 사용자 지정 권한 을 모델에 부여 할 수 있습니다.

당신은 할 수 확장 기본 User모델을, 또는 대체 완전히 사용자 정의 모델을

## 기타 인증 소스

다른 인증 소스, 즉 사용자 이름 및 비밀번호 또는 인증 방법의 또 다른 소스에 연결해야하는 경우가있을 수 있습니다.

예를 들어 회사에 모든 직원의 사용자 이름과 비밀번호를 저장하는 LDAP 설정이 이미있을 수 있습니다. 사용자가 LDAP 및 Django 기반 애플리케이션에 별도의 계정을 가지고 있다면 네트워크 관리자와 사용자 모두에게 번거로울 것입니다.

따라서 이와 같은 상황을 처리하기 위해 Django 인증 시스템을 사용하면 다른 인증 소스를 연결할 수 있습니다. Django의 기본 데이터베이스 기반 체계를 재정의하거나 다른 시스템과 함께 기본 시스템을 사용할 수 있습니다.

Django에 포함 된 인증 백엔드에 대한 정보 는 인증 백엔드 참조 를 참조 하십시오 .

### 인증 백엔드 지정

이면에서 Django는 인증을 확인하는 "인증 백엔드"목록을 유지합니다. 누군가 전화를 걸면 django.contrib.auth.authenticate()– How to log in user in – Django는 모든 인증 백엔드에서 인증을 시도합니다. 첫 번째 인증 방법이 실패하면 Django는 모든 백엔드가 시도 될 때까지 두 번째 인증 방법을 시도합니다.

사용할 인증 백엔드 목록은 AUTHENTICATION_BACKENDS설정에 지정됩니다 . 인증 방법을 알고있는 Python 클래스를 가리키는 Python 경로 이름 목록이어야합니다. 이러한 클래스는 Python 경로의 어느 위치 에나있을 수 있습니다.

기본적으로 다음 AUTHENTICATION_BACKENDS으로 설정됩니다.

```python
['django.contrib.auth.backends.ModelBackend']
```

Django 사용자 데이터베이스를 확인하고 기본 제공 권한을 쿼리하는 기본 인증 백엔드입니다. 속도 제한 메커니즘을 통해 무차별 대입 공격에 대한 보호를 제공하지 않습니다. 사용자 지정 인증 백엔드에서 자체 속도 제한 메커니즘을 구현하거나 대부분의 웹 서버에서 제공하는 메커니즘을 사용할 수 있습니다.

순서가 AUTHENTICATION_BACKENDS중요하므로 동일한 사용자 이름과 비밀번호가 여러 백엔드에서 유효하면 Django는 첫 번째 긍정적 인 일치에서 처리를 중지합니다.

백엔드에서 PermissionDenied 예외 가 발생하면 인증이 즉시 실패합니다. Django는 뒤 따르는 백엔드를 확인하지 않습니다.

### 인증 백엔드 작성

인증 백엔드는 두 가지 필수 메서드 인 get_user(user_id)및 및 선택적 권한 관련 권한 부여 방법 집합 을 구현하는 클래스입니다 .authenticate(request, \*\*credentials)

이 get_user메서드는 user_id사용자 이름, 데이터베이스 ID 등이 될 수 있지만 사용자 개체의 기본 키 여야합니다 None. 사용자 개체 또는를 반환합니다 .

이 authenticate메서드는 request인수와 자격 증명을 키워드 인수로 사용합니다. 대부분의 경우 다음과 같이 표시됩니다.

```python
from django.contrib.auth.backends import BaseBackend

class MyBackend(BaseBackend):
    def authenticate(self, request, username=None, password=None):
        # Check the username/password and return a user.
        ...
```

그러나 다음과 같이 토큰을 인증 할 수도 있습니다.

```python
from django.contrib.auth.backends import BaseBackend

class MyBackend(BaseBackend):
    def authenticate(self, request, token=None):
        # Check the token and return a user.
        ...
```

어느 쪽이든 authenticate()가져 오는 자격 증명을 확인하고 자격 증명이 유효한 경우 해당 자격 증명과 일치하는 사용자 개체를 반환해야합니다. 유효하지 않은 경우를 반환해야합니다 None.

request이며 제공되지 않은 경우 일 HttpRequest수 있습니다 (백엔드로 전달).Noneauthenticate()

Django 관리자는 Django User 개체 와 밀접하게 연결되어 있습니다. 이를 처리하는 가장 좋은 방법은 User 백엔드 (예 : LDAP 디렉토리, 외부 SQL 데이터베이스 등)에 존재하는 각 사용자에 대해 Django 객체 를 만드는 것입니다.이 작업을 미리 수행하는 스크립트를 작성하거나 귀하의 authenticate방법은 사용자가 처음 로그인 할 때이를 수행 할 수 있습니다.

다음은 settings.py파일에 정의 된 사용자 이름 및 비밀번호 변수에 대해 인증하고 사용자 User 가 처음 인증 할 때 Django 객체를 생성하는 백엔드의 예입니다 .

```python
from django.conf import settings
from django.contrib.auth.backends import BaseBackend
from django.contrib.auth.hashers import check_password
from django.contrib.auth.models import User

class SettingsBackend(BaseBackend):
    """
    Authenticate against the settings ADMIN_LOGIN and ADMIN_PASSWORD.

    Use the login name and a hash of the password. For example:

    ADMIN_LOGIN = 'admin'
    ADMIN_PASSWORD = 'pbkdf2_sha256$30000$Vo0VlMnkR4Bk$qEvtdyZRWTcOsCnI/oQ7fVOu1XAURIZYoOZ3iq8Dr4M='
    """

    def authenticate(self, request, username=None, password=None):
        login_valid = (settings.ADMIN_LOGIN == username)
        pwd_valid = check_password(password, settings.ADMIN_PASSWORD)
        if login_valid and pwd_valid:
            try:
                user = User.objects.get(username=username)
            except User.DoesNotExist:
                # Create a new user. There's no need to set a password
                # because only the password from settings.py is checked.
                user = User(username=username)
                user.is_staff = True
                user.is_superuser = True
                user.save()
            return user
        return None

    def get_user(self, user_id):
        try:
            return User.objects.get(pk=user_id)
        except User.DoesNotExist:
            return None
```

### 커스텀 백엔드에서 승인 처리

커스텀 인증 백엔드는 자체 권한을 제공 할 수 있습니다.

사용자 모델과는 관리자 권한 조회 기능을 (위임한다 get_user_permissions(), get_group_permissions(), get_all_permissions(), has_perm(), has_module_perms(), 및 with_perm()모든 인증 백엔드) 구현이 함수가.

사용자에게 부여 된 권한은 모든 백엔드에서 반환 된 모든 권한의 상위 집합이됩니다. 즉, Django는 하나의 백엔드가 부여하는 권한을 사용자에게 부여합니다.

백엔드가 또는 에서 PermissionDenied 예외를 발생 시키면 승인이 즉시 실패하고 Django는 뒤 따르는 백엔드를 확인하지 않습니다.has_perm()has_module_perms()

백엔드는 다음과 같이 매직 관리자에 대한 권한을 구현할 수 있습니다.

```python
from django.contrib.auth.backends import BaseBackend

class MagicAdminBackend(BaseBackend):
    def has_perm(self, user_obj, perm, obj=None):
        return user_obj.username == settings.ADMIN_LOGIN
```

이렇게하면 위의 예에서 액세스 권한이 부여 된 사용자에게 전체 권한이 부여됩니다. django.contrib.auth.models.User백엔드 인증 함수 는 관련 함수에 제공된 동일한 인수 외에도 모두 익명 사용자 일 수있는 사용자 개체를 인수로받습니다.

전체 인증 구현은 django / contrib / auth / backends.py 의 ModelBackend클래스에서 찾을 수 있습니다.이 클래스 는 기본 백엔드이며 대부분의 경우 테이블을 쿼리합니다 .auth_permission

#### 익명 사용자에 대한 권한

익명 사용자는 인증되지 않은 사용자입니다. 즉, 유효한 인증 세부 정보를 제공하지 않았습니다. 그러나 그렇다고해서 반드시 그들이 아무것도 할 권한이 없다는 것을 의미하지는 않습니다. 가장 기본적인 수준에서 대부분의 웹 사이트는 익명 사용자가 사이트의 대부분을 탐색 할 수 있도록 권한을 부여하며 많은 웹 사이트에서 익명의 댓글 게시 등을 허용합니다.

Django의 권한 프레임 워크에는 익명 사용자에 대한 권한을 저장할 수있는 공간이 없습니다. 그러나 인증 백엔드에 전달 된 사용자 객체는 django.contrib.auth.models.AnonymousUser객체 일 수 있으므로 백엔드가 익명 사용자에 대한 사용자 지정 권한 부여 동작을 지정할 수 있습니다. 이는 예를 들어 익명 액세스를 제어하기 위해 설정이 필요하지 않고 모든 인증 질문을 인증 백엔드에 위임 할 수있는 재사용 가능한 앱 작성자에게 특히 유용합니다.

#### 비활성 사용자에 대한 권한

비활성 사용자는 is_active필드가로 설정된 사용자입니다 False. ModelBackend및 RemoteUserBackend인증 백엔드는 인증에서 이러한 사용자를 금지합니다. 사용자 지정 사용자 모델에 is_active필드 가없는 경우 모든 사용자가 인증 할 수 있습니다.

AllowAllUsersModelBackend 또는 AllowAllUsersRemoteUserBackend비활성 사용자의 인증을 허용하려는 경우 사용할 수 있습니다 .

권한 시스템에서 익명 사용자에 대한 지원은 익명 사용자가 작업을 수행 할 권한이있는 반면 비활성 인증 사용자는 그렇지 않은 시나리오를 허용합니다.

is_active자신의 백엔드 권한 방법에서 사용자 의 속성 을 테스트하는 것을 잊지 마십시오 .

#### 개체 권한 처리

Django의 권한 프레임 워크에는 객체 권한에 대한 기반이 있지만 코어에 구현 된 것은 없습니다. 즉, 개체 권한을 False확인하면 수행 된 확인에 따라 항상 또는 빈 목록이 반환됩니다 . 인증 백엔드는 키워드 매개 변수 obj와 user_obj각 개체 관련 권한 부여 방법을 수신하고 적절하게 개체 수준 권한을 반환 할 수 있습니다.

## 사용자 지정 권한

주어진 모델 개체에 대한 사용자 지정 권한을 만들려면 permissions 모델 메타 속성을 사용 합니다 .

이 예제 Task모델은 두 가지 사용자 지정 권한, 즉 사용자가 Task애플리케이션에 특정한 인스턴스로 할 수있는 작업과 할 수없는 작업을 만듭니다 .

```python
class Task(models.Model):
    ...
    class Meta:
        permissions = [
            ("change_task_status", "Can change the status of tasks"),
            ("close_task", "Can remove a task by setting its status as closed"),
        ]
```

이것이 수행하는 유일한 일은 실행할 때 추가 권한 을 생성하는 것입니다 (권한을 생성하는 기능이 신호에 연결됨 ). 코드는 사용자가 애플리케이션에서 제공하는 기능에 액세스하려고 할 때 이러한 권한의 값을 확인하는 역할을합니다 (작업 상태 변경 또는 작업 종료). 위의 예를 계속하면 다음은 사용자가 작업을 닫을 수 있는지 확인합니다. :manage.py migratepost_migrate

```python
user.has_perm('app.close_task')
```

## 기존 User모델 확장

User자신의 모델을 대체하지 않고 기본 모델 을 확장하는 두 가지 방법이 있습니다 . 필요한 변경 사항이 순전히 동작이고 데이터베이스에 저장된 내용을 변경할 필요가없는 경우 .NET Framework를 기반으로 프록시 모델을 만들 수 있습니다 User. 이를 통해 기본 주문, 사용자 지정 관리자 또는 사용자 지정 모델 방법을 포함하여 프록시 모델에서 제공하는 모든 기능을 사용할 수 있습니다.

관련 정보를 저장하려는 경우 추가 정보를위한 필드가 포함 된 모델에를 User사용할 수 있습니다 OneToOneField. 이 일대일 모델은 사이트 사용자에 대한 비인증 관련 정보를 저장할 수 있으므로 종종 프로필 모델이라고합니다. 예를 들어 Employee 모델을 만들 수 있습니다.

```python
from django.contrib.auth.models import User

class Employee(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    department = models.CharField(max_length=100)
```

User 모델과 Employee 모델을 모두 가지고있는 기존 Employee Fred Smith를 가정하면 Django의 표준 관련 모델 규칙을 사용하여 관련 정보에 액세스 할 수 있습니다.

```python
>>> u = User.objects.get(username='fsmith')
>>> freds_department = u.employee.department
```

관리자의 사용자 페이지에 프로필 모델의 필드를 추가하려면 앱에서를 정의하고 InlineModelAdmin(이 예에서는를 사용합니다 StackedInline) 클래스에 등록 된 클래스에 admin.py추가합니다 .UserAdminUser

```python
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import User

from my_user_profile_app.models import Employee

# Define an inline admin descriptor for Employee model
# which acts a bit like a singleton
class EmployeeInline(admin.StackedInline):
    model = Employee
    can_delete = False
    verbose_name_plural = 'employee'

# Define a new User admin
class UserAdmin(BaseUserAdmin):
    inlines = (EmployeeInline,)

# Re-register UserAdmin
admin.site.unregister(User)
admin.site.register(User, UserAdmin)
```

이러한 프로필 모델은 어떤 식 으로든 특별하지 않습니다. 사용자 모델과 일대일 링크가있는 Django 모델 일뿐입니다. 따라서 사용자가 생성 될 때 자동으로 생성되지는 않지만을 django.db.models.signals.post_save사용하여 관련 모델을 적절하게 생성하거나 업데이트 할 수 있습니다.

관련 모델을 사용하면 관련 데이터를 검색하기위한 추가 쿼리 또는 조인이 발생합니다. 필요에 따라 관련 필드를 포함하는 사용자 지정 사용자 모델이 더 나은 옵션 일 수 있지만 프로젝트의 앱 내 기본 사용자 모델에 대한 기존 관계가 추가 데이터베이스로드를 정당화 할 수 있습니다.

## 커스텀 User모델 대체

어떤 종류의 프로젝트에는 Django의 내장 User모델이 항상 적절하지 않은 인증 요구 사항이있을 수 있습니다 . 예를 들어 일부 사이트에서는 사용자 이름 대신 이메일 주소를 식별 토큰으로 사용하는 것이 더 합리적입니다.

Django를 사용하면 AUTH_USER_MODEL커스텀 모델을 참조하는 설정 값을 제공하여 기본 사용자 모델을 재정의 할 수 있습니다 .

```python
AUTH_USER_MODEL = 'myapp.MyUser'
```

이 점으로 된 쌍은 Django 앱의 이름 (에 있어야 함 INSTALLED_APPS)과 사용자 모델로 사용하려는 Django 모델의 이름을 설명합니다.

### 프로젝트를 시작할 때 커스텀 사용자 모델 사용

새 프로젝트를 시작하는 경우 기본 User모델이 충분 하더라도 사용자 지정 사용자 모델을 설정하는 것이 좋습니다 . 이 모델은 기본 사용자 모델과 동일하게 작동하지만 필요한 경우 나중에 사용자 정의 할 수 있습니다

```python
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    pass
```

AUTH_USER_MODEL그것을 가리키는 것을 잊지 마십시오 . 마이그레이션을 생성하거나 처음으로 실행하기 전에이 작업을 수행하십시오 .manage.py migrate

또한 앱의 모델을 등록하십시오 admin.py.

```python
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User

admin.site.register(User, UserAdmin)
```

### 프로젝트 중간에 커스텀 사용자 모델로 변경

AUTH_USER_MODEL예를 들어, 데이터베이스 테이블을 만든 후 변경 하는 것은 외래 키와 다 대다 관계에 영향을 미치기 때문에 훨씬 더 어렵습니다.

이 변경은 자동으로 수행 될 수 없으며 스키마를 수동으로 수정하고 이전 사용자 테이블에서 데이터를 이동하고 일부 마이그레이션을 수동으로 다시 적용해야합니다. 단계 개요는 # 25313 을 참조 하세요.

스왑 가능한 모델에 대한 Django의 동적 종속성 기능의 제한으로 인해에서 참조하는 모델 AUTH_USER_MODEL은 앱의 첫 번째 마이그레이션에서 생성되어야합니다 (일반적으로라고 함 0001_initial). 그렇지 않으면 종속성 문제가 발생합니다.

또한 CircularDependencyErrorDjango가 동적 종속성으로 인해 종속성 루프를 자동으로 중단 할 수 없기 때문에 마이그레이션을 실행할 때 a 가 발생할 수 있습니다 . 이 오류가 표시되면 사용자 모델에 종속 된 모델을 두 번째 마이그레이션으로 이동하여 루프를 중단해야합니다. ( ForeignKey서로 a가있는 두 개의 일반 모델을 만들고 makemigrations일반적으로 수행되는 방식을 보려면 순환 종속성을 어떻게 해결하는지 확인할 수 있습니다.)

### 재사용 가능한 앱 및 AUTH_USER_MODEL

재사용 가능한 앱은 맞춤 사용자 모델을 구현해서는 안됩니다. 프로젝트는 많은 앱을 사용할 수 있으며 사용자 지정 사용자 모델을 구현 한 두 개의 재사용 가능한 앱은 함께 사용할 수 없습니다. 앱에 사용자 별 정보를 저장해야하는 경우 아래 설명 된대로 ForeignKey또는 OneToOneFieldto settings.AUTH_USER_MODEL를 사용하십시오

### User모델 참조

User직접 참조하는 경우 (예 : 외래 키에서 참조) AUTH_USER_MODEL설정이 다른 사용자 모델로 변경된 프로젝트에서 코드가 작동하지 않습니다 .

get_user_model() ¶
대신에 참조하는 User직접, 당신은 사용하여 사용자 모델을 참조해야합니다 django.contrib.auth.get_user_model(). 이 메서드는 현재 활성 사용자 모델 (지정된 경우 사용자 지정 사용자 모델 또는 User그렇지 않은 경우)을 반환합니다.

사용자 모델에 대한 외래 키 또는 다 대다 관계를 정의 할 때 AUTH_USER_MODEL 설정을 사용하여 사용자 지정 모델을 지정해야 합니다. 예를 들면 :

```python
from django.conf import settings
from django.db import models

class Article(models.Model):
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
    )
```

사용자 모델에서 보낸 신호에 연결할 때 설정을 사용하여 사용자 지정 모델을 지정해야 AUTH_USER_MODEL합니다. 예를 들면 :

```python
from django.conf import settings
from django.db.models.signals import post_save

def post_save_receiver(sender, instance, created, **kwargs):
    pass

post_save.connect(post_save_receiver, sender=settings.AUTH_USER_MODEL)
```

일반적으로 AUTH_USER_MODEL가져 오기시 실행되는 코드 의 설정 을 사용하여 사용자 모델을 참조하는 것이 가장 쉽지만 , get_user_model()Django가 모델을 가져 오는 동안 호출 할 수도 있으므로 .models.ForeignKey(get_user_model(), ...)

@override_settings(AUTH_USER_MODEL=...)예를 들어 앱을 여러 사용자 모델로 테스트 get_user_model()하고 모듈 수준 변수 의 결과를 캐시하는 경우 캐시 setting_changed를 지우려면 신호를 수신해야 할 수 있습니다 . 예를 들면 :

```python
from django.apps import apps
from django.contrib.auth import get_user_model
from django.core.signals import setting_changed
from django.dispatch import receiver

@receiver(setting_changed)
def user_model_swapped(**kwargs):
    if kwargs['setting'] == 'AUTH_USER_MODEL':
        apps.clear_cache()
        from myapp import some_module
        some_module.UserModel = get_user_model()
```

### 사용자 지정 사용자 모델 지정

사용자 정의 사용자 모델로 프로젝트를 시작할 때 이것이 프로젝트에 적합한 선택인지 고려하기 위해 중단하십시오.

모든 사용자 관련 정보를 하나의 모델에 보관하면 관련 모델을 검색하기 위해 추가로 또는 더 복잡한 데이터베이스 쿼리가 필요하지 않습니다. 반면에 사용자 지정 사용자 모델과 관련된 모델에 앱별 사용자 정보를 저장하는 것이 더 적합 할 수 있습니다. 이를 통해 각 앱은 잠재적으로 다른 앱과 충돌하거나 가정을 위반하지 않고 자체 사용자 데이터 요구 사항을 지정할 수 있습니다. 또한 사용자 모델을 가능한 한 단순하게 유지하고 인증에 중점을두고 Django가 사용자 지정 사용자 모델이 충족 할 것으로 예상하는 최소 요구 사항을 따릅니다.

기본 인증 백엔드를 사용하는 경우 모델에는 식별 목적으로 사용할 수있는 단일 고유 필드가 있어야합니다. 사용자 이름, 이메일 주소 또는 기타 고유 한 속성이 될 수 있습니다. 고유하지 않은 사용자 이름 필드는이를 지원할 수있는 사용자 지정 인증 백엔드를 사용하는 경우 허용됩니다.

호환되는 사용자 지정 사용자 모델을 생성하는 가장 쉬운 방법은 AbstractBaseUser. AbstractBaseUser해시 된 암호 및 토큰 화 된 암호 재설정을 포함하여 사용자 모델의 핵심 구현을 제공합니다. 그런 다음 몇 가지 주요 구현 세부 정보를 제공해야합니다.

클래스 models.CustomUser¶
USERNAME_FIELD¶
고유 식별자로 사용되는 사용자 모델의 필드 이름을 설명하는 문자열입니다. 일반적으로 일종의 사용자 이름이지만 이메일 주소 또는 기타 고유 식별자 일 수도 있습니다. 고유 하지 않은 사용자 이름을 지원할 수있는 사용자 정의 인증 백엔드를 사용하지 않는 한 필드 는 고유 해야 합니다 (즉, unique=True정의에 설정되어 있음).

다음 예에서 필드 identifier는 식별 필드로 사용됩니다.

```python
class MyUser(AbstractBaseUser):
    identifier = models.CharField(max_length=40, unique=True)
    ...
    USERNAME_FIELD = 'identifier'
```

EMAIL_FIELD¶
User모델 의 이메일 필드 이름을 설명하는 문자열 입니다. 이 값은에서 반환됩니다 get_email_field_name().

REQUIRED_FIELDS¶
createsuperuser관리 명령을 통해 사용자를 생성 할 때 프롬프트 될 필드 이름 목록입니다 . 사용자에게 이러한 각 필드에 대한 값을 제공하라는 메시지가 표시됩니다. 그것은되는 모든 필드가 포함되어야 blank한다 False미정 또는 당신이 사용자가 대화 형으로 생성 될 때를 묻는 메시지가 원하는 추가 필드를 포함 할 수있다. REQUIRED_FIELDS관리자에서 사용자를 만드는 것과 같이 Django의 다른 부분에는 영향을 미치지 않습니다.

Django 3.0의 새로운 기능 :
REQUIRED_FIELDS이제 ManyToManyField모델을 통해 사용자 지정없이 s를 지원합니다 . createsuperuser프롬프트 중에는 모델 인스턴스를 전달할 방법이 없으므로 사용자가 모델이 관련된 클래스의 기존 인스턴스 ID를 입력해야합니다.

예를 들어 다음은 생년월일과 키라는 두 가지 필수 필드를 정의하는 사용자 모델에 대한 부분 정의입니다.

```python
class MyUser(AbstractBaseUser):
    ...
    date_of_birth = models.DateField()
    height = models.FloatField()
    ...
    REQUIRED_FIELDS = ['date_of_birth', 'height']
```

is_active¶
사용자가 "활성"으로 간주되는지 여부를 나타내는 부울 속성입니다. 이 속성은 AbstractBaseUser기본값 인 에 속성으로 제공됩니다 True. 구현 방법은 선택한 인증 백엔드의 세부 정보에 따라 다릅니다. 자세한 내용은의 설명서를 참조 하십시오.is_active attribute on the built-in user model

get_full_name() ¶
선택 과목. 전체 이름과 같은 사용자의 더 긴 형식 식별자입니다. 구현 된 경우에서 개체 기록의 사용자 이름과 함께 나타납니다 django.contrib.admin.

get_short_name() ¶
선택 과목. 이름과 같은 사용자의 짧은 비공식 식별자입니다. 구현 된 경우, 헤더에있는 사용자에 대한 인사말의 사용자 이름을 대체합니다 django.contrib.admin.

가져 오기 AbstractBaseUser

AbstractBaseUser과 BaseUserManager에서 가져올 수 있습니다 django.contrib.auth.base_user그들이 포함하지 않고 수입 할 수 있도록 django.contrib.auth에서 INSTALLED_APPS.

의 모든 하위 클래스에서 다음 속성 및 메서드를 사용할 수 있습니다 AbstractBaseUser.

클래스 models.AbstractBaseUser¶
get_username() ¶
에서 지정한 필드의 값을 반환합니다 USERNAME_FIELD.

clean() ¶
를 호출하여 사용자 이름을 정규화합니다 normalize_username(). 이 메서드를 재정의하는 경우 super()정규화를 유지 하기 위해 호출 해야합니다.

classmethodget_email_field_name () ¶
EMAIL_FIELD속성으로 지정된 이메일 필드의 이름을 리턴 합니다. 지정되지 않은 'email'경우 기본값 EMAIL_FIELD입니다.

classmethodnormalize_username ( 사용자 이름 ) ¶
유니 코드 코드 포인트가 다른 시각적으로 동일한 문자가 동일한 것으로 간주되도록 NFKC 유니 코드 정규화를 사용자 이름에 적용합니다.

is_authenticated¶
읽기 전용 항상 속성 True(반대 AnonymousUser.is_authenticated하는 항상이다 False). 사용자가 인증되었는지 확인하는 방법입니다. 이것은 권한을 의미하지 않으며 사용자가 활성 상태인지 또는 유효한 세션이 있는지 확인하지 않습니다. 일반적으로이 속성을 확인 request.user하여 AuthenticationMiddleware (현재 로그인 한 사용자를 나타냄)에 의해 채워 졌는지 여부를 확인하지만 이 속성이 True모든 User인스턴스 에 해당된다는 것을 알아야 합니다.

is_anonymous¶
항상 인 읽기 전용 속성입니다 False. 이 차별화의 방법 User과 AnonymousUser 객체. 일반적 is_authenticated으로이 속성을 사용 하는 것이 좋습니다.

set_password( raw_password ) ¶
사용자의 암호를 지정된 원시 문자열로 설정하여 암호 해싱을 처리합니다. AbstractBaseUser개체를 저장하지 않습니다 .

raw_password가 None이면 암호 set_unusable_password() 는 사용 된 것처럼 사용할 수없는 암호로 설정 됩니다.

check_password( raw_password ) ¶
True주어진 원시 문자열이 사용자의 올바른 암호인지 여부를 반환 합니다. (비교할 때 암호 해싱을 처리합니다.)

set_unusable_password() ¶
사용자를 비밀번호가 설정되지 않은 것으로 표시합니다. 이것은 암호에 빈 문자열이있는 것과 다릅니다. check_password()이 사용자는 반환하지 않습니다 True. AbstractBaseUser개체를 저장하지 않습니다 .

LDAP 디렉토리와 같은 기존 외부 소스에 대해 애플리케이션 인증이 발생하는 경우이 정보가 필요할 수 있습니다.

has_usable_password() ¶
이 사용자에 대해이 호출되었는지 False여부 set_unusable_password()를 반환 합니다 .

get_session_auth_hash() ¶
암호 필드의 HMAC를 반환합니다. 암호 변경시 세션 무효화에 사용됩니다 .

AbstractUser하위 클래스 AbstractBaseUser:

클래스 models.AbstractUser¶
clean() ¶
를 호출하여 이메일을 정규화합니다 BaseUserManager.normalize_email(). 이 메서드를 재정의하는 경우 super()정규화를 유지 하기 위해 호출 해야합니다.

### 사용자 지정 사용자 모델을위한 관리자 작성

또한 사용자 모델에 대한 사용자 지정 관리자를 정의해야합니다. 사용자 모델을 정의는 경우 username, email, is_staff, is_active, is_superuser, last_login, 및 date_joined필드 장고의 기본 사용자와 같은, 당신은 장고를 설치할 수 있습니다 UserManager; 그러나 사용자 모델이 다른 필드를 정의 BaseUserManager 하는 경우 두 가지 추가 메서드를 제공 하는 확장 된 사용자 지정 관리자를 정의해야 합니다.

```python

```

```python

```

```python

```

### Django의 기본값 확장 User

```python

```

```python

```

```python

```

### 맞춤 사용자 및 기본 제공 인증 양식

```python

```

```python

```

```python

```

### 맞춤 사용자 및 django.contrib.admin

```python

```

```python

```

```python

```

### 사용자 지정 사용자 및 권한

```python

```

```python

```

```python

```

### 사용자 정의 사용자 및 프록시 모델

```python

```

```python

```

```python

```

### 전체 예

```python

```

### 전체 예

```python

```

### 전체 예

```python

```
