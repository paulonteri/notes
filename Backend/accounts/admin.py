from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import User, TestImage


class UserAdmin(UserAdmin):
    # Display
    fieldsets = (
        (None, {'fields': ('username', 'email', 'password')}),
        ('Permissions', {'fields': ('is_staff',
                                    'is_active', 'is_superuser', 'is_admin',)}),
    )

    # Create User
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'email', 'first_name', 'last_name', 'password1', 'password2'),
        }),
        ('Permissions', {'fields': ('is_staff', 'role',
                                    'is_active', 'is_superuser', 'is_admin',)}),
    )

    # List display
    list_display = ('username', 'email', 'first_name',
                    'last_name', 'is_admin', 'role', 'date_joined')
    list_filter = ('is_admin', 'role', 'is_staff', 'date_joined')

    search_fields = ('username', 'email', 'first_name', 'last_name')
    ordering = ('username', 'email',)


admin.site.register(User, UserAdmin)

admin.site.register(TestImage)
