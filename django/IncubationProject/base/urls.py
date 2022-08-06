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
    path('signup/',views.Usersignup.as_view(),name="signup"),
   
    path('detailRequest/<str:id>',views.detailRequest.as_view(),name="detailRequest"),

    path('application/',views.Applications.as_view(),name="application"),
    path('approveRequest/<str:id>',views.approveRequest.as_view(),name="approveRequest"),
    path('declineRequest/<str:id>',views.declineRequest.as_view(),name="declineRequest"),


    path('seat/',views.seat.as_view(),name="slot"),
    path('seatalloting/<str:id>',views.seatalloting.as_view(),name="seatalloting"),
    path('reservedDetail/<str:id>',views.reservedDetail.as_view(),name="seatalloting"),




    path('api/token/',MyTokenObtainPairView.as_view(), name ='token_obtain_pair'),
    path('api/token/refresh/',TokenRefreshView.as_view(), name ='token_refresh'),

]
