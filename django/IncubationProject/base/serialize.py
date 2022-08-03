from dataclasses import field
from rest_framework import serializers
from base.models import Application, Rooms,UserDetails


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=UserDetails
        fields="__all__"


class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model=Rooms
        fields="__all__"


class ApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model=Application
        fields="__all__"
