from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('push', views.push_data, name='push_data'),
    path('pull', views.pull_data, name='pull_data'),
]