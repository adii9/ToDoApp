from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.ListToDo.as_view()),
    path('<int:pk>', views.DetailedList.as_view())
]
