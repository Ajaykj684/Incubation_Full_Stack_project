from django.db import models
from django.contrib.auth.models import User


class Rooms(models.Model):
    room_no = models.IntegerField()

class UserDetails(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    

class Application(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    name=models.CharField(max_length=20,default='Ajay')
    email=models.EmailField(max_length=100 ,default="ajay@gmail.com")
    phone = models.CharField(max_length=50,null = True, blank=True)
    address = models.CharField( max_length=50,null = True)
    applied = models.BooleanField(default=False)
    Denied = models.BooleanField(default=False)
    Approved = models.BooleanField(default=False)
    alloted = models.BooleanField(default=False)
    alloted_slot = models.IntegerField( default= 0 )


class slot(models.Model):
    number = models.CharField(max_length=50)
    available = models.BooleanField(default=True) 
    reserved=models.BooleanField(default=False)
