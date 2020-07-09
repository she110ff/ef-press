# Data Structures

## Using Lists as Stacks

리스트를 스택(“last-in, first-out”)으로 사용하려면 아이템 추가는 append()이며 꺼낼 때는 pop() 을 사용합니다. (인덱스 사용하지 않음):

```python
stack = [3, 4, 5]
stack.append(6)
stack.append(7)
stack
> [3, 4, 5, 6, 7]
stack.pop()
> 7
stack
> [3, 4, 5, 6]
stack.pop()
> 6
stack.pop()
> 5
stack
> [3, 4]
```



## Using Lists as Queues

리스트를 큐(“first-in, first-out”)를 사용하기 위해 collections.deque 를 사용할 수 있습니다. 아이템을 꺼낼때 popleft() 를 사용해야 합니다.:

```python
from collections import deque
queue = deque(["Eric", "John", "Michael"])
queue.append("Terry")           # Terry arrives
queue.append("Graham")          # Graham arrives
queue.popleft()                 # The first to arrive now leaves
> 'Eric'
queue.popleft()                 # The second to arrive now leaves
>'John'
queue                           # Remaining queue in order of arrival
> deque(['Michael', 'Terry', 'Graham'])
```


## List Comprehensions
List comprehensions 은 리스트를 생성하는 간결한 코딩 방식입니다. 다음은 0~10까지의 정수에 제곱한 값들의 리스트를 squares 변수에 저장하는 예 입니다. 
```python
squares = []
for x in range(10):
    squares.append(x**2)
squares
> [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]
```

map과 lambda를 사용할 수 있습니다. map 의 syntax 를 살펴보면 시그니쳐: map(fun, iter) 리턴: list 입니다. 첫번째 인자의 함수를 통해 iterable object를 반복적으로 수행하고 각 값을 리스틀 반환합니다.
따라서 위의 코드와 같은 결과를 볼 수 있습니다. 
```python
squares = list(map(lambda x: x**2, range(10)))
> [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]
```

또는 list comprehension 을 사용하면 다음과 같습니다. :

```python
squares = [x**2 for x in range(10)]
```
위의 코드가 더 간결하고 읽기에도 좋습니다. 
<p>
list comprehension 은 [] 안에 expression 과 0개 이상의 for, if clauses 를 사용할 수 있습니다. [ expresstion, [for, [if] ... ] ... ]    
tuple 은 () 를 사용합니다. 
```python
combs = []
for x in [1,2,3]:
    for y in [3,1,4]:
        if x != y:
            combs.append((x, y))
combs
> [(1, 3), (1, 4), (2, 3), (2, 1), (2, 4), (3, 1), (3, 4)]

[(x, y) for x in [1,2,3] for y in [3,1,4] if x != y]
> [(1, 3), (1, 4), (2, 3), (2, 1), (2, 4), (3, 1), (3, 4)]
```

여러 예제를 살펴보겠습니다. 
```python
vec = [-4, -2, 0, 2, 4]

# create a new list with the values doubled
[x*2 for x in vec]
> [-8, -4, 0, 4, 8]

# filter the list to exclude negative numbers
[x for x in vec if x >= 0]
> [0, 2, 4]

# apply a function to all the elements
[abs(x) for x in vec]
> [4, 2, 0, 2, 4]

# call a method on each element
freshfruit = ['  banana', '  loganberry ', 'passion fruit  ']
[weapon.strip() for weapon in freshfruit]
> ['banana', 'loganberry', 'passion fruit']

# create a list of 2-tuples like (number, square)
[(x, x**2) for x in range(6)]
> [(0, 0), (1, 1), (2, 4), (3, 9), (4, 16), (5, 25)]
# the tuple must be parenthesized, otherwise an error is raised
[x, x**2 for x in range(6)]
>   File "<stdin>", line 1, in <module>
>     [x, x**2 for x in range(6)]
>                ^
> SyntaxError: invalid syntax

# flatten a list using a listcomp with two 'for'
vec = [[1,2,3], [4,5,6], [7,8,9]]
[num for elem in vec for num in elem]
> [1, 2, 3, 4, 5, 6, 7, 8, 9]
```

List comprehensions 은 복잡한 exprestion 을 사용할 수 있습니다. :

