document.addEventListener('DOMContentLoaded', function() {

    // adding click event for read button
    const read_button = document.querySelector("#readbutton");
    read_button.addEventListener('click', () => create_table())
	
	// adding click event for reset button
    const reset_button = document.querySelector("#resetbutton");
    reset_button.addEventListener('click', () => reset())
	
})

async function read_file(file) {
	
	// create a file reader Object
	let reader = new FileReader();
	// read file as text
	reader.readAsText(file)
	// await the file to be read.
	await new Promise(resolve => reader.onload = () => resolve());
	
	// return filename and filecontent with keys.
	return await {
		filename: file.name,
		filecontent: reader.result
	}
}

function xml_parser(xmlcontent) {
	let parser = new DOMParser;
	let xmldoc = parser.parseFromString(xmlcontent, "text/xml");
	return xmldoc;
}

async function create_table() {
	reset();
	const files = document.getElementById("choosefiles").files || [];
	let child_elements = [];
	let rowcount = 1;
	if (files.length) {
		for (let i = 0; i < files.length; i++) {
			let reading = await read_file(files[i]);
			let doc = xml_parser(reading.filecontent);
			const trans_units = doc.querySelectorAll("xliff trans-unit");
			trans_units.forEach(function(unit) {
				const source_seg = unit.querySelectorAll("source");
				
				const target_seg = unit.querySelectorAll("target");
				
				source_seg.forEach(async function(seg, i) {
					const row = document.createElement("tr");
					row.classList.add("myrows");
					row.setAttribute("id", rowcount);
					rowcount++;
					// create new table cell for file name info
					const filename_data = document.createElement("td");
					// create new table cell for segmentid
					const status_data = document.createElement("td");
					// create new table cell for source text
					const sourcetext_data = document.createElement("td");
					sourcetext_data.classList.add("sourcetext");
					// create new table cell for target text
					const targettext_data = document.createElement("td");
					targettext_data.classList.add("targettext");
					
					const tablerow = document.querySelector("#tbody").appendChild(row);
					tablerow.appendChild(filename_data);
					tablerow.appendChild(status_data);
					tablerow.appendChild(sourcetext_data);
					tablerow.appendChild(targettext_data);
					
					filename_data.innerHTML = reading.filename;
					
					if (target_seg[i].hasAttribute("state")) {
						status_data.innerHTML = target_seg[i].getAttribute("state");
					} else {
						status_data.innerHTML = "undefined";
					}
					
					// write source text
					sourcetext_data.innerHTML = seg.innerHTML;
					targettext_data.innerHTML = target_seg[i].innerHTML;
				});
			});
		}
	}
}

function reset () {
	
	let rows = document.querySelector("#tbody").querySelectorAll("tr");
	
	rows.forEach(function(element) {
		element.remove();
	});
}
	