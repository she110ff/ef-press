# Classes & Objects

객체는 데이터와 행동으로 구성되어 실물을 표현합니다. 자동차가 바퀴, 문 등의 데이터와 가속, 정지, 연료 표시 등의 행동을 갖는 것과 같습니다.

<figure><img src="/what-about-python-classes.jpg" /></figure>

<p>
데이터는 속성(attribute), 행동은 메소드(method) 라고 부릅니다. 클래스는 이런 개별 객체의 설계도(blueprint) 입니다.

## 클래스

파이썬에서 객체지향 프로그래밍은 클래스와 객체 두 개의 컨셉으로 구성되어 있습니다.

<p>
클래스의 간단한 문법은 다음과 같습니다. 
```python
class Vehicle:
    pass
```

객체는 클래스의 인스턴스 입니다. 다음에서는 car 가 Vehicle 클래스의 객체입니다.

```python
car = Vehicle()
print(car) # <__main__.Vehicle instance at 0x7fb1de6c2638>
```

## 속성

Vehicle 클래스가 4개의 속성을 가지고 있습니다. 객체가 생성 될 때에 속성을 추가하려면 생성자 메소드(**init**)를 사용합니다.

```python
class Vehicle:
    def __init__(self, number_of_wheels, type_of_tank, seating_capacity, maximum_velocity):
        self.number_of_wheels = number_of_wheels
        self.type_of_tank = type_of_tank
        self.seating_capacity = seating_capacity
        self.maximum_velocity = maximum_velocity
```

Vehicle 클래스에서 Tesla Model S의 객체(4 wheels + Electric type of tank + 5 seats + 250km/hour maximum speed)를 만들어 보겠습니다.

```python
tesla_model_s = Vehicle(4, 'electric', 5, 250)
```

## 메소드

이제 객체에 어떠한 요청을 해야 한다면 메소드를 사용할 수 있습니다. 다음은 바뀌의 갯수 정보를 얻어 오거나 변경하는 예 입니다. getter, setter 라고 부르는 메소드입니다.

```python
class Vehicle:
    def __init__(self, number_of_wheels, type_of_tank, seating_capacity, maximum_velocity):
        self.number_of_wheels = number_of_wheels
        self.type_of_tank = type_of_tank
        self.seating_capacity = seating_capacity
        self.maximum_velocity = maximum_velocity

    def number_of_wheels(self):
        return self.number_of_wheels

    def set_number_of_wheels(self, number):
        self.number_of_wheels = number

tesla_model_s = Vehicle(4, 'electric', 5, 250)
print(tesla_model_s.number_of_wheels)
> 4
tesla_model_s.set_number_of_wheels(2) # setting number of wheels to 2
print(tesla_model_s.number_of_wheels)
> 2
```

getter, setter 를 만들 때, decorator 을 쉽게 사용할 수 도 있습다. @property 는 getter, @ 는 setter 입니다. private

```python
class Vehicle:
    def __init__(self, number_of_wheels, type_of_tank, seating_capacity, maximum_velocity):
        self.__number_of_wheels = number_of_wheels
        self.type_of_tank = type_of_tank
        self.seating_capacity = seating_capacity
        self.maximum_velocity = maximum_velocity

    @property
    def number_of_wheels(self):
        return self.__number_of_wheels

    @number_of_wheels.setter
    def number_of_wheels(self, number):
        self.__number_of_wheels = number

tesla_model_s = Vehicle(4, 'electric', 5, 250)

print(tesla_model_s.number_of_wheels)
> 4
tesla_model_s.number_of_wheels = 2
print(tesla_model_s.number_of_wheels)
> 2
```

다음과 같이 private 속성을 접근하면 에러가 발생합니다.

```python
print(tesla_model_s.__number_of_wheels)
> AttributeError: 'Vehicle' object has no attribute '__number_of_wheels'
```

그러나 object.\_class\_\_attribute 같이 접근하면 객체 외부에서 접근할 수 있습니다.

```python
print(tesla_model_s._Vehicle__number_of_wheels)
> 2
```

::: tip
protected 속성은 하나의 밑줄(\_), private 속성은 두개의 밑줄(\_\_) 을 사용하는 것을 권장합니다.
:::

