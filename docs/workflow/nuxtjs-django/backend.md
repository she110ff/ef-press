# Backend Framework


## Why Django



## Why Clean Architecture
아키텍처는 프로젝트의 전체 디자인을 의미합니다. 코드를 클래스, 파일 또는 컴포넌트 또는 모듈로 구성하고 이 모든 코드 그룹이 서로 관련되는 3216 방식입니다. 아키텍처는 애플리케이션이 핵심 기능을 수행하는 위치와 해당 기능이 데이터베이스 및 사용자 인터페이스와 같은 것들과 상호 작용하는 방식을 정의합니다.

Clean Architecture 는 프로젝트가 성장함에 따라 이해하기 쉽고 변경하기 쉽도록 프로젝트를 구성하는 것을 말합니다. 이것은 우연히 발생하지 않으며 의도와 계획이 필요합니다.


[Clean Architecture](tool-module/clean-arch/#종속성-규칙-the-dependency-rule) 는 종속성 원칙에 따라 소프트웨어를 계층(layer)으로 분리합니다. 

첫 번째는 데이터 베이스, URL 라우팅, 웹 프레임워크 또는 외부 시스템의 변경 상황에서 adpater, usecase, entity 계층의 변경을 최소화하고 쉽게할 수 있다는 것입니다. 

두 번째는 애플리케이션의 usecase를 중심으로 시스템이 제공하고자 하는 서비스와 기능을 이해하기 쉽게 구성하고 테스트 할 수 있다는 것 입니다.

세 번째는 위의 명확한 관심사의 분리를 통해 코드가 간결해지고 재사용성이 증가한다는 것 입니다.


[CLEAN ARCHITECTURE FOR THE REST OF US](https://pusher.com/tutorials/clean-architecture-introduction)