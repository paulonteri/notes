from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import Group

from .models import User  # , TestImage

admin.site.unregister(Group)


class UserAdmin(UserAdmin):
    # Display
    fieldsets = (
        (None, {'fields': ('username', 'email', 'password')}),
        ('Permissions', {'fields': ('role', 'is_admin',)}),
    )

    # Create User
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'email', 'first_name', 'last_name', 'password1', 'password2'),
        }),
        ('Permissions', {'fields': ('role', 'is_admin',)}),
    )

    # List display
    list_display = ('username', 'email', 'first_name',
                    'last_name', 'is_admin', 'role', 'date_joined')
    list_filter = ('is_admin', 'role', 'is_staff', 'date_joined')

    search_fields = ('username', 'email', 'first_name', 'last_name')
    ordering = ('username', 'email',)


admin.site.register(User, UserAdmin)

# admin.site.register(TestImage)

admin.site.site_header = "University Notes Website"
