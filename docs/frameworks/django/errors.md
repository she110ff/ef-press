# Error

## 환경

* Windows 10 
* Python 3.8.3
* Django 3.0.8 

## PowerShell 권한 오류

VS Code 에서 파워셀이 실행되는 경우 권한 오류가 아래와 같이 발생할 수 있습니다. 

```bash
+ CategoryInfo          : 보안 오류: (:) [], PSSecurityException
```

Visual Studio Code 실행 파일에서 오른쪽 마우스를 클릭하여 속성 창을 열어 주세요. 호환성 탭의 마지막 부분에서 '' 를 체크하고 확인을 한 후에 다시 VS Code 를 실행합니다. 


## postgres scheme

아래와 같은 DB, SCHEME, TABLE 설정을 가정합니다. 
```python
CREATE USER tester WITH PASSWORD 'lol so easy';
CREATE DATABASE multi_schema_db WITH OWNER tester;
CREATE SCHEMA samples AUTHORIZATION tester;
CREATE TABLE samples.my_samples (
  id          INTEGER   NOT NULL PRIMARY KEY,
  description CHAR(255) NOT NULL
)
```

### 라우터 미사용 시

다른 데이터베이스 연결 path 설정에 스키마를 추가하십시오.
```python
DATABASES = {

'default': {
    'ENGINE': 'django.db.backends.postgresql_psycopg2',
    'OPTIONS': {
        'options': '-c search_path=samples,public'
    },
    'NAME': 'multi_schema_db',
    'USER': 'tester',
    'PASSWORD': 'lol so easy',
    'HOST': 'localhost'

},
public에 django user관련 테이블이 있는 경우, public을 추가합니다.
```

다음으로 MySample 모델을 작성하십시오 .
```python
from django.db import models

class MySample(models.Model):
    description = models.CharField(max_length=255, null=False)

    class Meta:
        managed = False
        db_table = '"samples"."my_samples"' 
```

### 라우터 사용 시 

다른 데이터베이스 연결 path 설정에 스키마를 추가하십시오.
```python
DATABASES = {

'default': {
    'ENGINE': 'django.db.backends.postgresql_psycopg2',
    'OPTIONS': {
        'options': '-c search_path=django,public'
    },
    'NAME': 'multi_schema_db',
    'USER': 'tester',
    'PASSWORD': 'lol so easy',
    'HOST': 'localhost'

},

'samples': {
    'ENGINE': 'django.db.backends.postgresql_psycopg2',
    'OPTIONS': {
        'options': '-c search_path=samples,public'
    },
    'NAME': 'multi_schema_db',
    'USER': 'tester',
    'PASSWORD': 'lol so easy',
    'HOST': 'localhost'
},
```

다음으로 MySample 모델을 작성하십시오 .
```python
from django.db import models

class MySample(models.Model):
    description = models.CharField(max_length=255, null=False)

    class Meta:
        managed = False
        db_table = 'my_samples'
```

모든 샘플 관련 쿼리를 샘플 데이터베이스로 보내도록 데이터베이스 라우터를 작성하십시오.
```python
from database_test.models import MySample

ROUTED_MODELS = [MySample]


class MyDBRouter(object):

    def db_for_read(self, model, **hints):
        if model in ROUTED_MODELS:
            return 'samples'
        return None

    def db_for_write(self, model, **hints):
        if model in ROUTED_MODELS:
            return 'samples'
        return None
```
기본적으로 라우터는 ROUTED_MODELS에 지정된 모든 모델을 데이터베이스 연결로 라우팅 samples하고 다른 모든 모델에 대해서는 None을 반환합니다. default 데이터베이스 연결로 라우팅 됩니다 .

마지막으로 라우터를 설정에 추가하십시오.
```python
DATABASE_ROUTERS = ('database_test.db_router.MyDBRouter',)
```
이제 MySample모델에 대한 쿼리를 수행 할 때 samples스키마 에서 데이터를 가져옵니다 .



[Django and postgresql schemas](https://stackoverflow.com/questions/50819748/django-and-postgresql-schemas)

[Using routers](https://docs.djangoproject.com/en/2.0/topics/db/multi-db/#using-routers)



## REST Response Field Rename
다음과 같은 모델이 있다고 생각하겠습니다.
```python
class Category(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField("Category Name", max_length = 30)
    created_date = models.DateField(auto_now = True, auto_now_add=False)
    updated_date = models.DateField(auto_now = True, auto_now_add=False)

    def __str__(self):
        return self.name
```

serializer의 필드에는 source 매개 변수를 사용할 수 있습니다.
```python
class CategorySerializer(serializers.ModelSerializer):
    renamed_id = serializers.IntegerField(source='id')
    renamed_name = serializers.CharField(source='name')

    class Meta:
        model = Category
        fields = ['renamed_id', 'renamed_name']
```

수동으로 변경한 응답을 받을 수 있습니다.
```python
from rest_framework import status

def category_list(request):
    if request.method == 'GET':
        categories = Category.objects.all()
        serializer = CategorySerializer(categories, many=True)
        response = {
            'status': status.HTTP_200_OK,
            'message' : "Category List",
            'response' : serializer.data
        }
        return Response(response)
```


[REST Response Field Rename](https://stackoverflow.com/questions/39324691/rename-response-fields-django-rest-framework-serializer)