
const ContentTable = (props) => {
    const { fileContent } = props

    const xmlParser = (content) => {
        let parser = new DOMParser;
        let xmldoc = parser.parseFromString(content, "text/xml");
        return xmldoc;
    }

    return (
        <>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th scope="col">File Name</th>
                        <th scope="col">Status</th>
                        <th scope="col">Source Text</th>
                        <th scope="col">Target Text</th>
                    </tr>
                </thead>
                <tbody id="tbody" className="table-group-divider">
                    {
                        fileContent &&
                        fileContent.map(file => {
                            let parsed = xmlParser(file.filecontent)
                            let transUnits = Array.from(parsed.querySelectorAll("xliff trans-unit"))
                            
                            return (transUnits.map(unit => {
                                const sourceUnit = Array.from(unit.querySelectorAll("source"));
                                const targetUnit = unit.querySelectorAll("target");
                                return (sourceUnit.map((seg, index) => {
                                    return(
                                        
                                        <tr>
                                            <td>{file.filename}</td>
                                            <td>{targetUnit[index].hasAttribute("state") ? targetUnit[index].getAttribute("state") : "undefined"}</td>
                                            <td>{seg.innerHTML}</td>
                                            <td>{targetUnit[index].innerHTML}</td>
                                        </tr>
                                        
                                    )
                                }))
                            }))
                        })
                    }
                </tbody>
            </table>
        </>
    )
}

export default ContentTable