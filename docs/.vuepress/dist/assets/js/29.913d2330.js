(window.webpackJsonp=window.webpackJsonp||[]).push([[29],{386:function(t,s,a){"use strict";a.r(s);var n=a(25),e=Object(n.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"queryset-api"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#queryset-api"}},[t._v("#")]),t._v(" QuerySet API")]),t._v(" "),a("p",[t._v("blog App 을 생성합니다.")]),t._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[t._v("python manage.py startapp blog\n")])])]),a("div",{staticClass:"language-python extra-class"},[a("pre",{pre:!0,attrs:{class:"language-python"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" django"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("db "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" models\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("class")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Blog")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("models"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Model"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n    name "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" models"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("CharField"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("max_length"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("100")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    tagline "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" models"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("TextField"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("def")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("__str__")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("self"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" self"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("name\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("class")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Author")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("models"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Model"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n    name "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" models"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("CharField"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("max_length"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("200")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    email "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" models"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("EmailField"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("def")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("__str__")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("self"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" self"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("name\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("class")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Entry")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("models"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Model"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n    blog "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" models"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("ForeignKey"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("Blog"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" on_delete"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("models"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("CASCADE"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    headline "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" models"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("CharField"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("max_length"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("255")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    body_text "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" models"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("TextField"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    pub_date "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" models"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("DateField"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    mod_date "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" models"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("DateField"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    authors "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" models"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("ManyToManyField"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("Author"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    number_of_comments "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" models"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("IntegerField"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    number_of_pingbacks "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" models"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("IntegerField"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    rating "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" models"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("IntegerField"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("def")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("__str__")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("self"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" self"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("headline\n")])])]),a("div",{staticClass:"language-python extra-class"},[a("pre",{pre:!0,attrs:{class:"language-python"}},[a("code",[t._v("\n")])])]),a("div",{staticClass:"language-python extra-class"},[a("pre",{pre:!0,attrs:{class:"language-python"}},[a("code",[t._v("\n")])])]),a("div",{staticClass:"language-python extra-class"},[a("pre",{pre:!0,attrs:{class:"language-python"}},[a("code",[t._v("\n")])])]),a("div",{staticClass:"language-python extra-class"},[a("pre",{pre:!0,attrs:{class:"language-python"}},[a("code",[t._v("\n")])])]),a("div",{staticClass:"language-python extra-class"},[a("pre",{pre:!0,attrs:{class:"language-python"}},[a("code",[t._v("\n")])])]),a("div",{staticClass:"language-python extra-class"},[a("pre",{pre:!0,attrs:{class:"language-python"}},[a("code",[t._v("\n")])])]),a("div",{staticClass:"language-python extra-class"},[a("pre",{pre:!0,attrs:{class:"language-python"}},[a("code",[t._v("\n")])])]),a("div",{staticClass:"language-python extra-class"},[a("pre",{pre:!0,attrs:{class:"language-python"}},[a("code",[t._v("\n")])])]),a("div",{staticClass:"language-python extra-class"},[a("pre",{pre:!0,attrs:{class:"language-python"}},[a("code",[t._v("\n")])])]),a("div",{staticClass:"language-python extra-class"},[a("pre",{pre:!0,attrs:{class:"language-python"}},[a("code",[t._v("\n")])])]),a("div",{staticClass:"language-python extra-class"},[a("pre",{pre:!0,attrs:{class:"language-python"}},[a("code",[t._v("\n")])])]),a("div",{staticClass:"language-python extra-class"},[a("pre",{pre:!0,attrs:{class:"language-python"}},[a("code",[t._v("\n")])])]),a("h2",{attrs:{id:"resources"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#resources"}},[t._v("#")]),t._v(" Resources")]),t._v(" "),a("p",[a("a",{attrs:{href:"https://docs.djangoproject.com/en/3.0/topics/db/queries/",target:"_blank",rel:"noopener noreferrer"}},[t._v("Making queries"),a("OutboundLink")],1)])])}),[],!1,null,null,null);s.default=e.exports}}]);