# First App - 2.Models and the admin site

Fist App - 1.Requests and responses 에 이어지는 설명입니다.

학습 목표

1. 데이터베이스 Setup
2. 모델 작성
3. 마이그레이션과 롤백 
4. 어드민 사이트 이해

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

### 설치 진행 (약 5~10분)
1. 파일을 다운로드한 후에 더블클릭하여 설치를 시작합니다. 
2. PostgreSQL Server, pgAdmin 4, Stack Builder, Command Line Tool 을 선택해서 설치할 수 있습니다.
3. 설치를 진행하면 데이터베이스 슈퍼유저(postgres)의 패스워드를 입력하고 지역을 선택합니다. 포트는 5432로 유지합니다.
4. 설치가 종료되면 pgAdmin 또는 SQL Shell을 실행합니다. 

### Command Line Tool

Command line tool 에 SQL Shell 을 입력하고 창을 열면 Server, Database, Port, Usename, Password 를 입력하여 psql 쉘에 접속이 가능합니다.

### database 만들기

```bash
# connect server as user 
> psql -U postgres

# create user
> CREATE USER tms_user WITH PASSWORD 'tms_pass';

# create db
> CREATE DATABASE tms_local WITH OWNER tms_user;

# create grant
> GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO tms_user;

# connect db
> \c tms_local

python manage.py migrate 이후에 

# show table list
> \dt

                   List of relations
 Schema |            Name            | Type  |  Owner
--------+----------------------------+-------+----------
 public | auth_group                 | table | tms_user
 public | auth_group_permissions     | table | tms_user
 public | auth_permission            | table | tms_user
 public | auth_user                  | table | tms_user
 public | auth_user_groups           | table | tms_user
 public | auth_user_user_permissions | table | tms_user
 public | blog_author                | table | tms_user
 public | blog_blog                  | table | tms_user
 public | blog_entry                 | table | tms_user
 public | blog_entry_authors         | table | tms_user
 public | django_admin_log           | table | tms_user
 public | django_content_type        | table | tms_user
 public | django_migrations          | table | tms_user
 public | django_session             | table | tms_user
 public | polls_choice               | table | tms_user
 public | polls_question             | table | tms_user
(16 rows)
```

### DB 세팅하기

엔진, DB Name 등을 설정합니다.

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'tms_local',
        'USER': 'tms_user',
        'PASSWORD': 'tms_pass',
        'HOST': 'db',
        'PORT': '5432',
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
* 파이썬 데이터베이스 API 를 만들어 모델 객체에서 접근할 수 있게 만듭니다. 

::: tip
Django App 은 'pluggable' 하다고 표현합니다. 여러 프로젝트에 사용할 수 있고 배포할 수 있다는 것을 의미합니다. 
:::

모델을 작성한 후에는 INSTALLED_APPS 에 참조를 설정합니다. polls/apps.py 파일의 PollsConifig 의 package path는 polls.apps.PollsConfig 입니다.  

```python
# mysite/settings.py
INSTALLED_APPS = [
    'polls.apps.PollsConfig',
    ...
]
```

polls App 을 위한 마이레이션 파일을 생성합니다. 

```bash
python manage.py makemigrations polls
```
정상적으로 수행이 끝나면 다음과 같은 결과를 볼 수 있습니다. 

```bash
Migrations for 'polls':
  polls/migrations/0001_initial.py
    - Create model Question
    - Create model Choice
```

마이그레이션은 Django 에서 모델과 데이터베이스가 어떻게 변경이 있는지를 보여주고 실행하게 됩니다. 
<p>

