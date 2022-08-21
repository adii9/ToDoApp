from django.shortcuts import render
from .models import main
from .serializers import MainSerializer
from rest_framework import generics


# Create your views here.
class ListToDo(generics.ListCreateAPIView):
    queryset = main.objects.all()
    serializer_class = MainSerializer


class DetailedList(generics.RetrieveUpdateDestroyAPIView):
    queryset = main.objects.all()
    serializer_class = MainSerializer