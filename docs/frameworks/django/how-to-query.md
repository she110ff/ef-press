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
______
id PK int
name string
tagline string

Author
______
id PK int
name string
email string

Entry
______
id PK int
blog_id FK >- Blog.id
headline string
body_text string
pub_date date
mod_date
number_of_comments int
number_of_pingbacks int
rating int

EntryAuthor
______
id PK int
entry_id int FK >- Entry.id
author_id int FK >- Author.id

````

```bash
python manage.py sqlmigrate blog 0001

BEGIN;
--
-- Create model Author
--
CREATE TABLE "blog_author" (
    "id" serial NOT NULL PRIMARY KEY, 
    "name" varchar(200) NOT NULL, 
    "email" varchar(254) NOT NULL);
--
-- Create model Blog
--
CREATE TABLE "blog_blog" (
    "id" serial NOT NULL PRIMARY KEY, 
    "name" varchar(100) NOT NULL, 
    "tagline" text NOT NULL);
--
-- Create model Entry
--
CREATE TABLE "blog_entry" (
    "id" serial NOT NULL PRIMARY KEY, "headline" varchar(255) NOT NULL, 
    "body_text" text NOT NULL, 
    "pub_date" date NOT NULL, 
    "mod_date" date NOT NULL, 
    "number_of_comments" integer NOT NULL, 
    "number_of_pingbacks" integer NOT NULL, 
    "rating" integer NOT NULL, 
    "blog_id" integer NOT NULL);
CREATE TABLE "blog_entry_authors" (
    "id" serial NOT NULL PRIMARY KEY, 
    "entry_id" integer NOT NULL, 
    "author_id" integer NOT NULL);

ALTER TABLE "blog_entry" ADD CONSTRAINT "blog_entry_blog_id_8cd38d8b_fk_blog_blog_id" FOREIGN KEY ("blog_id") REFERENCES "blog_blog" ("id") DEFERRABLE INITIALLY DEFERRED;
CREATE INDEX "blog_entry_blog_id_8cd38d8b" ON "blog_entry" ("blog_id");

ALTER TABLE "blog_entry_authors" ADD CONSTRAINT "blog_entry_authors_entry_id_author_id_991f9666_uniq" UNIQUE ("entry_id", "author_id");
ALTER TABLE "blog_entry_authors" ADD CONSTRAINT "blog_entry_authors_entry_id_df89c7c1_fk_blog_entry_id" FOREIGN KEY ("entry_id") REFERENCES "blog_entry" ("id") DEFERRABLE INITIALLY DEFERRED;
ALTER TABLE "blog_entry_authors" ADD CONSTRAINT "blog_entry_authors_author_id_44edd3c2_fk_blog_author_id" FOREIGN KEY ("author_id") REFERENCES "blog_author" ("id") DEFERRABLE INITIALLY DEFERRED;
CREATE INDEX "blog_entry_authors_entry_id_df89c7c1" ON "blog_entry_authors" ("entry_id");
CREATE INDEX "blog_entry_authors_author_id_44edd3c2" ON "blog_entry_authors" ("author_id");
COMMIT;
```


## 객체(레코드) 생성
Django는 데이터베이스 테이블을 나타내고 다루기 위해서 모델을 사용합니다. 모델의 인스턴스는 테이블의 레코드 집합을 의미합니다.