### 마이그레이션 SQL 보기 
sqlmigrate 명령어는 App, 마이그레이션 이름을 얻어서 해당 마이그레이션이 수행항 sql statement 를 보여줍니다.  
```bash
python manage.py sqlmigrate polls 0001
```
다음과 유사한 결과를 볼 수 있습니다. 
```bash
#sqlite
BEGIN;
--
-- Create model Question
--
CREATE TABLE "polls_question" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, 
                                "question_text" varchar(200) NOT NULL, 
                                "pub_date" datetime NOT NULL);
--
-- Create model Choice
--
CREATE TABLE "polls_choice" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, 
                                "choice_text" varchar(200) NOT NULL, 
                                "votes" integer NOT NULL, 
                                "question_id" integer NOT NULL REFERENCES 
                                "polls_question" ("id") 
                                DEFERRABLE INITIALLY DEFERRED);
CREATE INDEX "polls_choice_question_id_c5b4b260" ON "polls_choice" ("question_id");
COMMIT;

# psql
BEGIN;
--
-- Create model Question
--
CREATE TABLE "polls_question" (
    "id" serial NOT NULL PRIMARY KEY,
    "question_text" varchar(200) NOT NULL,
    "pub_date" timestamp with time zone NOT NULL
);
--
-- Create model Choice
--
CREATE TABLE "polls_choice" (
    "id" serial NOT NULL PRIMARY KEY,
    "choice_text" varchar(200) NOT NULL,
    "votes" integer NOT NULL,
    "question_id" integer NOT NULL
);
ALTER TABLE "polls_choice"
  ADD CONSTRAINT "polls_choice_question_id_c5b4b260_fk_polls_question_id"
    FOREIGN KEY ("question_id")
    REFERENCES "polls_question" ("id")
    DEFERRABLE INITIALLY DEFERRED;
CREATE INDEX "polls_choice_question_id_c5b4b260" ON "polls_choice" ("question_id");

COMMIT;
```
* 실제 결과는 데이터베이스에 따라 상이 합니다. 
* 테이블명은 App과 모델의 이름을 조합한 소문자로 자동 작성이 됩니다. 
* Primary Key(id) 는 자동으로 추가됩니다. 
* Foreign key 에 _id 를 자동으로 추가합니다. 
* 데이터베이스에 따라 기술도는 필드 타입들이 존재합니다. 예를 들어 id 필드의 경우 auto_increment (MySQL), serial (PostgreSQL), integer primary key autoincrement (SQLite) 로 Django 에서 자동 생성이 됩니다. 

<p>

migrate 명령어를 실행하여 polls의 테이블을 생성합니다. 
```bash
python manage.py migrate polls
Operations to perform:
  Apply all migrations: admin, auth, contenttypes, polls, sessions
Running migrations:
  Applying polls.0001_initial... OK
```

### 필드 삭제 마이그레이션 
pub_date 필드를 삭제한다면,
```python
class Question(models.Model):
    question_text = models.CharField(max_length=200)
```
다음과 같은 프롬프트를 볼 수 있습니다. 1) 
```bash
Migrations for 'polls':
  polls/migrations/0002_remove_question_pub_date.py
    - Remove field pub_date from question
```

현재 마이그레이션 상태를 보고, 실행합니다. 
```bash
python manage.py showmigrations polls
polls
 [X] 0001_initial
 [ ] 0002_remove_question_pub_date

python manage.py migrate
Operations to perform:
  Apply all migrations: admin, auth, contenttypes, polls, sessions
Running migrations:
  Applying polls.0002_remove_question_pub_date... OK
```

