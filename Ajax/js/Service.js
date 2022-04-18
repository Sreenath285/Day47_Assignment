function showTime() {
    const date = new Date();
    return date.getHours() + "H: " + date.getMinutes() + "M: " + date.getSeconds() + "S";
  }
  
  function makePromiseCall(methodType, url, async = true, data = null) {
    return new Promise(function (resolve, reject) {
      let xhr = new XMLHttpRequest();
      xhr.onload = function () {
        //console.log(methodType+" state changed called at"+showTime()+". Ready state: "+xhr.readyState+" ,status: "+xhr.status);
        if (xhr.readyState == 4) {
          if (xhr.status === 200 || xhr.status === 201) {
            resolve(xhr.responseText);
          }
          else if (xhr.status >= 400) {
            reject({
              status: xhr.status,
              statusText: xhr.statusText
            });
            console.log("Handle 400 client error or 500 server error!");
          }
        }
      }
      xhr.onerror = function () {
        reject({
          status: this.status,
          statusText: xhr.statusText
        });
      }
      xhr.open(methodType, url, async);
      if (data) {
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(data));
      }
      else {
        xhr.send();
      }
      console.log(methodType + " request sent to server at " + showTime() + "!");
    });
  }
  
  const getElem = document.querySelector("#get_services");
  const getURL = "http://localhost:3000/employees/1"
  makePromiseCall("GET", getURL, true)
    .then(responseText => {
      getElem.textContent = "Get user data: " + responseText;
    })
    .catch(error => {
      getElem.textContent = "GET Error status: " + JSON.stringify(error)
    });
  
  
  const deleteElem = document.querySelector("#delete_services");
  const deleteURL = "http://127.0.0.1:3000/employees/4";
  makePromiseCall("DELETE", deleteURL, false)
    .then(responseText => {
      deleteElem.textContent = "User deleted: " + responseText;
    })
    .catch(error => { deleteElem.textContent = "DELETE Error status: " + JSON.stringify(error) });
  
  const postElem = document.querySelector("#post_services");
  const postURL = "http://127.0.0.1:3000/employees";
  const emplData = { "name": "Sreenath", "salary": "400000" }
  
  makePromiseCall("POST", postURL, true, emplData)
    .then(responseText => {
      postElem.textContent = "User added: " + responseText;
    })
    .catch(error => { postElem.textContent = "POST Error status: " + JSON.stringify(error) });