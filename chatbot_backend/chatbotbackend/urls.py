from django.urls import path
from . import views
from .views import career_form,create_user,MessageListCreate,generate_csv_report
urlpatterns = [
    path('submit/', career_form, name='career_form'),
    path('create/', create_user, name='create_user'),
    path('generate-csv/', views.generate_csv_report, name='generate_csv_report'),
    path('messages/', MessageListCreate.as_view(), name='message-list-create'),
]
