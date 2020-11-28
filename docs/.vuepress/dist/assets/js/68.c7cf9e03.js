(window.webpackJsonp=window.webpackJsonp||[]).push([[68],{425:function(e,r,t){"use strict";t.r(r);var a=t(25),s=Object(a.a)({},(function(){var e=this,r=e.$createElement,t=e._self._c||r;return t("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[t("h1",{attrs:{id:"the-clean-code-blog-by-robert-c-martin-uncle-bob"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#the-clean-code-blog-by-robert-c-martin-uncle-bob"}},[e._v("#")]),e._v(" The Clean Code Blog by Robert C. Martin (Uncle Bob)")]),e._v(" "),t("p",[e._v("아래와 같이 시스템 아키텍처에 관한 광범위하고 많은 아이디어가 있습니다. "),t("a",{attrs:{href:"https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html",target:"_blank",rel:"noopener noreferrer"}},[e._v("원문"),t("OutboundLink")],1)]),e._v(" "),t("ul",[t("li",[t("code",[e._v("Hexagonal Architecture")]),e._v(" (a.k.a. Ports and Adapters) Alistair Cockburn")]),e._v(" "),t("li",[t("code",[e._v("Onion Architecture")]),e._v(" Jeffrey Palermo")]),e._v(" "),t("li",[t("code",[e._v("Screaming Architecture")]),e._v(" 블로그")]),e._v(" "),t("li",[t("code",[e._v("DCI")]),e._v(" James Coplien과 Trygve Reenskaug.")]),e._v(" "),t("li",[t("code",[e._v("BCE")]),e._v(' Ivar Jacobson 의 책 "Object Oriented Software Engineering: A Use-Case Driven Approach"')])]),e._v(" "),t("figure",[t("img",{attrs:{src:"/CleanArchitecture.jpg"}})]),e._v("\n이 다이어그램은 이러한 모든 아키텍처를 실행 가능한 단일 아이디어로 통합하려는 시도입니다.\n"),t("p",[e._v("이러한 아키텍처들은 세부사항은 다소 다르지만 전체적으로 매우 유사합니다. 모두 '관심사 분리(the separation of concerns)'라는 목표를 가지고 있습며 소프트웨어를 계층(layer)으로 나누어 분리합니다. 해당 아키텍처들에는 비즈니스 규칙(Business Rule)에 대한 하나 이상의 계층과 인터페이스에 대한 계층을 가지고 있습니다.")]),e._v(" "),t("p",[e._v("이러한 부류의 아키텍처는 다음과 같은 시스템을 생성합니다.")]),e._v(" "),t("ol",[t("li",[e._v("프레임워크에 독립적입니다. 아키텍처는 특정 기능이 포함된 소프트웨어 라이브러리에 의존하지 않습니다. 따라서 시스템을 제한된 제약조건에 밀어 넣지 않고 프레임워크를 도구로 사용할 수 있습니다.")]),e._v(" "),t("li",[e._v("테스트가 가능합니다. UI, 데이터베이스, 웹 서버 또는 기타 외부요소 없이 비즈니스 규칙을 테스트 할 수 있습니다.")]),e._v(" "),t("li",[e._v("UI와 무관합니다. 나머지 시스템을 변경하지 않고도 UI를 쉽게 변경할 수 있습니다. 예를 들어 비즈니스 규칙을 변경하지 않고 웹 UI를 콘솔 UI로 바꿀 수 있습니다.")]),e._v(" "),t("li",[e._v("데이터베이스에 독립적입니다. Mongo, BigTable, CouchDB, Oracle 또는 SQL Server를 대체 할 수 있습니다. 비즈니스 규칙이 데이터베이스에 바인딩되지 않았습니다.")]),e._v(" "),t("li",[e._v("외부 서비스와 무관합니다. 실제로 비즈니스 규칙은 외부에서 어떤 일이 일어나는지에 대해 전혀 알지 못합니다.")])]),e._v(" "),t("h2",{attrs:{id:"종속성-규칙-the-dependency-rule"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#종속성-규칙-the-dependency-rule"}},[e._v("#")]),e._v(" 종속성 규칙(The Dependency Rule)")]),e._v(" "),t("p",[e._v("각각의 원들은 소프트웨어에서 다른 영역을 나타냅니다. 일반적으로 더 멀리 갈수록 소프트웨어의 수준(level)이 높아집니다. 바깥 쪽 원들은 메커니즘(mechanisms)이고 안 쪽 원들은 정책(policies)입니다.")]),e._v(" "),t("p",[e._v("이 아키텍처를 작동시키는 우선 순위 규칙은 "),t("code",[e._v("종속성 규칙(The Dependency Rule)")]),e._v(" 입니다. 이 규칙에 따르면 "),t("code",[e._v("소스 코드 종속성(source code dependencies)")]),e._v("은 "),t("code",[e._v("안쪽으로만")]),e._v(" 향할 수 있습니다 . 안 쪽에 있는 원의 어떤 것이 외부 원 안에 있는 것에 대해서 아무것도 알 수 없습니다. 특히, 외부 원에 선언된 이름은 내부 원의 코드에서 언급해서는 안됩니다. 여기에는 함수, 클래스, 변수 또는 기타 소프트웨어 엔터티가 포함됩니다.")]),e._v(" "),t("p",[e._v("마찬가지로, 외부 원에 사용된 데이터 포맷이 내부 원에서 사용 되어서는 안됩니다. 특히 이러한 포맷이 외부 원의 프레임워크에 의해 생성되는 경우에 더욱 그렇습니다. 외부 원에 있는 어떤 것도 내부 원에 영향을 미치는 것을 방지해야 합니다.")]),e._v(" "),t("h2",{attrs:{id:"엔터티-entities"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#엔터티-entities"}},[e._v("#")]),e._v(" 엔터티(Entities)")]),e._v(" "),t("p",[e._v("엔터티는 "),t("code",[e._v("전사적")]),e._v(" 비즈니스 규칙을 캡슐화 합니다. 엔터티는 메서드가 있는 개체이거나 데이터 구조 및 함수의 집합 일 수 있습니다. 엔터티를 기업의 여러 응용 프로그램에서 같이 사용할 수 있어야 한다는 것이 중요합니다.")]),e._v(" "),t("p",[e._v("엔터프라이즈가 아닌 단일 애플리케이션을 작성하는 경우에 엔티티는 애플리케이션의 비즈니스 객체입니다. 가장 일반적이고 높은 수준의 규칙을 캡슐화합니다. 외부 변화가 있을 때 변경될 가능성이 가장 적습니다. 예를 들어, 페이지 검색이나 보안 설정 변경으로 인해 이러한 객체가 영향을 받지 않을 것으로 예상됩니다. 특정 애플리케이션에 대한 운영 변경은 엔티티 계층에 영향을 미치지 않아야 합니다.")]),e._v(" "),t("h2",{attrs:{id:"사용-사례-use-cases"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#사용-사례-use-cases"}},[e._v("#")]),e._v(" 사용 사례(Use Cases)")]),e._v(" "),t("p",[e._v("이 계층의 소프트웨어에는 "),t("code",[e._v("응용 프로그램")]),e._v("의 비즈니스 규칙이 포함되어 있습니다. 시스템의 모든 사용 사례를 캡슐화하고 구현합니다. 이러한 사용 사례는 엔터티 쪽으로 이동하거나 엔티티에서 시작되는 데이터 흐름을 조직하고 해당 엔터티가 전사적 비즈니스 규칙을 사용하여 사용 사례의 목표를 달성하도록 지시합니다.")]),e._v(" "),t("p",[e._v("이 계층의 변경이 엔티티에 영향을 미치지 않을 것 입니다. 또한 이 계층이 데이터베이스, UI 또는 일반적인 프레임워크와 같은 외부 환경의 변경으로 인해 영향을 받지 않아야 합니다. 사용 사례 계층은 이러한 관심사(concern)로부터 격리 됩니다.")]),e._v(" "),t("p",[e._v("응용 프로그램의 작동의 변화는 사용 사례 및 이 계층의 소프트웨어에 영향을 미칩니다. 사용 사례의 세부 사항이 변경되면 이 계층의 일부 코드가 영향을 받습니다.")]),e._v(" "),t("h2",{attrs:{id:"인터페이스-어댑터-interface-adapters"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#인터페이스-어댑터-interface-adapters"}},[e._v("#")]),e._v(" 인터페이스 어댑터(Interface Adapters)")]),e._v(" "),t("p",[e._v("이 계층의 소프트웨어는 사용 사례 및 엔터티에서 가장 편리한 형식의 데이터를 데이터베이스 또는 웹과 같은 일부 외부 에이전시에 가장 편리한 형식으로 변환하는 어댑터 집합입니다. 예를 들어 GUI 의 MVC 아키텍처를 완전히 포함하는 것은 이 계층입니다. Presenters, Views, Controllers는 모두 여기에 속합니다. 모델(Model)이 컨트롤러(Controller)에서 사용 사례로 전달된 다음 사용 사례에서 발표자(Presenters)와 뷰(View)로 다시 전달되는 데이터 구조일 수 있습니다.")]),e._v(" "),t("p",[e._v("마찬가지로 데이터는 개체 및 사용 사례에 가장 편리한 형식에서  persistence 프레임워크(데이터베이스)에 가장 편리한 형식으로 이 계층에서 변환됩니다. 이 원의 안쪽에 있는 원의 코드에서는 데이터베이스에 대해 전혀 알 필요가 없습니다. 특히 데이터베이스와 관련된 부분은 이 계층의 일부로 제한 되어야 합니다. (특히, 데이터베이스가 SQL 데이터베이스 인 경우 모든 SQL의 구현은 이 계층에 제한 되어야 합니다.)")]),e._v(" "),t("p",[e._v("또한 외부 서비스와 같은 일부 외부 양식에서 사용 사례 및 엔티티가 사용하는 양식으로 데이터를 변환하는 데 필요한 다른 어댑터가  이 계층에 포함됩니다.")]),e._v(" "),t("h2",{attrs:{id:"프레임워크-및-드라이버-frameworks-and-drivers"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#프레임워크-및-드라이버-frameworks-and-drivers"}},[e._v("#")]),e._v(" 프레임워크 및 드라이버(Frameworks and Drivers)")]),e._v(" "),t("p",[e._v("가장 바깥 쪽 레이어는 일반적으로 데이터베이스, 웹 프레임워크 등과 같은 프레임워크와 도구로 구성됩니다. 일반적으로 다음 원과 안쪽 원으로 통신하는 글루 코드 이외의 다른 코드는 이 레이어에 작성하지 않습니다.")]),e._v(" "),t("p",[e._v("이 계층은 모든 세부사항(detail)(?)이 있는 곳입니다. 웹은 세부사항 이고 데이터베이스도 세부 사항입니다. 그것들이 영향을 끼치지 않도록 바깥쪽에 보관합니다.")]),e._v(" "),t("h2",{attrs:{id:"네-개의-서클-only-four-circles"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#네-개의-서클-only-four-circles"}},[e._v("#")]),e._v(" 네 개의 서클(Only Four Circles?)")]),e._v(" "),t("p",[e._v("원은 도식일 뿐 입니다. 네 가지 이상의 원이 필요할 수도 있습니다. 항상이 네 가지만 있어야 한다는 규칙은 없습니다. 그러나 "),t("code",[e._v("종속성 규칙")]),e._v("은 항상 적용됩니다. 소스 코드 종속성은 항상 안쪽을 가리킵니다. 안쪽으로 이동하면 추상화 수준이 증가합니다. 가장 바깥 쪽 원은 상세 수준이 낮습니다. 내부로 이동함에 따라 소프트웨어가 더욱 추상적으로 발전하고 더 높은 수준의 정책을 캡슐화 합니다. 가장 안쪽의 원이 가장 일반화된 캡슐화를 구현합니다.")]),e._v(" "),t("h2",{attrs:{id:"교차-경계-crossing-boundaries"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#교차-경계-crossing-boundaries"}},[e._v("#")]),e._v(" 교차 경계(Crossing boundaries)")]),e._v(" "),t("p",[e._v("다이어그램의 오른쪽 아래에는 원 경계를 교차하는 방법의 예가 있습니다. 안쪽 계층의 사용 사례와 통신하는 컨트롤러(Controller) 및 발표자(Presenters)가 표시됩니다. 제어 흐름에 유의하십시오. 컨트롤러에서 시작하여 사용 사례를 통해 이동한 다음  발표자(Presenters)에서 실행됩니다. 또한 소스 코드 종속성에 유의하십시오. 그들 각각은 사용 사례를 향해 안쪽을 가리 킵니다.")]),e._v(" "),t("p",[e._v("우리는 일반적으로 "),t("a",{attrs:{href:"http://en.wikipedia.org/wiki/Dependency_inversion_principle",target:"_blank",rel:"noopener noreferrer"}},[e._v("Dependency Inversion Principle"),t("OutboundLink")],1),e._v(" 을 사용하여 이러한 명백한 모순을 해결합니다 . 예를 들어 Java와 같은 언어에서는 소스 코드 종속성이 경계를 가로지르는 올바른 지점에서 제어 흐름이 반대로 역전되도록 인터페이스와 상속 관계를 배열합니다.(의존성 역전)")]),e._v(" "),t("p",[e._v("예를 들어, 사용 사례가 발표자(Presenters)를 호출해야 한다고 가정하겠습니다. 그러나 이 호출은 "),t("code",[e._v("종속성 규칙")]),e._v("을 위반하기 때문에 직접 호출해서는 안됩니다 . 내부 원에서 외부 원의 이름을 언급 할 수 없습니다. 따라서 우리는 사용 사례가 내부 서클에서 인터페이스 (여기서는 사용 사례 출력 포트로 표시됨)를 호출하고 외부 서클의 발표자(Presenters)가 이를 구현하도록합니다.")]),e._v(" "),t("p",[e._v("동일한 기술을 사용하여 아키텍처의 모든 경계를 넘어갑니다. 동적 다형성을 활용하여 제어 흐름에 역전하는 소스 코드 종속성을 만들어 제어 흐름이 어떤 방향으로 진행 되더라도 "),t("code",[e._v("종속성 규칙")]),e._v("을 준수 할 수 있습니다.")]),e._v(" "),t("h2",{attrs:{id:"데이터가-경계를-넘어서는-것-what-data-crosses-the-boundaries"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#데이터가-경계를-넘어서는-것-what-data-crosses-the-boundaries"}},[e._v("#")]),e._v(" 데이터가 경계를 넘어서는 것(What data crosses the boundaries)")]),e._v(" "),t("p",[e._v("일반적으로 경계를 넘는 데이터는 간단한 데이터 구조입니다. 기본 구조체 또는 간단한 데이터 전송 개체를 사용할 수 있습니다. 또는 데이터는 단순히 함수 호출에서 인수가 될 수 있습니다. 또는 해시-맵으로 묶거나 객체로 구성 할 수 있습니다. 중요한 것은 격리되고 간단한 데이터 구조가 경계를 넘어 전달 된다는 것입니다. 엔터티나 데이터베이스 레코드를 통과시키지 않아야 합니다. "),t("code",[e._v("종속성 규칙")]),e._v("을 위반 하는 데이터 구조를 갖지 않아야 합니다.")]),e._v(" "),t("p",[e._v("예를 들어, 많은 데이터베이스 프레임워크는 쿼리에 대한 응답으로 편리한 데이터 형식을 반환합니다. 이것을 RowStructure 라고 부를 수 있습니다. 우리는 그 행 구조를 경계를 통해 안쪽으로 전달하지 않아야 합니다. 그것은 내부 원이 외부 원에 대해 무언가를 알도록 강제하기 때문에 "),t("code",[e._v("종속성 규칙")]),e._v("에 위배 됩니다.")]),e._v(" "),t("p",[e._v("따라서 경계를 넘어 데이터를 전달할 때는 항상 내부 원에 가장 편리한 형태입니다.")]),e._v(" "),t("h2",{attrs:{id:"결론"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#결론"}},[e._v("#")]),e._v(" 결론")]),e._v(" "),t("p",[e._v("이 간단한 규칙을 따르는 것은 어렵지 않으며 앞으로 많은 골칫거리를 덜어 줄 것입니다. 소프트웨어를 계층으로 분리하고 종속성 규칙을 준수하면 본질적으로 테스트 할 수 있는 시스템을 만들어 내고 많은 이점을 얻을 수 있습니다. 데이터베이스 또는 웹 프레임워크와 같이 시스템의 외부 부분의 사용이 중지되는 경우 해당 요소를 최소한의 혼란으로 대체 할 수 있습니다.")])])}),[],!1,null,null,null);r.default=s.exports}}]);