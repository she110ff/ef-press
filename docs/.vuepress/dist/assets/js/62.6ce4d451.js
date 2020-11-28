(window.webpackJsonp=window.webpackJsonp||[]).push([[62],{419:function(t,a,s){"use strict";s.r(a);var e=s(25),n=Object(e.a)({},(function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"python-environments"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#python-environments"}},[t._v("#")]),t._v(" Python environments")]),t._v(" "),s("p",[t._v("The venv module provides support for creating lightweight “virtual environments” with their own site directories, optionally isolated from system site directories. Each virtual environment has its own Python binary (which matches the version of the binary that was used to create this environment) and can have its own independent set of installed Python packages in its site directories.")]),t._v(" "),s("h2",{attrs:{id:"creating-virtual-environments"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#creating-virtual-environments"}},[t._v("#")]),t._v(" Creating virtual environments")]),t._v(" "),s("p",[t._v("Creation of virtual environments is done by executing the command venv:")]),t._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[t._v("$ python3 -m venv /path/to/new/virtual/environment\n")])])]),s("p",[t._v("The community hosts conferences and meetups, collaborates on code, and much more. Python's documentation will help you along the way, and the mailing lists will keep you in touch.")]),t._v(" "),s("h2",{attrs:{id:"activate-environments"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#activate-environments"}},[t._v("#")]),t._v(" Activate environments")]),t._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[t._v("C:"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("venv"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("Scripts"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("Activate //Windows\n$ "),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v("source")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("venv"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("/bin/activate  //bash/zsh\n")])])]),s("p",[t._v("venv가 잘 작동되었다면 프롬프트가 아래와 같이 가상환경으로 변경됩니다.")]),t._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("venv"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" C:"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("MyProjects"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("starter"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("Scripts"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("\n")])])]),s("h2",{attrs:{id:"deactivate-environments"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#deactivate-environments"}},[t._v("#")]),t._v(" Deactivate environments")]),t._v(" "),s("p",[t._v("현재 폴더 위치와 상관없이 deactivate 할 수 있습니다.")]),t._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("venv"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" C:"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("MyProjects"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("starter"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("Scripts"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v(" deactivate\n")])])]),s("h2",{attrs:{id:"installing-packages"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#installing-packages"}},[t._v("#")]),t._v(" Installing Packages")]),t._v(" "),s("p",[t._v("이제 가상환경 위에서 플러그인을 설치합니다.")]),t._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[t._v("$ pip "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("install")]),t._v(" SomePackage            "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# latest version")]),t._v("\n$ pip "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("install")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token assign-left variable"}},[t._v("SomePackage")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("==")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1.0")]),t._v(".4     "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# specific version")]),t._v("\n$ pip "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("install")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'SomePackage>=1.0.4'")]),t._v("     "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# minimum version")]),t._v("\n")])])]),s("h2",{attrs:{id:"requirements-files"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#requirements-files"}},[t._v("#")]),t._v(" Requirements Files")]),t._v(" "),s("p",[t._v("“Requirements files” are files containing a list of items to be installed using pip install like so:")]),t._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[t._v("pip "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("install")]),t._v(" -r requirements.txt // 목록 파일의 패키지 설치\npip freeze "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v(" requirements.txt   // 설치된 패키지 목록 내보내기\n")])])])])}),[],!1,null,null,null);a.default=n.exports}}]);