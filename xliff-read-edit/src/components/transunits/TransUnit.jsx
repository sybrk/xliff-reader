

const TransUnit = (props) => {
    const { unit, file, updateAndSerialize } = props
    let sourceUnit = Array.from(unit.querySelectorAll("source"));
    let targetUnit = Array.from(unit.querySelectorAll("target"));

    const replaceNS = (innerHTML) => {
        return innerHTML.replaceAll(' xmlns="urn:oasis:names:tc:xliff:document:1.2"',"")
    }

    const updateTarget = (index, e) => {
        let tmpUnit = unit
        let updatedContent = e.target.parentElement.previousSibling.firstChild.innerHTML;
        console.log(updatedContent)
        let toUpdate = tmpUnit.querySelectorAll("target")
        toUpdate[index].innerHTML = updatedContent;
        updateAndSerialize()
    }
    return (
        sourceUnit.map((seg, index) => {
            return(
                
                <tr key={unit.getAttribute("id") + index}>
                    <td>{file.filename}</td>
                    <td>{targetUnit[index] && targetUnit[index].hasAttribute("state") ? targetUnit[index].getAttribute("state") : "undefined"}</td>
                    <td><pre style={{whiteSpace: "pre-line"}}>{replaceNS(seg.innerHTML)}</pre></td>
                    <td><pre style={{whiteSpace: "pre-line"}} contentEditable = {"true"} >{targetUnit[index] && replaceNS(targetUnit[index].innerHTML)}</pre></td>
                    <td><button onClick={(e) =>updateTarget(index, e)} >Save</button></td>
                </tr>
                
            )
        })
    )
}

export default TransUnit