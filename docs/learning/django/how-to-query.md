# QuerySet 과 Lookup

## filter(A).filter(B) vs filter(A, B)


## select_related and prefetch_related


## How to join 3 tables in query with Djang
```python
# models.py
class Employee(models.Model):
    emp_no = models.IntegerField(primary_key=True)
    first_name = ...
    last_name = ...

    # emp_no first_name  last_name
      ------ ----------  ----------
      10005  Christian   Erde

class DeptEmp(models.Model):
    emp_no = models.ForeignKey(Employee, on_delete=models.CASCADE)
    dept_no = models.ForeignKey(Department, on_delete=models.CASCADE)

    # dept_no_id  emp_no_id 
      ----------  ----------
      d003        10005     

class Department(models.Model):
    dept_no = models.CharField(primary_key=True, max_length=4)
    dept_name = models.CharField(unique=True, max_length=40)

    #  dept_no     dept_name      
       ----------  ---------------
       d003        Human Resources

# views.py
class EmpList(ListView):
    queryset = DeptEmp.objects.all().select_related('emp_no').select_related('dept_no')

# template.html
{% for deptemp in object_list %}
    {{ deptemp.emp_no.first_name }}
    {{ deptemp.emp_no.last_name }}
    {{ deptemp.dept_no.dept_name }}
{% endfor %}
```

## annotate, aggregation and subquery

## Resources
[Queryset API](https://docs.djangoproject.com/en/3.0/ref/models/querysets/)
[filter(A).filter(B) vs filter(A, B)](https://hacksoft.io/django-filter-chaining/)
[How to join 3 tables in query with Django](https://stackoverflow.com/questions/43772163/how-to-join-3-tables-in-query-with-django)
[Django select_related and prefetch_related](https://medium.com/better-programming/django-select-related-and-prefetch-related-f23043fd635d)
[5 ORM queries you should know!](https://medium.com/@chrisjune_13837/django-5-orm-queries-you-should-know-a0f4533b31e8)
[Manager vs Query Sets in Django](https://medium.com/@jairvercosa/manger-vs-query-sets-in-django-e9af7ed744e0)