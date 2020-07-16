# 쿼리 만들기

사용자가 모델을 생성하면 데이터베이스 API(create, retrieve, update, delete) 가능한 API를 사용할 수 있습니다.

## 학습목표

1. Create, Retreive, Update, Delete
2. Q 를 사용한 Lookup
3. Copy 모델 인스턴스
4. Related 인스턴스
5. raw SQL

이 문서에서는 블로그 앱에 다음과 같은 모델을 만들어 사용하겠습니다.

```python
from django.db import models

class Blog(models.Model):
    name = models.CharField(max_length=100)
    tagline = models.TextField()

    def __str__(self):
        return self.name

class Author(models.Model):
    name = models.CharField(max_length=200)
    email = models.EmailField()

    def __str__(self):
        return self.name

class Entry(models.Model):
    blog = models.ForeignKey(Blog, on_delete=models.CASCADE)
    headline = models.CharField(max_length=255)
    body_text = models.TextField()
    pub_date = models.DateField()
    mod_date = models.DateField()
    authors = models.ManyToManyField(Author)
    number_of_comments = models.IntegerField()
    number_of_pingbacks = models.IntegerField()
    rating = models.IntegerField()

    def __str__(self):
        return self.headline
```

위의 모델이 테이블로 생성된 모습은 다음의 관계로 설명할 수 있다.

