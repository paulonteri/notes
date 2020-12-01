from rest_framework import routers
from .api import NoteAPI, NoteUserAPI

router = routers.DefaultRouter()

router.register('shared', NoteUserAPI, 'Notes')
router.register('', NoteAPI, 'Notes')

urlpatterns = router.urls
