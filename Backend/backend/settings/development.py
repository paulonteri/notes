from backend.settings.base import *  # noqa

SECRET_KEY = '6h03)d($%+c4r#p65#ctnk3*u21^v@q+*e^ue0+llrq%zv(94z'

DEBUG = True
TESTING = True

ALLOWED_HOSTS = ["*", ]

# Database
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}

# django-cors-headers
CORS_ORIGIN_ALLOW_ALL = True

# REST_FRAMEWORK
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES':
        ('knox.auth.TokenAuthentication',),
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.AllowAny'
        ]
}

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.0/howto/static-files/

STATIC_URL = '/static/'

INTERNAL_IPS = ('127.0.0.1',)
MIDDLEWARE += [
    'debug_toolbar.middleware.DebugToolbarMiddleware',
]

INSTALLED_APPS += [
    'debug_toolbar',
]

DEBUG_TOOLBAR_PANELS = [
    'debug_toolbar.panels.versions.VersionsPanel',
    'debug_toolbar.panels.timer.TimerPanel',
    'debug_toolbar.panels.settings.SettingsPanel',
    'debug_toolbar.panels.headers.HeadersPanel',
    'debug_toolbar.panels.request.RequestPanel',
    'debug_toolbar.panels.sql.SQLPanel',
    'debug_toolbar.panels.staticfiles.StaticFilesPanel',
    'debug_toolbar.panels.templates.TemplatesPanel',
    'debug_toolbar.panels.cache.CachePanel',
    'debug_toolbar.panels.signals.SignalsPanel',
    'debug_toolbar.panels.logging.LoggingPanel',
    'debug_toolbar.panels.redirects.RedirectsPanel',
]

DEBUG_TOOLBAR_CONFIG = {
    'INTERCEPT_REDIRECTS': False,
}

SENTRY_ACTIVE = False

# Django Query Count (Only works with Debug=True)
# https://github.com/bradmontgomery/django-querycount
QUERYCOUNT = {
    'THRESHOLDS': {
        'MEDIUM': 50,
        'HIGH': 200,
        'MIN_TIME_TO_LOG': 0,
        'MIN_QUERY_COUNT_TO_LOG': 0
    },
    'IGNORE_REQUEST_PATTERNS': [],
    'IGNORE_SQL_PATTERNS': [],
    'DISPLAY_DUPLICATES': 10,
    'RESPONSE_HEADER': 'X-DjangoQueryCount-Count'
}

MIDDLEWARE += [
    'querycount.middleware.QueryCountMiddleware',
]

# Django Cacheops
# https://github.com/Suor/django-cacheops
if os.environ.get('CACHE_HOST'):
    from cacheops.signals import cache_read

    # https://github.com/Suor/django-cacheops
    CACHEOPS_REDIS = {
        'host': env('CACHE_HOST'),
        'port': env.int('CACHE_PORT'),
        # 'db': env('CACHE_DB'),
        'password': env('CACHE_PASSWORD'),
        'socket_timeout': 3,
    }

    # this should not happen
    # https://github.com/Suor/django-cacheops#sharing-redis-instance
    def CACHEOPS_PREFIX(_): return env(
        "CACHEOPS_PREFIX", "com.demo.paulonteri.com")

    CACHEOPS_DEGRADE_ON_FAILURE = True

    # cache feedback
    def stats_collector(sender, func, hit, **kwargs):
        event = 'hit' if hit else 'miss'
        print(event)
        print(func)

    cache_read.connect(stats_collector)
else:
    CACHEOPS_ENABLED = False

# Outside if statement to prevent cache not enabled errors
# cacheops settings
# https://github.com/Suor/django-cacheops#setup
CACHE_MINUTES = int(os.environ.setdefault('CACHE_MINUTES', '10080'))
CACHE_MINUTES_LONGER = int(
    os.environ.setdefault('CACHE_MINUTES_LONGER', '87600'))
CACHEOPS = {
    'accounts.*': {'ops': {'fetch', 'get'}, 'timeout': 60 * 60},
    # 'app_name.*': {'ops': 'all', 'timeout': 60 * CACHE_MINUTES},
    # 'products.*': {'ops': 'all', 'timeout': 60 * CACHE_MINUTES_LONGER},
    # 'name_app.*': None,
}

# HEROKU
# Activate Django-Heroku.
django_heroku.settings(locals())
