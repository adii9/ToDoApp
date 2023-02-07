from django.shortcuts import render
from rest_framework import viewsets
from .Serializer import ToDoSerializer
from .models import ToDo
from rest_framework import serializers
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

# Create your views here.

class toDoViewSet(viewsets.ModelViewSet):
    queryset = ToDo.objects.all().order_by('id')
    serializer_class = ToDoSerializer