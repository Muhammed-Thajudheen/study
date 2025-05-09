from django.db import models
from django.contrib.auth.models import User

class Subject(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()

    def __str__(self):
        return self.name

class Course(models.Model):
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    code = models.CharField(max_length=20)

    def __str__(self):
        return f"{self.code} - {self.name}"

class StudyMaterial(models.Model):
    MATERIAL_TYPES = [
        ('PDF', 'PDF'),
        ('VIDEO', 'Video'),
        ('AUDIO', 'Audio'),
        ('DOC', 'Document'),
        ('PPT', 'Presentation'),
    ]
    
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    description = models.TextField()
    material_type = models.CharField(max_length=10, choices=MATERIAL_TYPES)
    file = models.FileField(upload_to='materials/')
    upload_date = models.DateTimeField(auto_now_add=True)
    uploaded_by = models.ForeignKey(User, on_delete=models.CASCADE)
    download_count = models.IntegerField(default=0)

    def __str__(self):
        return self.title