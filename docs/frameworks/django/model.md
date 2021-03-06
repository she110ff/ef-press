# Model 1

모델은 저장하고 있는 데이터의 필수적인 필드와 동작을 포함하고 있습니다. 일반적으로, 각각의 모델은 하나의 데이터베이스 테이블에 매핑됩니다.

학습 목표
1. 필드 옵션
2. Relationship
3. Meta 옵션
4. 모델 속성과 메소드
5. 모델 상속

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

### primary_key

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
이런 경우 Django는 many-to-many relationship 을 통제(?)할 수 있는 중간 모델을 사용할 수 있습니다. 여기서 부가적인 세부 정보를 사용할 수 있게 됩니다.

```python
from django.db import models

class Person(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name

class Group(models.Model):
    name = models.CharField(max_length=128)
    members = models.ManyToManyField(
        Person,
        through='MemberInterm',
        through_fields=('group', 'person'),
    )

    def __str__(self):
        return self.name

class MemberInterm(models.Model):
    group = models.ForeignKey(Group, on_delete=models.CASCADE)
    person = models.ForeignKey(Person, on_delete=models.CASCADE)
    inviter = models.ForeignKey(
        Person,
        on_delete=models.CASCADE,
        related_name="memberinterm_invites",
    )
    invite_reason = models.CharField(max_length=64)
    date_joined = models.DateField()
```

중간 모델에 몇 가지 주의/제약이 있습니다:

- 중간 모델에는 소스 모델에 대한 외래 키가 하나만 있어야하며 (이 예제에서는 Group이 됨) Django가 ManyToManyField.through_fields를 사용하여 관계에 사용해야하는 외래 키를 명시 적으로 지정해야합니다. 외래 키가 둘 이상 있고 through_fields를 지정하지 않으면 유효성 검사 오류가 발생합니다. 대상 모델에 대한 외래 키에도 유사한 제한이 적용됩니다 (이 예에서는 Person 임).

- 중개 모델을 통해 자신과 다 대 다 관계를 갖는 모델의 경우 동일한 모델에 대한 두 개의 외래 키가 허용되지만 다 대 다 관계의 두 (다른) 측면으로 취급됩니다. 그래도 외래 키가 두 개 이상인 경우 위와 같이 through_fields도 지정해야합니다. 그렇지 않으면 유효성 검사 오류가 발생합니다.

through_fields는 2-tuple('field1', 'field2')을 사용합니다. field1 은 ManyToManyField 를 사용한 모델이며(group), field2 는 타켓 모델(inviter가 아닌 person을 지정) 입니다.

이제 중개자 모델 (이 경우 멤버십)을 사용하도록 ManyToManyField를 설정 했으므로 다 대다 관계를 작성할 준비가되었습니다. 중간 모델의 인스턴스를 작성하여이를 수행합니다.:

<p>

```bash
# through_field 작성 전
python manage.py makemigrations membership
SystemCheckError: System check identified some issues:
ERRORS:
membership.Group.members: (fields.E335) The model is used as an intermediate model by 'membership.Group.members', but it has more than one foreign key to 'Person', which is ambiguous. You must specify which foreign key Django should use via the through_fields keyword argument.
        HINT: If you want to create a recursive relationship, use ForeignKey("self", symmetrical=False, through="Membership").

# through_field 작성 후
python manage.py makemigrations membership
Migrations for 'membership':
  membership/migrations/0001_initial.py
    - Create model Group
    - Create model Person
    - Create model MemberInterm
    - Add field members to group
```

```bash
python manage.py shell

>>> from datetime import date
>>> from membership.models import Person, Group, MemberInterm
>>>
>>> ringo = Person.objects.create(name="Ringo Starr")
>>> paul = Person.objects.create(name="Paul McCartney")
>>> beatles = Group.objects.create(name="The Beatles")
>>> tom = Person.objects.create(name="Tom")

>>> m1 = MemberInterm(person=ringo, group=beatles,
>>>     date_joined=date(1962, 8, 16),
>>>     inviter=tom,
>>>     invite_reason="Needed a new drummer.")
>>> m1.save()

>>> beatles.members.all()
<QuerySet [<Person: Person object (1)>]>

>>> ringo.group_set.all()
<QuerySet [<Group: Group object (1)>]>

>>> m2 = MemberInterm.objects.create(person=paul, group=beatles,
>>>     date_joined=date(1960, 8, 1),
>>>     inviter=tom,
>>>     invite_reason="Wanted to form a band.")
>>> beatles.members.all()
<QuerySet [<Person: Person object (1)>, <Person: Person object (2)>]>
```

