# Database 설치

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
> psql -U postgres

> CREATE USER tms_user WITH PASSWORD 'tms_pass';

> CREATE DATABASE tms_local WITH OWNER tms_user;

> GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO tms_user;

> ALTER USER tms_user CREATEDB; # to create test db
```

psql commnads
* \\? list all the commands
* \\l list databases
* \\conninfo display information about current connection
* \\c \[DBNAME\] connect to new database, e.g., \\c template1
* \\dt list tables of the public schema
* \\dt schema-name.* list tables of certain schema, e.g., \\dt public.*
* \\dt *.* list tables of all schemas
* Then you can run SQL statements, e.g., SELECT * FROM my_table;(Note: a statement must be terminated with semicolon ;)
* \\q quit psql


### DB 세팅하기

엔진, DB Name 등을 설정합니다.

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'tms_local',
        'USER': 'tms_user',
        'PASSWORD': 'tms_pass',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}
```

## 마이그레이션

django 패키지에 포함된 모델을 마이그레이션 합니다.

```bash
(myvenv) $ python manage.py makemigrations
(myvenv) $ python manage.py migrate
```

## admin 계정 만들기

admin 계정을 등록합니다.

```bash
(myvenv) $ python manage.py createsuperuser
```

http://127.0.0.1:8000/admin 으로 접속이 가능합니다.

## Django 실행하기

서버를 실행합니다.

```bash
(myvenv) $ python manage.py runserver
```
