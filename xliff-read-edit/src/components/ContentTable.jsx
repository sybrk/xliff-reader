import XliffFile from "./XliffFile"


const ContentTable = (props) => {
    const { fileContent, setFileContent } = props

    

    return (
        <>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th scope="col">File Name</th>
                        <th scope="col">Status</th>
                        <th scope="col">Source Text</th>
                        <th scope="col">Target Text</th>
                        <th scope="col">Save</th>
                        <th scope="col">Compare</th>
                    </tr>
                </thead>
                <tbody id="tbody" className="table-group-divider">
                    {
                        fileContent &&
                        fileContent.map((file, index) => 
                            <XliffFile key = {"file_"+index} myKey = {index} file = {file} fileContent = {fileContent} setFileContent = {setFileContent} />                        
                        )
                    }
                </tbody>
            </table>
        </>
    )
}

export default ContentTable