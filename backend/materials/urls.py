from django.urls import path
from .views import (
    RegisterView,
    LoginView,
    CourseListView,
    SubjectListView,
    StudyMaterialListView,
    StudyMaterialDetailView,
)

urlpatterns = [
    # Authentication
    path('auth/register/', RegisterView.as_view(), name='register'),
    path('auth/login/', LoginView.as_view(), name='login'),

    # Courses
    path('courses/', CourseListView.as_view(), name='course-list'),

    # Subjects
    path('subjects/', SubjectListView.as_view(), name='subject-list'),

    # Study Materials
    path('study-materials/', StudyMaterialListView.as_view(), name='study-material-list'),
    path('study-materials/<int:pk>/', StudyMaterialDetailView.as_view(), name='study-material-detail'),
]