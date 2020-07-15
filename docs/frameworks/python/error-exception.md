# Error & Exception

## Error
에러의 대부분은 문법적 에러에 해당합니다. 다음과 같은 경우 에러가 발생합니다. 
```python
while True print('Hello world')
```

## Handling
에러는 프로그램의 흐름을 방해하기 때문에 에러 발생시 이를 적절한 방식으로 처리해야 합니다. 에러 핸들링은 try exceptio 구문을 통해서 가능합니다. 
```python
while True:
    try:
        x = int(input("Please enter a number: "))
        break
    except ValueError:
        print("Oops!  That was no valid number.  Try again...")
```

```python
import sys

try:
    f = open('myfile.txt')
    s = f.readline()
    i = int(s.strip())
except OSError as err:
    print("OS error: {0}".format(err))
except ValueError:
    print("Could not convert data to an integer.")
except:
    print("Unexpected error:", sys.exc_info()[0])
    raise
finally:
    f.close()
    print('Goodbye, world!')

```