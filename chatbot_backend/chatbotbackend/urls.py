from django.urls import path
from .views import career_form,create_user

urlpatterns = [
    path('submit/', career_form, name='career_form'),
     path('create/', create_user, name='create_user'),
]
