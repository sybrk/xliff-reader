
const ReadFiles = (props) => {

    const { setFileContent } = props

    const readFile = async (file) => {
        // create a file reader Object
        let reader = new FileReader();
        // read file as text
        reader.readAsText(file)
        // await the file to be read.
        await new Promise(resolve => reader.onload = () => resolve());

        // return filename and filecontent with keys.
        return {
            filename: file.name,
            filecontent: reader.result
        }
    }

    const importFile = async () => {
        const files = document.getElementById("choosefiles").files || [];
        let tmpFileContentArray = [];
        
        
        if (files.length) {
            for (let i = 0; i < files.length; i++) {
                let fileRead = await readFile(files[i]);
                tmpFileContentArray.push(fileRead);
            }
        }
        console.log(tmpFileContentArray)
        setFileContent(tmpFileContentArray);
    }

    return (
        <>
            <input type="file" id="choosefiles" multiple accept=".xliff, xlf" />
            <button id="readbutton" className="rounded-pill btn btn-success text-black" type="button" onClick={importFile}>Read</button>
        </>
    )
}

export default ReadFiles