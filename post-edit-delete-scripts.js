//const headers = require("../server/middleware/headers");

/* *************************
 *** POST JOURNAL ***
************************** */
function postJournal() {
    const accessToken = localStorage.getItem('SessionToken')
    let title = document.getElementById('title').value;
    let date = document.getElementById('date').value;
    let entry = document.getElementById('entry').value;
    
    let newEntry = {
        journal: {
            title: title,
            date: date,
            entry: entry 
        }
    } 
    //console.log('postJournal Function Called')
    

    fetch(`http://localhost:3001/journal/create`, {
        method: "POST",
        headers: new Headers({
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        }),
        body: JSON.stringify(newEntry)
    })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            displayMine()
        })
        .catch(err => {
            console.error(err)
        })
}
    /* *************************
     *** UPDATE JOURNAL ***
    ************************** */
    function editJournal(postId) {
     console.log(postId);

    const fetch_url = `http://localhost:3001/journal/update/${postId}`;
    const accessToken = localStorage.getItem('SessionToken');

    let card = document.getElementById(postId);
    let input = document.createElement('input');

    if (card.childNodes.length < 2) {
        card.appendChild(input);
        input.setAttribute("type", "text");
        input.setAttribute("id", "updateEntry");
        input.setAttribute("placeholder", "Edit your journal entry");
    } else {
        let updated = document.getElementById('updatedEntry').value;
        let newEntry = {
            journal : {
                entry: updated
            }
        }

        fetch(fetch_url, {
            method: "PUT",
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            }),
            body: JSON.stringify(newEntry)
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                displayMine();
            })
            .catch(err => {
                console.error(err)
            })

            card.removeChild(card.lastChild)
    }
    }
    
    /* *************************
     *** DELETE JOURNAL ***
    ************************** */
    function deleteJournal(postId) {
        console.log(postId);

        const fetch_url = `http://localhost:3001/journal/delete/${postId}`;
        const accesToken = localStorage.getItem('SessionToken');

        fetch(fetch_url, {
            method: "DELETE",
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accesToken}`
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            displayMine();
        })
        .catch(err => {
            console.error(err)
        })
    }

/*
Line 39: Here we are setting up our editjournal() function and accepting the parameter of postId. If you remember in the display() function where the edit button is created and the editJournal() function is called we are passing this function the current.id argument (which refers to the id of the post we are currently dealing with). Passing this information allows us to utilize the id later on in this function.

Line 40 through 43: First we are simply console logging the postId. Next we are storing the url that we will use in the fetch as well as the Session Token on the line below that. Notice the use of the postId parameter within the URL on line 34. We are doing this since this endpoint utilizes a variable to append the id of the journal entry we want to update.

Line 45 and 46: On these lines we are storing some information regarding the DOM. Notice the use of postId once again on line 38. We are utilizing it this time to get the id assigned to each specific card for each post.

Line 48: Here we are stepping into the first portion of the if else statement. We are checking to see how many child nodes the card currently contains. If it has less than 2 we want to create an additional one which will be an input field used for editing. If it has 2 or more this means the input field already exists and that we are in "edit mode" so we wouldn't want to create it again. This will start to make more sense once we fill in the logic for the else portion of this conditional in the next step.

Lines 49 through 52: The next 4 lines handle the creation of the inputs within the cards as well as giving it some attributes that change how it appears on the page and gives it an id. 
*/