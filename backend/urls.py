from django.conf import settings
from django.conf.urls import url
from django.conf.urls.static import static
from django.contrib import admin
from django.http import HttpResponse
from django.urls import path, include

if not settings.TESTING and not settings.DEBUG:
    handler404 = 'backend.views.error_404'
    handler500 = 'backend.views.error_500'
    handler403 = 'backend.views.error_403'
    handler400 = 'backend.views.error_400'


def pong(request):
    return HttpResponse(request.META['REMOTE_HOST'])


urlpatterns = [
    path('', include('accounts.template_urls')),
    path('admin/', admin.site.urls),
    path('api/ping/', pong),
    path('api/v1/auth/', include('accounts.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# Django Debug Toolbar
if settings.DEBUG:
    import debug_toolbar

    urlpatterns += [
        url(r'^__debug__/', include(debug_toolbar.urls)),
    ]

if settings.TESTING or settings.DEBUG:
    from cacheops import invalidate_all

    def trigger_error(request):
        # Test Sentry
        division_by_zero = 1 / 0
        return division_by_zero

    def invalidate_cache(request):
        # Invalidate Cache
        invalidate_all()
        return HttpResponse("Cache invalidated")

    urlpatterns += [
        path('sentry-debug/', trigger_error),
        path('invalidate-cache/', invalidate_cache),
    ]
