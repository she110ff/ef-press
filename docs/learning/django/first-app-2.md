# First App - 2.Models and the admin site

Fist App - 1.Requests and responses 에 이어지는 설명입니다.

학습 목표

1. 데이터베이스 Setup
2. 모델 작성
3. 어드민 사이트 이해

## 데이터베이스 Setup
site_name/settings.py 파일을 보시면, 일반적인 파이썬 모듈 수준의 변수를 통해서 Django 설정을 하고 있는 것을 볼 수 있습니다. 
<p>
TIME_ZONE 에는 데이터베이스에서 사용할 사용자의 time zone을 입력합니다. [Time Zone List](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)

INSTALLED_APPS 는 활성화 Django 애플리케이션의 목록입니다. 기본적으로 다음과 App이 포함되어 있습니다.  
* django.contrib.admin – 어드민 사이트  
* django.contrib.auth – 인증 시스템
* django.contrib.contenttypes – 컨텐츠 타입 프레임워크
* django.contrib.sessions – 세션 프레임워크.
* django.contrib.messages – 메세징 프레임워크.
* django.contrib.staticfiles – static 파일 관리

해당 App을 사용하기 전에 마이그레이션을 해야 합니다. 


django 프로젝트를 처음 생성하면 아래와 같이 sqlite를 기반으로 데이터베이스 설정이 작성되어 있습니다. 이 설정을 사용하여 쉽게 django 프로젝트를 시작할 수 있습니다. 
```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}
```
* ENGINE : sqlite3, postgresql, mysql, oracle 과 3th party cockroachDB, Firebird, MS-SQL 을 사용할 수 있습니다. 
* NAME : sqlite를 사용한다면 파일의 전체 경로, 다른 데이터베이스라면 DB 이름 입니다.  



## PostgreSQL 설치하기

설치 파일을 다운로드 받습니다.
[PostgreSQL Download](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads)
설치를 진행하면 데이터베이스 슈퍼유저의 패스워드를 입력하고 지역을 선택합니다. 포트는 5432로 유지합니다.
Command line tool 에 SQL Shell 을 입력하고 창을 열면 Server, Database, Port, Usename, Password 를 입력하여 psql 쉘에 접속이 가능합니다.

### database 만들기

```bash
> psql

> CREATE USER sample_user WITH PASSWORD 'sample_password';

> CREATE DATABASE sample_database WITH OWNER sample_user;

> GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO sample_user;
```

### DB 세팅하기

엔진, DB Name 등을 설정합니다.

```python
DATABASES = {
    ‘default’: {
        ‘ENGINE’: ‘django.db.backends.postgresql_psycopg2’,
        ‘NAME’: sample_database,
        ‘USER’: sample_user,
        ‘PASSWORD’: ‘password’,
        ‘HOST’: ‘localhost’,
        ‘PORT’: ‘5432’,
    }
}
```

### 마이그레이션

django 패키지에 포함된 모델을 마이그레이션 합니다.

```bash
(myvenv) $ python manage.py makemigrations
(myvenv) $ python manage.py migrate
```

## 모델 생성 
본질적으로, 모델이란 부가적인 메타데이터를 가진 데이터베이스의 구조(layout)를 말합니다.
<p>
다음에서 Question, Choice 두 개의 모델을 만들고 각 Choice 는 Question의 연결이 됩니다. 
```python
# polls/models.py
from django.db import models


class Question(models.Model):
    question_text = models.CharField(max_length=200)
    pub_date = models.DateTimeField('date published')


class Choice(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    choice_text = models.CharField(max_length=200)
    votes = models.IntegerField(default=0)
```

사용자 모델은 django.db.model.Model 의 서브클래스 입니다. 각 모델의 클래스 변수는 데이터베이스 필드를 표현합니다. 
* 각 필드는 django.db.models.Field( [Field Types](https://docs.djangoproject.com/en/3.0/ref/models/fields/#field-types)) 의 인스턴스 입니다. 
* 필드 인스턴스의 이름 (e.g. question_text or pub_date) 은 데이터베이스 컬럼 이름으로 사용됩니다. 
* 선택적으로 필드의 첫 인자에 human-readable 값을 사용할 수 있습니다. ForeignKey, ManyToManyField and OneToOneField 는 verbose_name 을 사용해야 합니다. 
* 필드의 타입에 따라서 필수 인자를 요구합니다. CharField 의 경우 max_length 가 그러한 예 입니다. 
* default=0 의 예와 같이, 필드는 여러 선택적 인자를 추가할 수 있습니다. 
* Django 는 일반적인 관계형 데이터베이스의 Entity 관계(one-to-one, many-to-one, many-to-many )를 제공합니다. 

### 모델 활성화
모델은 적은 코드로 Django에 여러 정보를 제공하고 Django는 다음을 수행할 수 있습니다. 
* App 을 위한 데이터베이스 스키마를 작성할 수 있습니다. 
* 모델 객체에 접근하여 데이터 베이스를 