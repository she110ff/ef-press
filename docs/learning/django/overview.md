# 살펴 보기

Django의 특징은 웹 개발을 빠르고 쉽게 만들어 주는데 있습니다. 아래에서 그 대략을 살펴 보겠습니다.
장고가 전체적으로 어떻게 작동하는지 이해하는 데 목적이 있습니다.

## Design your model

데이터 모델 문법은 ORM(object-relational mapper)를 통해 모델의 표현하고 사용하는 매우 풍부한 방식을 제공합니다.

```python
# mysite/news/models.py
from django.db import models

class Reporter(models.Model):
    full_name = models.CharField(max_length=70)

    def __str__(self):
        return self.full_name

class Article(models.Model):
    pub_date = models.DateField()
    headline = models.CharField(max_length=200)
    content = models.TextField()
    reporter = models.ForeignKey(Reporter, on_delete=models.CASCADE)

    def __str__(self):
        return self.headline
```

# Install it

데이터 모델을 작성한 다음에는 커맨드라인에 다음 명령을 실행하여 데이터베이스의 table을 자동으로 작성할 수 있습니다.

```python
$ python manage.py makemigrations
$ python manage.py migrate
```

makemigrations 명령어는 데이터베이스에 존재하지 않는 테이블를 확인해서 마이그레이션 파일을 생성합니다.
migrate 명령어는 마이그레이션 파일을 실행하여 데이터베이스에 테이블을 생성합니다.

<p>

## Enjoy the free API

위에서와 같이 모델 코드를 작성하고 데이터베이스에 해당 테이블이 존재한다면 데이터 모델을 사용하여 쉽고 풍부한 데이터 API를 사용할 수 있습니다.

```python
# "news" app에서 models을 불러옵니다.
>>> from news.models import Article, Reporter

# 아직 리포트가 없는 상태입니다.
>>> Reporter.objects.all()
<QuerySet []>

# 새로운 Reporter 레코드를 생성합니다.
>>> r = Reporter(full_name='John Smith')

# save() 를 호출하여 레코드를 저장합니다.
>>> r.save()

# 이제 ID가 생성된 것을 알 수 있습니다.
>>> r.id
1

# 데이터베이스에서 reporter를 확인할 수 있습니다.
>>> Reporter.objects.all()
<QuerySet [<Reporter: John Smith>]>

# 파이썬 객체로 불러온 레코드는 속석으로 필드를 접근할 수 있습니다.
>>> r.full_name
'John Smith'

# Django 다양한 lookup API를 제공합니다.
>>> Reporter.objects.get(id=1)
<Reporter: John Smith>
>>> Reporter.objects.get(full_name__startswith='John')
<Reporter: John Smith>
>>> Reporter.objects.get(full_name__contains='mith')
<Reporter: John Smith>
>>> Reporter.objects.get(id=2)
Traceback (most recent call last):
    ...
DoesNotExist: Reporter matching query does not exist.

# article을 생성합니다.
>>> from datetime import date
>>> a = Article(pub_date=date.today(), headline='Django is cool',
...     content='Yeah.', reporter=r)
>>> a.save()

# 데이터베이스에 생성된 article을 확인합니다.
>>> Article.objects.all()
<QuerySet [<Article: Django is cool>]>

# Article objects get API access to related Reporter objects.
>>> r = a.reporter
>>> r.full_name
'John Smith'

# And vice versa: Reporter objects get API access to Article objects.
>>> r.article_set.all()
<QuerySet [<Article: Django is cool>]>

# The API follows relationships as far as you need, performing efficient
# JOINs for you behind the scenes.
# This finds all articles by a reporter whose name starts with "John".
>>> Article.objects.filter(reporter__full_name__startswith='John')
<QuerySet [<Article: Django is cool>]>

# Change an object by altering its attributes and calling save().
>>> r.full_name = 'Billy Goat'
>>> r.save()

# Delete an object with delete().
>>> r.delete()
```

```python

```

```python

```

```python

```

```python

```
