

const TransUnit = (props) => {
    const { unit, file, myKey, updateAndSerialize } = props
    const sourceUnit = Array.from(unit.querySelectorAll("source"));
    const targetUnit = Array.from(unit.querySelectorAll("target"));

    const updateTarget = (index, e) => {
        let tmpUnit = unit
        let updatedContent = e.target.previousSibling.firstChild.innerHTML;
        console.log(updatedContent)
        tmpUnit.querySelectorAll("target")[index].innerHTML = updatedContent;
        updateAndSerialize(myKey,tmpUnit)
    }
    return (
        sourceUnit.map((seg, index) => {
            return(
                
                <tr>
                    <td>{file.filename}</td>
                    <td>{targetUnit[index] && targetUnit[index].hasAttribute("state") ? targetUnit[index].getAttribute("state") : "undefined"}</td>
                    <td><pre style={{whiteSpace: "pre-line"}}>{seg.innerHTML}</pre></td>
                    <td><pre style={{whiteSpace: "pre-line"}} contentEditable = {"true"} >{targetUnit[index] && targetUnit[index].innerHTML}</pre></td>
                    <button onClick={(e) =>updateTarget(index, e)} >Save</button>
                </tr>
                
            )
        })
    )
}

export default TransUnit