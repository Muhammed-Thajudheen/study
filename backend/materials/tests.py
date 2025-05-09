from django.test import TestCase
from django.contrib.auth import get_user_model
from .models import Subject, Course, StudyMaterial

User = get_user_model()

class MaterialModelTests(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username='testuser',
            email='test@example.com',
            password='testpass123'
        )
        self.subject = Subject.objects.create(
            name='Mathematics',
            description='Math related materials'
        )
        self.course = Course.objects.create(
            subject=self.subject,
            name='Calculus',
            code='MATH101'
        )

    def test_create_study_material(self):
        material = StudyMaterial.objects.create(
            course=self.course,
            title='Calculus Basics',
            description='Introduction to calculus',
            material_type='PDF',
            file='materials/test.pdf',
            uploaded_by=self.user
        )
        self.assertEqual(material.title, 'Calculus Basics')
        self.assertEqual(material.course.code, 'MATH101')
        self.assertEqual(material.download_count, 0)