키워드 인자를 모델 클래스에 전달하여 객체가 생성되고 save()를 호출하면 데이터베이스에 저장이 됩니다.
```python
>>> from blog.models import Blog, Author, Entry
>>> b1 = Blog(name='Beatles Blog', tagline='All the latest Beatles news.')
>>> b1.save()
>>> b2 = Blog(name='Cheddar', tagline='All the latest Cheddar Talk news.')
>>> b2.save()
````

이 경우에는 INSERT 문을 실행하게 되며, save()를 호출하기 전에는 데이터베이스의 영향을 주지 않습니다. save() 는 값을 반환하지 않습니다.

## Saving changes to objects

변경 값을 저장하기 위해서도 save()를 사용합니다. 다음은 name 의 값을 변경합니다.

```python
>>> b2.name = 'Cheddar Talk'
>>> b2.save()
```

이 경우에는 UPDATE 문을 실행하게 됩니다.

### ForeignKey, ManyToManyField 필드 저장

ForeinKey 필드를 저장하는 것은 일반적인 저장과 동일한 방식입니다.

entry 인스턴스의 blog 속성을 변경하고 save() 합니다.

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

다음은 다수의 ManyToManyField 필드를 추가하는 방식입니다.
```python
>>> john = Author.objects.create(name="John")
>>> paul = Author.objects.create(name="Paul")
>>> george = Author.objects.create(name="George")
>>> ringo = Author.objects.create(name="Ringo")
>>> entry.authors.add(john, paul, george, ringo)
```

## 객체 가져오기

데이터베이스에서 데이터를 가져오기 위해서는 모델 클래스의 매니저를 통해 queryset을 만들어야 합니다.
QuerySet은 데이터베이스의 개체 모음에 대한 API를 의미합니다. 0개 이상의 필터를 가질 수 있습니다. 필터는 주어진 매개 변수에 따라 쿼리 결과를 좁혀 줍니다. SQL 용어에서 QuerySet은 SELECT 문과 같으며 필터는 WHERE 또는 LIMIT와 같은 제한 절입니다.

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

이러한 하위 집합을 만들려면 필터 조건을 추가하여 초기 QuerySet을 구체화 합니다.가장 일반적인 두 가지 방법은 다음과 같습니다.

filter (** kwargs) : 주어진 조회(lookup) 매개 변수와 일치하는 개체를 포함하는 새로운 QuerySet을 반환합니다.

exclude (** kwargs) : 주어진 조회 매개 변수와 일치하지 않는 개체를 포함하는 새로운 QuerySet을 반환합니다.

예를 들어 2006년 발간된 Entry의 QuerySet을 가져 오려면 다음과 같이 filter()를 사용하십시오.
```python
Entry.objects.filter(pub_date__year=2006)
```

위의 조회와 동일합니다.
```python
Entry.objects.all().filter(pub_date__year=2006)
```

#### 필터 체이닝 

QuerySet을 구체화 한 결과가 QuerySet이므로 chaining으로 연결해 사용할 수 있습니다.

```python
>>> Entry.objects.filter(
...     headline__startswith='What'
... ).exclude(
...     pub_date__gte=datetime.date.today()
... ).filter(
...     pub_date__gte=datetime.date(2005, 1, 30)
... )
```

#### 필터의 고유한 QuerySets  

QuerySet을 구체화 할 때마다 이전 QuerySet에 바인딩되지 않은 완전히 새로운 QuerySet을 얻게 됩니다. 각 구체화의 결과로 저장, 사용 및 재사용 할 수 있는 별도의 고유한 QuerySet을 작성 합니다.

```python
>>> q1 = Entry.objects.filter(headline__startswith="What")
>>> q2 = q1.exclude(pub_date__gte=datetime.date.today())
>>> q3 = q1.filter(pub_date__gte=datetime.date.today())
```

위 세 개의 QuerySet은 서로 다릅니다. 첫 번째는 "What"로 시작하는 헤드 라인을 포함하는 모든 항목을 포함하는 기본 QuerySet입니다. 두 번째는 첫 번째의 하위 집합이며 pub_date가 오늘 또는 이후인 레코드를 제외하는 추가 기준이 있습니다. 세 번째는 첫 번째의 하위 집합이며 pub_date가 오늘 또는 이후인 레코드만 선택하는 추가 기준이 있습니다. 초기 QuerySet (q1)은 구체화 프로세스의 영향을 받지 않습니다.

#### 게으른 QuerySets 

QuerySet은 게으르다 – QuerySet을 만드는 것은 데이터베이스 활동과 관련이 없습니다. 게속해서 필터를 연결하더라도 Django는 QuerySet이 평가 될 때까지 실제로 쿼리를 실행하지 않습니다. 이 예제를 살펴보십시오.
```python
>>> q = Entry.objects.filter(headline__startswith="What")
>>> q = q.filter(pub_date__lte=datetime.date.today())
>>> q = q.exclude(body_text__icontains="food")
>>> print(q)
```

이것은 세 번의 데이터베이스 hit 처럼 보이지만 실제로 마지막 줄 (print (q))에서 한 번만 데이터베이스에 hit 합니다. 일반적으로 QuerySet의 결과는 "요청"할 때까지 데이터베이스에서 가져 오지 않습니다. 요청하면 데이터베이스에 액세스하여 QuerySet이 평가됩니다. 정확한 평가 시기에 대한 자세한 내용은 [QuerySet 평가시기](https://docs.djangoproject.com/en/3.0/topics/db/queries/)를 참조하십시오.



### get()으로 단일 개체 조회

filter()는 단일 개체만 쿼리와 일치하더라도 QuerySet을 항상 제공합니다.이 경우 단일 요소를 포함하는 QuerySet이 됩니다.

쿼리와 일치하는 개체가 하나만 있는 경우 Manager에서 객체를 직접 반환하는 get() 메서드를 사용할 수 있습니다.
```python
>>> one_entry = Entry.objects.get(pk=1)
```

get() 사용과  filter()네서 [0] 슬라이스로 사용에는 차이가 있습니다. 쿼리와 일치하는 결과가 없으면 get()은 DoesNotExist 예외를 발생시킵니다. 이 예외는 쿼리가 수행되는 모델 클래스의 속성이므로 위 코드에서 기본 키가 1 인 Entry 개체가 없으면 Django는 Entry.DoesNotExist를 발생시킵니다.

마찬가지로 둘 이상의 항목이 get() 쿼리와 일치하면 MultipleObjectsReturned가 발생합니다.

### QuerySet 메소드 

대부분 데이터베이스에서 객체를 찾아야 할 때 all(), get(), filter() 및 exclude()를 사용합니다. 다양한 QuerySet 메소드의 전체 목록은 [QuerySet API Reference](https://docs.djangoproject.com/en/3.0/ref/models/querysets/#queryset-api-reference)를 참조하십시오.

### QuerySets 분할 조회

Python의 배열 분할(slice) 구문으로 QuerySet을 하위 집합을 조회할 수 있습니다. 이는 SQL의 LIMIT 및 OFFSET 절과 동일합니다.

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

### 필드 lookups

필드 조회(lookup)는 SQL WHERE 절을 지정하는 방법입니다. 이들은 QuerySet 메소드 filter(), exclude() 및 get()에 키워드 인수로 지정됩니다.

기본 조회 키워드 인수는 field\_\_lookuptype = value 형식을 사용합니다. (이중 밑줄을 사용합니다). 예를 들면 다음과 같습니다.

```python
>>> Entry.objects.filter(pub_date__lte='2006-01-01')
```

다음과 같은 SQL로 변환이 됩니다.

```python
SELECT * FROM blog_entry WHERE pub_date <= '2006-01-01';
```

:::tip
파이썬은 런타임에 이름과 값이 평가되는 임의의 키워드 인수(이름-값, **kwargs)를 허용하는 함수를 정의 할 수 있습니다.
:::

조회에 지정된 필드는 모델 필드의 이름이어야 합니다. 단, ForeignKey의 경우 \_id 접미사로 필드 이름을 지정할 수 있습니다. 이 경우 value 매개 변수는 외부 모델 기본 키의 원시 값을 포함해야합니다. 예를 들면 다음과 같습니다.

```python
>>> Entry.objects.filter(blog_id=4)
```

잘못된 키워드 인수를 전달하면 조회 함수가 TypeError를 발생 시킵니다.

데이터베이스 Lookup Field API는 약 24 가지 조회 유형을 지원합니다. 전체 참조는 [Lookup Field Ref](https://docs.djangoproject.com/en/3.0/ref/models/querysets/#field-lookups)에서 찾을 수 있습니다.


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


### 필드 조회의 관계 확장
Django는 SQL JOIN을 자동으로 관리하면서 조회(lookup)에서 관계(relationship)를 "따르가는" 강력하고 직관적인 방법을 제공합니다. 관계를 확장하려면 원하는 필드에 도달 할 때까지 모델에서 관련 필드 이름을 이중 밑줄로 구분하여 사용합니다.

이 예제는 이름이 'Beatles Blog'인 Blog를 가진 모든 Entry 개체를 검색합니다.
```python
Entry.objects.filter(blog__name='Beatles Blog')
```

이 범위는 원하는 만큼 깊을 수 있습니다.

역으로도 작동합니다. "역방향" 관계를 참조하려면 모델의 소문자 이름을 사용하십시오.

이 예제는 headline 에 'Lennon'이 포함 된 하나 이상의 Entry를 포함하는 모든 Blog 개체를 검색합니다.
```python
>>> Blog.objects.filter(entry__headline__contains='Lennon')
```

여러 관계에서 필터링할 때, 중간 모델 중 하나에 필터 조건을 충족하는 값이 없는 경우 Django는 비어있는 (모든 값이 NULL 임) 값으로 그러나 유효한 오브젝트 인 것처럼 처리합니다. 오류가 발생하지 않습니다. 예를 들어
```python
Blog.objects.filter(entry__authors__name='Lennon')
```
(관련 Author모델 이있는 경우) author 항목과 연관된 항목 name 이 없으면 누락으로 인해 오류가 발생 하지 않고 첨부 된 항목이 없는 것처럼 처리됩니다. 혼란스러울 수 있는 유일한 경우는 isnull 사용하는 경우 입니다. :
```python
Blog.objects.filter(entry__authors__name__isnull=True)
```
author가 비어 있는 name을 가지고 있고, 또한(and) entry가 비어 있는 author를 가지고 있는 blog 개체를 반환합니다. 만약 entry가 비어 있는 author를 가지고 있는 blog 개체 원하지 않으면 다음과 같이 쓸 수 있습니다.
```python
Blog.objects.filter(entry__authors__isnull=False, entry__authors__name__isnull=True)
```


#### multi-valued 필터로 관계 확장 
ManyToManyField 또는 reverse ForeignKey의 객체를 필터링 하는 경우, 필터는 두 가지 종류가 있습니다.  Blog, Entry의 관계를 생각해 보면( Blog는 Entry에 일 대 다 관계입니다). 

headline에 "Lennon"이 있고 2008년에 출판 된 항목(pub_date)이 있는 블로그를 찾는 데 관심이 있을 수 있습니다. 또는 headline에 "Lennon" 이 있는 항목에서 2008년에 출판 된 항목(pub_date)이 있는  블로그 항목을 찾을 수도 있습니다. 

첫번째 쿼리:
```python
Blog.objects.filter(entry__headline__contains='Lennon', entry__pub_date__year=2008)
```

두번째 쿼리:
```python
Blog.objects.filter(entry__headline__contains='Lennon').filter(entry__pub_date__year=2008)
```
"Lennon" 을 모두 가지고 있는 두 개의 entry가 한 블로그에 연결되어 있다고 하겠습니다. 그러나 이 중에 어떤 entry 도 2008 년이 아닙니다. 이때, 첫 번째 쿼리는 블로그를 반환하지 않지만 두 번째 쿼리는 해당 블로그를 반환합니다.

두 번째 예에서 첫 번째 필터 는 headlin 에서 “Lennon”이 있는 entry에 연결된 모든 블로그로 쿼리 세트를 제한합니다. 두 번째 필터는 2008 년에 게시 된 entry에 연결된 블로그로 제한합니다. 두 번째 필터에 의해 선택된 entry는 첫 번째 필터의 entry와 같거나 같지 않을 수 있습니다. Entry를 필터링하는 것이 아니라 각 필터와 연결된 Blog 를 필터링하는 것 입니다.


multi-value relationships에서 exclude()는 위에서 언급한 filter()의 같은 방식으로 작동하지는 않습니다. exclude() 경우는 모든 lookup을 다 만족할 필요가 없습니다. 
```python
Blog.objects.exclude(
    entry__headline__contains='Lennon',
    entry__pub_date__year=2008,
)
```
filter() 동작과 달리 두 조건을 모두 만족하는 entry를 기반으로 블로그를 제한 하지는 않습니다. 반대로 제한하기 위해서는 아래와 같이 두 가지 쿼리를 작성해야 합니다
```python
Blog.objects.exclude(
    entry__in=Entry.objects.filter(
        headline__contains='Lennon',
        pub_date__year=2008,
    ),
)
```

### 모델 필드를 참조하는 필터
지금까지 제공된 예에서는 모델 필드의 값을 상수와 비교하는 필터를 구성했습니다. 그러나 모델 필드의 값을 동일한 모델의 다른 필드와 비교하려면 어떻게 해야합니까?

Django는 F expressions을 사용하여 그러 비교를 사용할 수 있습니다. F() 인스턴스는 쿼리 내에서 모델 필드에 대한 참조 역할을 합니다. 이러한 참조를 쿼리 필터에서 사용하여 동일한 모델 인스턴스에서 서로 다른 두 필드의 값을 비교할 수 있습니다.

예를 들어, pingbacks 보다 더 큰 number_of_comments 이 있는 entry 의 목록을 찾으려면 number_of_pingbacks를 참조 할 F() 객체를 구성하고 쿼리에서 해당 객체를 사용 합니다.
```python
>>> from django.db.models import F
>>> Entry.objects.filter(number_of_comments__gt=F('number_of_pingbacks'))
```

Django는 상수, F()객체와 함께 더하기, 빼기, 곱하기, 나누기, 모듈로 및 거듭 제곱 연산을 지원 합니다. pingbacks 보다 두 배 이상의 주석이 있는 모든 entry를 찾으려면 쿼리를 다음과 같이 작성합니다.
```python
>>> Entry.objects.filter(number_of_comments__gt=F('number_of_pingbacks') * 2)
```

rating이 number_of_pingbacks, number_of_comments 수의 합 보다 작은 모든 entry을 찾으려면 다음과 같이 쿼리를 작성 합니다.
```python
>>> Entry.objects.filter(rating__lt=F('number_of_comments') + F('number_of_pingbacks'))
```

이중 밑줄 표기법을 사용하여 F()개체의 관계를 확장 할 수도 있습니다 . 이중 밑줄 객체을 포함하는 F()는 관련 개체에 접근하는 데 필요한 조인 나타냅니다. 예를 들어, Author 이름이 Blog 이름과 동일한 모든 entry을 검색하기 위해 다음과 같은 쿼리를 작성 할 수 있습니다.
```python
>>> Entry.objects.filter(authors__name=F('blog__name'))
```

날짜 및 날짜/시간 필드의 경우 timedelta 개체를 추가하거나 뺄 수 있습니다. 다음은 게시 된 후 3 일 이후에 수정 된 모든 entry를 반환합니다.
```python
>>> from datetime import timedelta
>>> Entry.objects.filter(mod_date__gt=F('pub_date') + timedelta(days=3))
```

F()객체에 의해 비트 연산을 지원 .bitand(), .bitor(), .bitrightshift(),와 .bitleftshift(). 예를 들면 다음과 같습니다.
```python
>>> F('somefield').bitand(16)
```



### pk 필드 조회 shortcut
편의상 Django는 pk(기본 키)를 나타내는 shortcut을 제공합니다.

예제 Blog 모델에서 기본 키는 id 필드 이므로 이 세 명령문은 동일합니다
```python
>>> Blog.objects.get(id__exact=14) # Explicit form
>>> Blog.objects.get(id=14) # __exact is implied
>>> Blog.objects.get(pk=14) # pk implies id__exact
```

pk 사용은  __exact 쿼리에만 국한되지 않습니다. pk는 쿼리 용어를 결합하여 모델의 기본 키에서 쿼리를 수행 할 수 있습니다 .
```python
# Get blogs entries with id 1, 4 and 7
>>> Blog.objects.filter(pk__in=[1,4,7])

