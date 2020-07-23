# 인증과 권한(Tutorial 4)
현재 API에는 코드 스 니펫을 편집하거나 삭제할 수있는 사람에 대한 제한이 없습니다. 우리는 다음을 확인하기 위해 좀 더 고급 행동을 원합니다.

* 코드 스 니펫은 항상 제작자와 연결되어 있습니다.
* 인증 된 사용자 만 스 니펫을 만들 수 있습니다.
* 스 니펫을 만든 사람 만 업데이트하거나 삭제할 수 있습니다.
* 인증되지 않은 요청에는 전체 읽기 전용 액세스 권한이 있어야합니다.

## 모델에 정보 추가
Snippet모델 클래스 를 몇 가지 변경하겠습니다 . 먼저 몇 개의 필드를 추가하겠습니다. 이러한 필드 중 하나는 코드 스 니펫을 만든 사용자를 나타내는 데 사용됩니다. 다른 필드는 강조 표시된 코드의 HTML 표현을 저장하는 데 사용됩니다.

의 Snippet모델에 다음 두 필드를 추가하십시오 models.py.
```python
owner = models.ForeignKey('auth.User', related_name='snippets', on_delete=models.CASCADE)
highlighted = models.TextField()
```

또한 모델이 저장 될 때 pygments코드 강조 표시 라이브러리를 사용하여 강조 표시된 필드를 채우도록해야합니다 .

추가 수입품이 필요합니다 :
```python
from pygments.lexers import get_lexer_by_name
from pygments.formatters.html import HtmlFormatter
from pygments import highlight
```

이제 .save()모델 클래스에 메소드를 추가 할 수 있습니다 :
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

완료되면 데이터베이스 테이블을 업데이트해야합니다. 일반적으로이를 수행하기 위해 데이터베이스 마이그레이션을 작성하지만이 학습서의 목적을 위해 데이터베이스를 삭제하고 다시 시작하십시오.
```python
rm -f db.sqlite3
rm -r snippets/migrations
python manage.py makemigrations snippets
python manage.py migrate
```

API 테스트에 사용할 몇 가지 다른 사용자를 만들 수도 있습니다. 이를 수행하는 가장 빠른 방법은 createsuperuser명령을 사용하는 것입니다.

```python
python manage.py createsuperuser
```


## 사용자 모델에 대한 엔드 포인트 추가
이제 일부 사용자와 작업 할 수있게되었으므로 해당 사용자의 표현을 API에 추가하는 것이 좋습니다. 새로운 시리얼 라이저를 만드는 것은 쉽습니다. 에 serializers.py추가 :


```python
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    snippets = serializers.PrimaryKeyRelatedField(many=True, queryset=Snippet.objects.all())

    class Meta:
        model = User
        fields = ['id', 'username', 'snippets']
```

사용자 모델과의 관계 'snippets'는 역순 이므로 ModelSerializer클래스를 사용할 때는 기본적으로 포함되지 않으므로 명시적인 필드를 추가해야했습니다.

에 몇 가지보기를 추가 할 것 views.py입니다. 우리가 사용합니다, 그래서 우리는 사용자 표현 단지 사용은 읽기 전용에 의견을 싶습니다 ListAPIView및 RetrieveAPIView제네릭 클래스 기반의 뷰를.    
```python
from django.contrib.auth.models import User


class UserList(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserDetail(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
```

UserSerializer수업 도 가져와야합니다
```python
from snippets.serializers import UserSerializer
```

마지막으로 URL conf에서 참조하여 해당 뷰를 API에 추가해야합니다. 의 패턴에 다음을 추가하십시오 snippets/urls.py.
```python
path('users/', views.UserList.as_view()),
path('users/<int:pk>/', views.UserDetail.as_view()),
```


## 스 니펫을 사용자와 연관
지금 코드 스 니펫을 만든 경우 스 니펫을 만든 사용자를 스 니펫 인스턴스와 연결할 방법이 없습니다. 사용자는 직렬화 된 표현의 일부로 전송되지 않고 대신 들어오는 요청의 속성입니다.

이를 처리하는 .perform_create()방법은 스 니펫보기에서 메소드를 대체 하여 인스턴스 저장이 관리되는 방식을 수정하고 들어오는 요청 또는 요청 된 URL에 내재 된 정보를 처리 할 수 ​​있도록하는 것입니다.

온 SnippetList뷰 클래스, 다음과 같은 방법을 추가 :

```python   
def perform_create(self, serializer):
    serializer.save(owner=self.request.user)
```
create()시리얼 라이저 의 메소드는 이제 'owner'요청의 검증 된 데이터와 함께 추가 필드를 전달 받습니다.


## 시리얼 라이저 업데이트
스 니펫은이를 생성 한 사용자와 연결되었으므로이를 SnippetSerializer반영하도록 업데이트하겠습니다 . 다음 필드를 serializer 정의에 추가하십시오 serializers.py.

```python
owner = serializers.ReadOnlyField(source='owner.username')
```
참고 : 'owner',내부 Meta클래스 의 필드 목록 에도 추가 해야합니다 .

