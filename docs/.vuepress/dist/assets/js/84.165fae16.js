(window.webpackJsonp=window.webpackJsonp||[]).push([[84],{441:function(s,t,a){"use strict";a.r(t);var e=a(25),n=Object(e.a)({},(function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("h1",{attrs:{id:"ssh-key"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#ssh-key"}},[s._v("#")]),s._v(" SSH key")]),s._v(" "),a("h2",{attrs:{id:"config"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#config"}},[s._v("#")]),s._v(" config")]),s._v(" "),a("p",[s._v("Git 설정을 보여줍니다.")]),s._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" config --list\n")])])]),a("h2",{attrs:{id:"특정-파일-커밋"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#특정-파일-커밋"}},[s._v("#")]),s._v(" 특정 파일 커밋")]),s._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" commit -m "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"mod gitignore"')]),s._v(" /workspaces/tms-frontend/.gitignore\n")])])]),a("h2",{attrs:{id:"commit-대상에서-제외-하기"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#commit-대상에서-제외-하기"}},[s._v("#")]),s._v(" commit 대상에서 제외 하기")]),s._v(" "),a("p",[s._v("다시 변경내역에 추가하고 싶으면 git update-index --no-assume-unchanged 파일명 명령어를 사용하면 다시 git status에서 변경파일로 나옵니다.")]),s._v(" "),a("p",[s._v(" 임시로 사용할 때는 좋지만 현재 unchanged로 지정된 파일의 내역을 보는 명령어는 없으므로 너무 장기간 사용해서 --assume-unchanged로 지정된 것을 잊어먹으로 오히려 혼란을 초래할 수도 있어 보입니다. \n")]),a("p",[s._v(" 이럴 경우에는 git update-index --really-refresh 를 사용하면 앞에서 --assume-unchanged로 지정한 내용을 무시하고 워킹트리에 대한 인덱스를 새로 갱신합니다\n```bash\ngit update-index --assume-unchanged k8s/kustomization.yaml skaffold.yaml\n```\n")]),a("h2",{attrs:{id:"이미-push-된-파일을-gitignore-에서-제외하기"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#이미-push-된-파일을-gitignore-에서-제외하기"}},[s._v("#")]),s._v(" 이미 push 된 파일을 .gitignore 에서 제외하기")]),s._v(" "),a("p",[s._v("git으로 관리하고 싶지 않은 파일들은 .gitignore 에 명시함으로써 해당 파일을 무시할 수 있다. 하지만 종종 무시할 파일을 .gitignore 에 추가하기 전에 git push 해버리는 경우가 있다. 이 때 뒤늦게 .gitignore 을 수정하여 push를 하지만 원격 저장소에서 해당 파일은 사라지지 않는다.")]),s._v(" "),a("p",[s._v('\ngit 명령들을 실행해주면 .gitignore의 파일들이 적용되어 원격 저장소에서 사라진다.\n```bash\n$ git rm -r --cached .\n$ git add .\n$ git commit -m "Apply .gitignore"\n$ git push\n```\n')]),a("p",[s._v("Git 설정을 합니다. .")]),s._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# global")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" config --global user.name "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"young"')]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" config --global user.email "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"young@gmail.com"')]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# local")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" config user.name "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"young"')]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" config user.enauk "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"young@gmail.com"')]),s._v("\n")])])]),a("h2",{attrs:{id:"generate-a-new-ssh-key"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#generate-a-new-ssh-key"}},[s._v("#")]),s._v(" Generate a new SSH Key")]),s._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" remote set-url origin git@github.com:username/repo.git\n")])])]),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[s._v("ssh-keygen -t rsa -b "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("4096")]),s._v(" -C "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"user@email.com"')]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("..")]),s._v(".\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v(" Your identification has been saved "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("in")]),s._v(" C:"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("Users"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("user/.ssh/id_rsa\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v(" Your public key has been saved "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("in")]),s._v(" C:"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("Users"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("user/.ssh/id_rsa.pub\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("..")]),s._v(".\n")])])]),a("p",[s._v("git remote set-url origin https://"),a("USERNAME",[s._v(":"),a("PASSWORD",[s._v("@github.com/ocean-network-express/tms-frontend.git")])],1)],1),s._v(" "),a("h2",{attrs:{id:"add-a-new-ssh-key-to-your-git"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#add-a-new-ssh-key-to-your-git"}},[s._v("#")]),s._v(" Add a new SSH key to your Git")]),s._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("cat")]),s._v(" C:"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("Users"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("user/.ssh/id_rsa.pub\nssh-rsa AAAAB3Nza "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("..")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("..")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("..")]),s._v(". "),a("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("rcP4w")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("==")]),s._v(" user@email.com  "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# copy this")]),s._v("\n")])])]),a("p",[a("a",{attrs:{href:"https://docs.github.com/en/github/authenticating-to-github/adding-a-new-ssh-key-to-your-github-account",target:"_blank",rel:"noopener noreferrer"}},[s._v("Adding a new SSH key to your GitHub account"),a("OutboundLink")],1)])])}),[],!1,null,null,null);t.default=n.exports}}]);