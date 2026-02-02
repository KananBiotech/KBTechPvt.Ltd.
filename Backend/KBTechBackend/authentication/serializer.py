from rest_framework import serializers
from .models import Users, Sessions

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = Users
        fields = '__all__'
    
class SessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sessions
        fields = '__all__'