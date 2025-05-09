from django.contrib import admin
from .models import Subject, Course, StudyMaterial

@admin.register(Subject)
class SubjectAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)

@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ('name', 'code', 'subject')
    list_filter = ('subject',)
    search_fields = ('name', 'code')

@admin.register(StudyMaterial)
class StudyMaterialAdmin(admin.ModelAdmin):
    list_display = ('title', 'course', 'material_type', 'uploaded_by', 'download_count')
    list_filter = ('material_type', 'course__subject')
    search_fields = ('title', 'description')
    readonly_fields = ('download_count',)