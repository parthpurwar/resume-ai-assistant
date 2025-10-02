import React, { useState } from 'react';
import { Download, FileText, Type, Bold, Italic, List } from 'lucide-react';
import { useLocation } from "react-router-dom";


export default function AiTextEditor() {
    const location = useLocation();
    const uploadData = location.state;
    console.log('Received data:', uploadData);

  const [content, setContent] = useState(uploadData || '');

  const [fileName, setFileName] = useState('my-document');
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);

  const downloadAsPDF = () => {
    // Create a simple HTML document for PDF
    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.write(`
      <html>
        <head>
          <title>${fileName}</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 40px;
              line-height: 1.6;
              white-space: pre-wrap;
            }
          </style>
        </head>
        <body>
          ${content.replace(/\n/g, '<br>')}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 250);
  };

  const downloadAsText = () => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${fileName}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const downloadAsHTML = () => {
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${fileName}</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      max-width: 800px;
      margin: 0 auto;
      padding: 40px;
      line-height: 1.6;
    }
  </style>
</head>
<body>
  <pre style="white-space: pre-wrap; font-family: inherit;">${content}</pre>
</body>
</html>`;
    
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${fileName}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const downloadAsMarkdown = () => {
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${fileName}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-t-2xl shadow-lg p-6 border-b">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <FileText className="w-8 h-8 text-indigo-600" />
              <h1 className="text-3xl font-bold text-gray-800">Text Editor</h1>
            </div>
          </div>
          
          {/* File Name Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Document Name
            </label>
            <input
              type="text"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              placeholder="Enter document name"
            />
          </div>

          {/* Download Buttons */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={downloadAsPDF}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <Download className="w-4 h-4" />
              Download as PDF
            </button>
            <button
              onClick={downloadAsText}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Download className="w-4 h-4" />
              Download as TXT
            </button>
            <button
              onClick={downloadAsHTML}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Download className="w-4 h-4" />
              Download as HTML
            </button>
            <button
              onClick={downloadAsMarkdown}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              <Download className="w-4 h-4" />
              Download as MD
            </button>
          </div>
        </div>

        {/* Editor */}
        <div className="bg-white rounded-b-2xl shadow-lg p-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <Type className="w-4 h-4" />
              Your Content
            </label>
            <div className="text-sm text-gray-500 mb-2">
              Character count: {content.length} | Words: {content.trim().split(/\s+/).filter(w => w).length}
            </div>
          </div>
          
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full h-96 px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none resize-none font-mono text-gray-800"
            placeholder="Start typing your document here..."
          />
          
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Tip:</strong> For PDF download, your browser's print dialog will open. 
              Select "Save as PDF" as the destination to save your document.
            </p>
          </div>
        </div>

       
      </div>
    </div>
  );
}
