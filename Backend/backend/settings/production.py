from datetime import timedelta

import sys
from backend.settings.base import *  # noqa

SECRET_KEY = env('SECRET_KEY')
DEBUG = env.bool('DEBUG', False)
TESTING = env.bool('TESTING', False)
DJANGO_TESTS = sys.argv[1:2] == ['test']
ALLOWED_HOSTS = env.list('ALLOWED_HOSTS', 'localhost')
CORS_ORIGIN_WHITELIST = env.list(
    'CORS_ORIGIN_WHITELIST', 'http://localhost:3000')

# # # # # Database
DATABASES = {
    'default': {
        'ENGINE': env('DB_ENGINE', 'django.db.backends.postgresql_psycopg2'),
        'NAME': env('DB_NAME'),
        'USER': env('DB_USER'),
        'PASSWORD': env('DB_PASSWORD'),
        'HOST': env('DB_HOST'),
        'PORT': env.int('DB_PORT', 5432),
        'CONN_MAX_AGE': env.int('DB_CONN_MAX_AGE', 2),
        'ATOMIC_REQUESTS': env.bool('ATOMIC_REQUESTS', False),
    }
}

# # # # # Google Cloud Storage
# https://django-storages.readthedocs.io/en/latest/backends/gcloud.html
if os.environ.get('GS_BUCKET_NAME'):
    from google.oauth2 import service_account
    DEFAULT_FILE_STORAGE = 'storages.backends.gcloud.GoogleCloudStorage'
    # STATICFILES_STORAGE = 'storages.backends.gcloud.GoogleCloudStorage'
    GS_DEFAULT_ACL = env('GS_DEFAULT_ACL', 'publicRead')
    GS_FILE_OVERWRITE = False
    GS_BUCKET_NAME = env('GS_BUCKET_NAME')
    GS_LOCATION = env('GS_LOCATION')
    GS_CREDENTIALS = service_account.Credentials.from_service_account_info(
        info=env.json('GS_SERVICE_ACC'))

TEMPLATE_LOADERS = (
    ('django.template.loaders.cached.Loader', (
        'django.template.loaders.filesystem.Loader',
        'django.template.loaders.app_directories.Loader',
    )),
)

SESSION_ENGINE = 'django.contrib.sessions.backends.cached_db'

# # # # # REST_FRAMEWORK
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES':
        ('knox.auth.TokenAuthentication',),
    'DEFAULT_RENDERER_CLASSES': (
        'rest_framework.renderers.JSONRenderer',),
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.DjangoModelPermissions'
        ],
    'DEFAULT_THROTTLE_CLASSES': [
        'rest_framework.throttling.AnonRateThrottle',
        'rest_framework.throttling.UserRateThrottle'
        ],
    'DEFAULT_THROTTLE_RATES': {
        'anon': '100/day',
        'user': '100/hour'
        }
}

# # # # # LOGGING
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'filters': {
        'require_debug_false': {
            '()': 'django.utils.log.RequireDebugFalse',
        },
        'require_debug_true': {
            '()': 'django.utils.log.RequireDebugTrue',
        },
    },
    'formatters': {
        'django.server': {
            '()': 'django.utils.log.ServerFormatter',
            'format': '[%(server_time)s] %(message)s',
        }
    },
    'handlers': {
        'console': {
            'level': 'INFO',
            'filters': ['require_debug_true'],
            'class': 'logging.StreamHandler',
        },
        'console_debug_false': {
            'level': 'ERROR',
            'filters': ['require_debug_false'],
            'class': 'logging.StreamHandler',
        },
        'django.server': {
            'level': 'INFO',
            'class': 'logging.StreamHandler',
            'formatter': 'django.server',
        },
        'mail_admins': {
            'level': 'ERROR',
            'filters': ['require_debug_false'],
            'class': 'django.utils.log.AdminEmailHandler'
        }
    },
    'loggers': {
        'django': {
            'handlers': ['console', 'console_debug_false', 'mail_admins'],
            'level': 'INFO',
        },
        'django.server': {
            'handlers': ['django.server'],
            'level': 'INFO',
            'propagate': False,
        }
    }
}

