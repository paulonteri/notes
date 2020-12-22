from .models import Note, NoteUser
from rest_framework import serializers
from accounts.serializers import UserSerializer


class NoteSerializer(serializers.ModelSerializer):
    shared_to = serializers.SerializerMethodField()

    class Meta:
        model = Note
        fields = '__all__'
        read_only_fields = ['owner']

    def get_shared_to(self, instance):
        note_user_objects = NoteUser.objects.filter(note=instance)

        shared_to_users = []
        for note_user in note_user_objects:
            shared_to_users.append(note_user.user)

        serializer = UserSerializer(shared_to_users, many=True)

        return serializer.data


class NoteSharedSerializer(serializers.ModelSerializer):

    class Meta:
        model = Note
        fields = '__all__'
        read_only_fields = ['owner']
        depth = 2


class NoteUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = NoteUser
        fields = '__all__'
