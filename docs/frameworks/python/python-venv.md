# Python environments 

The venv module provides support for creating lightweight “virtual environments” with their own site directories, optionally isolated from system site directories. Each virtual environment has its own Python binary (which matches the version of the binary that was used to create this environment) and can have its own independent set of installed Python packages in its site directories.

## Creating virtual environments

Creation of virtual environments is done by executing the command venv:

```bash
$ python3 -m venv /path/to/new/virtual/environment
```

The community hosts conferences and meetups, collaborates on code, and much more. Python's documentation will help you along the way, and the mailing lists will keep you in touch.

## Activate environments 

```bash
C:\> <venv>\Scripts\Activate //Windows
$ source <venv>/bin/activate  //bash/zsh
```

venv가 잘 작동되었다면 프롬프트가 아래와 같이 가상환경으로 변경됩니다.
```bash
(venv) C:\MyProjects\starter\Scripts>
```

## Deactivate environments 

현재 폴더 위치와 상관없이 deactivate 할 수 있습니다. 
```bash
(venv) C:\MyProjects\starter\Scripts> deactivate
```

## Installing Packages

이제 가상환경 위에서 플러그인을 설치합니다. 
```bash
$ pip install SomePackage            # latest version
$ pip install SomePackage==1.0.4     # specific version
$ pip install 'SomePackage>=1.0.4'     # minimum version
```

## Requirements Files 

“Requirements files” are files containing a list of items to be installed using pip install like so:
```bash
pip install -r requirements.txt // 목록 파일의 패키지 설치
pip freeze > requirements.txt   // 설치된 패키지 목록 내보내기
```