```python
from math import pi
[str(round(pi, i)) for i in range(1, 6)]
> ['3.1', '3.14', '3.142', '3.1416', '3.14159']
```


## Nested List Comprehensions
list comprehension 내부에 포함된 list comprehension을 중복적으로 사용할 수도 있습니다. 
```python
matrix = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
]
```

다음은 list comprehension의 중복 사용으로 matrix를 치환하는 예 입니다. :

```python
[[row[i] for row in matrix] for i in range(4)]
> [[1, 5, 9], [2, 6, 10], [3, 7, 11], [4, 8, 12]]
```

바깥 쪽 반복문을 풀어서 기술하면 다음과 같습니다. :

```python
transposed = []
for i in range(4):
    transposed.append([row[i] for row in matrix])
transposed
> [[1, 5, 9], [2, 6, 10], [3, 7, 11], [4, 8, 12]]
```

내부의 반복문을 풀어서 기술하면 다음과 같습니다. :

```python
transposed = []
for i in range(4):
    # the following 3 lines implement the nested listcomp
    transposed_row = []
    for row in matrix:
        transposed_row.append(row[i])
    transposed.append(transposed_row)
transposed
> [[1, 5, 9], [2, 6, 10], [3, 7, 11], [4, 8, 12]]
```

위의 코드들은 list comprehension을 설명하기 위한 예제이며 실제로 matrix를 치환하려면 다음과 같이 zip 함수를 통해서 멋지게 변화인 가능합니다. 
```python
list(zip(*matrix))
> [(1, 5, 9), (2, 6, 10), (3, 7, 11), (4, 8, 12)]
```
언패킹 연산자로 같이 사용하여 2차원 리스트을 1차원 리스트 3개로 분리하고, zip을 통해 각 배열의 순서에 따라 하나씩 아이템을 꺼내 새로운 tuple 로 생성하고 마지막에 리스트로 캐스팅 합니다.  
<p> 

## The del statement
del 구분은 리스트에서 하나 이상의 요소를 슬라이스, 삭제 할 수 있습니다. 
```python
a = [-1, 1, 66.25, 333, 333, 1234.5]
del a[0]
a
> [1, 66.25, 333, 333, 1234.5]
del a[2:4]
a
> [1, 66.25, 1234.5]
del a[:]
a
> []
```

del 은 변수 자체를 삭제할 수 있습니다. 변수가 삭제된 후에는 참조할 수 없습니다. :
```python
del a
```

## Tuples and Sequences
리스트와 비슷하게 순차적으로 데이터를 저장할 수 있고 중첩 구조가 가능한 Sequence Type(list, tuple, range) 입니다. 다른 점은 값의 변경이 가능하지 않습니다. 그러나 변경 가능한 유형의 데이터 오브젝트(예: 리스트)를 포함할 수 있습니다. 
```python
t = 12345, 54321, 'hello!'
t[0]
> 12345
t
> (12345, 54321, 'hello!')
# Tuples may be nested:
u = t, (1, 2, 3, 4, 5)
u
> ((12345, 54321, 'hello!'), (1, 2, 3, 4, 5))
# Tuples are immutable:
t[0] = 88888
> Traceback (most recent call last):
>   File "<stdin>", line 1, in <module>
> TypeError: 'tuple' object does not support item assignment
# but they can contain mutable objects:
v = ([1, 2, 3], [3, 2, 1])
v
> ([1, 2, 3], [3, 2, 1])
```

t = 12345, 54321, 'hello!'과 같이 tuple 을 패킹하였다면, 다음과 같이 reverse 연산도 가능합니다. :
```python
x, y, z = t
```


## Sets
set 은 중복이 없는 요소들의 집합 입니다. {}(Curly braces) 또는 set() 을 사용해서 생성할 수 있습니다. 비어 있는 {} 는 빈 dictionary 를 생성합니다. 
```python
basket = {'apple', 'orange', 'apple', 'pear', 'orange', 'banana'}
print(basket)                      # show that duplicates have been removed
> {'orange', 'banana', 'pear', 'apple'}
'orange' in basket                 # fast membership testing
> True
'crabgrass' in basket
> False

# Demonstrate set operations on unique letters from two words
a = set('abracadabra')
b = set('alacazam')
a                                  # unique letters in a
> {'a', 'r', 'b', 'c', 'd'}
a - b                              # letters in a but not in b
> {'r', 'd', 'b'}
a | b                              # letters in a or b or both
> {'a', 'c', 'r', 'd', 'b', 'm', 'z', 'l'}
a & b                              # letters in both a and b
> {'a', 'c'}
a ^ b                              # letters in a or b but not both
> {'r', 'd', 'b', 'm', 'z', 'l'}
```

