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


## Django Package 설치하기 

django 패키기를 설치합니다. 
```bash
(myvenv) $ pip install django
```


## Project 만들기 
django 프로젝트의 기본 구조를 생성합니다. 
```bash
(myvenv) $ django-admin startproject app .
```


## 설정파일 수정하기  
호스트, 타임존, 정적파일 위치를 설정합니다. 
```python
#setting.py
ALLOWED_HOSTS = ['127.0.0.1']
TIME_ZONE = 'Asia/Seoul'
STATIC_ROOT = os.path.join(BASE_DIR, 'static')
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