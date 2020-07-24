# 기초-인증과 권한
현재 API에는 코드 스니펫을 편집하거나 삭제할 수있는 사람에 대한 제한이 없습니다. 다음과 같이 작동하기 원합니다.

* 코드 스니펫은 항상 제작자와 연결되어 있습니다.
* 인증된 사용자만 스니펫을 만들 수 있습니다.
* 스니펫을 만든 사람만 업데이트 하거나 삭제할 수 있습니다.
* 인증되지 않은 요청에 전체 읽기 전용 권한이 있어야 합니다.

## 모델에 정보 추가
Snippet 모델 클래스에 필드를 추가하겠습니다. 이러한 필드 중 하나는 코드 스니펫을 만든 사용자를 나타내는 데 사용됩니다. 다른 필드는 highlight 코드의 HTML 표현을 저장하는 데 사용됩니다.

``models.py``의 Snippet 모델에 다음 두 필드를 추가하십시오.
```python
owner = models.ForeignKey('auth.User', related_name='snippets', on_delete=models.CASCADE)
highlighted = models.TextField()
```
또한 모델이 저장 될 때 pygments 코드 highlight 라이브러리를 사용하여 강조 표시된 필드를 채우도록 해야합니다.:
```python
from pygments.lexers import get_lexer_by_name
from pygments.formatters.html import HtmlFormatter
from pygments import highlight
```

이제 모델 클래스에 ``.save()``메소드를 추가합니다 :
```python
def save(self, *args, **kwargs):
    """
    Use the `pygments` library to create a highlighted HTML
    representation of the code snippet.
    """
    lexer = get_lexer_by_name(self.language)
    linenos = 'table' if self.linenos else False
    options = {'title': self.title} if self.title else {}
    formatter = HtmlFormatter(style=self.style, linenos=linenos,
                              full=True, **options)
    self.highlighted = highlight(self.code, lexer, formatter)
    super(Snippet, self).save(*args, **kwargs)
```

Model이 변경되면 데이터베이스 테이블을 업데이트 해야합니다. 일반적으로 이를 수행하기 위해 데이터베이스 마이그레이션을 작성하지만 이 학습서의 목적을 위해 데이터베이스를 삭제하고 다시 시작하겠습니다.
```python
rm -f db.sqlite3
rm -r snippets/migrations
python manage.py makemigrations snippets
python manage.py migrate
```

``createsuperuser`` 명령을 사용하여 API 테스트에 사용할 다른 사용자를 빠르게 만들 수도 있습니다.
```python
python manage.py createsuperuser
```


## 사용자 모델에 대한 엔드 포인트 추가
사용자 API에 추가 하겠습니다. 다음과 같이 ``serializers.py`` 에 새로운 UserSerializer 를 추가합니다. :
```python
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    snippets = serializers.PrimaryKeyRelatedField(many=True, queryset=Snippet.objects.all())

    class Meta:
        model = User
        fields = ['id', 'username', 'snippets']
```

사용자 모델에서 'snippets'의 relationship 은 역순이므로 ModelSerializer 클래스를 사용할 때는 기본적으로 포함되지 않기 때문에 명시적으로 필드를 추가했습니다.

views.py 에 몇 가지 view를 추가 할 것 입니다. user의 표현을 위해서는 읽기 전용에 제네릭 클래스 기반의 ListAPIView 및 RetrieveAPIView  뷰를 만듭니다.    
```python
from django.contrib.auth.models import User


class UserList(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserDetail(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
```

UserSerializer 클래스도 import 합니다
```python
from snippets.serializers import UserSerializer
```

마지막으로 URL conf 에서 참조하기 위해 해당 뷰를 API에 추가 해야합니다. snippets/urls.py 의 패턴에 다음을 추가 하겠습니다.
```python
path('users/', views.UserList.as_view()),
path('users/<int:pk>/', views.UserDetail.as_view()),
```


## 스니펫을 사용자에 연결
지금 코드 스니펫을 만드는 경우 스니펫을 만든 사용자를 스니펫 인스턴스와 연결할 방법이 없습니다. 사용자는 직렬화된 표현의 일부로 전송되지 않지만 들어오는 request의 속성이기는 합니다.

.perform_create() 메소드는 오버라이딩하여 스니펫 view에서 인스턴스가 저장되는 관리 방식을 수정하여 들어오는 요청(request) 또는 요청 된 URL에 포함된 정보를 처리할 수 ​​있도록 하는 것입니다.

SnippetList 뷰 클래스에 다음과 같은 메소드를 추가합니다.:

```python   
def perform_create(self, serializer):
    serializer.save(owner=self.request.user)
```
serializer의 create() 메소드는 이제 request의 검증된 데이터(validated_date)와 함께 'owner' 추가 필드를 전달 받습니다.


## serializer의 업데이트
스니펫이 생성한 사용자와 연결되었으므로 이를 SnippetSerializer 반영하도록 수정 하겠습니다. 다음 필드를 serializer 정의에 추가 하겠습니다.

```python
owner = serializers.ReadOnlyField(source='owner.username')
```
참고 : 'owner'를 내부 Meta클래스의 필드 목록에도 추가 해야합니다 .

source는 속성 필드를 채우는 데 사용되며, 직렬화 된 인스턴스의 모든 속성에 가리킬 수 있습니다. 위에 표시된 점 표기법을 사용할 수도 있습니다.

