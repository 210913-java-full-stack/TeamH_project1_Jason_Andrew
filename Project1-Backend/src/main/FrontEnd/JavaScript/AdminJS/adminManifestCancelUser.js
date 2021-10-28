let urlParameters = new URLSearchParams(window.location.search);
let flightToManifest = urlParameters.get("flightID");
(async function getAdminPassengerManifest() {
    //local "http://localhost:8080/Project1-Backend/flights"
    let response = await fetch("http://teamgairportkiosk-env.eba-ymppfvdg.us-east-2.elasticbeanstalk.com/flights", {
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
            let cell = tr.insertCell(-1);
            cell.innerHTML = element[key];
        }
    }
})();

//The above fills in the table, and below is used to cancel a user in the table

const form = document.getElementById("delete_customer");
form.addEventListener("submit",function(event) {
    event.preventDefault();//prevents the default "submit" event
    SubmitAdminCancelTicketForm();
    form.reset();
});

async function SubmitAdminCancelTicketForm() {
    const customerID = form.querySelector("#customer_id");
    let flightParameters = new URLSearchParams(window.location.search);
    let flightToManifest = flightParameters.get("flightID");
    let object = {//creates an object in JSON format
        "customerID": customerID.value,
        "flightID": flightToManifest
        //key is the variable we are assigning the value to
<<<<<<< HEAD
    } //P1kiosk-env.eba-djrhmwps.us-east-2.elasticbeanstalk.com/people //http://localhost:8080/Project1-Backend/people
    let response = await fetch("P1kiosk-env.eba-djrhmwps.us-east-2.elasticbeanstalk.com/people", {
=======
    }
    //local "http://localhost:8080/Project1-Backend/people"
    let response = await fetch("http://teamgairportkiosk-env.eba-ymppfvdg.us-east-2.elasticbeanstalk.com/people", {
>>>>>>> aa9e1af1bb7a1bb8c85c8815479bfee2087e9956
        method: "POST",
        headers: {"Content-Type": "application/json",
        "Servlet-action" : "DeleteCustomerFlight"
        },
        //one to add an object, one to update, one to delete, one to get one object, one to get a list
        body: JSON.stringify(object)//makes the json into a string to send
    });
    return response.text().then(function(){
        alert("Passenger successfully removed from flight.")
    });
}