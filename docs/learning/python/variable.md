# Variable

Variables are an incredibly useful concept in programming and they help us store information in our code and generally just make programming a whole lot simpler and a lot more fun.

## 변수란 무엇인가?

변수는 작은 상자라고 생각할 수 있습니다. 그 상자에 프로그램 안에 있는 것들을 넣어 둘 수 있는 것 입니다. 

변수는 이름과 값 두 가지를 가지고 있습니다. 해당 이름에 값을 할당하기 위해서는 할당 연산자, 즉 등호를 사용할 수 있습니다. 
```python
number = 1
```
이렇게 변수를 선언하고 number 를 프린트 하면 1 이라는 값을 없을 수 있습니다. 이름을 사용하여 해당 박스 안에서 값을 꺼낼 수 있는 것 입니다. 

## 변수 사용
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

### *args 인자   
이 함수는 전달 받은 두 개의 인자를 더하여 결과를 반환하는 함수로 잘 작동이 됩니다. 
```python
def my_sum(a, b):
    return a + b
my_sum(2, 4)
> 6
```

리스트 타입의 인자를 전달 받아 함수를 수행하면 다음과 같은 예로 사용할 수 있습니다. 
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
전달 파라미터와 함수 인자가 일치되지 않는 경우의 파라미터는 패킹(packing) 되어 single iterable object 또는 dictionary 유형으로 전달이 됩니다. 함수에서 *(unpacking operator)를 사용하여 tuple 형으로 변환할 수 있습니다. 이때 args 는 변경이 가능한 이름입니다.  
```python
def my_sum(*args):
    result = 0
    # Iterating over the Python args tuple
    for x in args:
        result += x
    return result

print(my_sum(1, 2, 3))
```


## **kwargs 인자 
**kwargs 는 언패킹의 관점에서는 *args 와 같습니다 .그러나 포지션을 사용해서 접근해야 하는 tuple 대신 키워드 접근이 가능한 dictionary 를 사용합니다.
kwargs 역시 단순한 이름이며 사용자의 정해서 사용할 수 있습니다. 
```python
def concatenate(**kwargs):
    result = ""
    # Iterating over the Python kwargs dictionary
    for arg in kwargs.values():
        result += arg
    return result

print(concatenate(a="Real", b="Python", c="Is", d="Great", e="!"))
> RealPythonIsGreat! 
```

## 인자 순서 
함수 시그니처에 인자를 추가하는 순서가 있습니다.  
1. Standard arguments
2. *args arguments
3. **kwargs arguments

순서가 바뀌면 에러가 발생합니다.
```python
def my_function(a, b, **kwargs, *args):
    pass
> File "wrong_function_definition.py", line 2
>   def my_function(a, b, **kwargs, *args):
>                                     ^
> SyntaxError: invalid syntax
```
다음은 올바른 예 입니다. 
```python
def sample(a,*args,**kwargs):
  print ("a is {}".format(a))
  print ("*args is a tuple {}".format(args))
  print ("**kwargs is a dictionary {}".format(kwargs))

sample(1,2,3,4,name="rahul",age=26)
> a is 1
> *args is a tuple (2, 3, 4)
> **kwargs is a dictionary {‘age’: 26, ‘name’: ‘rahul’}
``` 

## 언패킹 인자 사용법 : * & **
언패킹 연산자의 다양한 활용법에 대해서 알아보도록 하겠습니다. *(single asterisk unpacking operator) 는 iterable object에, ** (double asterisk ) 은 dictionary 에 사용될 수 있습니다.
다음은 iterable object 에 대한 예제입니다. 
```python
def my_sum(a, b, c):
    print(a + b + c)

my_list = [1, 2, 3]
my_sum(*my_list)
> 6
```

::: tip
list, tuple, dictionary 뿐만 아니라 string, file objects, class objects 도 iterable datatype 입니다.  
:::

언패킹 아이템과 인자의 수가 불일치 할 경우 에러가 발생합니다. 
```python
my_list = [1, 2, 3, 4]
my_sum(*my_list)
> Traceback (most recent call last):
> File "wrong_unpacking_call.py", line 6, in <module>
>    my_sum(*my_list)
> TypeError: my_sum() takes 3 positional arguments but 4 were give
```

아래와 같이 여러 개의 언패킹 리스트를 파라미터로 사용할 때, 하나의 언패킹 인자를 통해 취합해서 인자로 받을 수도 있습니다. 
```python
def my_sum(*args):
    result = 0
    for x in args:
        result += x
    return result

list1 = [1, 2, 3]
list2 = [4, 5]
list3 = [6, 7, 8, 9]

print(my_sum(*list1, *list2, *list3))
>> 45
```

리스트를 몇 개의 부분으로 나눌때에 유용한 방법으로 사용할 수 있습니다. 
```python
my_list = [1, 2, 3, 4, 5, 6]

a, *b, c = my_list

print(a)
print(b)
print(c)
> 1
> [2, 3, 4, 5]
> 6
```

두 개의 이상의 리스트 또는 dictionary 를 merge 할 때도 유용합니다. 
```python
# for list
my_first_list = [1, 2, 3]
my_second_list = [4, 5, 6]
my_merged_list = [*my_first_list, *my_second_list]

print(my_merged_list)
> [1, 2, 3, 4, 5, 6]

# for dictionary
my_first_dict = {"A": 1, "B": 2}
my_second_dict = {"C": 3, "D": 4}
my_merged_dict = {**my_first_dict, **my_second_dict}

print(my_merged_dict)
> {'A': 1, 'B': 2, 'C': 3, 'D': 4}
```





## ref 
https://realpython.com/python-kwargs-and-args/

https://medium.com/@rahulkp220/python-args-and-kwargs-5fb545b7a538
