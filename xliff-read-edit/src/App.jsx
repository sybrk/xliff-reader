import ReadFiles from './components/ReadFiles'
import ContentTable from './components/ContentTable'
import './App.css'
import { useState } from 'react'
function App() {

  const [fileContent, setFileContent] = useState([])

  const fileDownload = () => {
      let file = new File([fileContent[0].filecontent], fileContent[0].filename, {type: "text/xml"})
      let url = window.URL.createObjectURL(file);
      var a = document.createElement("a");
      a.style = "display: none";
      a.href = url;
      a.download = file.name;
      a.click();
      window.URL.revokeObjectURL(url);
  }

  return (
    <>
      <button onClick={fileDownload} >Download</button>
      <ReadFiles key={"read"} setFileContent={setFileContent} />
      <ContentTable key={"table"} fileContent={fileContent} setFileContent={setFileContent} />
    </>
  )
}

export default App
