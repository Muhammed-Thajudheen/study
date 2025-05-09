from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from .serializers import (
    RegisterSerializer,
    CourseSerializer,
    SubjectSerializer,
    StudyMaterialSerializer,
)
from .models import Course, Subject, StudyMaterial


class RegisterView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "User registered successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)
        if user:
            return Response({"message": "Login successful"}, status=status.HTTP_200_OK)
        return Response({"message": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)


class CourseListView(APIView):
    def get(self, request):
        courses = Course.objects.all()
        serializer = CourseSerializer(courses, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class SubjectListView(APIView):
    def get(self, request):
        subjects = Subject.objects.all()
        serializer = SubjectSerializer(subjects, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class StudyMaterialListView(APIView):
    def get(self, request):
        study_materials = StudyMaterial.objects.all()
        serializer = StudyMaterialSerializer(study_materials, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class StudyMaterialDetailView(APIView):
    def get(self, request, pk):
        try:
            study_material = StudyMaterial.objects.get(pk=pk)
            serializer = StudyMaterialSerializer(study_material)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except StudyMaterial.DoesNotExist:
            return Response({"message": "Study material not found"}, status=status.HTTP_404_NOT_FOUND)