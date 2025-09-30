import { useState } from "react";
import { Upload, File, X, CheckCircle, AlertCircle, FileText, Image, Music, Video } from "lucide-react";
import axios from "axios";

export default function DocumentUploadPage() {
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);

  const getFileIcon = (fileType) => {
    if (fileType.startsWith('image/')) return <Image className="w-8 h-8" />;
    if (fileType.startsWith('video/')) return <Video className="w-8 h-8" />;
    if (fileType.startsWith('audio/')) return <Music className="w-8 h-8" />;
    return <FileText className="w-8 h-8" />;
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    addFiles(droppedFiles);
  };

  const handleFileInput = (e) => {
    const selectedFiles = Array.from(e.target.files);
    addFiles(selectedFiles);
  };

  const addFiles = (newFiles) => {
    const fileObjects = newFiles.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      file: file,
      name: file.name,
      size: file.size,
      type: file.type,
      status: 'pending'
    }));
    setFiles(prev => [...prev, ...fileObjects]);
    setUploadStatus(null);
  };

  const removeFile = (id) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      setUploadStatus({ type: 'error', message: 'Please select at least one file' });
      return;
    }

    // Simulate upload process
    setUploadStatus({ type: 'loading', message: 'Uploading files...' });
    try {
      const formData = new FormData();
      files.forEach(file => formData.append('files', file.file));
      const response = await axios.post('http://localhost:8000/api/resume_upload/', formData, {
        headers: {
        "Content-Type": "multipart/form-data"
        }
      });
      setUploadStatus({ type: 'success', message: 'Successfully uploaded' });
      console.log('Files to upload:', files);
    } catch (error) {
      setUploadStatus({ type: 'error', message: 'Upload failed. Please try again.' });
      console.error('Upload error:', error);
  }
};



  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full mb-4 shadow-lg">
            <Upload className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Upload Documents</h1>
          <p className="text-gray-600">Drag and drop your files or click to browse</p>
        </div>

        {/* Upload Area */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6 border border-gray-100">
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-xl p-12 text-center transition-all duration-200 ${
              isDragging
                ? 'border-indigo-500 bg-indigo-50'
                : 'border-gray-300 bg-gray-50 hover:border-indigo-400 hover:bg-indigo-50'
            }`}
          >
            <input
              type="file"
              multiple
              onChange={handleFileInput}
              className="hidden"
              id="file-upload"
            />
            <label htmlFor="file-upload" className="cursor-pointer">
              <div className="flex flex-col items-center">
                <div className={`p-4 rounded-full mb-4 transition-colors ${
                  isDragging ? 'bg-indigo-100' : 'bg-gray-100'
                }`}>
                  <File className={`w-12 h-12 ${
                    isDragging ? 'text-indigo-600' : 'text-gray-400'
                  }`} />
                </div>
                <p className="text-lg font-medium text-gray-700 mb-2">
                  {isDragging ? 'Drop files here' : 'Choose files or drag and drop'}
                </p>
                <p className="text-sm text-gray-500">
                  Support for multiple files • All formats accepted
                </p>
                <button
                  type="button"
                  className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                  onClick={() => document.getElementById('file-upload').click()}
                >
                  Browse Files
                </button>
              </div>
            </label>
          </div>

          {/* File List */}
          {files.length > 0 && (
            <div className="mt-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Selected Files ({files.length})
                </h3>
                <button
                  onClick={() => setFiles([])}
                  className="text-sm text-red-600 hover:text-red-700 font-medium transition-colors"
                >
                  Clear All
                </button>
              </div>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {files.map(file => (
                  <div
                    key={file.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center space-x-4 flex-1 min-w-0">
                      <div className="text-indigo-600 flex-shrink-0">
                        {getFileIcon(file.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {file.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {formatFileSize(file.size)}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFile(file.id)}
                      className="ml-4 p-1 hover:bg-red-100 rounded-full transition-colors flex-shrink-0"
                    >
                      <X className="w-5 h-5 text-red-600" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Upload Button */}
          {files.length > 0 && (
            <button
              onClick={handleUpload}
              disabled={uploadStatus?.type === 'loading'}
              className="w-full mt-6 flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {uploadStatus?.type === 'loading' ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="w-5 h-5 mr-2" />
                  Upload {files.length} File{files.length > 1 ? 's' : ''}
                </>
              )}
            </button>
          )}

          {/* Status Message */}
          {uploadStatus && (
            <div className={`mt-6 p-4 rounded-lg flex items-center ${
              uploadStatus.type === 'success' ? 'bg-green-50 border border-green-200' :
              uploadStatus.type === 'error' ? 'bg-red-50 border border-red-200' :
              'bg-blue-50 border border-blue-200'
            }`}>
              {uploadStatus.type === 'success' && <CheckCircle className="w-5 h-5 text-green-600 mr-3" />}
              {uploadStatus.type === 'error' && <AlertCircle className="w-5 h-5 text-red-600 mr-3" />}
              <p className={`text-sm font-medium ${
                uploadStatus.type === 'success' ? 'text-green-800' :
                uploadStatus.type === 'error' ? 'text-red-800' :
                'text-blue-800'
              }`}>
                {uploadStatus.message}
              </p>
            </div>
          )}
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
            <div className="text-indigo-600 mb-3">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Secure Upload</h3>
            <p className="text-sm text-gray-600">Your files are encrypted during transfer</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
            <div className="text-indigo-600 mb-3">
              <File className="w-8 h-8" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">All Formats</h3>
            <p className="text-sm text-gray-600">Support for documents, images, and more</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
            <div className="text-indigo-600 mb-3">
              <Upload className="w-8 h-8" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Fast Processing</h3>
            <p className="text-sm text-gray-600">Quick upload and processing times</p>
          </div>
        </div>
      </div>
    </div>
  );
}