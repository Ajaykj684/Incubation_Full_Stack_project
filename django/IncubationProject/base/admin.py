from django.contrib import admin

from .models import  Rooms , UserDetails,Application
# Register your models here.

admin.site.register(Rooms)
admin.site.register(UserDetails)
admin.site.register(Application)
