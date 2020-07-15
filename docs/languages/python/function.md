# Function

파이썬에서 function은 최상위 객체입니다. 변수에 할당할 수 있고, data-structure 에 담을 수 있고, 다른 함수의 인자로 전달할 수 있고 함수의 값으로 반환될 수도 있습니다. 간단한 greet 함수를 만들어 보겠습니다. 
```python
def greet(name):
    return "Welcome {}!!".format(name)
greet('Sarah')
> 'Welcome Sarah!!'
```

## 함수도 객체
파이썬에서 모든 데이터는 객체로 표현됩니다. 문자열, 리스트 모듈, 함수 모두 객체입니다. greet 함수도 객체입니다. 따라서 변수에 할당하는 것이 자연스러운 방식이 되는 것 입니다. 
```python
receive = greet
```

위의 코드는 함수를 호출하지는 않습니다. 함수 객체의 참조를 다른 이름으로 만드는 것 입니다.  
```python
receive('Sarah')
> 'Welcome Sarah!!'
```

함수 객체와 이름은 두 개가 되었습니다. greet 함수를 삭제한다고 해도 receive 의 포인트는 남아 있습니다. 다음에서 이와 같은 현상을 볼 수 있습니다. 
```python
del greet
greet('Sarah')
> NameError: "name 'greet' is not defined"
receive('Sarah')
> 'Welcome Sarah!!'
```

## 함수와 Data Structures
함수는 리스트에도 추가될 수 있습니다. 
```python
funcs = [len, str.isdigit, str.lower]
funcs
> [ <built-in function len>,
>  <method 'isdigit' of 'str' objects>,
>  <method 'lower' of 'str' objects> ]

#다음은 리스트에 담긴 함수 객체에 접근해서 작업하는 예를 보여주고 있습니다. 
for f in funcs:
   print(f, f('Hello World!'))
> <built-in function len> 12
> <method 'isdigit' of 'str' objects> False
> <method 'lower' of 'str' objects> hello world
```


## 함수 파라미터 
함수는 객체이기 때문에 다른 함수의 파라미터로 전달될 수 있습니다. 
```python
def accept(func):
    msg = func('Roark')
    print(msg)
accept(greet)
> 'Welcome Roark!!'
```

각기 다른 함수를 파라미터로 전달하면서 결과를 다르게 만들 수 있습니다. 
```python
def leave(name):
    return "Good Bye {}!".format(name)
accept(leave)
> 'Good Bye Roark!'
```

## 내부 함수 
함수의 내부에 내부 함수라고 부르는 함수를 정의할 수 있습니다. 
```python
def speak(text):
    def whisper(t):
        return t.lower + "..."
    return whisper(text)
speak('Hello World')
> 'hello world...'
```

내부 함수는 해당 함수의 외부에서 접근할 수 없습니다. 
```python
whisper('hello')
> NameError: "name 'whisper' is not defined"
```

외부에서 해당 함수의 내부 함수에 접근해야 한다면 내부 함수를 결과 값으로 반환해서 사용합니다. 다른 프로그램에서 Closure라고 부릅니다.  
```python
def get_func(flag):
    def add(a, b):
        return a + b
    def multiply(a, b):
        return a * b
    if flag > 0.5:
        return multiply
    else:
        return add
func_inst = get_func(0.7)
func_inst
> <function get_func.<locals>.multiply at 0x102d54290>
func_inst(10, 6)
> 60
```


## 객체의 호출
함수가 객체이다. 따라서 객체는 함수이다. 이것은 사실이 아닙니다. 그러나 객체도 함수처럼 호출될 수 있습나다. __call__ 메소드를 통해 가능합니다. 다음에 클래스에 __call__ 을 적용한 예 입니다. 
```python
class Foo:
    def __init__(self):
        print("init")
    def __call__(self):
        print("call")
obj = Foo()
> init
obj()
> call
```


## Parameters(arguments) 참조
함수나 클래스에서 파라미터를 받아 사용할 수 있습니다. 파이썬은 동적인 인자를 다루는 방식을 제공합니다. 

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


[All we need to konw about pyton function ](https://medium.com/python-features/all-we-need-to-know-about-pythons-functions-960231e510af)