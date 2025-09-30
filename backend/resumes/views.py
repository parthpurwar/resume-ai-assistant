from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse

# Create your views here.

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
            data.append({"name": name, "size": size, "content_type": content_type})
        return JsonResponse({"message": "Upload successful!", "files": data})
    else:
        data = {"message": "Only POST method is allowed."}
        return JsonResponse(data, status=405)