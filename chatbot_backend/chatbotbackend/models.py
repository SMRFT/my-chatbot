from django.db import models

class Career(models.Model):
    name = models.CharField(max_length=100)
    phone = models.CharField(max_length=15)
    email = models.EmailField()
    department = models.CharField(max_length=50)
    status = models.CharField(max_length=50, default='Employee')  # Default value provided here
    resume = models.FileField(upload_to='resumes/')

    def __str__(self):
        return self.name
from django.db.models import Max

class User(models.Model):
    id = models.CharField(max_length=4, primary_key=True, editable=False)
    name = models.CharField(max_length=255)
    phone = models.CharField(max_length=15)
    email = models.EmailField(unique=True)
    address = models.TextField()
    chatRemarks=models.CharField(max_length=15,blank=True,null=True)
    def save(self, *args, **kwargs):
        if not self.id:
            max_id = User.objects.aggregate(max_id=Max('id'))['max_id']
            if max_id:
                max_id_int = int(max_id)
                new_id = f'{max_id_int + 1:02d}'
            else:
                new_id = '01'
            self.id = new_id
        super(User, self).save(*args, **kwargs)

    def __str__(self):
        return self.name

class Message(models.Model):
    SENDER_CHOICES = [
        ('user', 'User'),
        ('admin', 'Admin'),
    ]
    text = models.TextField()
    sender = models.CharField(max_length=5, choices=SENDER_CHOICES)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.sender}: {self.text}"