import { useState } from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import DocumentUploadPage from '../Pages/DocumentUpload'
import LandingPage from '../Pages/Home'
function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<LandingPage/>}/>
          <Route path='/DocumentUpload' element={<DocumentUploadPage/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