# Get all blog entries with id > 14
>>> Blog.objects.filter(pk__gt=14)
```

pk 조회(lookup)는 join 에서도 작동합니다. 예를 들어, 이 세 문장은 동일합니다.
```python
>>> Entry.objects.filter(blog__id__exact=3) # Explicit form
>>> Entry.objects.filter(blog__id=3)        # __exact is implied
>>> Entry.objects.filter(blog__pk=3)        # __pk implies __id__exact
```



### 백분율 기호와 밑줄 이스케이프 
LIKE 조회를 SQL 문에 사용하는 경우에 ( iexact, contains, icontains, startswith, istartswith, endswith 와 iendswith), 두 개의 특수 문자, 퍼센트 기호와 밑줄을 자동으로 이스케이프 합니다.  퍼센트 기호는 여러 문자 와일드 카드와 밑줄은 의미 단일 문자 와일드 카드를 의미가 있습니다.

예를 들어, 백분율 기호가 포함 된 모든 항목을 검색하려면 백분율 기호를 사용할 수 있습니다.
```python
>>> Entry.objects.filter(headline__contains='%')
```
결과 SQL은 다음과 같습니다. 밑줄도 마찬가지입니다.
```python
SELECT ... WHERE headline LIKE '%\%%';
```

### 캐싱과 QuerySets
각각 QuerySet은 데이터베이스 액세스를 최소화하기 위한 캐시를 포함합니다. 작동 방식을 이해하면 가장 효율적인 코드를 작성할 수 있습니다.

새로 작성된 QuerySet에서 캐시가 비어 있습니다. 처음 QuerySet을 평가할 때 ( 따라서 데이터베이스 쿼리가 발생하면) Django는 쿼리 결과를 QuerySet 캐시에 저장하고 명시적으로 요청 된 결과 (예 : QuerySet 반복되는 경우 다음 요소)를 반환합니다.


예를 들어, 다음은 두 개의 QuerySet을 만들어 평가하고 버립니다.
```python
>>> print([e.headline for e in Entry.objects.all()])
>>> print([e.pub_date for e in Entry.objects.all()])
```
즉, 동일한 데이터베이스 쿼리가 두 번 실행되어 데이터베이스 hit이 두 배가 됩니다. 또한 두 Entry  요청 사이에 초 단위로 추가되거나 삭제되었을 수 있으므로 동일한 데이터베이스 레코드가 포함되지 않을 수 있습니다.

이 문제를 피하려면  QuerySet를 저장하고 재사용 하십시오.
```python
>>> queryset = Entry.objects.all()
>>> print([p.headline for p in queryset]) # Evaluate the query set.
>>> print([p.pub_date for p in queryset]) # Re-use the cache from the evaluation.
```

#### 캐싱 되지 안는 QuerySets
QuerySets이 항상 결과를 캐시하지는 않습니다. QuerySets의 일부만 평가할 때 캐시가 검사는 되지만 캐시가 채워지지 않습니다. 특히, 배열의 슬라이스 또는 인덱스를 사용하여 쿼리 집합을 제한하면 캐시가 채워지지 않습니다.

예를 들어 QuerySets 객체에서 특정 인덱스를 반복적으로 가져오면 매번 데이터베이스를 쿼리합니다.
```python
>>> queryset = Entry.objects.all()
>>> print(queryset[5]) # Queries the database
>>> print(queryset[5]) # Queries the database again
```

그러나 전체 쿼리 세트가 이미 평가 된 경우 캐시가 대신 검사됩니다.
```python
>>> queryset = Entry.objects.all()
>>> [entry for entry in queryset] # Queries the database
>>> print(queryset[5]) # Uses cache
>>> print(queryset[5]) # Uses cache
```

다음은 전체 쿼리 세트가 평가되어 캐시를 채우는 다른 작업의 예 입니다.
```python
>>> [entry for entry in queryset]
>>> bool(queryset)
>>> entry in queryset
>>> list(queryset)
```
:::tip
QuerySets 인쇄하는 것만으로는 캐시가 채워지지 않습니다. __repr__()를 호출하여 전체 쿼리 집합의 슬라이스만 반환하기 때문 입니다.
:::


## 복잡한 필드조회를 위한 Q objects
filter() 등의 키워드 인수 쿼리 는 "AND"로 되어 있습니다. 보다 복잡한 쿼리 (예 : OR문이있는 쿼리)를 실행해야하는 경우 Q objects을 사용할 수 있습니다.

Q object(django.db.models.Q)는 키워드 인자의 컬렉션을 캡슐화하는 데 사용되는 개체입니다. 이러한 키워드 인수는 위의 "필드 조회"와 같이 지정됩니다.

예를 들어 다음의 Q 개체는 단일 LIKE 쿼리를 캡슐화 합니다.
```python
from django.db.models import Q
Q(question__startswith='What')
```
Q 개체는 & 및 | 연산자를 사용하여 객체를 결합 할 수 있습니다. 연산자가 두 Q개체에 사용되면 새로운 하나의 Q개체가 생성됩니다.

예를 들어 이 명령문은 두개의 Q "question__startswith"쿼리 의 "OR"을 나타내는 단일 객체를 생성 합니다.
```python
Q(question__startswith='Who') | Q(question__startswith='What')
```

이것은 다음 SQL WHERE절 과 동일합니다 .
```python
WHERE question LIKE 'Who%' OR question LIKE 'What%'
```

임의의 복잡한 문장을 구성 할 수 Q와 객체 & 및 | 연산자를 괄호 그룹으로 묶어서 사용할 수 있습니다. 또한 일반 쿼리 ~ 부정쿼리를 모두 결합한 조합 조회가 가능 합니다
```python
Q(question__startswith='Who') | ~Q(pub_date__year=2005)
```

키워드 인수를 사용하는 각각의 조회 기능 (예를 들어 filter(), exclude(), get()) 에 하나 이상의 인수로 개체로 전달 될 수 있습니다.조회 함수에 여러  Q 객체 인수를 제공하면 인수가 "AND"가됩니다. 예를 들면 다음과 같습니다.
```python
Poll.objects.get(
    Q(question__startswith='Who'),
    Q(pub_date=date(2005, 5, 2)) | Q(pub_date=date(2005, 5, 6))
)
```

대략 다음과 같은 SQL이 작성됩니다. 
```python
SELECT * from polls WHERE question LIKE 'Who%'
    AND (pub_date = '2005-05-02' OR pub_date = '2005-05-06')
