from django.shortcuts import render

def home(request):
    return render(request, 'home.html', {'message': 'Welcome to the Study Platform API!'})