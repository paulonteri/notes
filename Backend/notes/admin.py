from django.contrib import admin
from .models import Note, NoteUser

admin.site.register(Note)
admin.site.register(NoteUser)