```


조회 함수는 Q객체와 키워드 인수를 혼합하여 사용할 수 있습니다 . 조회 함수에 제공된 모든 인수 (키워드 인수 또는 Q 객체)는 "AND"로 함께 표시됩니다. 그러나 Q객체가 제공되는 경우 키워드 인수의 정의보다 우선해야합니다. 예를 들면 다음과 같습니다.
```python
Poll.objects.get(
    Q(pub_date=date(2005, 5, 2)) | Q(pub_date=date(2005, 5, 6)),
    question__startswith='Who',
)
```
이전 예제와 동등한 쿼리 같지만 그러나 유효하지 않습니다.:
```python
# INVALID QUERY
Poll.objects.get(
    question__startswith='Who',
    Q(pub_date=date(2005, 5, 2)) | Q(pub_date=date(2005, 5, 6))
)
```

## Comparing objects
두 모델 인스턴스를 비교하려면 표준 Python 비교 연산자인 double equals sign(==)을 사용하십시오. 내부적으로 두 모델의 기본 키 값을 비교합니다


위 Entry의 예를 사용하면 다음 두 문장은 동일합니다.
```python
>>> some_entry == other_entry
>>> some_entry.id == other_entry.id
```

모델의 기본 키가 id로 호출되지 않으도 문제가 없습니다. 비교는 항상 기본 키를 사용합니다. 예를 들어, 모델의 기본 키 필드가 name이면 다음 두 명령문은 동일합니다.
```python
>>> some_obj == other_obj
>>> some_obj.name == other_obj.name
```


## Deleting objects
삭제 메소드는 delete() 입니다. 이 메소드는 즉시 개체를 삭제하고 삭제 된 개체수와 개체 유형 당 삭제 수가 있는 dictionary를 리턴합니다. 예:
```python
>>> e.delete()
(1, {'weblog.Entry': 1})
```

개체를 대량으로 삭제할 수도 있습니다. 모든 QuerySet 메소드에는 해당 delete()를 가지고 있습니다.

예를 들어  pub_date가 2005년의 모든 Entry 개체가 삭제됩니다.
```python
>>> Entry.objects.filter(pub_date__year=2005).delete()
(5, {'webapp.Entry': 5})
```

Django가 객체를 삭제하면 기본적으로 SQL 제약 ON DELETE CASCADE 조건의 동작을 에뮬레이트합니다. 즉, 삭제할 객체를 가리키는 외래 키가 있는 객체는 함께 삭제됩니다. 예를 들면 다음과 같습니다.
```python
b = Blog.objects.get(pk=1)
# This will delete the Blog and all of its Entry objects.
b.delete()
```


이 CASCADE 동작은 ForeignKey에 대한 on_delete인수를 통해 사용자 지정할 수 있습니다.


delete()는 오직 QuerySet만 있으며 Manager에 노출되지 않습니다. 이는 실수로 Entry.objects.delete()하고 모든 항목을 삭제 하지 못하도록 하는 안전 메커니즘 입니다. 모든 개체를 삭제하려면, 명시적으로 완전한 쿼리 세트를 요청해야 합니다.:
```python
Entry.objects.all().delete()
```

## 모델 인스턴스 복사하기
모델 인스턴스를 복사하기 위한 기본 제공 방법이 없지만 모든 필드 값을 복사하여 새 인스턴스를 쉽게 만들 수 있습니다. 가장 간단한 방법은 pk 설정을 None 으로 하는 것 입니다. 블로그 예제 사용:

```python
blog = Blog(name='My blog', tagline='Blogging is easy')
blog.save() # blog.pk == 1

