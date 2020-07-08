# String

## 생성

### 일반적인 입력
문자열 데이터는 쌍타옴표(", double quotes) 홑따옴표(', single quotes) 를 열어서 문자열을 입력하고 쌍따옴표로 닫아 주면 문자열을 쉽게 입력할 수 있습니다. 
```python
name = "Youngsoo"
print(type(name)) 
> <class 'str'>
```

### 구어 삽입 
구어를 삽입한 문자열 데이터는 홑따옴표 사이에 문자열 중간에 쌍따옴표로 묶인 문자열을 삽입하여 만들 수 있습니다. 
```python
message = 'He said to me, "I will call you"'
message
> 'He said to me, "I will call you"'
```

### 홑따옴표 포함 문자열 
홑따옴표가 들어 있는 문자열의 경우에는 쌍따옴표 안에 홑따옴표를 사용할 수 있습니다. 
```python
message = "two hours' traffic of our stage"
type(message)
> <class 'str'>
```

### 멀티 라인 문자열
삼중 따옴표(""" or ''', triple quotes)는 멀티 라인 문자열을 구성할 때 사용할 수 있습니다. 문자열 안에 쌍따옴표, 홑따옴표, escape characters(ex: \n, \t) 를 포함할 수 있습니다.
```python
message = """Lorem ipsum dolor sit amet,
consectetur \t adipiscing elit,
sed do eiusmod tempor's incididunt
ut "labore" et dolore \n magna aliqua."""
print(message)
```

다음과 같이 멀티 라인 문자열을 싱글 라인으로 변경할 수 있습니다. 
```python
string = """This is a
very long string,
containing commas,
that I split up
for readability""".replace('\n',' ')
```

### 화면에 출력
지금까지 예제 코드에서 본 것 처럼 print 함수를 사용하여 문자열을 화면에 출력할 수 있습니다. 
```python
hello = "Hello world!"
print(hello)
```

## 연결과 분리  
### Raw 문자열
\ 가 special character로 해석되는 것을 원하지 않는다면 시작한하는 ' 또는 " 앞에 r 을 추가할 수 있습니다. 
```python
print('C:\some\name')  # here \n means newline!
> C:\some
> ame
print(r'C:\some\name')  # note the r before the quote
> C:\some\name
```

### 반복 문자열 
+ 연산자로 문자열을 합치거나 * 연산자로 문자열 반복이 가능합니다. 
```python
# 3 times 'un', followed by 'ium'
3 * 'un' + 'ium'
>'unununium'
```

### 문자열 자동 연결 
둘 이상의 리터럴 문자열은 자동으로 합쳐집니다. 
```python
'Py' 'thon'
> 'Python'
```

### 긴 문자열 분리 
긴 복수 문자열은 괄호로 묶어서 여러줄로 입력할 수 있습니다. 
```python
text = ('Put several strings within parentheses '
...     'to have them joined together.')
text
> 'Put several strings within parentheses to have them joined together.'
```

## 인덱스
문자열은 인덱스를 통해 필요한 부분을 얻을 수 있습니다. 첫번째 문자는 인텍스 0 입니다. 
```python
word = 'Python'
word[0]  # character in position 0
> 'P'
word[5]  # character in position 5
> 'n'
```

음수 인덱스는 오른쪽에서 왼쪽으로 검색합니다. 
```python
word[-1]  # last character
> 'n'
word[-2]  # second-last character
> 'o'
word[-6]
> 'P'
```

::: tip
인덱스에서 -0 은 0과 같습니다. 따라서 음수 인덱스는 -1 부터 시작합니다.
:::

문자열을 부분적으로 잘라 낼 때 시작과 끝 인덱스를 지정할 수 있습니다. 
```python
word[0:2]  # characters from position 0 (included) to 2 (excluded)
> 'Py'
word[2:5]  # characters from position 2 (included) to 5 (excluded)
> 'tho'
```

문자열을 슬라이스 할 때, 시작과 끝 인덱스를 입력하지 않으면 각각 맨 앞과 뒤의 인덱스를 사용합니다. 
```python
word[:2] + word[2:]
> 'Python'
word[:4] + word[4:]
> 'Python'
```

'Python' 문자열의 인텍스를 표로 표시하면 다음과 같습니다. 
```txt
 +---+---+---+---+---+---+
 | P | y | t | h | o | n |
 +---+---+---+---+---+---+
 0   1   2   3   4   5   6
-6  -5  -4  -3  -2  -1
```

## 변경
인덱스를 지정하여 문자열의 일부를 변경하는 것은 다음과 같이 에러를 발생시킵니다.
```python
word[0] = 'J'
> Traceback (most recent call last):
>   File "<stdin>", line 1, in <module>
> TypeError: 'str' object does not support item assignment
word[2:] = 'py'
> Traceback (most recent call last):
>   File "<stdin>", line 1, in <module>
> TypeError: 'str' object does not support item assignment
```


만약 문자열 일부를 변경해야 한다면 다음과 같이 새로운 문자열을 생성해야 합니다. 
```python
'J' + word[1:]
> 'Jython'
word[:2] + 'py'
> 'Pypy'
```


내장 함수 len()을 사용하면 문자열의 길이를 알 수 있습니다. 
```python
s = 'supercalifragilisticexpialidocious'
len(s)
> 34
```

## 문자열 응용
### 코멘트 
하나의 예제를 통해 문자열 응용에 대해 알아 보겠습니다. 
우선, 파이썬에서 주석(commnet) 처리는 # 을 사용합니다. 프로그래머는 코드 상에서 볼 수 있지만 파이썬은 전혀 관여하지 않은 코드 부분입니다. 
```python
# Ask user for name
name = input("What is your name?:")

# Ask user for age
age = input("How old are you?:")

# Ask user for city
city = input("What city do you live in?:")

# Ask user what they enjoy
love = input("What do you love dogin?:")

# Create output text

# Print output to screen
```

파이썬에는 68개의 내장 함수가 있습니다. 사용자 입력을 얻기 위해 input() 함수를 사용할 수 있습니다. 인자로 프롬프트 를 전달할 수 있습니다. 
다음은 --> 를 프롬프트로 표시하고 반환 된 사용자의 입력(문자열로 변환)을 s 변수에 저장하고 있습니다. 
```python
s = input('--> ')  
=> Monty Python's Flying Circus
s  
> "Monty Python's Flying Circus"
```