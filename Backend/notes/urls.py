from django.urls import path, include
from rest_framework import routers
from .api import NoteAPI, ShareNoteAPI, AllNoteUserAPI

router = routers.DefaultRouter()
router.register('note-users', AllNoteUserAPI, 'Notes')
router.register('notes', NoteAPI, 'Notes')

urlpatterns = [
    path('share/<int:id>/', ShareNoteAPI.as_view()),
    path('', include(router.urls)),
]