blog.pk = None
blog.save() # blog.pk == 2
```

상속을 사용하면 상황이 복잡해집니다. 다음과 같은 Blog의 하위 클래스를 고려하면,
```python
class ThemeBlog(Blog):
    theme = models.CharField(max_length=200)

django_blog = ThemeBlog(name='Django', tagline='Django is easy', theme='python')
django_blog.save() # django_blog.pk == 3
```

상속이 작동하는 방식으로 인해 pk 와 id 를 모두 None으로 설정해야 합니다
```python
django_blog.pk = None
django_blog.id = None
django_blog.save() # django_blog.pk == 4
```

이 프로세스는 모델의 데이터베이스 테이블에 포함되지 않은 관계를 복사하지 않습니다. 예를 들어, Entry가 Author에 대해 ManyToManyField 를 가지고 있습니다. entry를 복제 한 후에는 새 entry에 대해 다 대 다 관계를 설정 해야합니다.
```python
entry = Entry.objects.all()[0] # some previous entry
old_authors = entry.authors.all()
entry.pk = None
entry.save()
entry.authors.set(old_authors)
```

OneToOneField의 경우 일대일 고유 제한 조건을 위반하지 않도록 관련 개체를 복제하고 새 개체를 만들어 필드에 지정해야 합니다. 다음의 예는, 위에서 이미 entry 가 복제 되었다고 가정합니다.
```python
detail = EntryDetail.objects.all()[0]
detail.pk = None
detail.entry = entry
detail.save()
```


## Updating multiple objects at once
때로의 QuerySet안에 있는 모든 개체에 대해 특정 값으로 필드를 설정하려고 할 때가 있습니다. 이는  update() 메소드로 작업을 수행 할 수 있습니다. 예를 들면 다음과 같습니다.
```python
#pub_date 가 2007인 모든 headlines 을 변경합니다.
Entry.objects.filter(pub_date__year=2007).update(headline='Everything is the same')
```

이 메소드를 사용하여 비 관계형 필드 및 ForeignKey 필드만 설정할 수 있습니다. 비 관계형 필드의 값을 변경하려면 새 값을 상수로 제공하십시오. ForeignKey 필드의 값을 변경하려면 모델 인스턴스로 설정할 수 있습니다. 예를 들면 다음과 같습니다.
```python
>>> b = Blog.objects.get(pk=1)

