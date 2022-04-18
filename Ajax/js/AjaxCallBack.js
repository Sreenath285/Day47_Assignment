let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function showTime() {
    const date = new Date();
    return date.getHours() + "Hrs:" + date.getMinutes() + "Mins:" + date.getSeconds() + "Seconds";
}

function makeAJAXCall(methodType, url, callback, async = true, data = null) {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        console.log(methodType + " State Changed Called At: " + showTime() + " | Ready State: " + xhr.readyState + " | Status: " + xhr.status)
        if (xhr.readyState === 4) {
            if (xhr.status === 200 || xhr.status === 201) {
                callback(xhr.responseText)
            }
            else if (xhr.status >= 400) {
                console.log("\nHandle 400 Client Error OR 500 Server Error At: " + showTime());
            }
        }
    }
    xhr.open(methodType, url, async);

    if (data) {
        console.log(JSON.stringify(data));
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(data));
    }
    else {
        xhr.send();
    }
    console.log(methodType + " Request sent to server at: " + showTime());
}

const deleteURL = "http://localhost:3000/employees/4";
function userDeleted(data) {
    console.log("User Deleted At: "+ showTime() + "Data: " + data);
}
makeAJAXCall("DELETE", deleteURL, userDeleted, true);
console.log("\nMade DELETE AJAX Call to Server at: " + showTime());

const postURL = "http://localhost:3000/employees";
const emplData = { "name": "Sreenath", "salary": "400000" };
function userAdded(data) {
    console.log("User Added: " + data);
}
makeAJAXCall("POST", postURL, userAdded, true, emplData);