# # # # # Django Debug Middleware
if DEBUG:
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

# # # # # Sentry
SENTRY_ACTIVE = False
if os.environ.get('SENTRY_DSN'):
    import sentry_sdk
    from sentry_sdk.integrations.django import DjangoIntegration
    from sentry_sdk.integrations.redis import RedisIntegration

    sentry_sdk.init(
        dsn=os.environ['SENTRY_DSN'],
        integrations=[DjangoIntegration(), RedisIntegration()],
        send_default_pii=True,
        environment=os.environ.get('SENTRY_ENVIRONMENT', 'development'),
    )
    SENTRY_ACTIVE = True

# # # # #  Django Query Count (Only works with Debug=True)
# https://github.com/bradmontgomery/django-querycount
if TESTING:
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

# # # # #  Cacheops
# https://github.com/Suor/django-cacheops
if os.environ.get('CACHE_HOST'):
    def CACHEOPS_PREFIX(_): return env("CACHEOPS_PREFIX")

    CACHEOPS_REDIS = {
        'host': env('CACHE_HOST'),
        'port': env.int('CACHE_PORT'),
        # 'db': env('CACHE_DB'),
        'password': env('CACHE_PASSWORD'),
        'socket_timeout': 3,
    }

    CACHEOPS_DEGRADE_ON_FAILURE = True

    if DEBUG or TESTING:
        from cacheops.signals import cache_read

        def stats_collector(sender, func, hit, **kwargs):
            event = 'hit' if hit else 'miss'
            print(event)
            print(func)

        cache_read.connect(stats_collector)

else:
    CACHEOPS_ENABLED = False

# cacheops settings
# https://github.com/Suor/django-cacheops#setup
# Outside if statement to prevent cache not enabled errors
CACHE_MINUTES = int(os.environ.setdefault('CACHE_MINUTES', '10080'))
CACHE_MINUTES_LONGER = int(
    os.environ.setdefault('CACHE_MINUTES_LONGER', '87600'))
CACHEOPS = {
    'accounts.*': {'ops': {'fetch', 'get'}, 'timeout': 60 * 60},
    # django.contrib.auth models
    'auth.*': {'ops': {'fetch', 'get'}, 'timeout': 60 * CACHE_MINUTES},
    # 'app_name.*': {'ops': 'all', 'timeout': 60 * CACHE_MINUTES},
    # 'products.*': {'ops': 'all', 'timeout': 60 * CACHE_MINUTES_LONGER},
    # 'name_app.*': None,
}

#
# DJANGO CACHE
if os.environ.get('CACHE_HOST') and not DJANGO_TESTS:
    CACHES = {
        'default': {
            # 'LOCATION': "redis://[:password]@localhost:6379/0",
            'LOCATION': "redis://[:" + env.str('CACHE_PASSWORD')
                        + env.str('CACHE_HOST') + ":" + \
            env.str('CACHE_PORT') + "/0",
            'OPTIONS': {
                'CLIENT_CLASS': 'django_redis.client.DefaultClient',
                "CONNECTION_POOL_KWARGS": {"max_connections": 20}
            },
            'KEY_PREFIX': env('DJANGO_CACHE_KEY_PREFIX')
        }
    }

    CACHE_TTL = 60 * CACHE_MINUTES_LONGER
    DJANGO_REDIS_IGNORE_EXCEPTIONS = True
    DJANGO_REDIS_LOG_IGNORED_EXCEPTIONS = True

# # # # #  REST_KNOX
REST_KNOX = {
    'TOKEN_TTL': timedelta(hours=12),
    'TOKEN_LIMIT_PER_USER': 1,
}

# causes 500 errors
# if not DEBUG and not TESTING:
#     # Whitenoise
#     # Will have error if used with development server
#     # http://whitenoise.evans.io/en/stable/django.html#using-whitenoise-in-development
#     STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'


# HEROKU
if os.environ.get('HEROKU'):
    # Activate Django-Heroku.
    django_heroku.settings(locals())
