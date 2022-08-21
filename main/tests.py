from turtle import title
from django.test import TestCase
from .models import main

# Create your tests here.
class MainModelTest(TestCase):
    
    @classmethod
    def setUpTestData(cls):
        main.objects.create(title='Testing Task')
        main.objects.create(description='Testing Task Added')
    
    def test_title(self):
        obj = main.objects.get(id=1)
        expected_name = f'{obj.title}'
        self.assertEquals(expected_name, 'Testing Task')
    
    def test_description(self):
        obj = main.objects.get(id=2)
        expected_description = f'{obj.description}'
        self.assertEquals(expected_description, 'Testing Task Added')