<figure><img src="/blog-erd.png" /></figure>
[QuickDBD](https://www.quickdatabasediagrams.com/) 에서 작성.
```txt
Blog
----
id PK int
name string
tagline string

## Author

id PK int
name string
email string

## Entry

id PK int
blog_id FK >- Blog.id
headline string
body_text string
pub_date date
mod_date
number_of_comments int
number_of_pingbacks int
rating int

## EntryAuthor

id PK int
entry_id int FK >- Entry.id
author_id int FK >- Author.id

````


## 객체(레코드) 생성
Django는 데이터베이스 테이블을 나타내기 위해서 모델을 사용합니다. 모델의 인스턴스는 테이블의 레코드를 의미합니다.

키워드 인자를 모델 클래스에 전달하여 초기화하면 객체가 생성되고 save()를 호출하면 데이터베이스에 저장이 됩니다.
```python
>>> from blog.models import Blog, Author, Entry
>>> b1 = Blog(name='Beatles Blog', tagline='All the latest Beatles news.')
>>> b1.save()
>>> b2 = Blog(name='Cheddar', tagline='All the latest Cheddar Talk news.')
>>> b2.save()
````

이 경우에는 INSERT 문을 실행하게 되며, save()를 호출하기 전에는 데이터베이스의 영향을 주지 않습니다. save() 는 값을 반환하지 않습니다.

## Saving changes to objects

변경값을 저장하기 위해서도 save()를 사용합니다. 다음은 name 의 값을 변경합니다.

```python
>>> b2.name = 'Cheddar Talk'
>>> b2.save()
```

이 경우에는 UPDATE 문을 실행하게 됩니다.

### ForeignKey, ManyToManyField 필드 저장

ForeinKey 필드를 저장하는 것은 일반적인 저장과 동일한 방식입니다.

entry 인스턴스의 blog 속성을 변경합니다.

```python
>>> from django.utils import timezone
>>> e = Entry(body_text='body .... text', mod_date=timezone.now(), pub_date=timezone.now(), number_of_comments=5, number_of_pingbacks=3, rating=2, blog=b)
>>> entry = Entry.objects.get(pk=1)
>>> cheese_blog = Blog.objects.get(name="Cheddar Talk")
>>> entry.blog = cheese_blog
>>> entry.save()
```

ManyToManyField 필드의 추가는 약간 다른 방식으로 작동합니다. add() 메소드는 entry 테이블이 아닌 관련 테이블(EntryAuthor)에 레코드를 추가합니다.

```python
>>> from blog.models import Author
>>> joe = Author.objects.create(name="Joe")
>>> entry.authors.add(joe)
```

다수의 ManyToManyField 필드를 추가합니다.

```python
>>> john = Author.objects.create(name="John")
>>> paul = Author.objects.create(name="Paul")
>>> george = Author.objects.create(name="George")
>>> ringo = Author.objects.create(name="Ringo")
>>> entry.authors.add(john, paul, george, ringo)
```

## 객체 가져오기

데이터베이스에서 데이터를 가져오기 위해서는 모델 클래스의 매니저를 통해 queryset를 만들어야 합니다.
QuerySet은 데이터베이스의 개체 모음 그리고 API를 중의적으로 나타냅니다. 0 개, 하나 이상의 필터를 가질 수 있습니다. 필터는 주어진 매개 변수에 따라 쿼리 결과를 좁혀줍니다. SQL 용어에서 QuerySet은 SELECT 문과 같으며 필터는 WHERE 또는 LIMIT와 같은 제한 절입니다.

모델은 하나 이상의 매니저를 가지고 있습니다. 기본 매니저는 objects 입니다.

```python
>>> Blog.objects
<django.db.models.manager.Manager object at ...>
>>> b = Blog(name='Foo', tagline='Bar')
>>> b.objects
Traceback:
    ...
AttributeError: "Manager isn't accessible via Blog instances."
```

objects(매니저)는 인스턴스가 아닌 클래스를 통해서만 접근이 가능합니다. 매니저는 QuerySet을 가지고 있습니다. 예를 들어, Blog.objects.all() 은 데이터베이스 Blog 테이블의 모든 개체를 담고 있는 QuerySet을 반환합니다.

### 필터를 통해서 개체 가져오기

all()에 의해 반환 된 QuerySet은 데이터베이스 테이블의 전체 개체를 가리킵니다. 그러나 일반적으로 전체 개체 집합의 하위 집합만 선택해야 할 필요가 있습니다.

이러한 하위 집합을 만들려면 필터 조건을 추가하여 초기 QuerySet을 세분화합니다. QuerySet을 구체화하는 가장 일반적인 두 가지 방법은 다음과 같습니다.

filter (** kwargs) : 주어진 조회(lookup) 매개 변수와 일치하는 개체를 포함하는 새로운 QuerySet을 반환합니다.
exclude (** kwargs) : 주어진 조회 매개 변수와 일치하지 않는 개체를 포함하는 새로운 QuerySet을 반환합니다.

예를 들어 2006년 Blog Entry 의 QuerySet을 가져 오려면 다음과 같이 filter()를 사용하십시오.

```python
Entry.objects.filter(pub_date__year=2006)
```

위의 조회와 동일합니다.

```python
Entry.objects.all().filter(pub_date__year=2006)
```

#### Chaining filters

QuerySet을 구체화 한 결과 자체가 QuerySet이므로 chaining으로 연결해 사용할 수 있습니다.

```python
>>> Entry.objects.filter(
...     headline__startswith='What'
... ).exclude(
...     pub_date__gte=datetime.date.today()
... ).filter(
...     pub_date__gte=datetime.date(2005, 1, 30)
... )
```

#### Filtered QuerySets are unique

QuerySet을 구체화 할 때마다 이전 QuerySet에 바인딩되지 않은 완전히 새로운 QuerySet을 얻게 됩니다. 각 구체와의 결과로 저장, 사용 및 재사용 할 수 있는 별도의 고유한 QuerySet을 작성합니다.

```python
>>> q1 = Entry.objects.filter(headline__startswith="What")
>>> q2 = q1.exclude(pub_date__gte=datetime.date.today())
>>> q3 = q1.filter(pub_date__gte=datetime.date.today())
```

이 세 가지 QuerySet은 서로 다릅니다. 첫 번째는 "What"로 시작하는 헤드 라인을 포함하는 모든 항목을 포함하는 기본 QuerySet입니다. 두 번째는 첫 번째의 하위 집합이며 pub_date가 오늘 또는 이후인 레코드를 제외하는 추가 기준이 있습니다. 세 번째는 첫 번째의 하위 집합이며 pub_date가 오늘 또는 이후인 레코드만 선택하는 추가 기준이 있습니다. 초기 QuerySet (q1)은 구체화 프로세스의 영향을 받지 않습니다.

#### QuerySets are lazy

QuerySet은 게으르다 – QuerySet을 만드는 것은 데이터베이스 활동과 관련이 없다. 하루 종일 필터를 쌓을 수 있으며 Django는 QuerySet이 평가 될 때까지 실제로 쿼리를 실행하지 않습니다. 이 예제를 살펴보십시오

```python
>>> q = Entry.objects.filter(headline__startswith="What")
>>> q = q.filter(pub_date__lte=datetime.date.today())
>>> q = q.exclude(body_text__icontains="food")
>>> print(q)
```

이것은 세 번의 데이터베이스 hit 처럼 보이지만 실제로 마지막 줄 (print (q))에서 한 번만 데이터베이스에 hit 합니다. 일반적으로 QuerySet의 결과는 "요청"할 때까지 데이터베이스에서 가져 오지 않습니다. 요청하면 데이터베이스에 액세스하여 QuerySet이 평가됩니다. 정확한 평가 시기에 대한 자세한 내용은 [QuerySet 평가시기](https://docs.djangoproject.com/en/3.0/topics/db/queries/)를 참조하십시오.

```python

```

### Retrieving a single object with get()

filter()는 단일 개체만 쿼리와 일치하더라도 QuerySet을 항상 제공합니다.이 경우 단일 요소를 포함하는 QuerySet이 됩니다.

쿼리와 일치하는 개체가 하나만 있는 경우 Manager에서 객체를 직접 반환하는 get() 메서드를 사용할 수 있습니다.

```python
>>> one_entry = Entry.objects.get(pk=1)
```

get() 사용과 [0] 슬라이스로 filter() 사용에는 차이가 있습니다. 쿼리와 일치하는 결과가 없으면 get()은 DoesNotExist 예외를 발생시킵니다. 이 예외는 쿼리가 수행되는 모델 클래스의 속성이므로 위 코드에서 기본 키가 1 인 Entry 개체가 없으면 Django는 Entry.DoesNotExist를 발생시킵니다.

마찬가지로 둘 이상의 항목이 get() 쿼리와 일치하면 MultipleObjectsReturned가 발생합니다.

### Other QuerySet methods

대부분 데이터베이스에서 객체를 찾아야 할 때 all(), get(), filter() 및 exclude()를 사용합니다. 다양한 QuerySet 메소드의 전체 목록은 [QuerySet API Reference](https://docs.djangoproject.com/en/3.0/ref/models/querysets/#queryset-api-reference)를 참조하십시오.

### Limiting QuerySets

Python의 배열 분할 구문으로 QuerySet을 하위 집합을 사용할 수 있습니다. 이는 SQL의 LIMIT 및 OFFSET 절과 동일합니다.

처음 5개 개체를 반환합니다. (LIMIT 5)

```python
Entry.objects.all()[:5]
```

6부터 10까지의 개체를 반환합니다. (OFFSET 5 LIMIT 5)

```python
Entry.objects.all()[5:10]
```

음수 인덱싱 (즉, Entry.objects.all () [-1])은 지원되지 않습니다.

일반적으로 QuerySet을 슬라이스하면 새 QuerySet이 반환되며 쿼리를 평가하지 않습니다. Python 슬라이스 구문의 "step"매개 변수를 사용하는 경우는 예외입니다. 예를 들어, 처음 10 개의 모든 두 번째 객체 목록을 반환하기 위해 실제로 쿼리를 실행합니다.

```python
>>> Entry.objects.all()[:10:2]
```

슬라이스 된 쿼리 세트의 추가 필터링 또는 ordering은 작동 방식의 모호한 특성으로 인해 금지됩니다.

목록이 아닌 단일 객체를 검색하려면 (예 : SELECT foo FROM bar LIMIT 1) 슬라이스 대신 인덱스를 사용하십시오. 예를 들어, 제목을 기준으로 사전 순으로 항목을 정렬 한 후 데이터베이스의 첫 번째 항목을 반환합니다.

```python
Entry.objects.order_by('headline')[0]
```

위와 같은 결과를 얻게 됩니다.

```python
Entry.objects.order_by('headline')[0:1].get()
```

지정된 기준과 일치하는 개체가 없으면 첫 번째는 order_by는 IndexError를 발생시키고 두 번째는 get()은 DoesNotExist를 발생 시킵니다.

### Field lookups

필드 조회는 SQL WHERE 절을 지정하는 방법입니다. 이들은 QuerySet 메소드 filter(), exclude() 및 get()에 키워드 인수로 지정됩니다.

기본 조회 키워드 인수는 field\_\_lookuptype = value 형식을 사용합니다. (이중 밑줄을 사용합니다). 예를 들면 다음과 같습니다.

```python
>>> Entry.objects.filter(pub_date__lte='2006-01-01')
```

다음과 같은 SQL로 변환이 됩니다.

```python
SELECT * FROM blog_entry WHERE pub_date <= '2006-01-01';
```

:::tip
파이썬은 런타임에 이름과 값이 평가되는 임의의 키워드 인수(이름-값)를 허용하는 함수를 정의 할 수 있습니다.
:::

조회에 지정된 필드는 모델 필드의 이름이어야합니다. 단, ForeignKey의 경우 \_id 접미사로 필드 이름을 지정할 수 있습니다. 이 경우에는 value 매개 변수는 외부 모델 기본 키의 원시 값을 포함해야합니다. 예를 들면 다음과 같습니다.

```python
>>> Entry.objects.filter(blog_id=4)
```

잘못된 키워드 인수를 전달하면 조회 함수가 TypeError를 발생시킵니다.

데이터베이스 API는 약 24 가지 조회 유형을 지원합니다. 전체 참조는 [Lookup Field Ref](https://docs.djangoproject.com/en/3.0/ref/models/querysets/#field-lookups)에서 찾을 수 있습니다.

자주 사용되는 몇가지를 살펴 보겠습니다.

exact :

```python
>>> Entry.objects.get(headline__exact="Cat bites dog")
```

다음과 같은 SQL이 생성될 것 입니다.

```python
SELECT ... WHERE headline = 'Cat bites dog';
```

조회 유형(lookup type)을 제공하지 않는 경우, 즉 키워드 인수에 이중 밑줄이 없는 경우 조회 유형은 exact 으로 간주됩니다

iexact : case-insensitive match
```python
>>> Blog.objects.get(name__iexact="beatles blog")
```
"Beatles Blog", "beatles blog"또는 "BeAtlES blOG"라는 제목의 블로그와 일치합니다.

contains : Case-sensitive containment
```python
Entry.objects.get(headline__contains='Lennon')
```
대소 문자를 구분하지 않는 버전 인 icontain도 있습니다.


startswith, endswith : 각각 시작, 끝을 검색합니다. istartswith 및 iendswith라는 대소 문자를 구분하지 않는 버전도 있습니다.


### Lookups that span relationships
Django는 SQL JOIN을 자동으로 관리하면서 조회(lookup)에서 관계(relationship)를 "따르가는" 강력하고 직관적인 방법을 제공합니다. 관계를 확장하려면 원하는 필드에 도달 할 때까지 모델에서 관련 필드 이름을 이중 밑줄로 구분하여 사용합니다.

이 예제는 이름이 'Beatles Blog'인 블로그를 가진 모든 Entry 개체를 검색합니다.
```python
Entry.objects.filter(blog__name='Beatles Blog')
```

이 범위는 원하는 만큼 깊을 수 있습니다.

역으로도 작동합니다. "역방향" 관계를 참조하려면 모델의 소문자 이름을 사용하십시오.

이 예제는 헤드 라인에 'Lennon'이 포함 된 하나 이상의 Entry가 있는 모든 Blog 개체를 검색합니다.
```python
>>> Blog.objects.filter(entry__headline__contains='Lennon')
```

여러 관계에서 필터링하고 중간 모델 중 하나에 필터 조건을 충족하는 값이 없는 경우 Django는 비어있는 (모든 값이 NULL 임) 존재하지만 유효한 오브젝트 인 것처럼 처리합니다. 이 모든 것은 오류가 발생하지 않는다는 것입니다. 예를 들어이 필터에서
```python
Blog.objects.filter(entry__authors__name='Lennon')
```

```python

```

```python

```

```python

```

```python

```


#### Spanning multi-valued relationships

```python

```

```python

```

### Filters can reference fields on the model

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
### The pk lookup shortcut

```python

```

```python

```

### Escaping percent signs and underscores in LIKE statements

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
### Caching and QuerySets

```python

```

```python

```

#### When QuerySets are not cached

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
## Complex lookups with Q objects

## Comparing objects

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

## Deleting objects

## Copying model instances

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
## Updating multiple objects at once

## Related objects

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
### One-to-many relationships

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

#### Forward

#### Following relationships “backward”

#### Using a custom reverse manager

#### Additional methods to handle related objects

### Many-to-many relationships

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

### One-to-one relationships

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

### How are the backward relationships possible?

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

### Queries over related objects

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

## Falling back to raw SQL

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

## filter(A).filter(B) vs filter(A, B)

## select_related and prefetch_related

## How to join 3 tables in query with Djang

```python
# models.py
class Employee(models.Model):
    emp_no = models.IntegerField(primary_key=True)
    first_name = ...
    last_name = ...

    # emp_no first_name  last_name
      ------ ----------  ----------
      10005  Christian   Erde

class DeptEmp(models.Model):
    emp_no = models.ForeignKey(Employee, on_delete=models.CASCADE)
    dept_no = models.ForeignKey(Department, on_delete=models.CASCADE)

    # dept_no_id  emp_no_id
      ----------  ----------
      d003        10005

class Department(models.Model):
    dept_no = models.CharField(primary_key=True, max_length=4)
    dept_name = models.CharField(unique=True, max_length=40)

    #  dept_no     dept_name
       ----------  ---------------
       d003        Human Resources

# views.py
class EmpList(ListView):
    queryset = DeptEmp.objects.all().select_related('emp_no').select_related('dept_no')

# template.html
{% for deptemp in object_list %}
    {{ deptemp.emp_no.first_name }}
    {{ deptemp.emp_no.last_name }}
    {{ deptemp.dept_no.dept_name }}
{% endfor %}
```

## annotate, aggregation and subquery

## Resources

[Making queries](https://docs.djangoproject.com/en/3.0/topics/db/queries/)

[Queryset API](https://docs.djangoproject.com/en/3.0/ref/models/querysets/)

[filter(A).filter(B) vs filter(A, B)](https://hacksoft.io/django-filter-chaining/)

[How to join 3 tables in query with Django](https://stackoverflow.com/questions/43772163/how-to-join-3-tables-in-query-with-django)

[Django select_related and prefetch_related](https://medium.com/better-programming/django-select-related-and-prefetch-related-f23043fd635d)

[5 ORM queries you should know!](https://medium.com/@chrisjune_13837/django-5-orm-queries-you-should-know-a0f4533b31e8)

[Manager vs Query Sets in Django](https://medium.com/@jairvercosa/manger-vs-query-sets-in-django-e9af7ed744e0)
