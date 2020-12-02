from rest_framework import viewsets, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import APIException, PermissionDenied
from rest_framework.status import HTTP_200_OK
from .models import Note, NoteUser
from .serializers import NoteSerializer, NoteUserSerializer


class NoteAPI(viewsets.ModelViewSet):
    permission_classes = [permissions.AllowAny]
    serializer_class = NoteSerializer
    queryset = Note.objects.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class AllNoteUserAPI(viewsets.ModelViewSet):
    permission_classes = [permissions.AllowAny]
    serializer_class = NoteUserSerializer
    queryset = NoteUser.objects.all()


class ShareNoteAPI(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        note_id = self.kwargs['id']
        request_user = request.user

        # verify request_user isAdmin/isStaff or note belongs to user
        user_shared_notes = []
        if not request_user.is_staff and not request_user.is_admin and request_user != Note.objects.get(id=note_id).owner:
            raise PermissionDenied()
        else:
            user_shared_notes = NoteUser.objects.filter(
                note_id=note_id).select_related('user')

        # get all users with access with access to the note
        users_with_access = []
        for shared_note in user_shared_notes:
            users_with_access.append(
                {
                    "id": shared_note.user.id,
                    "username": shared_note.user.username,
                    "email": shared_note.user.email
                }
            )

        return Response(users_with_access)

    def post(self, request, *args, **kwargs):
        request_user = request.user
        note_id = self.kwargs['id']
        user = request.data['user_id']

        # verify note belongs to user or isAdmin/isStaff
        if not request_user.is_staff and not request_user.is_admin and request_user != Note.objects.get(id=note_id).owner:
            raise PermissionDenied()
        else:
            # share note
            try:
                note_user = NoteUser(user_id=user, note_id=note_id)
                note_user.save()
            except Exception as e:
                raise APIException(
                    'Something went wrong. Please try again. ' + str(e))
            else:
                return Response(status=HTTP_200_OK)

    def delete(self, request, *args, **kwargs):
        request_user = request.user
        note_id = self.kwargs['id']
        user = request.data['user_id']

        # verify note belongs to user or isAdmin/isStaff
        if not request_user.is_staff and not request_user.is_admin and request_user != Note.objects.get(id=note_id).owner:
            raise PermissionDenied()
        else:
            # remove user access to note
            try:
                note_user = NoteUser.objects.get(user_id=user, note_id=note_id)
                note_user.delete()
            except Exception as e:
                raise APIException(
                    'Something went wrong. Please try again. ' + str(e))
            else:
                return Response(status=HTTP_200_OK)


class NotesSharedWithUserAPI(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        request_user = request.user

        notes_shared_with_user = [
            note_user.note for note_user in NoteUser.objects.filter(user=request_user)]

        serializer = NoteSerializer(notes_shared_with_user, many=True)

        return Response(serializer.data)
