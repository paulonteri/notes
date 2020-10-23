from django.urls import path, include
from django.conf.urls import url
from accounts.views import signup, home


urlpatterns = [
    path('', include('django.contrib.auth.urls')),
    path('home', home, name='home'),
    url(r'^signup/$', signup, name='signup'),
    path('', home, name='index'),
]
