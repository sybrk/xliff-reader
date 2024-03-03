
import TransUnit from "./transunits/TransUnit";
const XliffFile = (props) => {
    const {file, setFileContent, myKey, fileContent} = props
    const xmlParser = (content) => {
        let parser = new DOMParser;
        let xmldoc = parser.parseFromString(content, "text/xml");
        return xmldoc;
    }
    let parsed = xmlParser(file.filecontent);
    let transUnits = Array.from(parsed.querySelectorAll("xliff trans-unit"))
    const updateAndSerialize = (index, updatedUnit) => {
        let tmpUnit = parsed.querySelectorAll("xliff trans-unit");
        tmpUnit[index] = updatedUnit;
        const s = new XMLSerializer();
        let updatedXML = s.serializeToString(parsed);
        let tmpFile = file;
        tmpFile.filecontent = updatedXML;
        let tmpFileArray = fileContent
        tmpFileArray[myKey] = tmpFile
        setFileContent(tmpFileArray);
    }
    return (
        <>
            {
                transUnits.map((unit, index) => <TransUnit key={file.filename + "_unit_"+index} myKey = {index} file = {file} unit = {unit} updateAndSerialize = {updateAndSerialize} />)
            }
        </>
    )
}

export default XliffFile