sqlmigrate 명령어를 사용하여 모델 마이그레이션 파일의 sql을 확인합니다. 자동으로 생성되는 테이블명에 혼동을 줄 수 있으므로 App 이름과 같은 모델명을 사용하는 것은 피하는 것이 좋습니다.

```bash
python manage.py sqlmigrate membership 0001

BEGIN;
--
-- Create model Group
--
CREATE TABLE "membership_group" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "name" varchar(128) NOT NULL);
--
-- Create model Person
--
CREATE TABLE "membership_person" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "name" varchar(50) NOT NULL);
--
-- Create model MemberInterm
--
CREATE TABLE "membership_memberinterm" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "invite_reason" varchar(64) NOT NULL, "date_joined" date NOT NULL, "group_id" integer NOT NULL REFERENCES "membership_group" ("id") DEFERRABLE INITIALLY DEFERRED, "inviter_id" integer NOT NULL REFERENCES "membership_person" ("id") DEFERRABLE INITIALLY DEFERRED, "person_id" integer NOT NULL REFERENCES "membership_person" ("id") DEFERRABLE INITIALLY DEFERRED);
--
-- Add field members to group
--
CREATE TABLE "new__membership_group" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "name" varchar(128) NOT NULL);
INSERT INTO "new__membership_group" ("id", "name") SELECT "id", "name" FROM "membership_group";
DROP TABLE "membership_group";
ALTER TABLE "new__membership_group" RENAME TO "membership_group";
CREATE INDEX "membership_memberinterm_group_id_89899969" ON "membership_memberinterm" ("group_id");
CREATE INDEX "membership_memberinterm_inviter_id_4f1a4bd3" ON "membership_memberinterm" ("inviter_id");
CREATE INDEX "membership_memberinterm_person_id_2b9bd44b" ON "membership_memberinterm" ("person_id");
COMMIT;
```

add(), create(), 또는 set() 을 사용하여 relationships 을 만들수 있습니다. 필요한 필드는 through_defaults에 추가합니다.:

```python
from datetime import date
from membership.models import Person, Group, MemberInterm

beatles = Group.objects.get(id=1)
sam = Person.objects.create(name="Sam")
john = Person.objects.create(name="John Lennon")

beatles.members.add(john, through_defaults={'date_joined': date(1960, 8, 1), 'inviter': sam})
Group.objects.filter(memberinterm__inviter__name='Sam')

>>> beatles.members.create(name="George Harrison", through_defaults={'date_joined': date(1960, 8, 1), 'inviter': sam})
>>> beatles.members.set([john, paul, ringo, george], through_defaults={'date_joined': date(1960, 8, 1), 'inviter': sam})
```

중간 모델은 unique 한 (model1, model2) pair 를 강제하지 않아 같은 값이 들어갈 수 있습니다. remove() 를 사용하여 through field의 레코드를 삭제할 수 있습니다. :

```python
>>> Membership.objects.create(person=ringo, group=beatles,
...     date_joined=date(1968, 9, 4),
...     inviter=tom,
...     invite_reason="You've been gone for a month and we miss you.")
>>> beatles.members.all()
<QuerySet [<Person: Ringo Starr>, <Person: Paul McCartney>, <Person: Ringo Starr>]>
>>> # Ringo Starr 모두를 삭제합니다.
>>> beatles.members.remove(ringo)
>>> beatles.members.all()
<QuerySet [<Person: Paul McCartney>]>
```

clear() 메소드는 모든 중간 모델 instances를 삭제합니다.

