from django.db import models

# Create your models here.
class ToDo(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    status = models.CharField(max_length=30, default='')

    def __str__(self):
        return self.title