(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{373:function(s,t,a){"use strict";a.r(t);var n=a(25),e=Object(n.a)({},(function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("h1",{attrs:{id:"error"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#error"}},[s._v("#")]),s._v(" Error")]),s._v(" "),a("h2",{attrs:{id:"환경"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#환경"}},[s._v("#")]),s._v(" 환경")]),s._v(" "),a("ul",[a("li",[s._v("Windows 10")]),s._v(" "),a("li",[s._v("Python 3.8.3")]),s._v(" "),a("li",[s._v("Django 3.0.8")])]),s._v(" "),a("h2",{attrs:{id:"powershell-권한-오류"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#powershell-권한-오류"}},[s._v("#")]),s._v(" PowerShell 권한 오류")]),s._v(" "),a("p",[s._v("VS Code 에서 파워셀이 실행되는 경우 권한 오류가 아래와 같이 발생할 수 있습니다.")]),s._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[s._v("+ CategoryInfo          "),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v(":")]),s._v(" 보안 오류: "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v(":"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v(", PSSecurityException\n")])])]),a("p",[s._v("Visual Studio Code 실행 파일에서 오른쪽 마우스를 클릭하여 속성 창을 열어 주세요. 호환성 탭의 마지막 부분에서 '' 를 체크하고 확인을 한 후에 다시 VS Code 를 실행합니다.")]),s._v(" "),a("h2",{attrs:{id:"postgres-scheme"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#postgres-scheme"}},[s._v("#")]),s._v(" postgres scheme")]),s._v(" "),a("p",[s._v("아래와 같은 DB, SCHEME, TABLE 설정을 가정합니다.")]),s._v(" "),a("div",{staticClass:"language-python extra-class"},[a("pre",{pre:!0,attrs:{class:"language-python"}},[a("code",[s._v("CREATE USER tester WITH PASSWORD "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'lol so easy'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\nCREATE DATABASE multi_schema_db WITH OWNER tester"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\nCREATE SCHEMA samples AUTHORIZATION tester"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\nCREATE TABLE samples"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("my_samples "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token builtin"}},[s._v("id")]),s._v("          INTEGER   NOT NULL PRIMARY KEY"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n  description CHAR"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("255")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" NOT NULL\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n")])])]),a("h3",{attrs:{id:"라우터-미사용-시"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#라우터-미사용-시"}},[s._v("#")]),s._v(" 라우터 미사용 시")]),s._v(" "),a("p",[s._v("다른 데이터베이스 연결 path 설정에 스키마를 추가하십시오.")]),s._v(" "),a("div",{staticClass:"language-python extra-class"},[a("pre",{pre:!0,attrs:{class:"language-python"}},[a("code",[s._v("DATABASES "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'default'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'ENGINE'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'django.db.backends.postgresql_psycopg2'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'OPTIONS'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'options'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'-c search_path=samples,public'")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'NAME'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'multi_schema_db'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'USER'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'tester'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'PASSWORD'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'lol so easy'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'HOST'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'localhost'")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\npublic에 django user관련 테이블이 있는 경우"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" public을 추가합니다"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("\n")])])]),a("p",[s._v("다음으로 MySample 모델을 작성하십시오 .")]),s._v(" "),a("div",{staticClass:"language-python extra-class"},[a("pre",{pre:!0,attrs:{class:"language-python"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("from")]),s._v(" django"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("db "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("import")]),s._v(" models\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("class")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("MySample")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("models"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("Model"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n    description "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" models"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("CharField"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("max_length"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("255")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" null"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),a("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("False")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("class")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("Meta")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n        managed "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("False")]),s._v("\n        db_table "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('\'"samples"."my_samples"\'')]),s._v(" \n")])])]),a("h3",{attrs:{id:"라우터-사용-시"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#라우터-사용-시"}},[s._v("#")]),s._v(" 라우터 사용 시")]),s._v(" "),a("p",[s._v("다른 데이터베이스 연결 path 설정에 스키마를 추가하십시오.")]),s._v(" "),a("div",{staticClass:"language-python extra-class"},[a("pre",{pre:!0,attrs:{class:"language-python"}},[a("code",[s._v("DATABASES "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'default'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'ENGINE'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'django.db.backends.postgresql_psycopg2'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'OPTIONS'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'options'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'-c search_path=django,public'")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'NAME'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'multi_schema_db'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'USER'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'tester'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'PASSWORD'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'lol so easy'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'HOST'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'localhost'")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'samples'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'ENGINE'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'django.db.backends.postgresql_psycopg2'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'OPTIONS'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'options'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'-c search_path=samples,public'")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'NAME'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'multi_schema_db'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'USER'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'tester'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'PASSWORD'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'lol so easy'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'HOST'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'localhost'")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n")])])]),a("p",[s._v("다음으로 MySample 모델을 작성하십시오 .")]),s._v(" "),a("div",{staticClass:"language-python extra-class"},[a("pre",{pre:!0,attrs:{class:"language-python"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("from")]),s._v(" django"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("db "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("import")]),s._v(" models\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("class")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("MySample")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("models"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("Model"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n    description "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" models"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("CharField"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("max_length"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("255")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" null"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),a("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("False")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("class")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("Meta")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n        managed "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("False")]),s._v("\n        db_table "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'my_samples'")]),s._v("\n")])])]),a("p",[s._v("모든 샘플 관련 쿼리를 샘플 데이터베이스로 보내도록 데이터베이스 라우터를 작성하십시오.")]),s._v(" "),a("div",{staticClass:"language-python extra-class"},[a("pre",{pre:!0,attrs:{class:"language-python"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("from")]),s._v(" database_test"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("models "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("import")]),s._v(" MySample\n\nROUTED_MODELS "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("MySample"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("class")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("MyDBRouter")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token builtin"}},[s._v("object")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("def")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("db_for_read")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("self"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" model"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("**")]),s._v("hints"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("if")]),s._v(" model "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("in")]),s._v(" ROUTED_MODELS"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n            "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("return")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'samples'")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("return")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("None")]),s._v("\n\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("def")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("db_for_write")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("self"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" model"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("**")]),s._v("hints"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("if")]),s._v(" model "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("in")]),s._v(" ROUTED_MODELS"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n            "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("return")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'samples'")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("return")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("None")]),s._v("\n")])])]),a("p",[s._v("기본적으로 라우터는 ROUTED_MODELS에 지정된 모든 모델을 데이터베이스 연결로 라우팅 samples하고 다른 모든 모델에 대해서는 None을 반환합니다. default 데이터베이스 연결로 라우팅 됩니다 .")]),s._v(" "),a("p",[s._v("마지막으로 라우터를 설정에 추가하십시오.")]),s._v(" "),a("div",{staticClass:"language-python extra-class"},[a("pre",{pre:!0,attrs:{class:"language-python"}},[a("code",[s._v("DATABASE_ROUTERS "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'database_test.db_router.MyDBRouter'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n")])])]),a("p",[s._v("이제 MySample모델에 대한 쿼리를 수행 할 때 samples스키마 에서 데이터를 가져옵니다 .")]),s._v(" "),a("p",[a("a",{attrs:{href:"https://stackoverflow.com/questions/50819748/django-and-postgresql-schemas",target:"_blank",rel:"noopener noreferrer"}},[s._v("Django and postgresql schemas"),a("OutboundLink")],1)]),s._v(" "),a("p",[a("a",{attrs:{href:"https://docs.djangoproject.com/en/2.0/topics/db/multi-db/#using-routers",target:"_blank",rel:"noopener noreferrer"}},[s._v("Using routers"),a("OutboundLink")],1)]),s._v(" "),a("h2",{attrs:{id:"rest-response-field-rename"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#rest-response-field-rename"}},[s._v("#")]),s._v(" REST Response Field Rename")]),s._v(" "),a("p",[s._v("다음과 같은 모델이 있다고 생각하겠습니다.")]),s._v(" "),a("div",{staticClass:"language-python extra-class"},[a("pre",{pre:!0,attrs:{class:"language-python"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("class")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("Category")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("models"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("Model"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token builtin"}},[s._v("id")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" models"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("AutoField"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("primary_key"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),a("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("True")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n    name "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" models"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("CharField"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"Category Name"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" max_length "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("30")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n    created_date "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" models"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("DateField"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("auto_now "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("True")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" auto_now_add"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),a("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("False")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n    updated_date "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" models"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("DateField"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("auto_now "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("True")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" auto_now_add"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),a("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("False")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("def")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("__str__")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("self"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("return")]),s._v(" self"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("name\n")])])]),a("p",[s._v("serializer의 필드에는 source 매개 변수를 사용할 수 있습니다.")]),s._v(" "),a("div",{staticClass:"language-python extra-class"},[a("pre",{pre:!0,attrs:{class:"language-python"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("class")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("CategorySerializer")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("serializers"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("ModelSerializer"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n    renamed_id "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" serializers"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("IntegerField"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("source"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'id'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n    renamed_name "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" serializers"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("CharField"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("source"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'name'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("class")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("Meta")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n        model "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" Category\n        fields "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'renamed_id'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'renamed_name'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n")])])]),a("p",[s._v("수동으로 변경한 응답을 받을 수 있습니다.")]),s._v(" "),a("div",{staticClass:"language-python extra-class"},[a("pre",{pre:!0,attrs:{class:"language-python"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("from")]),s._v(" rest_framework "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("import")]),s._v(" status\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("def")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("category_list")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("request"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("if")]),s._v(" request"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("method "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("==")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'GET'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n        categories "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" Category"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("objects"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token builtin"}},[s._v("all")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n        serializer "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" CategorySerializer"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("categories"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" many"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),a("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("True")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n        response "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n            "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'status'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" status"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("HTTP_200_OK"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n            "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'message'")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"Category List"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n            "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'response'")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" serializer"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("data\n        "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("return")]),s._v(" Response"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("response"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n")])])]),a("p",[a("a",{attrs:{href:"https://stackoverflow.com/questions/39324691/rename-response-fields-django-rest-framework-serializer",target:"_blank",rel:"noopener noreferrer"}},[s._v("REST Response Field Rename"),a("OutboundLink")],1)])])}),[],!1,null,null,null);t.default=e.exports}}]);