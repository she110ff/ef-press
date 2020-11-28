(window.webpackJsonp=window.webpackJsonp||[]).push([[80],{439:function(t,s,a){"use strict";a.r(s);var n=a(25),e=Object(n.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"기초-뷰셋-라우터"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#기초-뷰셋-라우터"}},[t._v("#")]),t._v(" 기초-뷰셋 & 라우터")]),t._v(" "),a("p",[t._v("REST 프레임워크에는 "),a("code",[t._v("ViewSets")]),t._v("을 처리하기 위한 추상 객체가 포함되어 있어서 개발자가 API의 상태 및 상호 작용을 모델링 하는 부부에 집중하여 일반적인 규칙에 따라 URL 구성을 자동으로 처리할 수 ​​있습니다.")]),t._v(" "),a("p",[a("code",[t._v("ViewSet")]),t._v("클래스가 "),a("code",[t._v("View")]),t._v("에 비해 read, 또는 update 같은 기능과 get, put 매소드 핸들러를 제공하는 것을 제외하고 거의 같습니다.")]),t._v(" "),a("h2",{attrs:{id:"viewset을-사용하기-위한-리팩토링"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#viewset을-사용하기-위한-리팩토링"}},[t._v("#")]),t._v(" ViewSet을 사용하기 위한 리팩토링")]),t._v(" "),a("p",[t._v("현재 뷰를 ViewSet로 리팩토링 하겠습니다.")]),t._v(" "),a("p",[t._v("우선 "),a("code",[t._v("UserList")]),t._v("와 "),a("code",[t._v("UserDetail")]),t._v(" view를 하나 "),a("code",[t._v("UserViewSet")]),t._v("으로 리팩토링 하겠습니다. 두 개의 뷰를 제거하고 단일 클래스로 대체 할 수 있습니다.")]),t._v(" "),a("div",{staticClass:"language-python extra-class"},[a("pre",{pre:!0,attrs:{class:"language-python"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" rest_framework "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" viewsets\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("class")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("UserViewSet")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("viewsets"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("ReadOnlyModelViewSet"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token triple-quoted-string string"}},[t._v('"""\n    This viewset automatically provides `list` and `detail` actions.\n    """')]),t._v("\n    queryset "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" User"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("objects"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("all")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    serializer_class "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" UserSerializer\n")])])]),a("p",[t._v("여기서는 '읽기 전용' 작업을 자동으로 제공하기 위해 "),a("code",[t._v("ReadOnlyModelViewSet")]),t._v("클래스를 사용했습니다 . 일반 뷰를 사용할 때 "),a("code",[t._v("queryset")]),t._v("와 "),a("code",[t._v("serializer_class")]),t._v(" 을 똑같이 속성에 설정하고 있지만 더 이상 동일한 정보를 별도의 두 클래스에 제공 할 필요는 없습니다.")]),t._v(" "),a("p",[t._v("다음으로 "),a("code",[t._v("SnippetList")]),t._v(", "),a("code",[t._v("SnippetDetail")]),t._v(" 그리고 "),a("code",[t._v("SnippetHighlight")]),t._v(" 세 개의 뷰를 제거하고 다시 단일 클래스로 바꿀 수 있습니다.")]),t._v(" "),a("div",{staticClass:"language-python extra-class"},[a("pre",{pre:!0,attrs:{class:"language-python"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" rest_framework"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("decorators "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" action\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" rest_framework"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("response "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" Response\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("class")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("SnippetViewSet")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("viewsets"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("ModelViewSet"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token triple-quoted-string string"}},[t._v('"""\n    This viewset automatically provides `list`, `create`, `retrieve`,\n    `update` and `destroy` actions.\n\n    Additionally we also provide an extra `highlight` action.\n    """')]),t._v("\n    queryset "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" Snippet"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("objects"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("all")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    serializer_class "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" SnippetSerializer\n    permission_classes "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("permissions"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("IsAuthenticatedOrReadOnly"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n                          IsOwnerOrReadOnly"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n\n    "),a("span",{pre:!0,attrs:{class:"token decorator annotation punctuation"}},[t._v("@action")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("detail"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("True")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" renderer_classes"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("renderers"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("StaticHTMLRenderer"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("def")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("highlight")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("self"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" request"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v("args"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("**")]),t._v("kwargs"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n        snippet "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" self"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("get_object"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" Response"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("snippet"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("highlighted"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("def")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("perform_create")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("self"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" serializer"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n        serializer"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("save"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("owner"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("self"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("request"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("user"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),a("p",[t._v("이번에 기본 읽기 및 쓰기 작업의 전체 세트를 얻기 위해 "),a("code",[t._v("ModelViewSet")]),t._v("클래스를 사용했습니다.")]),t._v(" "),a("p",[t._v("또한 "),a("code",[t._v("@action")]),t._v(" 데코레이터를 사용하여 "),a("code",[t._v("highlight")]),t._v("라는 맞춤 액션을 만들었습니다. 이 데코레이터는 표준 "),a("code",[t._v("create/ update/ delete")]),t._v(" 스타일에 맞지 않는 사용자 정의 엔드-포인트을 추가하는 데 사용할 수 있습니다.")]),t._v(" "),a("p",[a("code",[t._v("@action")]),t._v(" 데코레이터를 사용하는 사용자 지정 작업 GET은 기본적으로 요청(request)에 응답합니다. "),a("code",[t._v("POST")]),t._v(" 에 응답하는 액션을 원하면 인수 "),a("code",[t._v("methods")]),t._v("를 사용할 수 있습니다.")]),t._v(" "),a("p",[t._v("기본적으로 사용자 정의 액션의 URL은 메소드 이름 자체에 따라 다릅니다. url을 구성하는 방법을 변경하려면 url_path 키워드 인수를 데코레이터에 포함시킬 수 있습니다.")]),t._v(" "),a("h2",{attrs:{id:"viewset을-url에-명시적으로-바인딩"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#viewset을-url에-명시적으로-바인딩"}},[t._v("#")]),t._v(" ViewSet을 URL에 명시적으로 바인딩")]),t._v(" "),a("p",[t._v("핸들러 메소드는 URLConf를 정의할 때만 액션에 바인딩 됩니다.")]),t._v(" "),a("p",[a("code",[t._v("snippets/urls.py")]),t._v("파일에서 ViewSet 클래스를 실제 뷰 세트로 바인딩 합니다.")]),t._v(" "),a("div",{staticClass:"language-python extra-class"},[a("pre",{pre:!0,attrs:{class:"language-python"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" snippets"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("views "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" SnippetViewSet"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" UserViewSet"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" api_root\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" rest_framework "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" renderers\n\nsnippet_list "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" SnippetViewSet"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("as_view"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'get'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'list'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'post'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'create'")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\nsnippet_detail "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" SnippetViewSet"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("as_view"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'get'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'retrieve'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'put'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'update'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'patch'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'partial_update'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'delete'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'destroy'")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\nsnippet_highlight "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" SnippetViewSet"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("as_view"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'get'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'highlight'")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" renderer_classes"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("renderers"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("StaticHTMLRenderer"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\nuser_list "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" UserViewSet"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("as_view"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'get'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'list'")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\nuser_detail "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" UserViewSet"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("as_view"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'get'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'retrieve'")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),a("p",[t._v("각 "),a("code",[t._v("ViewSets")]),t._v("클래스의 개별 뷰를 http 메소드를 액션에 바인딩하여 작성하는 방법에 주목 하십시오.")]),t._v(" "),a("p",[t._v("리소스를 구체적 뷰에 바인딩 했으므로 평소처럼 URL conf로 뷰를 등록 할 수 있습니다.")]),t._v(" "),a("div",{staticClass:"language-python extra-class"},[a("pre",{pre:!0,attrs:{class:"language-python"}},[a("code",[t._v("urlpatterns "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" format_suffix_patterns"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n    path"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("''")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" api_root"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    path"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'snippets/'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" snippet_list"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" name"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'snippet-list'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    path"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'snippets/<int:pk>/'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" snippet_detail"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" name"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'snippet-detail'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    path"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'snippets/<int:pk>/highlight/'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" snippet_highlight"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" name"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'snippet-highlight'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    path"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'users/'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" user_list"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" name"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'user-list'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    path"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'users/<int:pk>/'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" user_detail"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" name"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'user-detail'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),a("h2",{attrs:{id:"라우터-사용"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#라우터-사용"}},[t._v("#")]),t._v(" 라우터 사용")]),t._v(" "),a("p",[a("code",[t._v("View")]),t._v("클래스 대신 "),a("code",[t._v("ViewSet")]),t._v("클래스를 사용하기 때문에 실제로 URL conf를 직접 디자인 할 필요는 없습니다. 뷰와 URL에 리소스를 연결하는 규칙은 "),a("code",[t._v("Router")]),t._v("클래스를 사용하여 자동으로 처리 할 수 ​​있습니다. 라우터에 적절한 뷰 세트를 등록하고 나머지는 그대로 두면 됩니다.")]),t._v(" "),a("p",[t._v("snippets/urls.py파일을 다시 수정합니다.")]),t._v(" "),a("div",{staticClass:"language-python extra-class"},[a("pre",{pre:!0,attrs:{class:"language-python"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" django"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("urls "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" path"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" include\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" rest_framework"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("routers "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" DefaultRouter\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" snippets "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" views\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# Create a router and register our viewsets with it.")]),t._v("\nrouter "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" DefaultRouter"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\nrouter"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("register"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("r'snippets'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" views"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("SnippetViewSet"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\nrouter"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("register"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("r'users'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" views"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("UserViewSet"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# The API URLs are now determined automatically by the router.")]),t._v("\nurlpatterns "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n    path"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("''")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" include"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("router"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("urls"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n")])])]),a("p",[t._v("라우터에 ViewSet을 등록하는 것은 urlpattern 을 제공하는 것과 유사합니다. 뷰의 URL 접두사와 ViewSet 두 가지 인수가 포함됩니다.")]),t._v(" "),a("p",[a("code",[t._v("DefaultRouter")]),t._v(" 클래스도 자동으로 루트 view API(entry point)를 생성하므로 views 모듈에서 "),a("code",[t._v("api_root")]),t._v("메소드를 삭제할 수 있습니다.")]),t._v(" "),a("h2",{attrs:{id:"viewset와-views-간의-trade-offs"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#viewset와-views-간의-trade-offs"}},[t._v("#")]),t._v(" ViewSet와 ViewS 간의 Trade-offs")]),t._v(" "),a("p",[t._v("ViewSet을 사용하는 것은 정말 유용한 추상화 일 수 있습니다. 이를 통해 URL 규칙이 API 전체에서 일관성을 유지하고 작성해야 하는 코드의 양을 최소화하며 URL conf의 특성보다는 API가 제공하는 상호 작용 및 표현에 집중할 수 있습니다.")]),t._v(" "),a("p",[t._v("그렇다고 항상 올바른 접근 방식이라고 말할 수 있는 것은 아닙니다. 함수 기반 뷰 대신 클래스 기반 뷰를 사용할 때와 비슷한 단점이 있습니다. ViewSet를 사용하는 것은 뷰를 개별적으로 작성하는 것보다 코드의 명확성이 더 적습니다.")])])}),[],!1,null,null,null);s.default=e.exports}}]);