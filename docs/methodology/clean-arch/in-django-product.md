# Clean Architecture in Django
이 문서에서는 Django Restful API에 Clean Architecture를 적용하는 방법을 설명하려고 합니다. Django 프레임워크와 [Uncle Bob의 Clean Architecture](https://8thlight.com/blog/uncle-bob/2012/08/13/the-clean-architecture.html)에 익숙하다는 가정으로 이후에 설명을 진행합니다.


설명을 위해 GET 엔드-포인트에서 제품을 검색하는 최소한의 예제를 사용합니다. 아키텍처의 설명은 위의 다이어그램과 동일한 계층으로 구성됩니다. 우리는 가장 안쪽 구성에서부터 시작할 것 입니다.


엔터티 레이어 (가장 안쪽 도메인) :
엔티티와 관련된 엔터프라이즈 비즈니스 로직을 할당합니다. ``entities.py`` 

사용 사례 계층 (가장 바깥쪽 도메인) : 
``interactors.py`` 에는 각 사용 사례의 비즈니스 로직을 포함합니다. 여기에 응용 프로그램 수준의 로직를 배치합니다. 우리는 구현에 커맨드 패턴을 사용하는데, 이는 태스크 큐잉을 처리하거나 오류 발생시 롤백을 돕고 종속성과 매개 변수를 분리하기 때문입니다. (가독성, 테스트 및 종속성 주입에 실제로 유용함)

인터페이스 어댑터 계층 : 
여기에는 프레임워크에서 분리는 되어 API Restful, 데이터베이스 스토리지, 캐싱 등을 관여하는 부분이 있습니다.`` views.py`` 이 있습니다. Django의 뷰 구조를 따르지만 완전히 분리됩니다.

프레임 워크 및 드라이버 계층 : 
Django 와 타사 라이브러리로 구성된 이 계층은 해당 부분과 관련된 코드를 배치하여 구현을 추상화하는 곳 이기도 합니다 (글루 코드). ``factories.py``

마지막으로 urls.py에서 url과 view를 연결합니다.

<figure><img src="/ca-ys2.png" /></figure>


## 엔터티 레이어 (가장 안쪽 도메인)
먼저 ``entities.py`` 를 정의합니다.:
```python 
class Product (object) : 

    def __init __ (self, reference, brand_id) : 
        self._reference = reference 
        self._brand_id = brand_id 

    @property 
    def reference (self) : 
        return self._reference 

    @property 
    def brand_id (self) : 
        return self._brand_id

```
이것은 가장 간단한 엔티티의 예입니다. 엔티티와 관련된 비즈니스 로직 및 상위 수준 규칙을 할당합니다. (예 : 불변 검증)


## 사용 사례 계층 (가장 바깥쪽 도메인)
``interactors.py`` 에는 각 사용 사례의 비즈니스 로직을 포함합니다. 여기에 응용 프로그램 수준의 로직를 배치합니다. 우리는 구현에 커맨드 패턴을 사용하는데, 이는 태스크 큐잉을 처리하거나 오류 발생시 롤백을 돕고 종속성과 매개 변수를 분리하기 때문입니다. (가독성, 테스트 및 종속성 주입에 실제로 유용함)
```python 
class GetProductInteractor(object):

    def __init__(self, product_repo):
        self.product_repo = product_repo

    def set_params(self, reference):
        self.reference = reference
        return self

    def execute(self):
        return self.product_repo \
                        .get_product(reference=self.reference)
```
이 예도 너무 간단합니다. 사용자-등록 과정을 예를 들어 보면, 사용자 속성을 검증하고, 리포지토리에서 사용자 이름을 사용할 수 있는지 확인이 된 후에 새로운 사용자 엔터티를 생성/저장하고 메일 서비스에 사용자 정보를 전달하여 메일 전송을 요청해야 합니다.


## 인터페이스 어댑터 계층
여기에는 프레임워크에서 분리는 되어 API Restful, 데이터베이스 스토리지, 캐싱 등을 관여하는 부분이 있습니다.

우선 views.py 이 있습니다. Django의 뷰 구조를 따르지만 완전히 분리됩니다.
```python 
from .factories import GetProductInteractorFactory
from .serializers import ProductSerializer


class ProductView(object):

    def __init__(self, get_product_interactor):
        self.get_product_interactor = get_product_interactor

    def get(self, reference):
        try:
            product = self.get_product_interactor \
                              .set_params(reference=reference) \ 
                              .execute() 
        except EntityDoesNotExist:
            body = {'error': 'Product does not exist!'}
            status = 404
        else:
            body = ProductSerializer.serialize(product)
            status = 200

        return body, status
```

그리고 여기 serializers.py는 뷰가 파이썬 dict를 body로 반환한다는 것을 보여주려는 것 외에 아키텍처 상의 의미는 없습니다.:
```python 
class ProductSerializer(object):

    @staticmethod
    def serialize(product):
        return {
            'reference': product.reference
            'brand_id': product.brand_id
        }
```

ProductView 는 팩토리에서 인터랙터를 얻습니다(팩토리가 무엇인지 나중에 볼 것입니다). 입력 매개 변수를 분석하고 (구문 / 형식 유효성 검사도 가능) serializer를 사용하여 결과를 변환합니다. 예외 처리 및 형식 지정 예외를 포함합니다.

이 계층의 다른 쪽에는 정면 repositories.py.이 있습니다. 스토리지에 직접 액세스하지 않지만 (이 부분은 다음 계층에 설명되어 있음) 소스 스토리지, 캐싱, 인덱싱 등을 선택합니다.
```python 
class ProductRepo(object):

    def __init__(self, db_repo, cache_repo):
        self.db_repo = db_repo
        self.cache_repo = cache_repo

    def get_product(self, reference):
        product = self.cache_repo.get_product(reference)

        if product is None:
            product = self.db_repo.get_product(reference)
            self.cache_repo.save_product(product)

        return product
```

## 프레임 워크 및 드라이버 계층
Django 와 타사 라이브러리로 구성된 이 계층은 해당 부분과 관련된 코드를 배치하여 구현을 추상화하는 곳 이기도 합니다 (글루 코드).

이 예에서는 데이터베이스와 웹의 두 부분이 있습니다.

``factories.py`` 부분에서는 Django ORM과 완전히 연결된 저장소를 만들었습니다.
```python 
from common.exceptions import EntityDoesNotExist
from .models import ORMProduct
from .entities import Product


class ProductDatabaseRepo(object):

    def get_product(self, reference):
        try:
            orm_product = ORMProduct.objects \
                                       .get(reference=reference)
        except ORMProduct.DoesNotExist:
            raise EntityDoesNotExist()

        return self._decode_orm_product(orm_product)

    def _decode_orm_product(self, orm_product):
        return Product(reference=orm_product.reference,
                       brand_id=orm_product.brand_id)
```

보시다시피 이 클래스가 반환하는 객체와 예외는 모두 우리가 정의하므로 모든 orm 세부 정보를 숨 깁니다.

두 번째는 세부 정보를 숨기고 프레임워크 레이어에서 뷰를 분리하는 뷰 래퍼를 만들었습니다.
```python 
import json

from django.http import HttpResponse
from django.views import View


class ViewWrapper(View):

    view_factory = None

    def get(self, request, *args, **kwargs):
        body, status = self.view_factory.create().get(**kwargs)

        return HttpResponse(json.dumps(body), status=status,
                            content_type='application/json')
```

이 Wrapper 클래스의 목표는 두 가지 입니다. 
1. 요청(request)의 모든 인자를 순수 python 객체로 변환하고 결과에 대한 응답과 형식을 지정합니다.
2. self.view_factory.create()에서 만들어진 view는 모든 종속적 요소들을 생성하고 연결하게 됩니다.

이 레이어에서 models.py, admin.py, urls.py, settings.py, 마이그레이션 및 기타 django 관련 코드를 작성하고 다루어야 합니다.

이 레이어는 Django (또는 다른 라이브러리)와 완전히 연결되어 있습니다. 필수적으로 구현해야 하지만 최대한 간결하게 유지해야 합니다.

## 의존성 주입
구조에 대한 의존성 주입을 통해 조각들을 연결하여 구성합니다.

종속성 해결을 담당하는  factories.py 를 만듭니다.
```python 
from .repositories import ProductDatabaseRepo, ProductCacheRepo
from .unit_repositories import ProductRepo
from .interactors import GetProductInteractor

class ProductDatabaseRepoFactory(object):

	@staticmethod
	def get():
		return ProductDatabaseRepo() 


class ProductCacheRepoFactory(object):

	@staticmethod
	def get():
		return ProductCacheRepo() 


class ProductRepoFactory(object):

    @staticmethod
    def get():
		db_repo = ProductDatabaseRepoFactory.get()
		cache_repo = ProductCacheRepoFactory.get()
        return ProductRepo(db_repo, cache_repo)


class GetProductInteractorFactory(object):

    @staticmethod
    def get():
        product_repo = ProductRepoFactory.get()
        return GetProductInteractor(product_repo)


class ProductViewFactory(object):

    @staticmethod
    def create():
        get_product_interactor = GetProductInteractorFactory.get()
        return ProductView(get_product_interactor)
```
Factory는 종속성을 재귀적으로 생성하고 해결하면서 각 요소의 Factory 이기도 합니다.

그리고 마지막으로 urls.py에서 url과 view를 연결합니다.
```python 
url(r'^products/(?P<reference>\w+)$',
    ViewWrapper.as_view(view_factory=ProductViewFactory))
```

이 게시물은 Django 아키텍처와 구성 요소를 파괴하거나 오용하지 않으려 했고 어떤 상황에서 유용한 대안일 수 있습니다.


이 글은 [Clean Architecture in Django](https://engineering.21buttons.com/clean-architecture-in-django-d326a4ab86a9)를 번역하였습니다.