위에서 추가한 필드 ReadOnlyField 는 CharField, BooleanField 달리, 클래스 유형이 지정되지 않습니다. ReadOnlyField 는 항상 읽기 전용으로 직렬화 표현을 위해 사용되며 모델을 업데이트 하기 위해 사용되지 않습니다.



## 뷰에 필요한 권한 추가
이제 코드 스니펫이 사용자와 연결 되었으므로 인증된 사용자만 코드 스 니펫을 작성, 업데이트 및 삭제할 수 있도록 해야합니다.

REST 프레임워크에는 지정된 뷰에 액세스 할 수있는 사람을 제한하는 데 사용할 수있는 여러 권한 클래스가 포함되어 있습니다. 이 경우 IsAuthenticatedOrReadOnly 은 인증된 요청에서 읽기-쓰기 액세스를 하고 인증되지 않은 요청은 읽기 전용 액세스를 갖도록 하는 것입니다.

먼저 views 모듈에 다음을 import를 추가하십시오.
```python
from rest_framework import permissions
```

SnippetList 와 SnippetDetail 뷰 클래스 모두에 다음을 추가합니다.
```python
permission_classes = [permissions.IsAuthenticatedOrReadOnly]
```




## browsable API에 로그인 추가
브라우저를 열고 현재 browsable API로 이동하면 더 이상 새 코드 스니펫을 만들 수 없습니다. 그렇게 하려면 사용자로 로그인 할 수 있어야 합니다.

프로젝트 수준 ``urls.py``파일에서 URLconf를 편집하여 browsable API와 함께 사용할 로그인 view를 추가할 수 있습니다.
```python
from django.conf.urls import include
```

또한 파일 끝에 browsable API에 대한 로그인 및 로그 아웃을 포함할 패턴을 추가하십시오.
```python
urlpatterns += [
    path('api-auth/', include('rest_framework.urls')),
]
```

이제 브라우저를 다시 열고 페이지를 새로 고치면 페이지 오른쪽 상단에 '로그인' 링크가 표시됩니다. 앞에서 만든 사용자 중 하나로 로그인하면 코드 스니펫을 다시 만들 수 있습니다.

코드 스니펫을 몇 개 만든 후에는 '/ users /'엔드 포인트로 이동 한 다음 각 사용자의 '스니펫'필드에서 각 사용자와 관련된 스니펫 ID 목록이 표시에 있는지 확인하십시오.




## 객체 수준 권한
실제로 모든 코드 스니펫을 누구나 볼 수 있기를 원하지만 코드 스니펫을 만든 사용자만 해당 코드 스니펫을 업데이트하거나 삭제할 수 있어야 합니다.

그러기 위해서는 사용자 지정 권한을 만들어야 합니다.

스니펫 앱에서 permissions.py 파일을 만들고 
```python
from rest_framework import permissions


class IsOwnerOrReadOnly(permissions.BasePermission):
    """
    Custom permission to only allow owners of an object to edit it.
    """

    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request,
        # so we'll always allow GET, HEAD or OPTIONS requests.
        if request.method in permissions.SAFE_METHODS:
            return True

        # Write permissions are only allowed to the owner of the snippet.
        return obj.owner == request.user
```

이제 SnippetDetail 뷰 클래스에서 permission_classes 속성을 편집하여 스니펫 인스턴스의 엔드 포인트에 해당 사용자 지정 권한을 추가 할 수 있습니다.
```python
permission_classes = [permissions.IsAuthenticatedOrReadOnly,
                      IsOwnerOrReadOnly]
```

```python
from snippets.permissions import IsOwnerOrReadOnly
```
이제 브라우저를 다시 열면 코드 스니펫을 작성한 동일한 사용자로 로그인 한 경우 'DELETE'및 'PUT'조치가 스니펫 인스턴스 엔드 포인트에만 나타납니다.




## API로 인증
이제 API에 대한 권한 세트가 있으므로 스니펫을 수정하려면 요청을 인증해야 합니다. 인증 클래스를 설정하지 않았으므로 현재 기본값이 적용됩니다. SessionAuthentication 및 BasicAuthentication.

웹 브라우저를 통해 API와 상호 작용할 때 로그인 할 수 있으며 브라우저 세션은 요청에 필요한 인증을 제공합니다.

프로그래밍 방식으로 API와 상호 작용하는 경우 각 요청에 대해 인증 자격 증명을 명시적으로 제공해야합니다.

인증하지 않고 스니펫을 만들려고 하면 오류가 발생합니다.

```python
http POST http://127.0.0.1:8000/snippets/ code="print(123)"

{
    "detail": "Authentication credentials were not provided."
}
```

앞서 만든 사용자 중 하나의 사용자 이름과 비밀번호를 포함시켜 요청을 성공적으로 수행 할 수 있습니다.
```python
http -a admin:password123 POST http://127.0.0.1:8000/snippets/ code="print(789)"

{
    "id": 1,
    "owner": "admin",
    "title": "foo",
    "code": "print(789)",
    "linenos": false,
    "language": "python",
    "style": "friendly"
}
```

이제 웹 API 및 시스템 사용자 및 생성 한 코드 스 니펫에 대한 상당히 세분화 된 권한 세트를 갖습니다.

