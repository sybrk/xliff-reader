import ReadFiles from './components/ReadFiles'
import ContentTable from './components/ContentTable'
import './App.css'
import { useState } from 'react'

function App() {
  
  const [fileContent, setFileContent] = useState([])

  return (
    <>
      <ReadFiles setFileContent = {setFileContent} />
      <ContentTable fileContent = {fileContent} />
    </>
  )
}

export default App
