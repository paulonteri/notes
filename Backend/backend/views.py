from django.conf import settings
from django.http import HttpResponse

if settings.SENTRY_ACTIVE:
    from sentry_sdk import capture_message


def log_error(err):
    # Add logging logic
    if settings.SENTRY_ACTIVE:
        capture_message(err, level="error")


def error_500(request):
    log_error("Server Error")
    return HttpResponse("Server Error")


def error_400(request, exception):
    print(exception)
    log_error("Server Error" + str(exception))
    return HttpResponse("Bad Request")


def error_403(request, exception):
    print(exception)
    log_error("Permission Denied" + str(exception))
    return HttpResponse("Permission Denied")


def error_404(request, exception):
    print(exception)
    log_error("Not Found" + str(exception))
    return HttpResponse("Not Found")
