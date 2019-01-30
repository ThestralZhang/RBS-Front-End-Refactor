# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from django.http import JsonResponse
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt

# Create your views here.


def load_test(request):
    return render(request, 'test.html')


@csrf_exempt
def test_ajax(request):
    print(request)
    print "Got it!"
    a = int(request.GET['a'])
    b = int(request.GET['b'])
    # print(type(a))
    # print a
    # print b
    return JsonResponse({'x': a+b, 'y': a*b})
    # return HttpResponse('Got it')


def load_home(request):
    return render(request, 'home.html')
