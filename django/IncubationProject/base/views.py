from django.http import HttpResponse
from django.shortcuts import render
from .models import User,Rooms,Application
from .serialize import UserSerializer,RoomSerializer,ApplicationSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
import json
from django.contrib.auth.models import User


# Create your views here.

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['is_staff'] = user.is_staff
        token['email'] = user.email
        token['is_active'] = user.is_active


        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(['GET','POST'])

def getRoutes(request):
    routes =[
        '/token',
        '/token/refresh',
       print("here")

    ]
    return Response(routes)

class Dashboard(APIView):
    def get(self, request):
        users=User.objects.all()
        dlSerializeObj=UserSerializer(users,many=True)
        return Response(dlSerializeObj.data)
    def post(self, request):
        users=User.objects.all()
        serializeobj=UserSerializer(users,many=True)
        if serializeobj.is_valid():
            serializeobj.save()
            return Response (200)
        return Response(serializeobj.errors)



class Userlogin(APIView):
    def post(self,request):
        return Response("<h1>logged in</h1>")

class Usersignup(APIView):
    def post(self,request):
        return Response("<h1>Signed in</h1>")

class Adminlogin(APIView):
    def post(self,request):
        return Response("<h1>Signed in</h1>")


class Applications(APIView):
    def post(self,request):
        
        body = request.body.decode('utf-8')
        body = json.loads(body)
        email=body['email']
        address= body['address']
        phone= body['phone']
        name=body['name']
        name=body['user']
        user =User.objects.get(email=name) 
    

        application = Application.objects.create(email=email,name=name,phone=phone, address=address, user = user, applied=True)
        
        
        return Response (200)
    
    def get ( self,request):
        app = Application.objects.all()
        SerializeObj=ApplicationSerializer(app,many=True)
        print(SerializeObj.data)
        return Response(SerializeObj.data)


