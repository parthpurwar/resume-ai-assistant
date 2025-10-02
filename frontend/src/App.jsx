import { useState } from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import DocumentUploadPage from '../Pages/DocumentUpload'
import LandingPage from '../Pages/Home'
import AiTextEditorPage from '../Pages/ai_editor'
import TextEditorPage from '../Pages/TextEditor'
function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<LandingPage/>}/>
          <Route path='/DocumentUpload' element={<DocumentUploadPage/>}/>
          <Route path='/text-editor' element={<TextEditorPage/>}/>
          <Route path='/ai-editor' element={<AiTextEditorPage/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