# Change every Entry so that it belongs to this Blog.
>>> Entry.objects.all().update(blog=b)
```

이 update()메서드는 즉시 적용되며 쿼리와 일치하는 행 수를 반환합니다 (일부 행에 이미 새 값이있는 경우 업데이트 된 행 수와 같지 않을 수 있음). QuerySet업데이트되는 것에 대한 유일한 제한 은 하나의 데이터베이스 테이블 (모델의 기본 테이블)에만 액세스 할 수 있다는 것입니다. 관련 필드를 기준으로 필터링 할 수 있지만 모델의 기본 테이블에서 열만 업데이트 할 수 있습니다. 예:
```python
>>> b = Blog.objects.get(pk=1)

# Update all the headlines belonging to this Blog.
>>> Entry.objects.select_related().filter(blog=b).update(headline='Everything is the same')
```

주의하십시오 update()방법은 SQL 문에 직접 변환됩니다. 직접 업데이트를위한 대량 작업입니다. 그것은 어떤 실행되지 않습니다 save()귀하의 모델 방법을, 또는 방출 pre_save또는 post_save(호출의 결과입니다 신호 save()) 또는 명예 auto_now필드 옵션을 선택합니다. 에 모든 항목을 저장하고 각 인스턴스 QuerySet 에서 save()메소드가 호출 되는지 확인 하려는 경우 이를 처리하기 위해 특별한 기능이 필요하지 않습니다. 그들을 반복하고 전화 save():
```python
for item in my_queryset:
    item.save()