이 분야는 꽤 흥미로운 일을하고 있습니다. source하는 속성 인수 컨트롤 필드를 채우는 데 사용되며, 직렬화 된 인스턴스의 모든 속성에 가리킬 수 있습니다. 위에 표시된 점 표기법을 사용할 수도 있습니다.이 경우 Django의 템플릿 언어와 비슷한 방식으로 주어진 속성을 통과합니다.

우리가 추가 한 필드는 유형이 지정되지 ReadOnlyField같은 입력 된 다른 분야와 달리, 클래스 CharField, BooleanField유형이 지정되지 않은 등 ... ReadOnlyField항상 읽기 전용되고, 직렬화 표현을 위해 사용되지만 모델을 업데이트하기 위해 사용되지 않습니다 직렬화 해제 된 인스턴스 우리는 CharField(read_only=True)여기 에서도 사용할 수있었습니다 .



## 뷰에 필요한 권한 추가
이제 코드 스 니펫이 사용자와 연관되었으므로 인증 된 사용자 만 코드 스 니펫을 작성, 업데이트 및 삭제할 수 있도록해야합니다.

REST 프레임 워크에는 지정된 뷰에 액세스 할 수있는 사람을 제한하는 데 사용할 수있는 여러 권한 클래스가 포함되어 있습니다. 이 경우 우리가 찾고있는 IsAuthenticatedOrReadOnly것은 인증 된 요청이 읽기-쓰기 액세스를 받고 인증되지 않은 요청이 읽기 전용 액세스를 갖도록하는 것입니다.

먼저 views 모듈에 다음 import를 추가하십시오.
```python
from rest_framework import permissions
```

그런 다음에 다음 속성을 추가 모두SnippetList 와 SnippetDetail뷰 클래스.
```python
permission_classes = [permissions.IsAuthenticatedOrReadOnly]
```




## 찾아보기 가능한 API에 로그인 추가
브라우저를 열고 현재 찾아보기 가능한 API로 이동하면 더 이상 새 코드 스 니펫을 만들 수 없습니다. 그렇게하려면 사용자로 로그인 할 수 있어야합니다.

프로젝트 수준 urls.py파일 에서 URLconf를 편집하여 탐색 가능한 API와 함께 사용할 로그인보기를 추가 할 수 있습니다 .

파일 맨 위에 다음 가져 오기를 추가하십시오.

```python
from django.conf.urls import include
```

또한 파일 끝에 탐색 가능한 API에 대한 로그인 및 로그 아웃보기를 포함 할 패턴을 추가하십시오.
```python
urlpatterns += [
    path('api-auth/', include('rest_framework.urls')),
]
```

'api-auth/'패턴 의 일부는 실제로 사용하려는 URL이 될 수 있습니다.

이제 브라우저를 다시 열고 페이지를 새로 고치면 페이지 오른쪽 상단에 '로그인'링크가 표시됩니다. 앞에서 만든 사용자 중 하나로 로그인하면 코드 스 니펫을 다시 만들 수 있습니다.

코드 스 니펫을 몇 개 만든 후에는 '/ users /'엔드 포인트로 이동 한 다음 각 사용자의 '스 니펫'필드에서 각 사용자와 관련된 스 니펫 ID 목록이 표시에 있는지 확인하십시오.




## 객체 수준 권한
실제로 모든 코드 스 니펫을 누구나 볼 수 있기를 원하지만 코드 스 니펫을 만든 사용자 만 해당 코드 스 니펫을 업데이트하거나 삭제할 수 있어야합니다.

그러기 위해서는 사용자 지정 권한을 만들어야합니다.

스 니펫 앱에서 새 파일을 만들고 permissions.py

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

이제 뷰 클래스 에서 permission_classes속성을 편집하여 스 니펫 인스턴스 엔드 포인트에 해당 사용자 지정 권한을 추가 할 수 있습니다 SnippetDetail.
```python
permission_classes = [permissions.IsAuthenticatedOrReadOnly,
                      IsOwnerOrReadOnly]
```

IsOwnerOrReadOnly클래스 도 가져와야합니다 .
```python
from snippets.permissions import IsOwnerOrReadOnly
```
이제 브라우저를 다시 열면 코드 스 니펫을 작성한 동일한 사용자로 로그인 한 경우 'DELETE'및 'PUT'조치가 스 니펫 인스턴스 엔드 포인트에만 나타납니다.




## API로 인증
이제 API에 대한 권한 세트가 있으므로 스 니펫을 수정하려면 요청을 인증해야합니다. 인증 클래스를 설정하지 않았 으므로 현재 기본값이 적용됩니다 ( SessionAuthentication및) BasicAuthentication.

웹 브라우저를 통해 API와 상호 작용할 때 로그인 할 수 있으며 브라우저 세션은 요청에 필요한 인증을 제공합니다.

프로그래밍 방식으로 API와 상호 작용하는 경우 각 요청에 대해 인증 자격 증명을 명시 적으로 제공해야합니다.

인증하지 않고 스 니펫을 만들려고하면 오류가 발생합니다.

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

