/* *************************
*** USER SIGNUP ***
************************** */
function userSignUp() {
     //console.log('userSignUp Function Called')

    let userEmail = document.getElementById("emailSignup").value;
    let userPass = document.getElementById("pwdSignup").value;
    
    let newUserData = {
        user: {
            email: userEmail,
            password: userPass
        }
    };

    console.log(`newUserData --> ${newUserData.user.email} ${newUserData.user.password}`);
    
    fetch(`http://localhost:3001/user/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newUserData)
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            let token = data.sessionToken;
            localStorage.setItem('SessionToken', token);
            tokenChecker();
        })
        .catch(err => {
            console.error(err)
        })
    };
    /* *************************
    *** USER LOGIN ***
    ************************** */
    function userLogin() {
        let userEmail = document.getElementById('emailLogin').value;
        let userPass = document.getElementById('pwdLogin').value;
        console.log(userEmail, userPass)

        let userData = {
            user: {
                email: userEmail,
                password: userPass
            }
        }
        console.log(userData)

        fetch(`http://localhost:3001/user/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                let token = data.sessionToken;
                localStorage.setItem('SessionToken', token);
                tokenChecker();
            })
            .catch(err => {
                console.error(err)
            })
     //console.log('userLogin Function Called')
    }
    
    
    /* *************************
    *** USER LOGOUT ***
    ************************** */
    function userLogout() {
        localStorage.setItem('sessionToken', undefined);
        console.log(`sessionToken --> ${localStorage.sessionToken}`);
        tokenChecker();
        //console.log('userLogout Function Called')
    }
    
    
    /* *************************
     *** TOKEN CHECKER FUNCTION ***
    ************************** */
    function tokenChecker() {
     console.log('tokenChecker Function Called')

    let display = document.getElementById('journals');
    let header = document.createElement('h5');
    let accessToken = localStorage.getItem('SessionToken');
    let alertText = "Log in or sign up to get started!";

    for (let i = 0; i < display.childNodes.length; i++) {
        display.removeChild(display.firstChild);
    }

    if (accessToken === 'undefined') {
        display.appendChild(header);
        header.textContent = alertText;
        header.setAttribute('id', 'defaultLogin');
    } else {
        null
    }
    }
    tokenChecker()

/*
Line 7 & 8: Here we are setting up two variables by pulling input values from the DOM with the getElementById method.
Line 10 through 15: On this line we set up another variable containing a user object using the previous two variables.
Line 17: This last new line is simply a console log that shows the email and password that were entered in the sign up input fields. 
Line 19: Here we are fetching from the user create endpoint that we created in our server.
Line 20:  We are using the POST method here just as we did for this end point server side. The route in the server handles a POST request, so our method type is POST. Remember that these two must match. If a route takes a POST request, then the declared method in the request should be POST. 
Line 20 through 23: We will deal with more header info in later fetches. For now we are saying that we will be dealing with JSON text content. 
Line 24:  We are sending data through the body of this request (does this ring any bells?) The newUserData is turned into a JSON string thanks to the JSON.stringify() method.  
Line 26: Parses the response into JSON.
Line 27 through 32: In the next lines we are first console logging the response, then creating the variable "token" to store it. Next we access the localStorage for the current domain we are using and use the setItem  method to set the SessionToken in local storage to be the token generated by our server. Finally we call the tokenChecker function which we will get more into later.
Line 33 through 35: The last thing we do here is add in a .catch to handle any errors we might get and then console log those errors. 
Lines 89 - 92: We start this function off by defining a few variables to interact with the DOM more easily below.

Lines 94 - 96: Next we add in a for loop that removes all child nodes within the journals div. This way the message we may want to display doesn't get appended to the end of a bunch of journal cards.

Lines 98 - 104: Here we are using a conditional to check whether or not there is a token. If there is not a token we add a header with the message contained within the "text" variable on line 83. This would mean there is not a user signed in so we want to make sure we are communicating that with them. If there is a token then we do not append anything to the DOM.

Line 106: Finally we call the tokenChecker function. We want to call it right away so as soon as the browser goes to the Journal webpage it checks if there is a token in local storage or not and displays the message accordingly. 
*/