::: tip 
MySQL은 Rollback이 불가능하면 테이블을 새로 작성해야 합니다. 
[Django Migration](https://docs.djangoproject.com/en/3.0/topics/migrations/)
:::

check 명령은 마이그레이션과 관련되어 문제를 일으키는 이슈가 있는지 확인 할 수 있습니다. 
```bash
python manage.py check
System check identified no issues (0 silenced).
```

### 이전 마이그레이션으로 Rollback 
0001 버전으로 Rollback 하고 싶다면, 
```bash
python manage.py migrate polls 0001
Operations to perform:
  Target specific migration: 0001_initial, from polls
Running migrations:
  Rendering model states... DONE
  Unapplying polls.0002_remove_question_pub_date... OK

rm ./polls/migrations/0002_remove_question_pub_date.py
```
Unapplying 후에 polls/migrations/0002_remove_question_pub_date.py 을 디렉토리에서 삭제합니다. 


### 필드 추가 마이그레이션 
end_date 필드를 추가한다면,
```python
class Question(models.Model):
    question_text = models.CharField(max_length=200)
    pub_date = models.DateTimeField('date published')
    end_date = models.CharField('date ended')
```
다음과 같은 프롬프트를 볼 수 있습니다. 모델의 변경 상태에 따라 나오는 가이드에 따라 수행하거나 Quit 을 선택하여 모델을 수정합니다. 
```bash
You are trying to add a non-nullable field 'end_date' to question without a default; we can't do that (the database needs something to populate existing rows).
Please select a fix:
 1) Provide a one-off default now (will be set on all existing rows with a null value for this column)
 2) Quit, and let me add a default in models.py


Select an option: 1
Please enter the default value now, as valid Python
The datetime and django.utils.timezone modules are available, so you can do e.g. timezone.now
Type 'exit' to exit this prompt
>>> timezone.now
Migrations for 'polls':
  polls/migrations/0002_question_end_date.py
    - Add field end_date to question 

python manage.py migrate polls
Operations to perform:
  Apply all migrations: polls
Running migrations:
  Applying polls.0002_question_end_date... OK

```

### SQLite 다운로드 
[DB Browser for SQLite - Standard installer for 64-bit Windows](https://download.sqlitebrowser.org/DB.Browser.for.SQLite-3.12.0-win64.msi)

다음은 프로젝트를 생성한 후 최초 migrate 명령을 수행한 결과입니다.(sqlite)
<figure><img src="/initial_django_sqlite_migrations.png" /></figure>


### 마이그레이션 초기화
```bash
python manage.py migrate my_app zero
```

마이그레이션은 매우 파워풀한 기능입니다. 테이블을 다시 만들거나 하지 않고도 모델이 변경될 때마다  3단계를 따라 실행할 수 있습니다. 
1. 모델을 변경합니다.(in models.py)
2. makemigrations 명령을 실행하여 파일을 생성 합니다. 
3. migrate 명령을 싫행하여 데이터베이스에 변경사항을 적용합니다. 

개발 상의 번거로움이 있음에도 마이그레이션 명령이 두 개(makemigrations, migrate) 으로 나누어진 이유는 버전 컨트롤 시스템에 마이그레이션 파일을 커밋하는 것을 돕기 위해서 입니다. 


## 데이터베이스 API 
파이썬 interactive shell 을 통해 모델 객체의 API를 작동해 보겠습니다. 

```bash
python manage.py shell
```


```python
>>> from polls.models import Choice, Question  # App 수준에서 모듈을 임포트합니다. 

# 아직 등록된 question 이 없습나다.
>>> Question.objects.all()
<QuerySet []>

# 새로운 Question을 생성합니다.
# Django 에서 tzinfo 를 포함한 pub_date를 필요로 하기 때문에 datetime.datetime.now() 대시 timezone.now() 를 사용합니다. 
>>> from django.utils import timezone
>>> q = Question(question_text="What's new?", pub_date=timezone.now())

# save() 를 호출하여 데이터베이스에 저장합니다. .
>>> q.save()

# 레코드는 자동 생성된 ID를 가지고 있습니다.
>>> q.id
1

# 파이썬 속성을 통해 필드에 접근할 수 있습니다.
>>> q.question_text
"What's new?"
>>> q.pub_date
datetime.datetime(2012, 2, 26, 13, 0, 0, 775217, tzinfo=<UTC>)

# 속성을 통해 값을 변경한 후에 save()를 호출하여 저장합니다.
>>> q.question_text = "What's up?"
>>> q.save()

# objects.all() 은 데이터베이스에 있는 모든 question 레코드를 보여줍니다. 
>>> Question.objects.all()
<QuerySet [<Question: Question object (1)>]>
```

object를 조회할 때 '<Question: Question object (1)>'와 같은 값은 도움이 되지 못 합니니다. 따라서 __str__ 메소드를 추가하여 레코드의 분별할 수 있는 도움을 줄 수 있습니다.
```python
# polls/models.py
from django.db import models

class Question(models.Model):
    # ...
    def __str__(self):
        return self.question_text

class Choice(models.Model):
    # ...
    def __str__(self):
        return self.choice_text
```

__str__ 은 interactive 프롬프트 컨벤션만을 위한 것이 아닌 어드민, REST API 에 자동으로 생성되는 결과이기도 합니다. 
```python
Question.objects.all()
<QuerySet [<Question: What's new?>]>
```

추가로 사용자으 메소드를 추가합니다. 
```python
import datetime

from django.db import models
from django.utils import timezone


class Question(models.Model):
    # ...
    def was_published_recently(self):
        return self.pub_date >= timezone.now() - datetime.timedelta(days=1)
```

코드의 변경이 생겼고 관련 모듈을 사용해야 한다면 shell 을 다시 실행해야 합니다. 
```python
>>> from polls.models import Choice, Question

# __str__() 이 잘 작동하는 지 확인합니다.
>>> Question.objects.all()
<QuerySet [<Question: What's up?>]>

# Django 는 keyword arguments를 통해서 데이터베이스 lookup API 사용할 수 있는 방법을 제공합니다. 
>>> Question.objects.filter(id=1)
<QuerySet [<Question: What's up?>]>
>>> Question.objects.filter(question_text__startswith='What')
<QuerySet [<Question: What's up?>]>

# 올해 작성된 question 을 가져옵니다.
>>> from django.utils import timezone
>>> current_year = timezone.now().year
>>> Question.objects.get(pub_date__year=current_year)
<Question: What's up?>

# 생성되지 않은 ID를 통해 question을 가져오려고 하면 exception이 발생합니다.
>>> Question.objects.get(id=2)
Traceback (most recent call last):
    ...
DoesNotExist: Question matching query does not exist.

# primary key 로 Lookup 하는 것은 매우 일반적인 사용입니다. id=1 과 pk=1 은 같다고 볼 수 있습니다.
>>> Question.objects.get(pk=1)
<Question: What's up?>

# 사용자 메소드가 작동하는지 확인합니다. 
>>> q = Question.objects.get(pk=1)
>>> q.was_published_recently()
True

# question 은 여러 쌍의 choice을 가지 수 있습니다. create 메소드는 새로운 choice 객체를 생성하여 추가합니다.  
# relatedobject_set 을 forein key가 작성된 관련 object 를 의미합니다.
>>> q = Question.objects.get(pk=1)

# 아직 choice 가 작성되지 않은 것을 확인합니다.
>>> q.choice_set.all()
<QuerySet []>

# choice 세 개를 생성합니다.
>>> q.choice_set.create(choice_text='Not much', votes=0)
<Choice: Not much>
>>> q.choice_set.create(choice_text='The sky', votes=0)
<Choice: The sky>
>>> c = q.choice_set.create(choice_text='Just hacking again', votes=0)

# Choice object에도 관련된 Question object 에 접근하는 API 가 있습니다.
>>> c.question
<Question: What's up?>

# 그 반대도 역시, Question object는 Choice object에 접근할 수 있습니다.
>>> q.choice_set.all()
<QuerySet [<Choice: Not much>, <Choice: The sky>, <Choice: Just hacking again>]>
>>> q.choice_set.count()
3

# The API automatically follows relationships as far as you need.
# Use double underscores to separate relationships.
# This works as many levels deep as you want; there's no limit.
# Find all Choices for any question whose pub_date is in this year
# (reusing the 'current_year' variable we created above).

# API 를 사용하여 필요한 만큼 자동으로 relationship을 따라 가면 filtering 할 수 있습니다. 
# double underscore 는 relationship을 분리합니다. 
# 
>>> Choice.objects.filter(question__pub_date__year=current_year)
<QuerySet [<Choice: Not much>, <Choice: The sky>, <Choice: Just hacking again>]>

# 다음은 choice 중에 하나를 삭제하는 방식입니다. 
>>> c = q.choice_set.filter(choice_text__startswith='Just hacking')
>>> c.delete()
```

## Django Admin 
### 새로운 Admin 사용자 생성  
```bash
python manage.py createsuperuser

#Enter your desired username and press enter.
Username: admin

#You will then be prompted for your desired email address:
Email address: admin@example.com

# The final step is to enter your password. You will be asked to enter your password twice, the second time as a confirmation of the first.
Password: **********
Password (again): *********
Superuser created successfully.
```

### Admin에서 poll App 데이터 수정하기 
아직 어드민 화면에서 polls App을 볼 수 는 없습니다. App 폴더의 admin.py 에 다음과 같이 코드를 추가합니다. 
```python
# polls/admin.py
from django.contrib import admin

from .models import Question

admin.site.register(Question)
```

이제 아래와 같이 polls 가 추가된 것을 볼 수 있습니다. 
<figure><img src="/admin03t.png" /></figure>
