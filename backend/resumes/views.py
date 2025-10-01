from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import PyPDF2
import docx
# Create your views here.

def extract_text_from_file(f):
    text = ""
    if f.name.endswith(".pdf"):
        reader = PyPDF2.PdfReader(f)
        for page in reader.pages:
            text += page.extract_text() or ""
    elif f.name.endswith(".docx"):
        doc = docx.Document(f)
        for para in doc.paragraphs:
            text += para.text + "\n"
    elif f.name.endswith(".txt"):
        text = f.read().decode("utf-8")
    else:
        text = "[Unsupported file type]"
    return text


@csrf_exempt
def ResumeUploadView(request):
    if request.method == "POST":
        uploaded_files=request.FILES.getlist('files')
        if not uploaded_files:
            return JsonResponse({"error": "No files uploaded"}, status=400)
        data = []
        for f in uploaded_files:
            name=f.name
            size=f.size
            content_type=f.content_type
            text = extract_text_from_file(f)
            data.append({"name": name, "size": size, "content_type": content_type, "text": text})
        return JsonResponse({"message": "Upload successful!", "files": data})
    else:
        data = {"message": "Only POST method is allowed."}
        return JsonResponse(data, status=405)