```

업데이트 호출 은 모델의 다른 필드 값을 기반으로 한 필드를 업데이트 하는데도 사용할 수 있습니다 . 이것은 현재 값을 기준으로 카운터를 증가시킬 때 특히 유용합니다. 예를 들어 블로그의 모든 항목에 대해 핑백 수를 늘리려면 다음을 수행하십시오.F expressions
```python
>>> Entry.objects.all().update(number_of_pingbacks=F('number_of_pingbacks') + 1)
```

그러나 F()filter 및 exclude 절의 객체 와 달리 F()업데이트에서 객체 를 사용할 때 조인을 도입 할 수 없습니다 . 업데이트중인 모델의 로컬 필드 만 참조 할 수 있습니다. F()객체 와의 조인을 시도하면 a FieldError가 발생합니다.
```python
# This will raise a FieldError
>>> Entry.objects.update(headline=F('blog__name'))
```
## Related objects
모델의 관계를 정의 할 때 (즉, ForeignKey, OneToOneField나 ManyToManyField), 모델의 인스턴스들은 관련 개체에 액세스할 수 있는 API를 갖게 됩니다.

이 페이지의 상단에 있는 모델을 사용하여, 예를 들어, Entry객체는 e는  blog의 속성 e.blog에 접근하여 Blog 개체를 관련 얻을 수 있었습니다.

Django는 또한 “다른” 관계의 측면에 대한 API 접근자를 만듭니다. 관련 모델에서 관계를 정의하는 모델로의 링크입니다. 예를 들어, Blog객체 b는  entry_set(b.entry_set.all()) 통해 Entry 관련 객체의 목록에 액세스 할 수 있습니다.


### One-to-many relationships

#### Forward
모델에 ForeignKey가 있는 경우 해당 모델의 인스턴스는 모델의 속성을 통해 관련(외부) 객체에 액세스 할 수 있습니다.

```python
>>> e = Entry.objects.get(id=2)
>>> e.blog # Returns the related Blog object.
```

외래 키의 속성을 통해 가져오고 설정할 수 있습니다. 외래 키에 대한 변경 사항은 save()을 호출 할 때까지 데이터베이스에 저장되지 않습니다. 
```python
>>> e = Entry.objects.get(id=2)
>>> e.blog = some_blog
>>> e.save()
```

ForeignKey 필드가  null=True 인 경우(즉, NULL값을 수 설정 있는), None 을 할당하여 관계를 제거 할 수 있습니다. 예:
```python
>>> e = Entry.objects.get(id=2)
>>> e.blog = None
>>> e.save() # "UPDATE blog_entry SET blog_id = NULL ...;"
```

일대 다 관계에 정방향 액세스는 관련 개체에 처음 액세스 할 때 캐시됩니다. 동일한 객체 인스턴스에서 외래 키에 대한 후속 액세스에서는 캐시된 개체에 접근합니다. 예:
```python
>>> e = Entry.objects.get(id=2)
>>> print(e.blog)  # Hits the database to retrieve the associated Blog.
>>> print(e.blog)  # Doesn't hit the database; uses cached version.
```

다음 방법은 모든 일대 다 관계의 캐시를 미리 재귀 적으로 미리 채 웁니다. 예:select_related() QuerySet
```python
>>> e = Entry.objects.select_related().get(id=2)
>>> print(e.blog)  # Doesn't hit the database; uses cached version.
>>> print(e.blog)  # Doesn't hit the database; uses cached version.
```

#### Following relationships “backward”
모델에 ForeignKey가 있는 경우 외래 키 모델의 인스턴스는 첫 번째 모델의 모든 인스턴스를 반환 하는에 액세스 할 수 있습니다. 기본적으로 Manager 이름은 FOO_set이며 여기서 FOO는 소스 모델 이름으로 소문자입니다. 이 Manager 는 QuerySets 를 반환하며 필터링하고 조작 할 수 있습니다.
```python
>>> b = Blog.objects.get(id=1)
>>> b.entry_set.all() # Returns all Entry objects related to Blog.

# b.entry_set is a Manager that returns QuerySets.
>>> b.entry_set.filter(headline__contains='Lennon')
>>> b.entry_set.count()
```

FOO_set에서 ForeignKey의 매개 변수(related_name)를 설정 하여 이름을 대체 할 수 있습니다. 예를 들어, Entry 모델이 "blog = ForeignKey(Blog, on_delete=models.CASCADE, related_name='entries')" 로 변경 되면 위의 예제 코드는 다음과 같이 사용할 수 있습니다.
```python
>>> b = Blog.objects.get(id=1)
>>> b.entries.all() # Returns all Entry objects related to Blog.

# b.entries is a Manager that returns QuerySets.
>>> b.entries.filter(headline__contains='Lennon')
>>> b.entries.count()
```

#### Using a custom reverse manager
기본적으로 역 관계 참조에 사용되는 RelatedManager 는 것은 해당 모델이 갖는 기본 Manager 의 서브 클래스 입니다 . 주어진 쿼리에 다른 Manager를 지정하려면 다음 구문을 사용할 수 있습니다.

```python
from django.db import models

class Entry(models.Model):
    #...
    objects = models.Manager()  # Default Manager
    entries = EntryManager()    # Custom Manager

b = Blog.objects.get(id=1)
b.entry_set(manager='entries').all()
```

EntryManager에서 기본 필터링을 수행하면 get_queryset() 메소드에 해당 필터링이 all()호출에 적용됩니다.

물론 사용자 정의 리버스 Manager 를 지정하면 해당 사용자 정의 메소드를 호출 할 수도 있습니다.
```python
b.entry_set(manager='entries').is_published()
```

#### Additional methods to handle related objects
QuerySet은 "개체 검색"에 정의 된 방법 외에도 ForeignKey Manager는 관련 개체 집합을 처리하는 데 사용되는 추가 방법을 제공하고 있습니다. 각각의 개요는 다음과 같으며 자세한 내용은 [관련 객체 참조](https://docs.djangoproject.com/en/3.0/ref/models/relations/) 에서 찾을 수 있습니다.

add(obj1, obj2, ...) : 
지정된 모델 객체를 관련 객체 세트에 추가합니다.

create(**kwargs) : 
새 객체를 만들어 저장하고 관련 객체 세트에 넣습니다. 새로 만든 개체를 반환합니다.

remove(obj1, obj2, ...) : 
관련 객체 세트에서 지정된 모델 객체를 제거합니다.

clear() : 
관련 객체 세트에서 모든 객체를 제거합니다.

set(objs) : 
관련 개체 세트를 교체하십시오.


관련 세트의 멤버를 지정하려면 set()에 반복 가능한(iterable) 오브젝트 인스턴스와 함께 메소드를 사용하십시오. 예를 들어, e1 과 e2가 Entry 인스턴스 인 경우 :
```python
b = Blog.objects.get(id=1)
b.entry_set.set([e1, e2])
```


::: tip
remove(), clear() 는 ForeignKeys 가 null=True 때만 작동됩니다.
:::


만약 clear() 가 사용 가능하다면 entry_set 의 기존의 객체가 모두 제거한 후에 iterable 객체(이 경우,리스트)를 세트에 추가된다. clear() 가 가능하지 않은 경우 모든 객체는 기존의 요소를 제거하지 않고 추가됩니다.


이 섹션에 설명 된 각 "역방향" 작업은 데이터베이스에 즉시 영향을 줍니다. 모든 추가, 작성 및 삭제는 즉시 자동으로 데이터베이스에 저장됩니다.


### Many-to-many relationships
다 대 다 관계의 양쪽 끝은 다른 쪽 끝에 자동 API 액세스를 얻습니다. API는 위의 "뒤로"일대 다 관계와 유사하게 작동합니다.

한 가지 차이점은 속성 이름 지정에 있습니다. ManyToManyField 필드를 정의하는 모델은 해당 필드 자체의 속성 이름을 사용하지만 "역" 모델은 원래 모델의 소문자 모델 이름과 '_set' 을 합하여 역 일대 다 관계와 동일하게 사용합니다. 예를 들어 
```python
e = Entry.objects.get(id=3)
e.authors.all() # Returns all Author objects for this Entry.
e.authors.count()
e.authors.filter(name__contains='John')

