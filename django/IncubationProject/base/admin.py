from django.contrib import admin

from .models import  Rooms , UserDetails,Application,slot
# Register your models here.

admin.site.register(Rooms)
admin.site.register(UserDetails)
admin.site.register(Application)
admin.site.register(slot)