```python
class Vehicle:
    def __init__(self, number_of_wheels, type_of_tank, seating_capacity, maximum_velocity):
        self.number_of_wheels = number_of_wheels
        self.type_of_tank = type_of_tank
        self.seating_capacity = seating_capacity
        self.maximum_velocity = maximum_velocity

    def make_noise(self):
        print('VRUUUUUUUM')

tesla_model_s = Vehicle(4, 'electric', 5, 250)
tesla_model_s.make_noise()
> VRUUUUUUUM
```

## 상속(Inheritance)

클래스는 여러개의 의미있는 블럭들로 조합되어 로직을 구현합니다. 이러한 구현은 또한 추상적 방식을 포함하면서 간소화 된 코드를 유지할 수 있게 합니다. 클래스의 상속되거나 구성되어 지면서

<p>
상속의 기반이 되는 클래스는 부모 클래스(또는 수퍼 클래스), 상속을 받는 클래스는 자식 클래스(서브 클래스)로 구분합니다.

### 상속 문법

```python
클래스 상속에 관한 pseudo 코드는 다음과 같습니다.
class DerivedClassName(BaseClassName):
    pass
```

다음은 실제 상속의 예를 구현합니다.

```python
class Rocket:
    def __init__(self, name, distance):
        self.name = name
        self.distance = distance

    def launch(self):
        return "%s has reached %s" % (self.name, self.distance)


class MarsRover(Rocket): # inheriting from the base class
    def __init__(self, name, distance, maker):
        Rocket.__init__(self, name, distance)
        self.maker = maker

    def get_maker(self):
        return "%s Launched by %s" % (self.name, self.maker)


x = Rocket("simple rocket", "till stratosphere")
y = MarsRover("mars_rover", "till Mars", "ISRO")
print(x.launch())
print(y.launch())
print(y.get_maker())

> simple rocket has reached till stratosphere
> mars_rover has reached till Mars
> mars_rover Launched by ISRO
```

## 구성(Composition)

클래스 구성은 클래스 사이의 관계를 상속이 아닌 참조에 두는 것 입니다. 다음은 생성자 메소드에서 Rocket 클래스를 생성하여 참조하는 구성 방식입니다.

```python
class MarsRoverComp():
    def __init__(self, name, distance, maker):
        self.rocket = Rocket(name, distance) # instantiating the base

        self.maker = maker

    def get_maker(self):
        return "%s Launched by %s" % (self.rocket.name, self.maker)

    def launch(self):
        return self.rocket.launch()

z = MarsRoverComp("mars_rover2", "till Mars", "ISRO")
print(z.launch())
print(z.get_maker())

> mars_rover2 has reached till Mars
> mars_rover2 Launched by ISRO
```

## 다중 상속 & overriding

파이썬은 다중 상속을 지원합니다. 다중 상속의 경우에 부모 클래스에 동일한 메소드가 존해하는 경우 super.method() 을 요청하면 상속 순서에 영향을 받는다.

```python
class First(object):
    def __init__(self):
        super(First, self).__init__()
        print("first")

    def doSomething(self):
        print("First doSomething")

class Second(object):
    def __init__(self):
        super(Second, self).__init__()
        print("second")

    def doSomething(self):
        print("Second doSomething")

class Third(First, Second):
    def __init__(self):
        super(Third, self).__init__()
        print("third")

    def doSomething(self):
        super(Third, self).doSomething()
        print("Third doSomething")


third = Third()
third.doSomething()

```

```python
class Employee:
    pass

john = Employee()  # Create an empty employee record

# Fill the fields of the record
john.name = 'John Doe'
john.dept = 'computer lab'
john.salary = 1000

print(john.name)
print(john.salary)
> John Doe
> 1000
```

## docstring 작성

Module 첫번째 줄, 함수 선언 후 내부 바로 아랫줄 또는 클래스 선언 후 내부 바로 아랫줄에 큰따옴표 3개나 작은 따옴표 3개로 작성하면됩니다.

```python
class CustomClass:
"""
클래스의 문서화 내용을 입력합니다.
"""

    def custom_function(param):
        '''
        함수의 문서화 내용을 입력합니다.
        '''
```
