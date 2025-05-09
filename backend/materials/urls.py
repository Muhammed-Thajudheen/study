from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import SubjectViewSet, CourseViewSet, StudyMaterialViewSet

router = DefaultRouter()
router.register(r'subjects', SubjectViewSet)
router.register(r'courses', CourseViewSet)
router.register(r'materials', StudyMaterialViewSet)

urlpatterns = router.urls