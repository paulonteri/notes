from .models import Note, NoteUser
from rest_framework import serializers


class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = '__all__'


class NoteUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = NoteUser
        fields = '__all__'
