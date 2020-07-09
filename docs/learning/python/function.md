# Function

파이썬에서 function은 최상위 객체입니다. 변수에 할당할 수 있고, data-structure 에 담을 수 있고, 다른 함수의 인자로 전달할 수 있고 함수의 값으로 반환될 수도 있습니다. 간단한 greet 함수를 만들어 보겠습니다. 
```python
def greet(name):
    return "Welcome {}!!".format(name)
greet('Sarah')
> 'Welcome Sarah!!'
```

## Functions Are Objects
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

## Functions Can Be Stored in Data Structures
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


## Functions Can Be Passed to Other Functions
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

## Functions Can Be Nested
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


## Objects Can Behave Like Functions
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


[All we need to konw about pyton function ](https://medium.com/python-features/all-we-need-to-know-about-pythons-functions-960231e510af)