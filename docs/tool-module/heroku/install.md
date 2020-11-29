# 심화-Serializers

> 이 장에서는 Serializer 의 유용성을 확장하고자 하는 것입니다. 그러나 간단한 문제는 아니며 고민이 필요한 설계 작업이 필요합니다.
>
> -- Django users group, Russell Keith-Magee

Serializer를 사용하면 QuerySets 및 모델 인스턴스와 같은 복잡한 데이터를 네이티브 Python 데이터 유형으로 변환한 다음 JSON, XML 또는 다른 콘텐츠 유형으로 쉽게 렌더링 할 수 있습니다. 또한 Serializer는 역 직렬화 기능을 제공하여 들어오는 데이터를 검증하고 파싱하여 복잡한 유형으로 다시 변환 할 수 있습니다.

REST 프레임워크의 serializer는 Django `Form` 및 `ModelForm` 클래스와 매우 유사하게 작동합니다. `Serializer`클래스는 serializer를 만들기 위해 모델과 QuerySets을 사용하는 shortcut을 제공하는 ModelSerializer 클래스 뿐만 아니라 응답의 출력을 제어 할수 있는 강력하고 포괄적인 방법들을 제공합니다.

## Serializers

### Serializers 선언

간단한 객체를 만들어 보겠습니다.

```python
from datetime import datetime

class Comment(object):
    def __init__(self, email, content, created=None):
        self.email = email
        self.content = content
        self.created = created or datetime.now()

comment = Comment(email='leila@example.com', content='foo bar')
```

Comment 객체의 데이터를 직렬화/역 직렬화 하는데 사용할 수 있는 Serializer를 선언합니다.
Serializer 선언은 폼 선언과 매우 유사합니다 :

```python
from rest_framework import serializers

class CommentSerializer(serializers.Serializer):
    email = serializers.EmailField()
    content = serializers.CharField(max_length=200)
    created = serializers.DateTimeField()
```

[A successful Git branching model](https://nvie.com/posts/a-successful-git-branching-model/)