Similarly to list comprehensions, set comprehensions are also supported:

```python
a = {x for x in 'abracadabra' if x not in 'abc'}
a
> {'r', 'd'}
```


## 5.5. Dictionaries
맵은 키/값 을 쌍으로 갖는 유용한 데이터 타입입니다. 시퀀스 타입과 다르게 dictionary 는 key 로 인덱싱을 합니다. tuple을 키로 사용할 수도 있습니다.  
```python
tel = {'jack': 4098, 'sape': 4139}
tel['guido'] = 4127
tel
> {'jack': 4098, 'sape': 4139, 'guido': 4127}
tel['jack']
> 4098
del tel['sape']
tel['irv'] = 4127
tel
> {'jack': 4098, 'guido': 4127, 'irv': 4127}
list(tel)
> ['jack', 'guido', 'irv']
sorted(tel)
> ['guido', 'irv', 'jack']
'guido' in tel
> True
'jack' not in tel
> False
```

dict() constructor 를 사용하면  sequences 타입의  key-value pairs를 dictionary로 만들 수 있습니다. :

```python
dict([('sape', 4139), ('guido', 4127), ('jack', 4098)])
> {'sape': 4139, 'guido': 4127, 'jack': 4098}
print(dic['sape'])
> 4139
```

추가로 dict comprehensions 을 사용해서 dictionary 를 만들 수 있습니다. :
```python
{x: x**2 for x in (2, 4, 6)}
> {2: 4, 4: 16, 6: 36}
print(dic[2])
> 4
```

심볼 등이 포함되지 않는 문자열인 경우 다음과 같은 방식으로 키/값 쌍을 사용하 수 있습니다.
```python
dict(sape=4139, guido=4127, jack=4098)
> {'sape': 4139, 'guido': 4127, 'jack': 4098}
```


## Looping Techniques

When looping through dictionaries, the key and corresponding value can be retrieved at the same time using the items() method.

```python
knights = {'gallahad': 'the pure', 'robin': 'the brave'}
for k, v in knights.items():
    print(k, v)
> gallahad the pure
> robin the brave
```

When looping through a sequence, the position index and corresponding value can be retrieved at the same time using the enumerate() function.

```python
for i, v in enumerate(['tic', 'tac', 'toe']):
    print(i, v)
> 0 tic
> 1 tac
> 2 toe
```

To loop over two or more sequences at the same time, the entries can be paired with the zip() function.

```python
questions = ['name', 'quest', 'favorite color']
answers = ['lancelot', 'the holy grail', 'blue']
for q, a in zip(questions, answers):
    print('What is your {0}?  It is {1}.'.format(q, a))
> What is your name?  It is lancelot.
> What is your quest?  It is the holy grail.
> What is your favorite color?  It is blue.
```

To loop over a sequence in reverse, first specify the sequence in a forward direction and then call the reversed() function.

```python
for i in reversed(range(1, 10, 2)):
    print(i)
> 9
> 7
> 5
> 3
> 1
```

To loop over a sequence in sorted order, use the sorted() function which returns a new sorted list while leaving the source unaltered.

```python 
basket = ['apple', 'orange', 'apple', 'pear', 'orange', 'banana']
for f in sorted(set(basket)):
    print(f)
> apple
> banana
> orange
> pear
```

It is sometimes tempting to change a list while you are looping over it; however, it is often simpler and safer to create a new list instead.

```python
import math
raw_data = [56.2, float('NaN'), 51.7, 55.3, 52.5, float('NaN'), 47.8]
filtered_data = []
for value in raw_data:
    if not math.isnan(value):
        filtered_data.append(value)
filtered_data
> [56.2, 51.7, 55.3, 52.5, 47.8]
```

[Python Data Structures](https://docs.python.org/2/tutorial/datastructures.html?highlight=data%20structure)