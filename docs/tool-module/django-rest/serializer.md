# Serializers - API

> Serializer 의 유용성을 확장하는 것은 우리가 해결하고자 하는 것입니다. 그러나 사소한 문제는 아니며 심각한 디자인 작업이 필요합니다.
> 
> -- Django users group, Russell Keith-Magee

Serializer를 사용하면 QuerySets 및 모델 인스턴스와 같은 복잡한 데이터를 네이티브 Python 데이터 유형으로 변환한 다음 JSON, XML 또는 다른 콘텐츠 유형으로 쉽게 렌더링 할 수 있습니다. Serializer는 역 직렬화 기능을 제공하여 들어오는 데이터를 검증하고 파싱하여 복잡한 유형으로 다시 변환 할 수 있습니다.

REST 프레임 워크의 serializer는 Django ``Form`` 및 ``ModelForm`` 클래스와 매우 유사하게 작동합니다. ``Serializer``클래스는 serializer를 만들기 위해 모델과 QuerySets을 사용하는 shortcut을 제공하는 ModelSerializer 클래스 뿐만 아니라 응답의 출력을 제어 할 수 있는 강력하고 포괄적인 방법들을 제공합니다.



## Serializers
### Serializers 선언

예제 목적으로 사용할 수있는 간단한 객체를 만들어 보겠습니다.
```python
from datetime import datetime

class Comment(object):
    def __init__(self, email, content, created=None):
        self.email = email
        self.content = content
        self.created = created or datetime.now()

comment = Comment(email='leila@example.com', content='foo bar')
```
Comment 객체의 데이터를 직렬화/역 직렬화 하는데 사용할 수 있는 Serializer를 선언합니다.

Serializer 선언은 폼 선언과 매우 유사합니다 :
```python
from rest_framework import serializers

class CommentSerializer(serializers.Serializer):
    email = serializers.EmailField()
    content = serializers.CharField(max_length=200)
    created = serializers.DateTimeField()
```



### objects 직렬화 
CommentSerializer는 comment 또는 comment list를 직렬화하는 데 사용할 수 있습니다 . 
```python
serializer = CommentSerializer(comment)
serializer.data
# {'email': 'leila@example.com', 'content': 'foo bar', 'created': '2016-01-27T15:17:10.375877'}
```

직렬화 프로세스를 마무리하기 위해 데이터를로 렌더링합니다 json.
```python
from rest_framework.renderers import JSONRenderer

json = JSONRenderer().render(serializer.data)
json
# b'{"email":"leila@example.com","content":"foo bar","created":"2016-01-27T15:17:10.375877"}'
```



### objects 역직렬화
역 직렬화는 비슷합니다. 먼저 스트림을 Python 기본 데이터 유형으로 파싱합니다.

```python
import io
from rest_framework.parsers import JSONParser

stream = io.BytesIO(json)
data = JSONParser().parse(stream)
```

native 데이터 유형을 dictionary 유형의 validated_data 로 복원합니다.
```python
serializer = CommentSerializer(data=data)
serializer.is_valid()
# True
serializer.validated_data
# {'content': 'foo bar', 'email': 'leila@example.com', 'created': datetime.datetime(2012, 08, 22, 16, 20, 09, 822243)}
```

### instances 저장
검증 된 데이터를 기반으로 완전한 객체 인스턴스를 반환하려면 .create()와 .update() 메소드 중 하나 또는 둘 다를 구현해야 합니다. 예를 들면 다음과 같습니다.

```python
class CommentSerializer(serializers.Serializer):
    email = serializers.EmailField()
    content = serializers.CharField(max_length=200)
    created = serializers.DateTimeField()

    def create(self, validated_data):
        return Comment(**validated_data)

    def update(self, instance, validated_data):
        instance.email = validated_data.get('email', instance.email)
        instance.content = validated_data.get('content', instance.content)
        instance.created = validated_data.get('created', instance.created)
        return instance
```

객체 인스턴스가 Django 모델에 해당하는 경우 이러한 메소드가 객체를 데이터베이스에 저장하도록 해야합니다. 예를 들어 CommentDjango 모델인 경우 방법은 다음과 같습니다.
```python
    def create(self, validated_data):
        return Comment.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.email = validated_data.get('email', instance.email)
        instance.content = validated_data.get('content', instance.content)
        instance.created = validated_data.get('created', instance.created)
        instance.save()
        return instance
```

이제 데이터의 역 직렬화 과정에서 확인된 데이터를 기반으로 객체 인스턴스를 반환하도록 ``.save()``  호출할 수 있습니다 .
```python
comment = serializer.save()
```

``.save()`` 를 호출하면 serializer 클래스를 인스턴스화 할 때 기존 인스턴스가 전달되었는지 여부에 따라 새 인스턴스를 만들거나 기존 인스턴스를 업데이트 합니다.
```python
# .save() will create a new instance.
serializer = CommentSerializer(data=data)

# .save() will update the existing `comment` instance.
serializer = CommentSerializer(comment, data=data)
```

``.create()``와 ``.update()`` 모두 선택 사항입니다. serializer 클래스의 유스 케이스에 따라 둘 중 하나 또는 둘 다를 구현할 수 있습니다.

#### .save()에 추가 속성 전달
때로는 인스턴스를 저장할 때 뷰 코드에서 추가 데이터를 주입해야 할 수도 있습니다. 이 추가 데이터에는 현재 사용자, 현재 시간 또는 요청 데이터의 일부가 아닌 다른 정보가 포함될 수 있습니다.

.save()를 호출할 때 추가 키워드 인수를 포함하면 됩니다. 예를 들면 다음과 같습니다.
```python
serializer.save(owner=request.user)
```
.create() 또는 .update() 가 호출될 때 추가 키워드 인수가 validated_data 에 포함됩니다.

#### .save() 재정의
경우에 따라 .create()및 .update()가 필요하지 않은 경우가 있을 수 있습니다. 예를 들어, contact form 의 새 인스턴스를 만들지 않고 대신 전자 메일을 보내려고 합니다.

이 경우 .save()를 대체하도록 선택할 수 있습니다.

예를 들면 다음과 같습니다.
```python
class ContactForm(serializers.Serializer):
    email = serializers.EmailField()
    message = serializers.CharField()

    def save(self):
        email = self.validated_data['email']
        message = self.validated_data['message']
        send_email(from=email, message=message)
```
위의 경우 serializer의 .validated_data 속성에 직접 액세스해야 합니다.



### 유효성 검사 

데이터를 역 직렬화 할 때, validated_data 데이터에 액세스하거나 객체 인스턴스를 저장하기 전에 항상 ``is_valid()``를 호출해야 합니다. 유효성 검사 오류가 발생하면 ``.errors`` 속성에 결과 오류 메시지를 나타내는 dictionary 가 포함됩니다. 예를 들면 다음과 같습니다.
```python
serializer = CommentSerializer(data={'email': 'foobar', 'content': 'baz'})
serializer.is_valid()
# False
serializer.errors
# {'email': ['Enter a valid e-mail address.'], 'created': ['This field is required.']}
```

