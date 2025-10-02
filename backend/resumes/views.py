from pydoc import text
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import PyPDF2
import docx
import os
import openai
from openai import OpenAI
from dotenv import load_dotenv
import json
from openai import APIError, APIConnectionError, RateLimitError, BadRequestError
# Create your views here.

load_dotenv()
client=OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

print("API KEY:", os.getenv("OPENAI_API_KEY"))


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

def edit_resume_view(request):
    if request.method != "POST":
        return JsonResponse({"error": "Only POST allowed"}, status=405)

    try:
        body = json.loads(request.body)
        uploaded_files=request.FILES.getlist('files')
        if not uploaded_files:
            return JsonResponse({"error": "No files uploaded"}, status=400)
        text=extract_text_from_file(uploaded_files[0])

        instruction = (
            "You are a helpful resume editor. Improve clarity, grammar, and formatting. "
            "Produce a clean, professional version while keeping original meaning.\n\n"
            f"Resume text:\n{text}"
        )

        try:
            resp = client.responses.create(
                model="gpt-4o-mini",
                input=instruction,
                max_output_tokens=1200,
            )

        except RateLimitError:
            return JsonResponse({"error": "Rate limit exceeded. Please try again later."}, status=429)
        except APIError:
            return JsonResponse({"error": f"OpenAI API error: {str(e)}"}, status=502)
        except APIConnectionError as e:
            return JsonResponse({"error": f"Connection error: {str(e)}"}, status=503)
        except BadRequestError as e:
            return JsonResponse({"error": f"Invalid request: {str(e)}"}, status=400)
        except Exception as e:
            return JsonResponse({"error": f"Unexpected error: {str(e)}"}, status=500)

        edited_text = getattr(resp, "output_text", None)
        if not edited_text:
            return JsonResponse({"error": "No text returned by the model"}, status=500)

        return JsonResponse({"edited_text": edited_text})

    except json.JSONDecodeError:
        return JsonResponse({"error": "Invalid JSON in request"}, status=400)
    except Exception as e:
        return JsonResponse({"error": f"Server error: {str(e)}"}, status=500)
