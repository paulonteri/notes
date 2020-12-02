from django.db import models
from django.core.exceptions import ValidationError
from django.contrib.auth import get_user_model
User = get_user_model()


class Note(models.Model):
    title = models.CharField(max_length=50)
    text = models.TextField()
    owner = models.ForeignKey(User, on_delete=models.CASCADE)

    class Meta:
        ordering = ['-title']

    def __str__(self):
        return self.title


class NoteUser(models.Model):
    note = models.ForeignKey(Note, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    class Meta:
        unique_together = ['note', 'user']

    def __str__(self):
        return str(self.note.title) + " " + str(self.user.username)

    def save(self, *args, **kwargs):
        self.full_clean()
        super().save(*args, **kwargs)

    def clean(self):
        if self.user == self.note.owner:
            raise ValidationError('User cannot share a note to themselves')
