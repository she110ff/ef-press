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

### 반복 및 연결  
+ 연산자로 문자열을 합치거나 * 연산자로 문자열 반복이 가능합니다. 
```python
# 3 times 'un', followed by 'ium'
3 * 'un' + 'ium'
>'unununium'
```

둘 이상의 리터럴 문자열은 자동으로 합쳐집니다. 
```python
'Py' 'thon'
> 'Python'
```

```python
A = 'Python'
B = 1
A + B
> Traceback (most recent call last):
> File "<pyshell#54>", line 1, in <module>
>   A + B
> TypeError: can only concatenate str (not "int") to str
```
::: warning
숫자 타입과 문자열 타입은 호환되지 않는 데이터 타입이기 때문에 + 연산자를 통해서 하나로 연결될 수 없습니다. 이 경우에 str() 함수를 사용해서 형 변환을 해서 연결 할 수 있습니다. 
:::


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
word[0:5:2]
> 'Pto'
word[::-1]
> 'nohtyP'
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



## 문자열 함수들
### format 
내장 string 클래스는 여러 변수와 함께 문자열을 생성할 수 있는 format() 함수를 제공합니다. 
placeholder( {} )와  포맷(% 또는 : )를 사용하여 문자열을 포매팅 할 수 있습니다.  

포지션으로 접근:
'{} {}'.format(a, b) 과 '{0} {1}'.format(a, b)은 같은 결과를 얻을 수 있습니다. 포지션을 정하지 않는 경우 파이썬이 암묵적으로 순서대로 포지션을 지정합니다. 
```python
'{0}, {1}, {2}'.format('a', 'b', 'c')
> 'a, b, c'
'{}, {}, {}'.format('a', 'b', 'c')  # 3.1+ only
> 'a, b, c'
'{2}, {1}, {0}'.format('a', 'b', 'c')
> 'c, b, a'
'{2}, {1}, {0}'.format(*'abc')      # unpacking argument sequence
> 'c, b, a'
'{0}{1}{0}'.format('abra', 'cad')   # arguments' indices can be repeated
> 'abracadabra'
```

이름으로 접근:
```python
'Coordinates: {latitude}, {longitude}'.format(latitude='37.24N', longitude='-115.81W')
> 'Coordinates: 37.24N, -115.81W'
coord = {'latitude': '37.24N', 'longitude': '-115.81W'}
'Coordinates: {latitude}, {longitude}'.format(**coord)
> 'Coordinates: 37.24N, -115.81W'
```

파라미터의 속성으로 접근:
```python
c = 3-5j
('The complex number {0} is formed from the real part {0.real} '
  'and the imaginary part {0.imag}.').format(c)
> 'The complex number (3-5j) is formed from the real part 3.0 and the imaginary part -5.0.'
class Point:
    def __init__(self, x, y):
        self.x, self.y = x, y
    def __str__(self):
        return 'Point({self.x}, {self.y})'.format(self=self)
str(Point(4, 2))
> 'Point(4, 2)'
```

파라미터의 아이템으로 접근:
```python
coord = (3, 5)
'X: {0[0]};  Y: {0[1]}'.format(coord)
> 'X: 3;  Y: 5'
```

문자열 넓이와 위치:
```python
'{:<30}'.format('left aligned')
> 'left aligned                  '
'{:>30}'.format('right aligned')
> '                 right aligned'
'{:^30}'.format('centered')
> '           centered           '
'{:*^30}'.format('centered')  # use '*' as a fill char
> '***********centered***********'
```

양수, 음수 부호:
```python
'{:+f}; {:+f}'.format(3.14, -3.14)  # show it always
> '+3.140000; -3.140000'
'{: f}; {: f}'.format(3.14, -3.14)  # show a space for positive numbers
> ' 3.140000; -3.140000'
'{:-f}; {:-f}'.format(3.14, -3.14)  # show only the minus -- same as '{:f}; {:f}'
> '3.140000; -3.140000'
```

16, 8, 2진수로 변환 표시 :
```python
# format also supports binary numbers
"int: {0:d};  hex: {0:x};  oct: {0:o};  bin: {0:b}".format(42)
> 'int: 42;  hex: 2a;  oct: 52;  bin: 101010'
# with 0x, 0o, or 0b as prefix:
"int: {0:d};  hex: {0:#x};  oct: {0:#o};  bin: {0:#b}".format(42)
> 'int: 42;  hex: 0x2a;  oct: 0o52;  bin: 0b101010'
```

천 단위 콤마 사용:
```python
'{:,}'.format(1234567890)
> '1,234,567,890'
```

백분율 표시:
```python
points = 19
total = 22
'Correct answers: {:.2%}'.format(points/total)
> 'Correct answers: 86.36%'
```

날짜 표시:
```python
import datetime
d = datetime.datetime(2010, 7, 4, 12, 15, 58)
'{:%Y-%m-%d %H:%M:%S}'.format(d)
> '2010-07-04 12:15:58'
```
[String Formatting](https://docs.python.org/3/library/string.html)


format 외에도 count, upper, lower, replace, index, strip 등 많은 함수들을 포함하고 있습니다. 아래 링크엥서 확인할 수 있습니다. 
[문자열 함수](https://docs.python.org/3/library/stdtypes.html#string-methods)

문자열 함수들은 체인닝을 통해서 사용이 가능합니다. 
```python
string  = '01\t012\t0123\t01234'.expandtabs().count('0')
print(string)
> 4
```

특정 문자열의 위치를 찾을 때 index 와 find 를 사용할 수 있습니다. substring을 찾지 못한 경우 index는 에러가 발생하고 find 는 -1을 반환합니다. 
```python
x = "happy birthday"
x.index("birthday")
> 6
x.index("dklfs")
> ValueError: substring not found
x.find("dklskj")
> -1
```

### Simple Syntax 
The syntax is similar to the one you used with str.format() but less verbose. Look at how easily readable this is:
```python
>>> name = "Eric"
>>> age = 74
>>> f"Hello, {name}. You are {age}."
'Hello, Eric. You are 74.'
```

Because f-strings are evaluated at runtime, you can put any and all valid Python expressions in them. This allows you to do some nifty things.

You could do something pretty straightforward, like this:
```python
>>> f"{2 * 37}"
'74'
```


### 코멘트 
하나의 예제를 통해 문자열 응용에 대해 알아 보겠습니다. 
우선, 파이썬에서 주석(commnet) 처리는 # 을 사용합니다. 프로그래머는 코드 상에서 볼 수 있지만 파이썬은 전혀 관여하지 않은 코드 부분입니다. 
```python
# Ask user for name
# Ask user for age
```

### 문자열 함수 응용  
파이썬에는 68개의 내장 함수가 있습니다. 사용자 입력을 얻기 위해 input() 함수를 사용할 수 있습니다. 인자로 프롬프트 를 전달할 수 있습니다. 
다음은 --> 를 프롬프트로 표시하고 반환 된 사용자의 입력(문자열로 변환)을 s 변수에 저장하고 있습니다. 
```python
s = input('--> ')  
=> Monty Python's Flying Circus
s  
> "Monty Python's Flying Circus"
```


```python
# get user email address
email = input("What is your email address?: ").strip()

# slice out user name
user = email[:email.index("@")]

# slice domain name
domain = email[email.index("@") + 1 :]

# format message
output = "Your username is {} and your domain name is {}".format(user, domain)

# display output message 
print(output)

```

[PyFormat](https://pyformat.info/)
