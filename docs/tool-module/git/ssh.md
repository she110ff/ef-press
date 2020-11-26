# SSH key

## config

Git 설정을 보여줍니다.

```bash
git config --list
```

## 특정 파일 커밋

```bash
git commit -m "mod gitignore" /workspaces/tms-frontend/.gitignore
```

## commit 대상에서 제외 하기

다시 변경내역에 추가하고 싶으면 git update-index --no-assume-unchanged 파일명 명령어를 사용하면 다시 git status에서 변경파일로 나옵니다.

<p> 임시로 사용할 때는 좋지만 현재 unchanged로 지정된 파일의 내역을 보는 명령어는 없으므로 너무 장기간 사용해서 --assume-unchanged로 지정된 것을 잊어먹으로 오히려 혼란을 초래할 수도 있어 보입니다. 
<p> 이럴 경우에는 git update-index --really-refresh 를 사용하면 앞에서 --assume-unchanged로 지정한 내용을 무시하고 워킹트리에 대한 인덱스를 새로 갱신합니다
```bash
git update-index --assume-unchanged k8s/kustomization.yaml skaffold.yaml
```

## 이미 push 된 파일을 .gitignore 에서 제외하기

git으로 관리하고 싶지 않은 파일들은 .gitignore 에 명시함으로써 해당 파일을 무시할 수 있다. 하지만 종종 무시할 파일을 .gitignore 에 추가하기 전에 git push 해버리는 경우가 있다. 이 때 뒤늦게 .gitignore 을 수정하여 push를 하지만 원격 저장소에서 해당 파일은 사라지지 않는다.

<p>
git 명령들을 실행해주면 .gitignore의 파일들이 적용되어 원격 저장소에서 사라진다.
```bash
$ git rm -r --cached .
$ git add .
$ git commit -m "Apply .gitignore"
$ git push
```

Git 설정을 합니다. .

```bash
# global
git config --global user.name "young"
git config --global user.email "young@gmail.com"
# local
git config user.name "young"
git config user.enauk "young@gmail.com"
```

## Generate a new SSH Key

```bash
git remote set-url origin git@github.com:username/repo.git
```

```bash
ssh-keygen -t rsa -b 4096 -C "user@email.com"
...
> Your identification has been saved in C:\Users\user/.ssh/id_rsa
> Your public key has been saved in C:\Users\user/.ssh/id_rsa.pub
> ...
```

git remote set-url origin https://<USERNAME>:<PASSWORD>@github.com/ocean-network-express/tms-frontend.git

## Add a new SSH key to your Git

```bash
cat C:\Users\user/.ssh/id_rsa.pub
ssh-rsa AAAAB3Nza ....... rcP4w== user@email.com  # copy this
```

[Adding a new SSH key to your GitHub account](https://docs.github.com/en/github/authenticating-to-github/adding-a-new-ssh-key-to-your-github-account)
