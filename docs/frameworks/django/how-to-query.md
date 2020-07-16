# 쿼리 만들기
사용자가 모델을 생성하면 데이터베이스 API(create, retrieve, update, delete) 가능한 API를 사용할 수 있습니다. 

학습목표
-------------------------------------
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

Author
-----
id PK int
name string
email string

Entry
----
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
----
id PK int
entry_id int FK >- Entry.id
author_id int FK >- Author.id
```


## 객체(레코드) 생성 
Django는 데이터베이스 테이블을 나타내기 위해서 모델을 사용합니다. 모델의 인스턴스는 테이블의 레코드를 의미합니다. 

키워드 인자를 모델 클래스에 전달하여 초기화하면 객체가 생성되고 save()를 호출하면 데이터베이스에 저장이 됩니다. 
```python
>>> from blog.models import Blog, Author, Entry
>>> b1 = Blog(name='Beatles Blog', tagline='All the latest Beatles news.')
>>> b1.save()
>>> b2 = Blog(name='Cheddar', tagline='All the latest Cheddar Talk news.')
>>> b2.save()
```
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
objects(매니저)는 인스턴스가 아닌 클래스를 통해서만 접근이 가능합니다. 매니저는 QuerySet을 가지고 있습니다. 예를 들어, Blog.objects.all() 은  데이터베이스 Blog 테이블의 모든 개체를 담고 있는 QuerySet을 반환합니다. 


### 필터를 통해서 개체 가져오기 



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

#### Chaining filters


#### Filtered QuerySets are unique


#### QuerySets are lazy


### Retrieving a single object with get()


### Other QuerySet methods


### Limiting QuerySets

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

### Field lookups


### Lookups that span relationships


#### Spanning multi-valued relationships


### Filters can reference fields on the model


### The pk lookup shortcut

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

### Escaping percent signs and underscores in LIKE statements


### Caching and QuerySets


#### When QuerySets are not cached


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


## Updating multiple objects at once


## Related objects


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