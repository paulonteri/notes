from rest_framework import viewsets, permissions
from .models import Note, NoteUser
from .serializers import NoteSerializer, NoteUserSerializer


class NoteAPI(viewsets.ModelViewSet):
    # permission_classes = permissions.IsAuthenticated
    serializer_class = NoteSerializer
    queryset = Note.objects.all()


class NoteUserAPI(viewsets.ModelViewSet):
    # permission_classes = permissions.IsAuthenticated
    serializer_class = NoteUserSerializer
    queryset = NoteUser.objects.all()