dictionary의 각 키는 필드 이름이되고 값은 해당 필드에 오류 메시지의 문자열 목록이 됩니다. ``non_field_errors`` 키는 있을 수 있으며 일반적 유효성 검사 오류를 나열합니다. ``non_field_errors `` 키의 이름은 ``NON_FIELD_ERRORS_KEYREST`` REST 프레임워크 설정을 사용하여 사용자 정의 할 수 있습니다.

list의 item을 역 직렬화하면 각 역 직렬화 된 항목을 나타내는 dictionary list 형태로 오류가 반환됩니다.


#### 유효하지 않은 데이터에 대한 예외 발생
이 ``.is_valid()`` 메소드는 유효성 검증 오류가 있는 경우 예외 ``serializers.ValidationError``를 발생 시키는 ``raise_exception``플래그를 사용할 수 있습니다.

이러한 예외는 REST 프레임워크가 제공하는 기본 예외 핸들러에 의해 자동으로 처리되며 기본적으로 ``HTTP 400 Bad Request`` 응답을 리턴 합니다.
```python
# Return a 400 response if the data was invalid.
serializer.is_valid(raise_exception=True)
```

#### 필드 레벨 검증
Serializer의 서브 클래스에 .validate_<field_name>메소드를 추가하여 사용자 정의 필드 레벨 유효성 검증을 지정할 수 있습니다. 이들은 .clean_<field_name> 의 django form 방법과 유사합니다.

이러한 메소드는 단일 인수를 사용하는데, 이는 유효성 검증이 필요한 필드 값입니다.

validate_<field_name>은 유효 값을 반환하거나 serializers.ValidationError 를 발생시켜야 합니다. 예를 들면 다음과 같습니다.
```python
from rest_framework import serializers

class BlogPostSerializer(serializers.Serializer):
    title = serializers.CharField(max_length=100)
    content = serializers.CharField()

    def validate_title(self, value):
        """
        Check that the blog post is about Django.
        """
        if 'django' not in value.lower():
            raise serializers.ValidationError("Blog post is not about Django")
        return value
```
참고 :  <field_name>이 ``required=False`` 매개 변수 선언된 필드의 경우 필드가 포함되어 있지 않은 경우 이 검증 단계가 수행되지 않습니다.

#### 객체 레벨 검증
여러 필드에 접근하여 다른 유효성 검증을 수행하려면 Serializer 서브 클래스에 ``.validate()`` 메소드를 추가하십시오. 이 메소드는 단일 인수를 사용하는데, 이는 필드 값의 dictionary 입니다.  필요한 경우 값을 serializers.ValidationError 발생 시키거나 확인된 값을 반환해야 합니다. 예를 들면 다음과 같습니다.
```python
from rest_framework import serializers

class EventSerializer(serializers.Serializer):
    description = serializers.CharField(max_length=100)
    start = serializers.DateTimeField()
    finish = serializers.DateTimeField()

    def validate(self, data):
        """
        Check that start is before finish.
        """
        if data['start'] > data['finish']:
            raise serializers.ValidationError("finish must occur after start")
        return data
```



#### 유효성 검사기(Validators)
Serializer의 개별 필드에 유효성 검사기를 포함할 수 있습니다. 예를 들면 다음과 같습니다.
```python
def multiple_of_ten(value):
    if value % 10 != 0:
        raise serializers.ValidationError('Not a multiple of ten')

class GameRecord(serializers.Serializer):
    score = IntegerField(validators=[multiple_of_ten])
```

