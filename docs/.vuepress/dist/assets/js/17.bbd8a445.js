(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{374:function(t,a,s){"use strict";s.r(a);var n=s(25),e=Object(n.a)({},(function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"first-app-1-requests-and-responses"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#first-app-1-requests-and-responses"}},[t._v("#")]),t._v(" First App - 1.Requests and responses")]),t._v(" "),s("p",[t._v("학습 목표")]),t._v(" "),s("ol",[s("li",[t._v("프로젝트 구조의 이해")]),t._v(" "),s("li",[t._v("서버의 실행과 포트 변경")]),t._v(" "),s("li",[t._v("요청에 의한 간단한 응답")])]),t._v(" "),s("h2",{attrs:{id:"초기-파일-구조"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#초기-파일-구조"}},[t._v("#")]),t._v(" 초기 파일 구조")]),t._v(" "),s("p",[t._v("startproject 명령은 다음과 같은 파일과 디렉토리를 생성합니다.:")]),t._v(" "),s("div",{staticClass:"language-txt extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("backend/\n    manage.py\n    site_name/\n        __init__.py\n        settings.py\n        urls.py\n        asgi.py\n        wsgi.py\n")])])]),s("table",[s("thead",[s("tr",[s("th",[t._v("Dir or File")]),t._v(" "),s("th",[t._v("Description")])])]),t._v(" "),s("tbody",[s("tr",[s("td",[t._v("backend/")]),t._v(" "),s("td",[t._v("root directory입니다. 이름은 사용자가 결정할 수 있습니다.")])]),t._v(" "),s("tr",[s("td",[t._v("manage.py")]),t._v(" "),s("td",[t._v("A command-line utility 는 Django project 와 상호작용을 합니다. "),s("a",{attrs:{href:"https://docs.djangoproject.com/en/3.0/ref/django-admin/",target:"_blank",rel:"noopener noreferrer"}},[t._v("manage.py"),s("OutboundLink")],1)])]),t._v(" "),s("tr",[s("td",[t._v("site_name/")]),t._v(" "),s("td",[t._v("실제 프로젝트를 위한 Python package 입니다. 이름은 프로젝트를 생성할 때 임으로 정할 수 있습니다.")])]),t._v(" "),s("tr",[s("td",[t._v("site_name/__init__.py")]),t._v(" "),s("td",[t._v("빈 파일로 Python에게 directory 임을 알려 줍니다.")])]),t._v(" "),s("tr",[s("td",[t._v("site_name/settings.py")]),t._v(" "),s("td",[t._v("Django project 설정 파일입니다.")])]),t._v(" "),s("tr",[s("td",[t._v("site_name/urls.py")]),t._v(" "),s("td",[t._v("Root 라우팅 파일입니다.")])]),t._v(" "),s("tr",[s("td",[t._v("site_name/asgi.py")]),t._v(" "),s("td",[t._v("ASGI-compatible web servers entry-point")])]),t._v(" "),s("tr",[s("td",[t._v("site_name/wsgi.py")]),t._v(" "),s("td",[t._v("WSGI-compatible web servers entry-point")])])])]),t._v(" "),s("h2",{attrs:{id:"개발-서버-실행"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#개발-서버-실행"}},[t._v("#")]),t._v(" 개발 서버 실행")]),t._v(" "),s("p",[t._v("포트와 IP를 변경하여 서버를 실행할 수 있습니다. :")]),t._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[t._v("$ python manage.py runserver\n$ python manage.py runserver "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("8080")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 포트 변경")]),t._v("\n$ python manage.py runserver "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),t._v(":8000 "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# ip 변경")]),t._v("\n")])])]),s("h2",{attrs:{id:"app-생성"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#app-생성"}},[t._v("#")]),t._v(" App 생성")]),t._v(" "),s("p",[t._v("App 을 생성하기 위해 manage.py 를 실행할 때, startapp app_name 을 전달합니다.")]),t._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[t._v("$ python manage.py startapp polls\n")])])]),s("p",[t._v("app_name 에 해당하는 폴터와 다음과 같은 하위 파일들이 생성됩니다.")]),t._v(" "),s("div",{staticClass:"language-txt extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("polls/\n    __init__.py\n    admin.py\n    apps.py\n    migrations/\n        __init__.py\n    models.py\n    tests.py\n    views.py\n")])])]),s("h2",{attrs:{id:"view-작성"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#view-작성"}},[t._v("#")]),t._v(" View 작성")]),t._v(" "),s("p",[t._v("polls/views.py 파일에 다음과 같이 작성합니다.")]),t._v(" "),s("div",{staticClass:"language-python extra-class"},[s("pre",{pre:!0,attrs:{class:"language-python"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# polls/views.py")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" django"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("http "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" HttpResponse\n\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("def")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("index")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("request"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" HttpResponse"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Hello, world. You\'re at the polls index."')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),s("p",[t._v("위의 코드는 django에서 가장 단순한 view를 작성한 예입니다. view 를 호출하기 위해서는 URL과 매핑해야 합니다.")]),t._v(" "),s("h2",{attrs:{id:"url-작성"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#url-작성"}},[t._v("#")]),t._v(" URL 작성")]),t._v(" "),s("p",[t._v("URLconf 를 작성하기 위해 polls 폴더 안에 urls.py 파일을 생성합니다. polls 루트 경로를 view 의 index 함수와 매핑합니다.")]),t._v(" "),s("div",{staticClass:"language-python extra-class"},[s("pre",{pre:!0,attrs:{class:"language-python"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# polls/urls.py")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" django"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("urls "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" path\n\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" views\n\nurlpatterns "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n    path"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("''")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" views"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("index"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" name"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'index'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n")])])]),s("p",[t._v("그런 다음 루트 URL 파일에 polls 라우트를 등록하고 polls App의 url 파일에 위임합니다.")]),t._v(" "),s("div",{staticClass:"language-python extra-class"},[s("pre",{pre:!0,attrs:{class:"language-python"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# site_name/urls.py")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" django"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("contrib "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" admin\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" django"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("urls "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" include"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" path\n\nurlpatterns "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n    path"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'polls/'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" include"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'polls.urls'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    path"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'admin/'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" admin"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("site"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("urls"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n")])])]),s("p",[t._v("include() 함수는 다른 URLconfs에 참조할 수 있는 기능입니다.\n이 기능은 plug-and-play URLs을 위해 사용되며, “/polls/”, 또는 “/fun_polls/”, “/content/polls/” 등 App의 경로를 사용자가 지정할 수 있게 합니다.")]),t._v(" "),s("div",{staticClass:"custom-block warning"},[s("p",{staticClass:"custom-block-title"},[t._v("WARNING")]),t._v(" "),s("p",[t._v("모든 URL patterns 에서 url 참조를 위해서는 항상 include() 사용합니다. 그러나 admin.site.urls 는 예외입니다.")])]),t._v(" "),s("p"),s("div",{staticClass:"language-python extra-class"},[s("pre",{pre:!0,attrs:{class:"language-python"}},[s("code",[t._v("$ python manage"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("py runserver\n")])])]),s("div",{staticClass:"custom-block tip"},[s("p",{staticClass:"custom-block-title"},[t._v("TIP")]),t._v(" "),s("p",[t._v("django-admin 과 manage.py 은 기본적으로 같은 명령어을 수행합니다. 그러나 manage.py 의 경우 mysite/settings.py 를 DJANGO_SETTINGS_MODULE 환경 변수에 할당합니다.")])]),t._v(" "),s("p",[t._v("http://localhost:8000/polls/ 이동하여 “Hello, world. You’re at the polls index.” 를 확인할 수 있습니다.")]),t._v(" "),s("h2",{attrs:{id:"path"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#path"}},[t._v("#")]),t._v(" Path()")]),t._v(" "),s("p",[t._v("path 함수에는 4개의 인자를 전달할 수 있습니다. 처음 두개는 route와 view로 필수입니다. 다음 두개는 kwargs와 name으로 옵션입니다.")]),t._v(" "),s("h3",{attrs:{id:"path-argument-route"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#path-argument-route"}},[t._v("#")]),t._v(" path() argument: route")]),t._v(" "),s("p",[t._v("route는 URL pattern 을 포함할 수 있는 문자열입니다. 요청이 들어오면 Django는 첫번째 url pattern에서 시작하여 비교하면서 요청 url과 일치하는 것을 찾습니다.\n패턴은 요청의 Method(GET, POST...), domain 을 구분하여 찾지 않습니다. 오직 path 만을 찾습니다. 예를 들어 https://www.example.com/myapp/ 요청을 반은 경우, URLconf 는 myapp/ 을 찾을 것 입니다. https://www.example.com/myapp/?page=3 요청의 경우에도, URLconf 는 myapp/ 을 찾을 것 입니다. .")]),t._v(" "),s("h3",{attrs:{id:"path-argument-view"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#path-argument-view"}},[t._v("#")]),t._v(" path() argument: view")]),t._v(" "),s("p",[t._v("Django 가 패턴을 찾으면 view 로 요청 객체를 첫 번째 인자로 전달합니다. 경로에서 캡쳐 된 값들은 키워드 유형의 인자로 전달 됩니다.")]),t._v(" "),s("h3",{attrs:{id:"path-argument-kwargs"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#path-argument-kwargs"}},[t._v("#")]),t._v(" path() argument: kwargs")]),t._v(" "),s("p",[t._v("그 밖에 전달하고자 하는 값 들을 dictionary 형태로 추가 전달 할 수 있습니다.")]),t._v(" "),s("h3",{attrs:{id:"path-argument-name"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#path-argument-name"}},[t._v("#")]),t._v(" path() argument: name")]),t._v(" "),s("p",[t._v("URL 에 이름을 지으면, Django 어디에서나 명확하게 참조할 수 있습니다.")])])}),[],!1,null,null,null);a.default=e.exports}}]);