```python
>>> beatles.members.clear()
>>> # Note that this deletes the intermediate model instances
>>> Membership.objects.all()
```

일반적인 다 대 다 관계와 마찬가지로 다 대 다 관련 모델의 속성을 사용하여 쿼리 할 수 ​​있습니다.

```python
>>> Group.objects.filter(members__name__startswith='Paul')
<QuerySet [<Group: The Beatles>]>
```

중간 모델을 사용하면서 해당 속성을 쿼리 할 수도 있습니다.

```python
# Find all the members of the Beatles that joined after 1 Jan 1961
>>> Person.objects.filter(
...     group__name='The Beatles',
...     memberinterm__date_joined__gt=date(1961,1,1))
<QuerySet [<Person: Ringo Starr]>
```

MemberInterm 정보에 액세스해야하는 경우 MemberInterm 모델에 직접 쿼리하여 액세스 할 수 있습니다.

```python
>>> ringos_memberinterm = MemberInterm.objects.get(group=beatles, person=ringo)
>>> ringos_memberinterm.date_joined
datetime.date(1962, 8, 16)
>>> ringos_memberinterm.invite_reason
'Needed a new drummer.'
```

동일한 정보에 액세스하는 또 다른 방법은 Person 객체에서 다 대 다 역 관계를 쿼리하는 것입니다.

```python
>>> ringos_memberinterm = ringo.memberinterm.get(group=beatles)
>>> ringos_memberinterm.date_joined
datetime.date(1962, 8, 16)
>>> ringos_memberinterm.invite_reason
'Needed a new drummer.'
```

### One-to-one relationships

일대일 관계를 정의하려면 OneToOneField를 사용하십시오. 모델의 클래스 속성으로 포함하여 다른 필드 유형과 마찬가지로 사용합니다.

이것은 객체를 "확장"할 때 객체의 기본 키에서 가장 유용합니다.

```python
from django.db import models

class Place(models.Model):
    name = models.CharField(max_length=50)
    address = models.CharField(max_length=80)

    def __str__(self):
        return "%s the place" % self.name

class Restaurant(models.Model):
    place = models.OneToOneField(
        Place,
        on_delete=models.CASCADE,
        primary_key=True,
    )
    serves_hot_dogs = models.BooleanField(default=False)
    serves_pizza = models.BooleanField(default=False)

    def __str__(self):
        return "%s the restaurant" % self.place.name
```

부모 객체를 생성합니다.

```python
>>> p1 = Place(name='Demon Dogs', address='944 W. Fullerton')
>>> p1.save()
>>> p2 = Place(name='Ace Hardware', address='1013 N. Ashland')
>>> p2.save()
```

Restaurant 레코드를 생성하기 위해, “parent” 객체를 primary key 로 전달합니다.:

```python
>>> r = Restaurant(place=p1, serves_hot_dogs=True, serves_pizza=False)
>>> r.save()
```

## Models across files

모델을 다른 앱의 모델과 참조할 수 있습니다. 모델을 가져와서 참조하는 간단한 방식으로 가능합니다. 예를 들어

```python
from django.db import models
from geography.models import ZipCode

class Restaurant(models.Model):
    # ...
    zip_code = models.ForeignKey(
        ZipCode,
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
    )
```

## Field name restrictions

필드 이름은 Python 예약어가 될 수 없습니다. 파이썬 구문 오류가 발생하기 때문입니다. 예를 들어:

```python
class Example(models.Model):
    pass = models.IntegerField() # 'pass' is a reserved word!
```

Django의 쿼리 조회 구문이 작동하는 방식으로 인해 필드 이름에 하나 이상의 밑줄을 포함 할 수 없습니다. 예를 들어

```python
class Example(models.Model):
    foo__bar = models.IntegerField() # 'foo__bar' has two underscores!
```

비슷한 이유로 필드 이름은 밑줄로 끝날 수 없습니다.

