let urlParameters = new URLSearchParams(window.location.search);
let flightToManifest = urlParameters.get("flightID");
(async function getAdminPassengerManifest() {
    let response = await fetch("http://localhost:8080/Project1-Backend/flights", {
        method: "GET",
        headers: {"Content-Type": "application/json",
            "Servlet-action": "AdminFlightManifest",
            "flight_ID": flightToManifest},
    });
    let jsonManifest = await response.json();

    let table = document.getElementById("adminPassengerManifest");

    for(let element of jsonManifest) {
        let tr = table.insertRow(-1);
        for(let key in element) {
            if(key=="ticket_id") {
                let cell = tr.insertCell(-1);
                cell.innerHTML = element[key];
            }
        }
    }
})();

//The above fills in the table, and below is used to cancel a user in the table

const form = document.getElementById("delete_customer");
form.addEventListener("submit",function(event) {
    event.preventDefault();//prevents the default "submit" event
    SubmitForm();
});

async function SubmitForm() {
    const customerID = form.querySelector("#customer_id");
    var queryString = decodeURIComponent(window.location.search);
    const fid = queryString.get("flightID");
    let object = {//creates an object in JSON format
        "customerID": customerID.value,
        "flightID": fid.value
        //key is the variable we are assigning the value to
    }
    let response = await fetch("http://localhost:8080/Project1-Backend/people", {
        method: "POST",
        headers: {"Content-Type": "application/json",
        "Servlet-action" : "DeleteCustomerFlight"
        },
        //one to add an object, one to update, one to delete, one to get one object, one to get a list
        body: JSON.stringify(object)//makes the json into a string to send
    });
}

// TODO: add response logic if necessary
//The only times we need a response: user-Flights, admin-Manifest, admin-Flights

//let json = response.json();
//And the response logic goes here