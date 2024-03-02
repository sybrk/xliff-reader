import XliffFile from "./XliffFile"


const ContentTable = (props) => {
    const { fileContent } = props

    

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
                        fileContent.map((file, index) => 
                            <XliffFile key = {index} file = {file} />                        
                        )
                    }
                </tbody>
            </table>
        </>
    )
}

export default ContentTable