## Meta options
모델 내부에 내부 클래스(class Meta)를 사용하여 metadata를 추가할 수 있습니다.
```python
from django.db import models

class Ox(models.Model):
    horn_length = models.IntegerField()

    class Meta:
        ordering = ["horn_length"]
        verbose_name_plural = "oxen"
```
모델의 metadata는 필수 요소는 아닙니다. ordering, db_table, vorbose_name 과 같이 모델에 다양한 기능을 설정할 수 있습니다.  [Model Options](https://docs.djangoproject.com/en/3.0/ref/models/options/)

## Model attributes
가장 중요한 속성은 objects 즉 Manager 입니다. Manager는 데이터베이스에서 인스턴스를 가져오기 위한 query 연산자를 제공합니다. 

## Model methods
모델에 사용자 메소드를 row-level 기능을 objects에 추가하는 것 입니다. 반면에 Manager 메소드는 tabel-wide 에 사용되는 것 입니다. 모델에 비즈니스 로직을 사용할 수 있는 방법입니다. 다음의 마지막 메소드는 속성으로 모델의 속성으로 사용이 됩니다. 
```python
from django.db import models

class Person(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    birth_date = models.DateField()

    def baby_boomer_status(self):
        "Returns the person's baby-boomer status."
        import datetime
        if self.birth_date < datetime.date(1945, 8, 1):
            return "Pre-boomer"
        elif self.birth_date < datetime.date(1965, 1, 1):
            return "Baby boomer"
        else:
            return "Post-boomer"

    @property
    def full_name(self):
        "Returns the person's full name."
        return '%s %s' % (self.first_name, self.last_name)
```

### Overriding predefined model methods
모델에 사전 정의된 메소드를 overriding 하여 사용할 수 있습니다. 특히 save(), delete() 를 사용하는 경우가 많습니다. 
```python
from django.db import models

class Blog(models.Model):
    name = models.CharField(max_length=100)
    tagline = models.TextField()

    def save(self, *args, **kwargs):
        do_something()
        super().save(*args, **kwargs)  # Call the "real" save() method.
        do_something_else()
```


## Executing custom SQL

Raw sql 을 사용할 수 있습니다. [using raw SQL](https://docs.djangoproject.com/en/3.0/topics/db/sql/)

## Model inheritance
Django 모델의 상속은 파이썬의 클래스 상속과 같은 방식으로 작동합니다. 그러나 부모 모델 클래스는 반드시 djagno.db.models.Model 의 자식 클래스이어야 합니다. 

모델 상속의 다음의 세가지 스타일이 있습니다. 
1. 자식 모델에서 반복해서 사용하는 정보를 가지는 부모 모델을 Abstract class 로 사용하는 경우 입니다. 
2. 자식 모델을 사용하여 부모 모델에서 정보를 가지고 오지만 각 자식 모델이 자신으 데이터베이스 테이블을 가지려는 경우 입니다. (Multi-table inheritance)
3. 마지막으로 파이썬 수준에서 모델을 수정하고 싶고  모델 필드의 chaning을 사용하지 않는 경우 입니다. (Proxy model) 

### Abstract class
추상 모델은 다른 자식 모델들에 여러 공통 정보를 상속하기 위해 주로 사용합니다. 이 때, 부모 모델의 Meta 클래스에는 abstract = True 가 있어야 하며, 부모 모델을 기반으로 데이터베이스 테이블을 만들지 않습니다. 부모 모델의 필드는 자식 모델의 테이블에 추가가 됩니다. 

```python
from django.db import models

class CommonInfo(models.Model):
    name = models.CharField(max_length=100)
    age = models.PositiveIntegerField()

    class Meta:
        abstract = True

class Student(CommonInfo):
    home_group = models.CharField(max_length=5)
```
위의 경우 Student 모델은  name, age, home_group 필드를 가지게 됩니다. CommonInfo 모델은 일반적인 모델처럼(table, manager, save()) Django에서 사용되지 않습니다. 

Fields inherited from abstract base classes can be overridden with another field or value, or be removed with None.

#### meta inheritance
추상 모델에 Meta 클래스를 만들수 있습니다. 만약 자식 모델이 Meta 클래스를 정의하지 않으면 부모의 Meta 를 상속 받습니다. 만약 자식 모델의 Meta에서 부모의 Meta 를 서브클래스 하면 확장하게 됩니다. 

```python
from django.db import models

class CommonInfo(models.Model):
    # ...
    class Meta:
        abstract = True
        ordering = ['name']

class Student(CommonInfo):
    # ...
    class Meta(CommonInfo.Meta):
        db_table = 'student_info'
```
abstract=True 를 추가하는 것으로 추상 모델을 상속받는 모델을 추상 모델로 만들 수 있습니다.  db_table 처럼 추상모델의 Meta에 포함할 수 없는 속성이 있습니다. 


### Multi-table inheritance
두 번째 타입의 모델 상속은 부모, 자식 모델 각자 정상적인 모델로 작동하고 각자의 데이터베이스 테이블을 만드는 것 입니다. 자동으로 OneToOneField 가 생성됩니다.

```python
from django.db import models

class Place(models.Model):
    name = models.CharField(max_length=50)
    address = models.CharField(max_length=80)

class Restaurant(Place):
    serves_hot_dogs = models.BooleanField(default=False)
    serves_pizza = models.BooleanField(default=False)
```
Place의 모든 필드는 Restaurant 에서 직접 접근이 가능할 뿐만 아니라 데이터도 양쪽 테이블에 모두 존재합니다. 
```python
>>> Place.objects.filter(name="Bob's Cafe")
>>> Restaurant.objects.filter(name="Bob's Cafe")
```
다중 테이블 상속 상황에서는 자식 클래스가 부모의 Meta 클래스에서 상속하는 것이 이치에 맞지 않습니다. 모든 메타 옵션이 이미 상위 클래스에 적용되었으며 다시 적용하면 모순되는 동작 만 발생합니다 (기본 클래스가 자체적으로 존재하지 않는 추상 기본 클래스 사례와 대조적 임).

### Proxy model
다중 테이블 상속을 사용하면 모델의 각 서브 클래스에 대해 새 데이터베이스 테이블이 작성됩니다. 서브 클래스는 기본 클래스에 존재하지 않는 추가 데이터 필드를 저장할 장소가 필요하기 때문에 이는 일반적으로 원하는 동작입니다. 그러나 때로는 모델의 objecs를 변경하거나 새 메소드 추가하는 정도의 테이블의 변동, 연계 없이 Python 상속 처럼 동작 변경하려고합니다.

프록시 모델은 원래 모델에 대한 프록시 생성. 프록시 모델의 인스턴스를 생성, 삭제 및 업데이트 할 수 있으며 모든 데이터는 프록시되지 않은 원래 모델을 사용하는 것처럼 저장됩니다. 차이점은 원본을 변경하지 않고도 프록시에서 기본 모델 순서 또는 manager와 같은 항목을 변경할 수 있다는 것입니다.

프록시 모델은 일반 모델처럼 선언됩니다. Meta 클래스의 proxy 속성을 True로 설정하여 장고에게 프록시 모델이라고 알려줍니다.

```python
from django.db import models

class Person(models.Model):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)

class MyPerson(Person):
    class Meta:
        proxy = True

    def do_something(self):
        # ...
        pass
```

MyPerson 클래스는 부모 Person 클래스와 동일한 데이터베이스 테이블에서 작동합니다. 특히, Person의 새로운 인스턴스는 MyPerson을 통해 액세스 할 수 있으며 그 반대의 경우도 마찬가지입니다.
```python
>>> p = Person.objects.create(first_name="foobar")
>>> MyPerson.objects.get(first_name="foobar")
<MyPerson: foobar>
```
프록시 모델을 사용하여 모델에 다른 기본 순서를 정의 할 수도 있습니다. 항상 Person 모델을 ordering 하고 싶지는 않지만 프록시를 사용할 때 OrderedPerson는 last_name 속성으로 ordering 합니다. .
```python
class OrderedPerson(Person):
    class Meta:
        ordering = ["last_name"]
        proxy = True
```


[Django Model](https://docs.djangoproject.com/en/3.0/topics/db/models/)
