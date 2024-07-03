from django.shortcuts import render
from django.core.mail import EmailMessage
from django.http import JsonResponse
from .forms import CareerForm
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import User
from .forms import UserSerializer
from rest_framework import generics

from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.core.mail import EmailMessage
from .forms import CareerForm

@csrf_exempt
def career_form(request):
    if request.method == 'POST':
        form = CareerForm(request.POST, request.FILES)
        if form.is_valid():
            # Save the form data to the database
            career = form.save()

            # Extract data from the form
            name = form.cleaned_data['name']
            phone = form.cleaned_data['phone']
            email = form.cleaned_data['email']
            department = form.cleaned_data['department']
            status = form.cleaned_data['status']
            resume = form.cleaned_data['resume']

            # Compose the email
            subject = 'New Career Application'
            message = f'Name: {name}\nPhone: {phone}\nEmail: {email}\nDepartment: {department}\nStatus: {status}'
            email_message = EmailMessage(
                subject,
                message,
                'parthibansmrft@gmail.com',  # From email
                ['parthibansmrft@gmail.com'],  # To email
            )

            if resume:
                email_message.attach(resume.name, resume.read(), resume.content_type)

            # Send the email
            email_message.send()

            return JsonResponse({'message': 'Application submitted successfully'})
        else:
            return JsonResponse({'errors': form.errors}, status=400)

    return JsonResponse({'error': 'Invalid request method'}, status=400)


@api_view(['POST'])
def create_user(request):
    if request.method == 'POST':
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# views.py
from rest_framework import generics
from .models import Message
from .forms import MessageSerializer

class MessageListCreate(generics.ListCreateAPIView):
    queryset = Message.objects.all().order_by('created_at')
    serializer_class = MessageSerializer

    #userreport
from django.http import HttpResponse
import csv
def generate_csv_report(request):
    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = 'attachment; filename="user_report.csv"'

    users = User.objects.all()

    writer = csv.writer(response)
    writer.writerow(['ID', 'Name', 'Phone', 'Email', 'Address','chatRemarks'])  # CSV header

    for user in users:
        writer.writerow([user.id, user.name, user.phone, user.email, user.address, user.chatRemarks])

    return response