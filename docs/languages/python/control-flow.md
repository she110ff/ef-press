# Control Flow

Besides the while statement just introduced, Python uses the usual flow control statements known from other languages, with some twists.
파이썬도 다른 언어들과 비슷하게 그러나 조금 다르게 로직 흐름을 다루고 있습니다. if, for, while range 등의 구분들을 사용합니다.


## if  
if 로 시작하고 선택적으로 여러개의 elif 와 마지막 else 를 사용합니다. 
```python
x = int(input("Please enter an integer: "))
> Please enter an integer: 42
if x < 0:
    x = 0
    print('Negative changed to zero')
elif x == 0:
    print('Zero')
elif x == 1:
    print('Single')
else:
    print('More')
```

## for 
반복문 진행에 대한 별도의 조건(step, halting)이 없이 주어진 리스트의 아이템을 순서대로 진행한다는 것이 특징입니다. 
```python
# Measure some strings:
words = ['cat', 'window', 'defenestrate']
for w in words:
    print(w, len(w))
> cat 3
> window 6
> defenestrate 12
```

반복문 안에서 컬렉션을 수정할 때 약간의 트릭이 필요합니다.  
```python
# Strategy:  Iterate over a copy
users = {'tom': 'active', 'john': 'inactive', 'selly': 'active'}
print(users)
for user, status in users.copy().items():
    if status == 'inactive':
        del users[user]

print(users)

# Strategy:  Create a new collection
active_users = {}
users = {'tom': 'active', 'john': 'inactive', 'selly': 'active'}
print(users)
for user, status in users.copy().items():
    if status == 'inactive':
        del users[user]

print(users)
```



## range()
내장 함수 range 는 순차적 수를 반복문에 반환하는 기능이 있습니다. 
```python
for i in range(5):
    print(i)
> 0
> 1
> 2
> 3
> 4
```

3개의 파라미터는 각각 시작, 끝, 증가 에 대한 값입니다. 
```python
range(5, 10)
   5, 6, 7, 8, 9

range(0, 10, 3)
   0, 3, 6, 9

range(-10, -100, -30)
  -10, -40, -70
```


다음과 같은 활용이 가능합니다. 
```python
>>> print(range(10))
range(0, 10)
```

```python
>>> sum(range(4))  # 0 + 1 + 2 + 3
6
```

```python
>>> list(range(4))
[0, 1, 2, 3]
```


In chapter Data Structures, we will discuss in more detail about list().


## break, continue 
break 문은 해당 반복문을 종료합니다. 
continue 문은 하위 조직을 중단하고 반복문으로 돌아갑니다. 


## pass 
pass 문은 반복문, class, def 에 사용하면서 아무런 액션 없이 문법적 규약을 지키기 위해 사용합니다. 

```python
while True:
    pass  # Busy-wait for keyboard interrupt (Ctrl+C)
class MyEmptyClass:
    pass
def initlog(*args):
    pass   # Remember to implement this!
```

## Boolean
true/false, 'True'/'False' 가 아닌 True/False 를 사용해야 합니다. 

```python
type(2<3)
> <class 'bool'>
D = true
NameError: name 'true' is not defined
```


not 을 비교, 조건 연산에 추가할 수 있습니다. 

```python
type(2<3)
> <class 'bool'>
D = true
NameError: name 'true' is not defined
A = 1
if not A > 10:
    print("A is not greater than 10")
> A is not greater than 10
```
