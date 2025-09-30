from django.db import models
import os

# Create your models here.
def upload_to(instance, filename):
    return os.path.join("uploads", filename)

class UploadedFile(models.Model):
    file = models.FileField(upload_to=upload_to)
    extracted_text = models.TextField(blank=True, null=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.file.name