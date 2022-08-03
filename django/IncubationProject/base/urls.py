from django.urls import path
from . import views

from rest_framework_simplejwt import views as jwt_views


from .views import MyTokenObtainPairView

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)



urlpatterns = [
    path('',views.Dashboard.as_view(),name="dashboard"),
    path('login/',views.Userlogin.as_view(),name="login"),
    path('signup/',views.Usersignup.as_view(),name="signup"),
    path('adminlogin/',views.Adminlogin.as_view(),name="adminlogin"),

    path('application/',views.Applications.as_view(),name="application"),



    path('api/token/',MyTokenObtainPairView.as_view(), name ='token_obtain_pair'),
    path('api/token/refresh/',TokenRefreshView.as_view(), name ='token_refresh'),

]
