from rest_framework import serializers
from .models import main

class MainSerializer(serializers.ModelSerializer):
    class Meta:
        model = main
        fields = ('id', 'title', 'description')