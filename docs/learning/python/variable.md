# Variable

Variables are an incredibly useful concept in programming and they help us store information in our code and generally just make programming a whole lot simpler and a lot more fun.

## what is variable is

변수는 작은 상자라고 생각할 수 있습니다. 그 상자에 프로그램 안에 있는 것들을 넣어 둘 수 있는 것 입니다. 

변수는 이름과 값 두 가지를 가지고 있습니다. 해당 이름에 값을 할당하기 위해서는 할당 연산자, 즉 등호를 사용할 수 있습니다. 
```python
number = 1
```
이렇게 변수를 선언하고 number 를 프린트 하면 1 이라는 값을 없을 수 있습니다. 이름을 사용하여 해당 박스 안에서 값을 꺼낼 수 있는 것 입니다. 

## how to use them
파이썬에서 변수를 사용할 때 주의할 점은 대소문자를 구분해서 사용해야 한다는 것입니다. 만약 Number 와 같이 입력하면 NameError 를 볼 수 있습니다.
```python
Traceback (most recent call last):
  File "<pyshell#1>", line 1, in <module>
    Number
NameError: name 'Number' is not defined
```

또 다른 주의점은 파이썬 변수는 동적으로 타입의 변경이 가능하다는 것 입니다. 위 변수의 타입을 출력하면 integer 타입임을 확인 할 수 있습니다. 처음에 값을 1 로 할당했기 때문입니다.
```python
type(number) => <class 'int'>
```

위와 같이 number 변수에 문자열 값을 할당해 보세요. 일단 에러가 발생하지 않습니다. 그리고 타입을 출력해 보세요. 문자열 타입을 볼 수 있습니다.
```python
number = "Hello"
type(number) => <class 'str'>
```

Java, C 와 같은 정적 타입을 사용하는 언어의 경우에는 절대 허용되지 않습니다.

::: tip
변수명은 소문자를 사용하며 밑줄을 사용하여 여러 단어를 연결하는 것을 권장합니다. 숫자나 심볼로 시작할 수 없습니다.
:::

## Parameters(arguments) 참조
함수나 클래스에서 파라미터를 받아 사용할 수 있습니다. 

### 멀티 파라미터 
이 함수는 전달 받은 두 개의 파라미터를 더하여 결과를 반환하는 함수로 잘 작동이 됩니다. 
```python
def my_sum(a, b):
    return a + b
my_sum(2, 4)
> 6
```

리스트 타입의 파라미터를 전달 받아 함수를 수행하면 다음과 같은 예로 사용할 수 있습니다. 
```python
def my_sum(my_integers):
    result = 0
    for x in my_integers:
        result += x
    return result

list_of_integers = [1, 2, 3]
print(my_sum(list_of_integers))
```

함수에 전달 되는 파라미터가 리스트 타입이 아니고 계속 바뀔 수 있는 여러 개의 파라미터라면 다음과 같은 예로 사용할 수 있습니다. 
전달 파라미터와 함수 파라미터의 다른 경우 입력 값들은 패킹(packing) 되어 single iterable object 유형으로 전달이 됩니다. 함수에서 *(unpacking operator)를 사용하여 tuple 형으로 변환할 수 있습니다. 
이때 args 는 변경이 가능한 이름입니다.  
```python
def my_sum(*args):
    result = 0
    # Iterating over the Python args tuple
    for x in args:
        result += x
    return result

print(my_sum(1, 2, 3))
```

https://realpython.com/python-kwargs-and-args/