a = Author.objects.get(id=5)
a.entry_set.all() # Returns all Entry objects for this Author.
```

ForeignKey와 마찬가지로, ManyToManyField 도 related_name을 지정할 수 있습니다. 위의 예에서 Entry의 ManyToManyField에 related_name='entries' 로 지정된 경우 각 Author 인스턴스는 entry_set 대신 entries 속성을 갖습니다.

일대 다 관계와의 또 다른 차이점은  add(), set() 그리고 remove() 메소드에 모델 인스턴스는 뿐만 아니라 기본 키 값도 사용이 가능하다는 것 입니다. 예를 들어 다음의 set() 호출은 동일하게 작동합니다.
```python
a = Author.objects.get(id=5)
a.entry_set.set([e1, e2])
a.entry_set.set([e1.pk, e2.pk])
```


### One-to-one relationships
일대일 관계는 다 대일 관계와 매우 유사합니다. 모델에서 OneToOneField을 정의하면 해당 모델의 인스턴스는 모델의 속성을 통해 관련 객체에 액세스 할 수 있습니다.

예를 들면 다음과 같습니다.
```python
class EntryDetail(models.Model):
    entry = models.OneToOneField(Entry, on_delete=models.CASCADE)
    details = models.TextField()

ed = EntryDetail.objects.get(id=2)
ed.entry # Returns the related Entry object.
```

차이점은 "역방향" 쿼리에서 발생합니다. 일대일 관계의 관련 모델도 Manager 객체에 액세스 할 수 있지만 Manager 객체 모음이 아닌 단일 객체 를 나타냅니다.
```python
e = Entry.objects.get(id=2)
e.entrydetail # returns the related EntryDetail object
```

이 관계에 객체가 할당되어 있지 않으면 Django는 DoesNotExist예외를 발생시킵니다.
순방향 관계를 지정할 때와 같은 방법으로 인스턴스를 역관계에 지정할 수 있습니다.
```python
e.entrydetail = ed
```


### How are the backward relationships possible?

다른 객체 관계형 매퍼는 양쪽에 관계를 정의해야합니다. Django 개발자는 이것이 DRY (Do n't Repeat Yourself) 원칙을 위반한다고 생각하므로 Django는 한쪽 끝의 관계 만 정의하면 됩니다.

그러나 모델 클래스가 다른 모델 클래스가 로드 될 때까지 어떤 모델 클래스가 관련되어 있는지 알지 못한다면 어떻게 이것이 가능합니까?

대답은 app registry에 있습니다. Django가 시작되면 INSTALLED_APPS에 나열된 각 응용 프로그램을 가져온 다음 각 응용 프로그램 내부 models의 모듈을 가져옵니다. 새로운 모델 클래스가 생성 될 때마다 Django는 관련 모델에 역관계를 추가합니다. 관련 모델을 아직 import 하지 않은 경우 Django는 관계를 추적하고 관련 모델을 import 할 때 관계를 추가합니다.

이러한 이유로 사용중인 모든 모델을 INSTALLED_APPS에 응용 프로그램으로 정의해야 합니다. 그렇지 않으면 역방향 관계가 제대로 작동하지 않을 수 있습니다.


### Queries over related objects
관련 개체와 관련된 쿼리는 일반 값 필드의 쿼리와 동일한 규칙을 따릅니다. 일치하는 쿼리 값을 지정할 때 객체 인스턴스 자체 또는 객체의 기본 키 값을 사용할 수 있습니다.

다음과 같은 세 가지 쿼리는 동일 할 것이다 :
```python
Entry.objects.filter(blog=b) # Query using object instance
Entry.objects.filter(blog=b.id) # Query using id from instance
Entry.objects.filter(blog=5) # Query using id directly
```


## Falling back to raw SQL
Django의 데이터베이스 맵퍼가 처리하기에 너무 복잡한 SQL 쿼리를 작성해야하는 경우 수동으로 SQL을 작성할 수 있습니다. Django에는 원시 SQL 쿼리를 작성하기 위한 몇 가지 옵션이 있습니다. [원시 SQL 쿼리](https://docs.djangoproject.com/en/3.0/topics/db/sql/) 수행을 참조하십시오 .

마지막으로 Django 데이터베이스 계층은 데이터베이스에 대한 인터페이스 일뿐입니다. 다른 도구, 프로그래밍 언어 또는 데이터베이스 프레임 워크를 통해 데이터베이스에 액세스 할 수 있습니다. 데이터베이스에 대해 Django 고유의 것은 없습니다.




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
