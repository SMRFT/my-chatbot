from django import forms
from .models import Career

class CareerForm(forms.ModelForm):
    class Meta:
        model = Career
        fields = ['name', 'phone', 'email', 'department', 'status','resume']

from .models import User

class UserSerializer(forms.ModelForm):
    class Meta:
        model = User
        fields = '__all__'