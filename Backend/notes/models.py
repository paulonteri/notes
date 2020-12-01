from django.db import models
from django.contrib.auth import get_user_model
User = get_user_model()


class Note(models.Model):
    title = models.CharField(max_length=50)
    text = models.TextField()

    class Meta:
        ordering = ['-title']

    def __str__(self):
        return self.title


class NoteUser(models.Model):
    note = models.ForeignKey(Note, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
