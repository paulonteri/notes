from django.contrib import admin
from .models import Note, NoteUser

# admin.site.register(Note)
admin.site.register(NoteUser)

# Admin Action Functions


class NoteUserInline(admin.TabularInline):
    model = NoteUser

    readonly_fields = ('user',)


class NoteAdmin(admin.ModelAdmin):

    # Display
    fieldsets = (
        (None, {'fields': ('title', 'text', 'owner', )}),

    )

    # List display
    list_display = ('title', 'owner')
    list_filter = ('owner',)

    search_fields = ('title', 'owner')
    ordering = ('title', 'owner')

    inlines = [
        NoteUserInline,
    ]


admin.site.register(Note, NoteAdmin)
