from django.shortcuts import render
from rest_framework import viewsets
from .Serializer import ToDoSerializer
from .models import ToDo

# Create your views here.
class toDoViewSet(viewsets.ModelViewSet):
    queryset = ToDo.objects.all().order_by('id')
    serializer_class = ToDoSerializer