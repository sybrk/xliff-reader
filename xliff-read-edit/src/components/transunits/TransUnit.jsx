
const TransUnit = (props) => {
    const { unit, file } = props

    const sourceUnit = Array.from(unit.querySelectorAll("source"));
    const targetUnit = Array.from(unit.querySelectorAll("target"));

    return (
        sourceUnit.map((seg, index) => {
            return(
                
                <tr>
                    <td>{file.filename}</td>
                    <td>{targetUnit[index] && targetUnit[index].hasAttribute("state") ? targetUnit[index].getAttribute("state") : "undefined"}</td>
                    <td><pre style={{whiteSpace: "pre-line"}}>{seg.innerHTML}</pre></td>
                    <td><pre style={{whiteSpace: "pre-line"}} >{targetUnit[index] && targetUnit[index].innerHTML}</pre></td>
                </tr>
                
            )
        })
    )
}

export default TransUnit