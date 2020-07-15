# List  
여러 요소를 그룹으로 만들때 리스트를 사용할 수 있습니다. [](square brackets)를 사용하며 모든 요소는 동일한 데이터 타입이 일반적이지만 서로 다른 타입도 사용이 가능합니다. 

## 생성과 접근 
```python
squares = [1, 4, 9, 16, 25]
squares
> [1, 4, 9, 16, 25]
```

문자열과 같이 리스트로 인덱스로 접근할 수 있습니다. 이 때 슬라이싱이 일어나는데 원본은 변경 없이 새로운 리스트를 반환합니다. 
```python
squares[0]  # indexing returns the item
> 1
squares[-1]
> 25
squares[-3:]  # slicing returns a new list
> [9, 16, 25]
```

## 결합과 변경
다른 리스트를 merge 할때 + 연산자를 사용할 수 있습니다. :
```python
squares + [36, 49, 64, 81, 100]
> [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]
```


## 요소의 추가와 변경 
append() 를 사용하여 요소를 추가할 수 있습니다. :

```python
cubes.append(216)  # add the cube of 6
cubes.append(7 ** 3)  # and the cube of 7
cubes
> [1, 8, 27, 64, 125, 216, 343]
```
::: tip
리스트는 요소의 변경이 가능한데 비해서 문자열은 요소를 변경할 수 없다는 것이 다릅니다. 
:::

슬라이싱 하면서 값을 변경하거나 지울 수 있습니다. :
```python
letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g']

# replace some values
letters[2:5] = ['C', 'D', 'E']
letters
> ['a', 'b', 'C', 'D', 'E', 'f', 'g']

# now remove them
letters[2:5] = []
letters
> ['a', 'b', 'f', 'g']

# clear the list by replacing all the elements with an empty list
letters[:] = []
letters
> []
```

len() 을 사용하여 요소의 길이를 알 수 있습니다. :

```python
letters = ['a', 'b', 'c', 'd']
len(letters)
> 4
```

다차원 리스트와 접근이 가능합니다. 내부 리스트의 시작:끝 인덱스를 사용할 수 있습니다. 
```python
a = ['a', 'b', 'c']
n = [1, 2, 3]
x = [a, n]
x
> [['a', 'b', 'c'], [1, 2, 3]]
x[0]
> ['a', 'b', 'c']
x[0][1]
> 'b'
```

## shallow copy
```python
a = [[1, 2, 3], [4, 5, 6]]
b = list(a)
a
> [[1, 2, 3], [4, 5, 6]]
b
> [[1, 2, 3], [4, 5, 6]]
a[0][1] = 10
a
> [[1, 10, 3], [4, 5, 6]]
b   # b changes too -> Not a deepcopy.
> [[1, 10, 3], [4, 5, 6]]
```

## deep copy

```python
import copy
b = copy.deepcopy(a)
a
> [[1, 10, 3], [4, 5, 6]]
b
> [[1, 10, 3], [4, 5, 6]]
a[0][1] = 9
a
> [[1, 9, 3], [4, 5, 6]]
b    # b doesn't change -> Deep Copy
> [[1, 10, 3], [4, 5, 6]]
```

리스트를 사용하는 간단한 예제를 만들어 보겠습니다. 
```python
known_users = ["Alice", "Bob", "Claire", "Dan", "Emma", "Fred", "Georgie", "Harry"]
while True:
    print("Hi! My name is Travis")
    name = input("What is your name?: ").strip().capitalize()

    if name in known_users:
        print("Hello {}!".format(name))
        remove = input("Would you like to be removed from the system (y/n)?: ").strip().lower()
        
        if remove == "y":
            known_users.remove(name)
            print(known_users)
        elif remove == "n":
            print("No problem, I didn't want you to leave anyway!")
            
    else:
        print("Hmmm I don't think I have met you yet {}".format(name))
        add_me = input("Would you like to be added to the system (y/n)?: ").strip().lower()
        if add_me == "y":
            known_users.append(name)
            print(known_users)
        elif add_me == "n":
            print("No worries, see you around!")
 ```