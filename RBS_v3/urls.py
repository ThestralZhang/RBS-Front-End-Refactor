"""RBS_v3 URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django.contrib import admin
from django.conf import settings
from retrieval import views
from django.views import static as static_views

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^test/$', views.load_test),
    url(r'^test/calc/$', views.test_ajax),
    url(r'^home/$', views.load_home),
    url(r'^media/(?P<path>.*)$', static_views.serve, {'document_root': settings.MEDIA_ROOT}, name='media'),

]
