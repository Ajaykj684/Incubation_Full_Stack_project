from dataclasses import field
from rest_framework import serializers
from base.models import Application, Rooms,UserDetails,slot
from django.contrib.auth.models import User



class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=UserDetails
        fields="__all__"

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)


class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model=Rooms
        fields="__all__"


class ApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model=Application
        fields="__all__"


class SlotSerializer(serializers.ModelSerializer):
    class Meta:
        model=slot
        fields="__all__"
