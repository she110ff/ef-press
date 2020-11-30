(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{371:function(a,t,s){"use strict";s.r(t);var n=s(25),e=Object(n.a)({},(function(){var a=this,t=a.$createElement,s=a._self._c||t;return s("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[s("h1",{attrs:{id:"설치-프로젝트-생성"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#설치-프로젝트-생성"}},[a._v("#")]),a._v(" 설치 & 프로젝트 생성")]),a._v(" "),s("p",[a._v("Installation instructions are slightly different depending on whether you’re installing a distribution-specific package, downloading the latest official release, or fetching the latest development version.")]),a._v(" "),s("h2",{attrs:{id:"virtualenv-설치하기"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#virtualenv-설치하기"}},[a._v("#")]),a._v(" VirtualEnv 설치하기")]),a._v(" "),s("p",[a._v("프로젝트 디렉토리를 생성합니다.")]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[a._v("$ "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("mkdir")]),a._v(" backend\n$ "),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v("cd")]),a._v(" backend\n")])])]),s("p",[a._v("가상환경을 생성합니다.")]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[a._v("backend"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(">")]),a._v(" $ python -m venv myvenv\n")])])]),s("p",[a._v("가상환경을 실행합니다.")]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[a._v("backend"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(">")]),a._v(" $ ./myvenv/Script/activate "),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# winddow")]),a._v("\nbackend"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(">")]),a._v(" $ "),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v("source")]),a._v(" ./myvenv/bin/activate "),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# mac")]),a._v("\n")])])]),s("p",[a._v("가상환경을 중지합니다.")]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[a._v("myvenv"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(">")]),a._v("Script"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(">")]),a._v(" $ deactivate\n")])])]),s("h2",{attrs:{id:"django-package-설치하기"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#django-package-설치하기"}},[a._v("#")]),a._v(" Django Package 설치하기")]),a._v(" "),s("p",[a._v("django 패키기를 설치합니다.")]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),a._v("myvenv"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v(" $ pip "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("install")]),a._v(" django\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),a._v("myvenv"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v(" $ python manage.py shell\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# Django 버전 확인")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(">>")]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(">")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("import")]),a._v(" django\n"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(">>")]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(">")]),a._v(" print"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),a._v("django.get_version"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("))")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token number"}},[a._v("3.0")]),a._v(".8\n\n")])])]),s("h2",{attrs:{id:"project-만들기"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#project-만들기"}},[a._v("#")]),a._v(" Project 만들기")]),a._v(" "),s("p",[a._v("django 프로젝트의 기본 구조를 생성합니다.")]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),a._v("myvenv"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v(" $ django-admin startproject site_name "),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v(".")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),a._v("myvenv"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v(" $ "),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v("cd")]),a._v(" site_name\n")])])]),s("h2",{attrs:{id:"설정파일-수정하기"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#설정파일-수정하기"}},[a._v("#")]),a._v(" 설정파일 수정하기")]),a._v(" "),s("p",[a._v("호스트, 타임존, 정적파일 위치를 설정합니다.")]),a._v(" "),s("div",{staticClass:"language-python extra-class"},[s("pre",{pre:!0,attrs:{class:"language-python"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("#setting.py")]),a._v("\nALLOWED_HOSTS "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("[")]),s("span",{pre:!0,attrs:{class:"token string"}},[a._v("'127.0.0.1'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("]")]),a._v("\nTIME_ZONE "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[a._v("'Asia/Seoul'")]),a._v("\nSTATIC_ROOT "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" os"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),a._v("path"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),a._v("join"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),a._v("BASE_DIR"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[a._v("'static'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v("\n")])])]),s("h2",{attrs:{id:"마이그레이션"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#마이그레이션"}},[a._v("#")]),a._v(" 마이그레이션")]),a._v(" "),s("p",[a._v("django 패키지에 포함된 모델을 마이그레이션 합니다.")]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),a._v("myvenv"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v(" $ python manage.py makemigrations "),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 아직 새로운 모델을 작성하지 않았다면 실행하지 않아도 됨.")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),a._v("myvenv"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v(" $ python manage.py migrate\n")])])]),s("p",[a._v("migrate 명령어는 INSTALLED_APPS 설정을 보고 필요한 데이터베이스 테이블을 생성합니다.")]),a._v(" "),s("h2",{attrs:{id:"admin-계정-만들기"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#admin-계정-만들기"}},[a._v("#")]),a._v(" admin 계정 만들기")]),a._v(" "),s("p",[a._v("admin 계정을 등록합니다. .")]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),a._v("myvenv"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v(" $ python manage.py createsuperuser\n")])])]),s("p",[a._v("http://127.0.0.1:8000/admin 으로 접속이 가능합니다.")]),a._v(" "),s("h2",{attrs:{id:"django-실행하기"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#django-실행하기"}},[a._v("#")]),a._v(" Django 실행하기")]),a._v(" "),s("p",[a._v("서버를 실행합니다.")]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),a._v("myvenv"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v(" $ python manage.py runserver\n")])])])])}),[],!1,null,null,null);t.default=e.exports}}]);