Serializer 클래스에는 전체 필드 데이터 세트에 적용되는 재사용 가능한 유효성 검사기가 포함될 수도 있습니다. 이 유효성 검사기는 내부 Meta클래스에서 다음과 같이 선언하여 포함됩니다 .
```python
class EventSerializer(serializers.Serializer):
    name = serializers.CharField()
    room_number = serializers.IntegerField(choices=[101, 102, 103, 201])
    date = serializers.DateField()

    class Meta:
        # Each room only has one event per day.
        validators = UniqueTogetherValidator(
            queryset=Event.objects.all(),
            fields=['room_number', 'date']
        )
```
더 많은 정보 [validators documentation](https://www.django-rest-framework.org/api-guide/validators/).


### 초기 데이터 및 인스턴스에 접근
초기 객체 또는 쿼리 셋을 serializer 인스턴스에 전달하면 객체를 ``.instance``로 사용할 수 있게 됩니다. 초기 객체가 전달되지 않으면 ``.instance`` 속성은 None 입니다.

serializer 인스턴스로 데이터를 전달할 때 수정되지 않은 데이터는 ``.initial_data``로 사용할 수 있습니다. 데이터 키워드 인수가 전달되지 않으면  ``.initial_data``속성이 존재하지 않습니다.

### 부분 업데이트
기본적으로 serializer의 모든 필수 필드에 대해 값을 전달해야 합니다. 그렇지 않으면 유효성 검사 오류가 발생합니다. 부분 업데이트를 허용하기 위해 partial 인수를 사용할 수 있습니다 .

```python
# Update `comment` with partial data
serializer = CommentSerializer(comment, data={'content': 'foo bar'}, partial=True)
```



### 중첩 객체 다루기 
앞의 예제는 단순한 데이터 유형 만있는 객체를 처리하는 데 적합하지만 때로는 객체의 일부 속성이 문자열, 날짜 또는 정수와 같은 간단한 데이터 유형이 아닌 더 복잡한 객체를 나타낼 수도 있어야 합니다.

``Serializer`` 클래스 자체가 Field 형태로 사용될 수 있습니다. 하나 개의 오브젝트 타입은 다른 내부 중첩 관계를 나타내는 데 사용될 수있다.

```python
class UserSerializer(serializers.Serializer):
    email = serializers.EmailField()
    username = serializers.CharField(max_length=100)

class CommentSerializer(serializers.Serializer):
    user = UserSerializer()
    content = serializers.CharField(max_length=200)
    created = serializers.DateTimeField()
```

중첩 표현이 ``None`` 값을 선택적으로 받아 들일 수 있으며, 이 경우는 ``required=False`` 플래그를 중첩 ``Serializer`에 전달해야 합니다.
```python
class CommentSerializer(serializers.Serializer):
    user = UserSerializer(required=False)  # May be an anonymous user.
    content = serializers.CharField(max_length=200)
    created = serializers.DateTimeField()
```

마찬가지로 중첩 객체가 List 인 경우 중첩 된 ``Serializer`` 에 ``many=True`` 플래그를 전달해야 합니다 .
```python
class CommentSerializer(serializers.Serializer):
    user = UserSerializer(required=False)
    edits = EditItemSerializer(many=True)  # A nested list of 'edit' items.
    content = serializers.CharField(max_length=200)
    created = serializers.DateTimeField()
```

### 쓰기 가능한 중첩 표현
데이터 역 직렬화를 지원하는 중첩 표현을 처리할 때 중첩 객체의 오류는 중첩 객체의 필드 이름 아래에 표시됩니다.

```python
serializer = CommentSerializer(data={'user': {'email': 'foobar', 'username': 'doe'}, 'content': 'baz'})
serializer.is_valid()
# False
serializer.errors
# {'user': {'email': ['Enter a valid e-mail address.']}, 'created': ['This field is required.']}
```
마찬가지로 ``.validated_data`` 속성에는 중첩된 데이터 구조가 포함됩니다.

#### 중첩 표현을 위한 .create() 작성 방법
쓰기 가능한 중첩 표현을 지원하는 경우 여러 객체 저장을 처리하는 ``.create()`` 또는 ``.update()`` 메소드를 작성해야 합니다.

다음 예제는 중첩된 profile 오브젝트로 user 작성을 처리하는 방법을 보여줍니다.
```python
class UserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer()

    class Meta:
        model = User
        fields = ['username', 'email', 'profile']

    def create(self, validated_data):
        profile_data = validated_data.pop('profile')
        user = User.objects.create(**validated_data)
        Profile.objects.create(user=user, **profile_data)
        return user
```

#### 중첩 표현을 위한 .update() 작성 방법
업데이트의 경우 relationships 업데이트를 처리하는 방법에 대해 신중하게 생각해야 합니다. 예를 들어 relationships에 대한 데이터가 None 제공되거나 제공되지 않은 경우 다음 중 어떤 것이 발생해야 합니까?

* 데이터베이스에서 relationships을 NULL로 설정
* 연관된 인스턴스를 삭제
* 데이터를 무시하고 인스턴스를 그대로 유지
* 유효성 검사 오류를 발생

다음은 이전 ``UserSerializer`` 클래스 ``.update()``의 메소드에 대한 예 입니다.
```python
    def update(self, instance, validated_data):
        profile_data = validated_data.pop('profile')
        # Unless the application properly enforces that this field is
        # always set, the follow could raise a `DoesNotExist`, which
        # would need to be handled.
        profile = instance.profile

        instance.username = validated_data.get('username', instance.username)
        instance.email = validated_data.get('email', instance.email)
        instance.save()

        profile.is_premium_member = profile_data.get(
            'is_premium_member',
            profile.is_premium_member
        )
        profile.has_support_contract = profile_data.get(
            'has_support_contract',
            profile.has_support_contract
         )
        profile.save()

        return instance
```


중첩된 인스턴스의 create 및 update의 동작이 모호할 수 있고 관련 모델 간에 복잡한 종속성이 필요할 수 있으므로 REST 프레임워크에서는 항상 이러한 메소드를 명시적으로 작성해야 합니다. 기본 ``ModelSerializer`` ``.create()`` 및 ``.update()`` 메소드에는 쓰기 가능한( writable nested representations) 중첩 표현에 대한 지원이 포함되지 않습니다.

그러나 자동 쓰기 가능 중첩 표현을 지원하는 [DRF Writable Nested](https://www.django-rest-framework.org/api-guide/serializers/#drf-writable-nested) 와 같은 타사 패키지를 사용할 수 있습니다.

#### 모델 Manager 클래스에서 관련 인스턴스 저장 처리
Serializer 에 여러 관련 인스턴스를 저장하는 대신 올바른 인스턴스 작성을 처리하는 사용자 정의 모델 Manager 클래스를 작성하는 것입니다.

예를 들어, User 인스턴스와 Profile 인스턴스가 항상 한 쌍으로 생성되도록 하고 싶다고 가정합니다. 다음과 같은 사용자 정의 Manager 클래스를 작성할 수 있습니다.
```python
class UserManager(models.Manager):
    ...

    def create(self, username, email, is_premium_member=False, has_support_contract=False):
        user = User(username=username, email=email)
        user.save()
        profile = Profile(
            user=user,
            is_premium_member=is_premium_member,
            has_support_contract=has_support_contract
        )
        profile.save()
        return user
```

이 Manager 클래스에서 User 인스턴스와 Profile 인스턴스가 항상 동시에 작성되도록 캡슐화합니다. serializer 클래스의 .create() 메소드를 새 Manager 메소드를 사용하도록 다시 작성할 수 있습니다.
```python
def create(self, validated_data):
    return User.objects.create(
        username=validated_data['username'],
        email=validated_data['email']
        is_premium_member=validated_data['profile']['is_premium_member']
        has_support_contract=validated_data['profile']['has_support_contract']
    )
```
이 방법에 대한 자세한 내용은 모델 Manager에 대한 Django 설명서 및 Model 및 Manager클래스 사용에 대한 [블로그](https://www.dabapps.com/blog/django-models-and-encapsulation/)을 참조 하십시오.



### 여러 객체 다루기 
``Serializer`` 클래스는 객체의 목록(list)을 직렬화 또는 역 직렬화하여 처리 할 수 있습니다.

#### 여러 객체 직렬화
단일 객체 인스턴스 대신 QuerySets 또는 List 를 직렬화 하려면 ``Serializer`` 를 인스턴스화 할 때 ``many=True`` 플래그를 전달해야 합니다. 그런 다음 직렬화 할 QuerySets 또는 List 를 전달할 수 있습니다.
```python
queryset = Book.objects.all()
serializer = BookSerializer(queryset, many=True)
serializer.data
# [
#     {'id': 0, 'title': 'The electric kool-aid acid test', 'author': 'Tom Wolfe'},
#     {'id': 1, 'title': 'If this is a man', 'author': 'Primo Levi'},
#     {'id': 2, 'title': 'The wind-up bird chronicle', 'author': 'Haruki Murakami'}
# ]
```
#### 여러 객체의 역 직렬화
여러 개체를 역 직렬화하는 기본 동작은 여러 개체 생성(creation)을 지원하지만 여러 개체 업데이트(update)는 지원하지 않습니다. 이러한 경우를 대한 자세한 내용은 [ListSerializer](https://www.django-rest-framework.org/api-guide/serializers/#listserializer) 설명서를 참조 하십시오.



### 추가 컨텍스트 포함
직렬화 되는 객체 외에 serializer 에 추가 컨텍스트를 제공해야 하는 경우가 있습니다. 한 예로, 일반적인 경우는 하이퍼링크 관계(hyperlinked relations)가 포함 된 serializer 를 사용하는 경우입니다. serializer 는 정규화 된 URL을 올바르게 생성할 수 있도록 현재 요청에 액세스 할 수 있어야 합니다.

serializer를 인스턴스화 할 때 context 인수를 전달하여 임의의 추가 컨텍스트를 제공 할 수 있습니다 . 예를 들면 다음과 같습니다.
```python
serializer = AccountSerializer(account, context={'request': request})
serializer.data
# {'id': 6, 'owner': 'denvercoder9', 'created': datetime.datetime(2013, 2, 12, 09, 44, 56, 678870), 'details': 'http://example.com/accounts/6/details'}
```
context dictionary는 ``self.context`` 속성에 액세스하여  ``.to_representation()`` 와 같은 사용자 정의 메소드를 serializer 필드 로직 내에서 사용할 수 있습니다.


## ModelSerializer
Django Model에 매핑되는  ``Serializer`` 클래스가 필요할 수 있습니다.

이 ``ModelSerializer`` 클래스는 Model 필드에 해당하는 필드를 갖는 ``Serializer`` 클래스를 자동으로 만들 수 있는 shortcut을 제공합니다.

``ModelSerializer`` 클래스는 아래의 사항을 제외하면 Serializer 클래스와 동일합니다. :

* 모델에 따라 자동으로 일련의 필드를 생성합니다.
* unique_together 와 같은 serializer에 대한 validator를 자동으로 생성합니다.
* ``.create()`` 및 ``.update()``의 간단한 기본 구현이 포함됩니다.

``ModelSerializer``선언은 다음과 같습니다.
```python
class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ['id', 'account_name', 'users', 'created']
```
기본적으로 Model 클래스의 모든 필드는 serializer 필드에 매핑됩니다.

모델의 외래 키와 같은 모든 관계가 ``PrimaryKeyRelatedField`` 에 매핑됩니다. 명시적으로 포함되지 않는 한 기본적으로 역관계는 포함되지 않습니다.


### ModelSerializer 조사(inspection)
Serializer 클래스는 유용한 상세(verbose) 표현 문자열을 생성하여 해당 필드의 상태를 완전히 검사 할 수 있습니다. 이 기능은 ModelSerializers 에서 자동으로 생성되는 필드 및 validator 집합을 확인하여 결정하는 작업을 할 때 특히 유용합니다.

이렇게 하려면 ``python manage.py shell``을 사용하여 Django 쉘을 연 다음 serializer 클래스를 가져와서 인스턴스화하고 객체 표현을 출력합니다.
```python
>>> from myapp.serializers import AccountSerializer
>>> serializer = AccountSerializer()
>>> print(repr(serializer))
AccountSerializer():
    id = IntegerField(label='ID', read_only=True)
    name = CharField(allow_blank=True, max_length=100, required=False)
    owner = PrimaryKeyRelatedField(queryset=User.objects.all())
```


### 포함 할 필드 지정
ModelSerializer 에서 기본 필드의 하위 집합만 사용하려면 ModelForm에서 처럼 fields 또는 exclude 옵션을 사용하여 수행 할 수 있습니다. fields 속성을 사용하여 직렬화해야 하는 모든 필드를 명시 적으로 설정하는 것이 좋습니다. 이렇게 하면 모델이 변경될 때 의도하지 않은 데이터 노출이 발생할 가능성이 줄어 듭니다.

예를 들면 다음과 같습니다.
```python
class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ['id', 'account_name', 'users', 'created']
```

모델의 모든 필드를 사용해야 함을 나타내도록 fields 속성을 특수 값 ``'__all__'``으로 설정할 수도 있습니다.

예를 들면 다음과 같습니다.
```python
class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = '__all__'
```

Serializer에서 제외 할 필드 목록을 exclude 속성에서 설정할 수 있습니다.

예를 들면 다음과 같습니다.
```python
class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        exclude = ['users']
```
위의 예에서 경우, Account 모델은 3개 필드(account_name, users, created)를 가지고 있지만 결과적으로 account_name, created 을 직렬화 합니다.

fields 및 exclude 속성의 이름은 일반적으로 Model 클래스의 필드에 매핑됩니다.



### 중첩 직렬화 지정
기본적으로 ModelSerializer은 relationships에 primary keys를 사용하지만 다음과 같이 depth 옵션을 사용하여 중첩 표현을 쉽게 생성 할 수도 있습니다.
```python
class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ['id', 'account_name', 'users', 'created']
        depth = 1
```
이 depth 옵션은 relationships을 평면 표현으로 되돌리기 전에 통과해야하는 relationships의 깊이를 나타내는 정수 값으로 설정해야 합니다.



### 명시 적으로 필드 지정
``Serializer`` 클래스에서와 마찬가지로 ``ModelSerializer`` 클래스에서 필드를 선언하여 필드를 추가하거나 기본 필드를 재정의 할 수 있습니다.
```python
class AccountSerializer(serializers.ModelSerializer):
    url = serializers.CharField(source='get_absolute_url', read_only=True)
    groups = serializers.PrimaryKeyRelatedField(many=True)

    class Meta:
        model = Account
```
추가 필드는 모델에서 호출 할 수 있는 모든 속성에 사용할 수 있습니다.




### 읽기 전용 필드 지정
여러 필드를 읽기 전용으로 지정할 수 있습니다. ``read_only=True``속성을 사용하여 각 필드를 명시 적으로 추가하는 대신 ``read_only_fields`` 메타 옵션을 사용할 수 있습니다.

이 옵션은 필드 이름의 list 또는 tuple 이어야 하며 다음과 같이 선언됩니다.
```python
class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ['id', 'account_name', 'users', 'created']
        read_only_fields = ['account_name']
```
``editable=False`` 및 ``AutoField`` 필드는 기본적으로 읽기 전용으로 설정되며 ``read_only_fields`` 옵션에 추가할 필요가 없습니다.


참고 : 읽기 전용 필드가 Model 수준에서 unique_together 제약 조건의 일부인 특수한 경우가 있습니다. 이 경우 제약 조건을 확인하기 위해 serializer 클래스에 필드가 필요하지만 사용자가 편집 할 수 없어야 합니다.

이를 처리하는 올바른 방법은 serializer 에서 필드를 명시적으로 지정하여 ``read_only=True``및 ``default=…`` 키워드 인수를 모두 제공하는 것 입니다.

이에 대한 한 가지 예는 현재 인증된 User 가 unique_together에 다른 식별자를 가진 읽기 전용 관계 인 경우 사용자 필드를 다음과 같이 선언하십시오.

```python
user = serializers.PrimaryKeyRelatedField(read_only=True, default=serializers.CurrentUserDefault())
```



### 추가 키워드 인수
extra_kwargs 옵션을 사용하여 필드에 임의의 추가 키워드 인수를 지정할 수 있습니다. ``read_only_fields``의 경우와 같이 Serializer에서 필드를 명시적으로 선언할 필요가 없습니다.

이 옵션은 필드 이름을 키워드 인수에 매핑하는 dictionary 입니다. 예를 들면 다음과 같습니다.
```python
class CreateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'username', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User(
            email=validated_data['email'],
            username=validated_data['username']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user
```
필드가 이미 serializer 클래스에서 명시적으로 선언 된 경우 extra_kwargs 옵션이 무시됩니다.



### 관계형 필드
Model 인스턴스를 직렬화 할 때 relationships을 나타내는 여러 가지 방법이 있습니다. 기본적으로는 ModelSerializer에 관련 인스턴스의 기본 키를 사용하는 것입니다.

대체 방식에는 하이퍼링크(hyperlinks)를 사용한 직렬화, 전체 중첩 표현을 직렬화 하거나 또는 사용자 정의를 사용한 직렬화가 포함됩니다.

자세한 내용은 [Serializer Relations](https://www.django-rest-framework.org/api-guide/relations/) 설명서를 참조하십시오.


### 필드 매핑 사용자 정의

ModelSerializer 클래스는 serializer를 인스턴스화 할 때 serializer 필드가 자동으로 결정되는 방식을 변경하기 위해 재정의 할 수있는 API도 제공합니다.

일반적으로 a ModelSerializer가 기본적으로 필요한 필드를 생성하지 않으면 클래스에 명시 적으로 추가하거나 Serializer대신 일반 클래스를 사용해야합니다 . 그러나 어떤 경우에는 주어진 모델에 대해 serializer 필드를 만드는 방법을 정의하는 새로운 기본 클래스를 만들 수 있습니다.

.serializer_field_mapping
Django 모델 클래스를 REST 프레임 워크 직렬 변환기 클래스에 맵핑 이 매핑을 재정 의하여 각 모델 클래스에 사용해야하는 기본 직렬 변환기 클래스를 변경할 수 있습니다.

.serializer_related_field
이 특성은 직렬화 기 필드 클래스 여야하며 기본적으로 관계형 필드에 사용됩니다.

대한 ModelSerializer이 기본값 PrimaryKeyRelatedField.

대한 HyperlinkedModelSerializer이 기본값 serializers.HyperlinkedRelatedField.

serializer_url_field
직렬 변환기의 모든 url필드에 사용해야하는 직렬 변환기 필드 클래스입니다 .

기본값은 serializers.HyperlinkedIdentityField

serializer_choice_field
직렬 변환기의 선택 필드에 사용해야하는 직렬 변환기 필드 클래스입니다.

기본값은 serializers.ChoiceField

#### field_class 및 field_kwargs API
직렬화기에 자동으로 포함되어야하는 각 필드의 클래스 및 키워드 인수를 판별하기 위해 다음 메소드가 호출됩니다. 이러한 각 메소드는의 두 튜플을 반환해야합니다 (field_class, field_kwargs).

.build_standard_field(self, field_name, model_field)
표준 모델 필드에 매핑되는 직렬 변환기 필드를 생성하기 위해 호출됩니다.

기본 구현은 serializer_field_mapping속성을 기반으로 serializer 클래스를 반환 합니다.

.build_relational_field(self, field_name, relation_info)
관계형 모델 필드에 매핑되는 직렬 변환기 필드를 생성하기 위해 호출됩니다.

기본 구현은 serializer_related_field속성을 기반으로 serializer 클래스를 반환 합니다.

relation_info인수는 포함 명명 된 튜플이다 model_field, related_model, to_many및 has_through_model특성.

.build_nested_field(self, field_name, relation_info, nested_depth)
depth옵션이 설정 되면 관계형 모델 필드에 매핑되는 직렬 변환기 필드를 생성하기 위해 호출됩니다 .

기본 구현은 ModelSerializer또는에 기반하여 중첩 된 직렬 변환기 클래스를 동적으로 작성합니다 HyperlinkedModelSerializer.

옵션 nested_depth의 값 depth에서 1을 뺀 값 이 됩니다 .

relation_info인수는 포함 명명 된 튜플이다 model_field, related_model, to_many및 has_through_model특성.

.build_property_field(self, field_name, model_class)
모델 클래스의 특성 또는 인수가없는 메소드에 맵핑되는 직렬 변환기 필드를 생성하기 위해 호출됩니다.

기본 구현은 ReadOnlyField클래스를 반환합니다 .

.build_url_field(self, field_name, model_class)
직렬 변환기 자체 url필드 에 대한 직렬 변환기 필드를 생성하기 위해 호출됩니다 . 기본 구현은 HyperlinkedIdentityField클래스를 반환합니다 .

.build_unknown_field(self, field_name, model_class)
필드 이름이 모델 필드 또는 모델 속성에 매핑되지 않은 경우 호출됩니다. 서브 클래스가이 동작을 사용자 정의 할 수 있지만 기본 구현에서는 오류가 발생합니다.



## HyperlinkedModelSerializer
``HyperlinkedModelSerializer`` 클래스는 relationships를 표현하기 위해 기본 키(primary key) 대신 하이퍼 링크를 사용하는 것을 제외하고는 ``ModelSerializer`` 클래스와 유사합니다.

``HyperlinkedModelSerializer`` 클래스는 기본적으로 기본 키 필드 대신 ``url`` 필드를 포함합니다.

url 필드는 ``HyperlinkedIdentityField`` 필드를 사용하여 표현되며 모델의 모든 relationships은 ``HyperlinkedRelatedField`` 필드를 사용하여 표현됩니다.

fields 옵션에 기본 키를 명시적으로 포함시킬 수 있습니다 . 예를 들면 다음과 같습니다.
```python
class AccountSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Account
        fields = ['url', 'id', 'account_name', 'users', 'created']
```

### 절대 및 상대 URL
``HyperlinkedModelSerializer`` 를 인스턴스화 할 때 serializer 컨텍스트에 현재 request를 포함해야 합니다. :
```python
serializer = AccountSerializer(queryset, context={'request': request})
```

그렇게 하면 하이퍼링크에 적절한 호스트 이름이 포함된 결과 다음과 같이 정규화 된 URL을 사용합니다.
```python
http://api.example.com/accounts/1/
```

다음과 같은 상대적 URL
```python
/accounts/1/
```
상대 URL을 사용하려면, serializer 컨텍스트에 ``{'request': None}``를 명시적으로 전달해야 합니다.




### 하이퍼 링크 된 뷰가 결정되는 방법
모델의 인스턴스의 하이퍼 링크에 사용해야 하는 뷰를 결정하는 방법이 필요합니다.

기본적으로 하이퍼 링크는 ``'{model_name}-detail'`` style과 일치하는 뷰 이름에 해당 하며 pk 키워드 인수로 인스턴스를 찾습니다.

다음과 같이 view_name 및 lookup_field 옵션 중 하나 또는 둘 다를 사용하여 extra_kwargs의 url 필드의 뷰 이름(view name) 및 조회 필드(lookup field)를 대체 할 수 있습니다.
```python
class AccountSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Account
        fields = ['account_url', 'account_name', 'users', 'created']
        extra_kwargs = {
            'url': {'view_name': 'accounts', 'lookup_field': 'account_name'},
            'users': {'lookup_field': 'username'}
        }
```

또는 serializer 의 필드를 명시적으로 설정할 수 있습니다. 예를 들면 다음과 같습니다.
```python
class AccountSerializer(serializers.HyperlinkedModelSerializer):
    url = serializers.HyperlinkedIdentityField(
        view_name='accounts',
        lookup_field='slug'
    )
    users = serializers.HyperlinkedRelatedField(
        view_name='user-detail',
        lookup_field='username',
        many=True,
        read_only=True
    )

    class Meta:
        model = Account
        fields = ['url', 'account_name', 'users', 'created']
```
팁 : 하이퍼링크 된 표현과 URL conf를 올바르게 일치시키는 것은 때때로 약간 어색할 수 있습니다. ``repr``를 사용하여 ``HyperlinkedModelSerializer`` 를 출력하는 것은 의 예를 하는 것은 view names 과 lookup fields 를 정확하게 검사 할 수 있는 특히 유용한 방법입니다.



### URL 필드 이름 변경
URL 필드의 이름은 기본적으로 'url'입니다. ``URL_FIELD_NAME`` 설정을 사용하여 이 설정을 전체적으로 변경할 수 있습니다.


## ListSerializer
이 ListSerializer클래스는 여러 객체를 한 번에 직렬화하고 유효성을 검사하는 동작을 제공합니다. 일반적으로ListSerializer 직접 사용할 필요 는 없지만 many=True직렬 변환기를 인스턴스화 할 때 간단히 전달해야합니다 .

시리얼 라이저가 인스턴스화되고 many=True전달되면 ListSerializer인스턴스가 생성됩니다. 그런 다음 serializer 클래스는 부모의 자식이됩니다.ListSerializer

다음 인수는 전달 된 ListSerializer필드 또는 직렬 변환기 로 전달 될 수도 있습니다 many=True.



### allow_empty

이다 True기본적으로 만 설정할 수 있습니다 False유효한 입력으로 빈 목록을 허용하지 않으려합니다.


### ListSerializer behavior 커스터마이징
이 있습니다 당신은 사용자 정의 할 수있는 몇 가지 사용 사례 ListSerializer동작. 예를 들면 다음과 같습니다.

한 요소가 목록의 다른 요소와 충돌하지 않는지 확인하는 등 목록의 특정 유효성 검사를 제공하려고합니다.
여러 객체의 작성 또는 업데이트 동작을 사용자 정의하려고합니다.
이러한 경우 serializer 클래스 many=True의 list_serializer_class옵션을 사용하여 전달 될 때 사용되는 클래스를 수정할 수 있습니다 Meta.

예를 들면 다음과 같습니다
```python
class CustomListSerializer(serializers.ListSerializer):
    ...

class CustomSerializer(serializers.Serializer):
    ...
    class Meta:
        list_serializer_class = CustomListSerializer
```

#### 다중 작성 사용자 정의
다중 객체 생성의 기본 구현은 단순히 .create()목록의 각 항목을 호출하는 것 입니다. 이 동작을 사용자 정의하려면 전달 될 때 사용되는 클래스 의 .create()메소드 를 사용자 정의해야합니다 .ListSerializermany=True

예를 들면 다음과 같습니다.

```python
class BookListSerializer(serializers.ListSerializer):
    def create(self, validated_data):
        books = [Book(**item) for item in validated_data]
        return Book.objects.bulk_create(books)

class BookSerializer(serializers.Serializer):
    ...
    class Meta:
        list_serializer_class = BookListSerializer
```

#### 여러 업데이트 사용자 정의
기본적으로 ListSerializer클래스는 여러 업데이트를 지원하지 않습니다. 삽입 및 삭제에 필요한 동작이 모호하기 때문입니다.

여러 업데이트를 지원하려면 명시 적으로 업데이트해야합니다. 다중 업데이트 코드를 작성할 때 다음을 명심하십시오.

데이터 목록에서 각 항목에 대해 업데이트 할 인스턴스를 어떻게 결정합니까?
삽입은 어떻게 처리해야합니까? 그것들이 유효하지 않습니까, 아니면 새로운 객체를 생성합니까?
제거는 어떻게 처리해야합니까? 그것들은 객체 삭제 또는 관계 제거를 의미합니까? 자동으로 무시해야합니까, 아니면 유효하지 않습니까?
주문은 어떻게 처리해야합니까? 두 항목의 위치를 ​​변경하면 상태가 변경되거나 무시됩니까?
id인스턴스 시리얼 라이저에 명시 적 필드 를 추가해야합니다 . 내재적으로 생성 된 기본 id필드는로 표시됩니다 read_only. 이로 인해 업데이트시 제거됩니다. 명시 적으로 선언하면 목록 serializer의 update메소드 에서 사용할 수 있습니다 .

다음은 여러 업데이트를 구현하도록 선택하는 방법에 대한 예입니다.
```python
class BookListSerializer(serializers.ListSerializer):
    def update(self, instance, validated_data):
        # Maps for id->instance and id->data item.
        book_mapping = {book.id: book for book in instance}
        data_mapping = {item['id']: item for item in validated_data}

        # Perform creations and updates.
        ret = []
        for book_id, data in data_mapping.items():
            book = book_mapping.get(book_id, None)
            if book is None:
                ret.append(self.child.create(data))
            else:
                ret.append(self.child.update(book, data))

        # Perform deletions.
        for book_id, book in book_mapping.items():
            if book_id not in data_mapping:
                book.delete()

        return ret

class BookSerializer(serializers.Serializer):
    # We need to identify elements in the list using their primary key,
    # so use a writable field here, rather than the default which would be read-only.
    id = serializers.IntegerField()
    ...

    class Meta:
        list_serializer_class = BookListSerializer
```

allow_add_removeREST 프레임 워크 2에 있는 동작 과 유사한 여러 업데이트 조작에 대한 일부 자동 지원을 제공하는 3.1 릴리스와 함께 써드 파티 패키지가 포함될 수 있습니다 .

ListSerializer 초기화 사용자 정의
with serializer many=True가 인스턴스화되면 .__init__()자식 Serializer클래스와 부모 ListSerializer클래스 모두 에 대해 메서드에 전달할 인수와 키워드 인수를 결정해야합니다 .

기본 구현은을 제외한 validators모든 인수와 두 개의 자식 serializer 클래스 용으로 가정되는 사용자 정의 키워드 인수를 모두 전달하는 것입니다.

간혹 many=True전달 될 때 자식 클래스와 부모 클래스를 인스턴스화하는 방법을 명시 적으로 지정해야 할 수도 있습니다 . many_init클래스 메소드 를 사용하면 됩니다.
```python
    @classmethod
    def many_init(cls, *args, **kwargs):
        # Instantiate the child serializer.
        kwargs['child'] = cls()
        # Instantiate the parent list serializer.
        return CustomListSerializer(*args, **kwargs)
```



## BaseSerializer
BaseSerializer 대체 직렬화 및 직렬화 해제 스타일을 쉽게 지원하는 데 사용할 수있는 클래스.

이 클래스는 클래스와 동일한 기본 API를 구현합니다 Serializer.

.data -발신 기본 표현을 반환합니다.
.is_valid() -들어오는 데이터를 역 직렬화하고 유효성을 검사합니다.
.validated_data -검증 된 수신 데이터를 반환합니다.
.errors -유효성 검사 중 오류를 반환합니다.
.save() -검증 된 데이터를 객체 인스턴스에 유지합니다.
serializer 클래스가 지원할 기능에 따라 재정의 할 수있는 네 가지 방법이 있습니다.

.to_representation() -읽기 조작을 위해 직렬화를 지원하도록이를 대체하십시오.
.to_internal_value() -쓰기 작업에 대해 역 직렬화를 지원하도록이를 재정의하십시오.
.create()및 .update()- 오버라이드 중 하나 또는 이들의 모두 인스턴스를 저장 지원합니다.
이 클래스가 같은 인터페이스를 제공하기 때문에 Serializer클래스를 일반에 대한 당신처럼, 당신은 정확하게 기존의 일반적인 클래스 기반 뷰와 함께 사용할 수 있습니다 Serializer또는 ModelSerializer.

그렇게 할 때 눈에 띄는 차이점은 BaseSerializer클래스가 찾아보기 가능한 API에서 HTML 양식을 생성하지 않는다는 것입니다. 반환되는 데이터에 각 필드를 적절한 HTML 입력으로 렌더링 할 수있는 모든 필드 정보가 포함되어 있지 않기 때문입니다.

### 읽기 전용 BaseSerializer클래스
BaseSerializer클래스를 사용하여 읽기 전용 시리얼 라이저를 구현하려면 .to_representation()메서드 를 재정의하면 됩니다. 간단한 Django 모델을 사용하는 예를 살펴 보겠습니다.
```python
class HighScore(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    player_name = models.CharField(max_length=10)
    score = models.IntegerField()
```

HighScore인스턴스를 기본 데이터 유형으로 변환하기위한 읽기 전용 직렬 변환기를 작성하는 것은 간단합니다 .
```python
class HighScoreSerializer(serializers.BaseSerializer):
    def to_representation(self, instance):
        return {
            'score': instance.score,
            'player_name': instance.player_name
        }
```

이제이 클래스를 사용하여 단일 HighScore인스턴스 를 직렬화 할 수 있습니다 .
```python
@api_view(['GET'])
def high_score(request, pk):
    instance = HighScore.objects.get(pk=pk)
    serializer = HighScoreSerializer(instance)
    return Response(serializer.data)
```

또는 여러 인스턴스를 직렬화하는 데 사용하십시오.
```python
@api_view(['GET'])
def all_high_scores(request):
    queryset = HighScore.objects.order_by('-score')
    serializer = HighScoreSerializer(queryset, many=True)
    return Response(serializer.data)
```


### 읽기-쓰기 BaseSerializer클래스
읽기-쓰기 직렬 변환기를 작성하려면 먼저 .to_internal_value()메소드 를 구현해야합니다 . 이 메소드는 오브젝트 인스턴스를 구성하는 데 사용될 유효성 검증 된 값을 리턴하며 serializers.ValidationError제공된 데이터가 올바르지 않은 형식 인 경우를 증가시킬 수 있습니다 .

당신이 구현하면 .to_internal_value(), 기본적인 검증 API는 시리얼에서 사용할 수 있습니다, 당신은 사용할 수 있습니다 .is_valid(), .validated_data그리고 .errors.

또한 지원 .save()하려면 .create()and .update()메소드 중 하나 또는 둘 다를 구현해야 합니다.

다음은 이전 작업의 전체 예이며 HighScoreSerializer, 읽기 및 쓰기 작업을 모두 지원하도록 업데이트되었습니다.
```python
class HighScoreSerializer(serializers.BaseSerializer):
    def to_internal_value(self, data):
        score = data.get('score')
        player_name = data.get('player_name')

        # Perform the data validation.
        if not score:
            raise serializers.ValidationError({
                'score': 'This field is required.'
            })
        if not player_name:
            raise serializers.ValidationError({
                'player_name': 'This field is required.'
            })
        if len(player_name) > 10:
            raise serializers.ValidationError({
                'player_name': 'May not be more than 10 characters.'
            })

        # Return the validated values. This will be available as
        # the `.validated_data` property.
        return {
            'score': int(score),
            'player_name': player_name
        }

    def to_representation(self, instance):
        return {
            'score': instance.score,
            'player_name': instance.player_name
        }

    def create(self, validated_data):
        return HighScore.objects.create(**validated_data)
```



### 새로운 기본 클래스 만들기
이 BaseSerializer클래스는 특정 직렬화 스타일을 처리하거나 대체 스토리지 백엔드와 통합하기 위해 새로운 일반 직렬 변환기 클래스를 구현하려는 경우에도 유용합니다.

다음 클래스는 임의의 객체를 원시적 표현으로 강제 처리하는 일반 직렬 변환기의 예입니다.
```python
class ObjectSerializer(serializers.BaseSerializer):
    """
    A read-only serializer that coerces arbitrary complex objects
    into primitive representations.
    """
    def to_representation(self, instance):
        output = {}
        for attribute_name in dir(instance):
            attribute = getattr(instance, attribute_name)
            if attribute_name.startswith('_'):
                # Ignore private attributes.
                pass
            elif hasattr(attribute, '__call__'):
                # Ignore methods and other callables.
                pass
            elif isinstance(attribute, (str, int, bool, float, type(None))):
                # Primitive types can be passed through unmodified.
                output[attribute_name] = attribute
            elif isinstance(attribute, list):
                # Recursively deal with items in lists.
                output[attribute_name] = [
                    self.to_representation(item) for item in attribute
                ]
            elif isinstance(attribute, dict):
                # Recursively deal with items in dictionaries.
                output[attribute_name] = {
                    str(key): self.to_representation(value)
                    for key, value in attribute.items()
                }
            else:
                # Force anything else to its string representation.
                output[attribute_name] = str(attribute)
        return output
```




## Advanced serializer 사용법

### 직렬화 및 역 직렬화 동작 재정의
serializer 클래스의 serialization 또는 deserialization 동작을 변경해야하는 경우 .to_representation()or .to_internal_value()메서드 를 재정의하면 됩니다.

이것이 유용한 이유는 다음과 같습니다.

새로운 serializer 기본 클래스에 대한 새로운 동작 추가
기존 클래스의 동작을 약간 수정합니다.
많은 양의 데이터를 반환하는 자주 액세스하는 API 엔드 포인트에 대한 직렬화 성능 향상
이러한 방법의 서명은 다음과 같습니다.

#### .to_representation(self, instance)
직렬화가 필요한 객체 인스턴스를 가져 와서 기본 표현을 반환해야합니다. 일반적으로 이것은 내장 Python 데이터 유형의 구조를 반환합니다. 처리 할 수있는 정확한 유형은 API에 대해 구성한 렌더 클래스에 따라 다릅니다.

표현 스타일을 수정하기 위해 재정의 될 수 있습니다. 예를 들면 다음과 같습니다.
```python
def to_representation(self, instance):
    """Convert `username` to lowercase."""
    ret = super().to_representation(instance)
    ret['username'] = ret['username'].lower()
    return ret
```

#### .to_internal_value(self, data)
확인되지 않은 수신 데이터를 입력으로 취하고로 사용할 수있는 확인 된 데이터를 반환해야합니다 serializer.validated_data. serializer 클래스에서 호출 된 경우 반환 값도 .create()or .update()메서드에 전달됩니다 .save().

유효성 검사 중 하나라도 실패하면 메서드는을 발생시켜야합니다 serializers.ValidationError(errors). errors인수는 사전 매핑 필드 이름 (또는해야 settings.NON_FIELD_ERRORS_KEY오류 메시지 목록에). 역 직렬화 동작을 변경할 필요가없고 대신 오브젝트 레벨 유효성 검증을 제공하려는 경우 대신 .validate()메소드 를 대체하는 것이 좋습니다 .

data이 메소드에 전달 된 인수는 일반적으로의 값 request.data이므로 제공하는 데이터 유형은 API에 대해 구성한 구문 분석기 클래스에 따라 다릅니다.


### Serializer 상속 
장고 양식과 유사하게 상속을 통해 직렬 변환기를 확장하고 재사용 할 수 있습니다. 이를 통해 부모 클래스에서 공통 필드 또는 메소드 세트를 선언 한 후 여러 시리얼 라이저에서 사용할 수 있습니다. 예를 들어
```python
class MyBaseSerializer(Serializer):
    my_field = serializers.CharField()

    def validate_my_field(self, value):
        ...

class MySerializer(MyBaseSerializer):
    ...
```

Django Model및 ModelForm클래스 와 마찬가지로 Meta직렬 변환기 의 내부 클래스는 부모의 내부 Meta클래스 에서 암시 적으로 상속되지 않습니다 . 당신이 원하는 경우 Meta부모 클래스에서 상속 클래스를 그렇게 명시 적으로 수행해야합니다. 예를 들면 다음과 같습니다.
```python
class AccountSerializer(MyBaseSerializer):
    class Meta(MyBaseSerializer.Meta):
        model = Account
```

일반적으로 내부 메타 클래스에서 상속을 사용 하지 말고 대신 모든 옵션을 명시 적으로 선언하는 것이 좋습니다 .

또한 다음주의 사항이 serializer 상속에 적용됩니다.

일반적인 파이썬 이름 확인 규칙이 적용됩니다. Meta내부 클래스 를 선언하는 여러 기본 클래스가있는 경우 첫 번째 클래스 만 사용됩니다. 이는 자녀의 Meta존재하는 경우, 그렇지 않으면 Meta첫 번째 부모의 자녀 등을 의미합니다.
서브 클래스에 Field이름을 설정하여 부모 클래스에서 상속 된 상속 을 선언적으로 제거 할 수 있습니다 None.
```python
class MyBaseSerializer(ModelSerializer):
    my_field = serializers.CharField()

class MySerializer(MyBaseSerializer):
    my_field = None
```
그러나이 기술 만 사용하여 부모 클래스에 의해 선언적으로 정의 된 필드를 옵트 아웃 할 수 있습니다. ModelSerializer기본 필드를 생성하는 것을 막지 않습니다 . 기본 필드에서 옵트 아웃하려면 포함 할 필드 지정을 참조하십시오 .



### 필드를 동적으로 수정
직렬 변환기가 초기화되면 .fields특성을 사용하여 직렬 변환기에 설정된 필드 사전에 액세스 할 수 있습니다 . 이 속성에 액세스하고 수정하면 직렬 변환기를 동적으로 수정할 수 있습니다.

fields인수를 직접 수정하면 직렬화기를 선언하는 시점이 아니라 런타임시 직렬화 기 필드의 인수를 변경하는 것과 같은 흥미로운 작업을 수행 할 수 있습니다.

예
예를 들어, 초기화 시점에 직렬 변환기에서 사용해야하는 필드를 설정하려면 다음과 같이 직렬 변환기 클래스를 작성할 수 있습니다.
```python
class DynamicFieldsModelSerializer(serializers.ModelSerializer):
    """
    A ModelSerializer that takes an additional `fields` argument that
    controls which fields should be displayed.
    """

    def __init__(self, *args, **kwargs):
        # Don't pass the 'fields' arg up to the superclass
        fields = kwargs.pop('fields', None)

        # Instantiate the superclass normally
        super(DynamicFieldsModelSerializer, self).__init__(*args, **kwargs)

        if fields is not None:
            # Drop any fields that are not specified in the `fields` argument.
            allowed = set(fields)
            existing = set(self.fields)
            for field_name in existing - allowed:
                self.fields.pop(field_name)
```

그러면 다음을 수행 할 수 있습니다.
```python
>>> class UserSerializer(DynamicFieldsModelSerializer):
>>>     class Meta:
>>>         model = User
>>>         fields = ['id', 'username', 'email']
>>>
>>> print(UserSerializer(user))
{'id': 2, 'username': 'jonwatts', 'email': 'jon@example.com'}
>>>
>>> print(UserSerializer(user, fields=('id', 'email')))
{'id': 2, 'email': 'jon@example.com'}
```





### 기본 필드 사용자 정의
REST 프레임 워크 2는 개발자가 ModelSerializer클래스가 기본 필드 세트를 자동으로 생성하는 방법을 대체 할 수 있도록 API를 제공했습니다 .

이 API는 포함 .get_field(), .get_pk_field()다른 방법.

시리얼 라이저는 기본적으로 3.0으로 재 설계되었으므로이 API는 더 이상 존재하지 않습니다. 생성 된 필드를 계속 수정할 수 있지만 소스 코드를 참조해야하며 변경 사항이 API의 개인 비트에 대해 변경되는 경우 변경 될 수 있음을 알고 있어야합니다.


## Third party packages
The following third party packages are also available.

### Django REST marshmallow
The django-rest-marshmallow package provides an alternative implementation for serializers, using the python marshmallow library. It exposes the same API as the REST framework serializers, and can be used as a drop-in replacement in some use-cases.

### Serpy
The serpy package is an alternative implementation for serializers that is built for speed. Serpy serializes complex datatypes to simple native types. The native types can be easily converted to JSON or any other format needed.

### MongoengineModelSerializer
The django-rest-framework-mongoengine package provides a MongoEngineModelSerializer serializer class that supports using MongoDB as the storage layer for Django REST framework.

### GeoFeatureModelSerializer
The django-rest-framework-gis package provides a GeoFeatureModelSerializer serializer class that supports GeoJSON both for read and write operations.

### HStoreSerializer
The django-rest-framework-hstore package provides an HStoreSerializer to support django-hstore DictionaryField model field and its schema-mode feature.

### Dynamic REST
The dynamic-rest package extends the ModelSerializer and ModelViewSet interfaces, adding API query parameters for filtering, sorting, and including / excluding all fields and relationships defined by your serializers.

### Dynamic Fields Mixin
The drf-dynamic-fields package provides a mixin to dynamically limit the fields per serializer to a subset specified by an URL parameter.

### DRF FlexFields
The drf-flex-fields package extends the ModelSerializer and ModelViewSet to provide commonly used functionality for dynamically setting fields and expanding primitive fields to nested models, both from URL parameters and your serializer class definitions.

### Serializer Extensions
The django-rest-framework-serializer-extensions package provides a collection of tools to DRY up your serializers, by allowing fields to be defined on a per-view/request basis. Fields can be whitelisted, blacklisted and child serializers can be optionally expanded.

### DRF-Base64
DRF-Base64 provides a set of field and model serializers that handles the upload of base64-encoded files.

### QueryFields
djangorestframework-queryfields allows API clients to specify which fields will be sent in the response via inclusion/exclusion query parameters.

### DRF Writable Nested
The drf-writable-nested package provides writable nested model serializer which allows to create/update models with nested related data.


[Serializers](https://www.django-rest-framework.org/api-guide/serializers/#serializers)