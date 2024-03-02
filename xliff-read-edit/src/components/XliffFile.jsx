import TransUnit from "./transunits/TransUnit";
const XliffFile = (props) => {
    const {file} = props

    const xmlParser = (content) => {
        let parser = new DOMParser;
        let xmldoc = parser.parseFromString(content, "text/xml");
        return xmldoc;
    }
    let parsed = xmlParser(file.filecontent);
    let transUnits = Array.from(parsed.querySelectorAll("xliff trans-unit"))
    return (
        <>
            {
                transUnits.map((unit, index) => <TransUnit key={index} file = {file} unit = {unit} />)
            }
        </>
    )
}

export default XliffFile