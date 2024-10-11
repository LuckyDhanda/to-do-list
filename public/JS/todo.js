let designclass = ['work','family','personal','others']; //creating class for implementing design to different category 

    let categories = document.getElementsByClassName('task-right'); // getting all the class name task-right 
    // looping through all the categories to add the required class
        for(let i=0;i<categories.length;i++){ 
            if(categories[i].innerText=='Work'){ 
                categories[i].classList.add(designclass[0]);
            }
            else if(categories[i].innerText=='Family'){
                categories[i].classList.add(designclass[1])
                
            }else if(categories[i].innerText=='Personal'){
                categories[i].classList.add(designclass[2])
                
            }else if(categories[i].innerText=='Others'){
                categories[i].classList.add(designclass[3])
                
            }
        }

        function toggleStrikeThrough(id) {
            const checkbox = document.getElementById(id);
            const description = document.getElementById(`desc-${id}`);
            
            if (checkbox.checked) {
                description.classList.add('strikethrough');
            } else {
                description.classList.remove('strikethrough');
            }
        }        

// getting array of chech-boxed list items 
function getSelectedCheckboxIDs() {
    const checkboxes = document.querySelectorAll('.check-box:checked');
    return Array.from(checkboxes).map(checkbox => checkbox.id);
}

async function deleteSelectedCheckboxes() {
    const selectedIDs = getSelectedCheckboxIDs();
    if (selectedIDs.length === 0) {
        alert('No checkboxes selected.');
        return;
    }
    
    try {
        // console.log(selectedIDs);
        const response = await fetch('/delete-multiple', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ids: selectedIDs }) // Send the IDs as JSON
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const result = await response.json(); // Assuming the response is JSON
        console.log('Success:', result);
        // Reload the current page
        location.reload();

    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while deleting checkboxes.');
    }
}

// accessing the delete-tasks button
document.getElementById('delete-button').addEventListener('click', deleteSelectedCheckboxes);