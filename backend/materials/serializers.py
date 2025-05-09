from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Subject, Course, StudyMaterial

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', '')
        )
        return user

class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = '__all__'

class CourseSerializer(serializers.ModelSerializer):
    subject_name = serializers.CharField(source='subject.name', read_only=True)
    
    class Meta:
        model = Course
        fields = ['id', 'name', 'code', 'subject', 'subject_name']

class StudyMaterialSerializer(serializers.ModelSerializer):
    course_name = serializers.CharField(source='course.name', read_only=True)
    uploaded_by_name = serializers.CharField(source='uploaded_by.username', read_only=True)
    file_url = serializers.SerializerMethodField()
    
    class Meta:
        model = StudyMaterial
        fields = [
            'id', 'title', 'description', 'material_type', 
            'file', 'file_url', 'upload_date', 'uploaded_by', 
            'uploaded_by_name', 'course', 'course_name',
            'download_count'
        ]
        read_only_fields = ['uploaded_by', 'download_count']

    def get_file_url(self, obj):
        if obj.file:
            return self.context['request'].build_absolute_uri(obj.file.url)
        return None