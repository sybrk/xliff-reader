import { diffWords } from "diff";

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

    const onChange = (index, e) => {
        console.log(index, e)
        let tmpUnit = unit
        let oldText = tmpUnit.querySelectorAll("target")[index].innerHTML;
        console.log(oldText);
        let newText = e.target.parentElement.previousSibling.firstChild.innerHTML;
        console.log(newText);
        let diff = diffWords(oldText, newText);
        console.log(diff);
        let compText = e.target.parentElement.nextSibling;
        compText.innerHTML = "";
        console.log(compText)
        diff.forEach((part) => {
            // green for additions, red for deletions
            const color = part.added ? 'green' :
                part.removed ? 'red' : 'grey';
            let span = document.createElement('span');
            span.style.color = color;
            span.appendChild(document
                .createTextNode(part.value))
            compText.appendChild(span);
          });
    }
    return (
        sourceUnit.map((seg, index) => {
            return(
                
                <tr key={unit.getAttribute("id") + index}>
                    <td>{file.filename}</td>
                    <td>{targetUnit[index] && targetUnit[index].hasAttribute("state") ? targetUnit[index].getAttribute("state") : "undefined"}</td>
                    <td><pre style={{whiteSpace: "pre-line"}}>{replaceNS(seg.innerHTML)}</pre></td>
                    <td><pre style={{whiteSpace: "pre-line"}} contentEditable = {"true"} >{targetUnit[index] && replaceNS(targetUnit[index].innerHTML)}</pre></td>
                    <td><button onClick={(e) =>onChange(index, e)} >Save</button></td>
                    <td></td>
                </tr>
                
            )
        })
    )
}

export default TransUnit