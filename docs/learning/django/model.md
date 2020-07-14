# Model

모델은 저장하고 있는 데이터의 필수적인 필드와 동작을 포함하고 있습니다. 일반적으로, 각각의 모델은 하나의 데이터베이스 테이블에 매핑됩니다.


## Field Option
필드의 타입별로 각기 다른 옵션들이 존재합니다. [Field Option Fully](https://docs.djangoproject.com/en/3.0/ref/models/fields/#common-model-field-options). 여기에서는 자주 사용되는 옵션을 소개하겠습니다. 
### null
True 이면 빈 값을 NULL 로 저장합니다. Default 는 False.

### blank
True 이면 빈 값을 허용합니다. Default 는 False.

::: tip 
null 은 database 관련 개념이며 blank 는 값의 유효성과 관련된 것 입니다. 만약 blank=True 이면 값의 유형성 검사에서 빈 값을 허용하고 False 이면 데이터베이스 저장 전에 값을 요구합니다. 
:::

### choices
2-tuple 의 연속으로 만들어지는 필드를 만들 수 있습니다. 기본적인 폼 widget은 select box 입니다 .



```python
from django.db import models

class Person(models.Model):
    SHIRT_SIZES = (
        ('S', 'Small'),
        ('M', 'Medium'),
        ('L', 'Large'),
    )
    name = models.CharField(max_length=60)
    shirt_size = models.CharField(max_length=1, choices=SHIRT_SIZES)
```
choice 필드의 display 메소드는 get_FOO_display() 과 같이 접근이 가능합니다. 
```bash 
>>> p = Person(name="Fred Flintstone", shirt_size="L")
>>> p.save()
>>> p.shirt_size
'L'
>>> p.get_shirt_size_display()
'Large'
```

### default
필드의 기본 값을 설정합니다.

### help_text
form widget에서 사용하 수 있습니다. 

### unique
True 이면, 테이블에서 항상 unique 값을 가져야 합니다. 

# primary_key
사용자가 지정하지 않은면 Django 는 자동으로 IntegerField를 사용합니다. 어떤 필드를 Primary Key로 대신 사용할 수 있습니다.


## RelationShips
관계형 데이터베이스는 테이블의 관계를 연결하여 사용할 수 있습니다. Django 3가지 유형의 테이블 관계를 정의하고 있습니다. 

### Many-to-one
ForeignKey 필드 유형을 Many 에 해당하는 모델에 사용하고 관련 모델을 첫 번째 인자로 전달합니다.  
```python
from django.db import models

class Manufacturer(models.Model):
    # ...
    pass

class Car(models.Model):
    manufacturer = models.ForeignKey(Manufacturer, on_delete=models.CASCADE)
    # ...
```
ForeignKey 필드의 이름은 사용자 임의로 작성이 가능합니다. 
```python
class Car(models.Model):
    company_that_makes_it = models.ForeignKey(
        Manufacturer,
        on_delete=models.CASCADE,
    )
    # ...
```

### Many-to-many relationships
ManyToManyField 필드를 유형을 양쪽 모델 중 하나의 첫 번째 인자로 전달합니다. 관계에 있어 더 많이 포함하는 모델에 정의하는 것을 기준할 수 도 있습니다.
```python
from django.db import models

class Topping(models.Model):
    # ...
    pass

class Pizza(models.Model):
    # ...
    toppings = models.ManyToManyField(Topping)
```
#### Extra fields on many-to-many relationships
When you’re only dealing with many-to-many relationships such as mixing and matching pizzas and toppings, a standard ManyToManyField is all you need. However, sometimes you may need to associate data with the relationship between two models.
pizza, topping 처럼 믹스와 매칭의 일반적인 사용을 위해서는 ManyToManyField를 정의하는 것으로 충분합니다. 그러나 

<p>
예를 들어, 사람(Person)은 여러 그룹(Group)에 속해 있습니다. 또 그룹은 여러 사람을 멤버로 가지고 있습니다. 여기까지는 일반적인 many-to-many 관계입니다. 그런데 사람이 그룹에 가입한 날짜나 가입 사유와 같은 더 많은 정보를 추가해야 한다면, 이 정보들은 Person, Group 어디에도 모델에도 종속적일 수 없습니다. 
<p>
이런 경우 Django는 many-to-many relationship 을 통제(?)할 수 있는 중간자 모델을 사용할 수 있습니다. 여기서 부가적인 세부 정보를 사용할 수 있게 됩니다. 

```python
from django.db import models

class Person(models.Model):
    name = models.CharField(max_length=50)

class Group(models.Model):
    name = models.CharField(max_length=128)
    members = models.ManyToManyField(
        Person,
        through='Membership',
        through_fields=('group', 'person'),
    )

class Membership(models.Model):
    group = models.ForeignKey(Group, on_delete=models.CASCADE)
    person = models.ForeignKey(Person, on_delete=models.CASCADE)
    inviter = models.ForeignKey(
        Person,
        on_delete=models.CASCADE,
        related_name="membership_invites",
    )
    invite_reason = models.CharField(max_length=64)
```
중간자 모델에 몇 가지 주의/제약이 있습니다:

* 중간자 모델에 소스 모델인 many-to-many 모델들을 모두 ForeignKey 로 지정합니다.  Your intermediate model must contain one - and only one - foreign key to the source model (this would be Group in our example), or you must explicitly specify the foreign keys Django should use for the relationship using ManyToManyField.through_fields. If you have more than one foreign key and through_fields is not specified, a validation error will be raised. A similar restriction applies to the foreign key to the target model (this would be Person in our example).
* For a model which has a many-to-many relationship to itself through an intermediary model, two foreign keys to the same model are permitted, but they will be treated as the two (different) sides of the many-to-many relationship. If there are more than two foreign keys though, you must also specify through_fields as above, or a validation error will be raised.
Now that you have set up your ManyToManyField to use your intermediary model (Membership, in this case), you’re ready to start creating some many-to-many relationships. You do this by creating instances of the intermediate model:
<p>


```python
>>> ringo = Person.objects.create(name="Ringo Starr")
>>> paul = Person.objects.create(name="Paul McCartney")

>>> beatles = Group.objects.create(name="The Beatles")

>>> m1 = Membership(person=ringo, group=beatles,
...     date_joined=date(1962, 8, 16),
...     invite_reason="Needed a new drummer.")
>>> m1.save()

>>> beatles.members.all()
<QuerySet [<Person: Ringo Starr>]>
>>> ringo.group_set.all()
<QuerySet [<Group: The Beatles>]>
>>> m2 = Membership.objects.create(person=paul, group=beatles,
...     date_joined=date(1960, 8, 1),
...     invite_reason="Wanted to form a band.")
>>> beatles.members.all()
<QuerySet [<Person: Ringo Starr>, <Person: Paul McCartney>]>
```



```python

```

```python

```

```python

```

```python

```

```python

```

```python

```

```python

```

[Django Model](https://docs.djangoproject.com/en/3.0/topics/db/models/)