from django.urls import path
from .views import ResumeUploadView,edit_resume_view

urlpatterns = [
    path("resume_upload/", ResumeUploadView, name="resume_upload"),
    path("edit_resume/", edit_resume_view, name="edit_resume"),
]
