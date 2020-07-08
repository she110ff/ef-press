# Django 설치

Installation instructions are slightly different depending on whether you’re installing a distribution-specific package, downloading the latest official release, or fetching the latest development version.

## VirtualEnv 설치하기 
프로젝트 디렉토리를 생성합니다. 
```bash
$ mkdir backend
$ cd backend
```

가상환경을 생성합니다. 
```bash
backend> $ python -m venv myvenv
```

가상환경을 실행합니다. 
```bash
myvenv>Script> $ activate
```

가상환경을 중지합니다. 
```bash
myvenv>Script> $ deactivate
```


## PostgreSQL 설치하기 

설치 파일을 다운로드 받습니다.
[PostgreSQL Download](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads)
설치를 진행하면 데이터베이스 슈퍼유저의 패스워드를 입력하고 지역을 선택합니다. 포트는 5432로 유지합니다.
Command line tool 에 SQL Shell 을 입력하고 창을 열면 Server, Database, Port, Usename, Password 를 입력하여 psql 쉘에 접속이 가능합니다. 


## database 만들기   
django 프로젝트를 처음 생성하면 아래와 같이 sqlite를 기반으로 데이터베이스 설정이 작성되어 있습니다. 
```bash
> psql

> CREATE USER sample_user WITH PASSWORD 'sample_password';

> CREATE DATABASE sample_database WITH OWNER sample_user;

> GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO sample_user;
```

## Django DB 세팅하기  
django 프로젝트를 처음 생성하면 아래와 같이 sqlite를 기반으로 데이터베이스 설정이 작성되어 있습니다. 
```python
DATABASES = {
    ‘default’: {
        ‘ENGINE’: ‘django.db.backends.sqlite3’,
        ‘NAME’: os.path.join(BASE_DIR, ‘db.sqlite3’),
    }
}
```

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


## 설정파일 수정하기  
호스트, 타임존, 정적파일 위치를 설정합니다. 
```bash
> python manage.py makemigrations
> python manage.py migrate
```


## 마이그레이션 
django 패키지에 포함된 모델을 마이그레이션 합니다. 
```bash
(myvenv) $ python manage.py migrate
```


## admin 계정 만들기 
admin 계정을 등록합니다. . 
```bash
(myvenv) $ python manage.py createsuperuser
```
http://127.0.0.1:8000/admin 으로 접속이 가능합니다. 

## Django 실행하기 
서버를 실행합니다. 
```bash
(myvenv) $ python manage.py runserver
```