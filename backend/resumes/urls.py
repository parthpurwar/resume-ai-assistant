from django.urls import path
from .views import ResumeUploadView

urlpatterns = [
    path("resume_upload/", ResumeUploadView, name="resume_upload"),
]
