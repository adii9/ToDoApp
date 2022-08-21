from pyexpat import model
from turtle import title
from django.db import models

# Create your models here.
class main(models.Model):
    title = models.CharField(max_length=20)
    description = models.CharField(max_length=200)

    def __str__(self):
        return self.title

        