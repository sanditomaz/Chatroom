function login(){

    const name = prompt("What's lovely your name ?");

   const username= {
        name: name
    }

    console.log(username);

    const promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", username);

    //setInterval(keepingConnection, 5000, username);

    console.log(promise)
    console.log(promise)
    promise.then(enterChat);
    promise.catch(handleError);

}

function keepingConnection(username){
   const online = axios.post("https://mock-api.driven.com.br/api/v6/uol/status",username);
   console.log(online);
}

login();

function handleError(error){
    //const error400 = document.querySelector(".hidden");

    if(error.response.status === 400){
        //error400.classList.remove("hidden");
        alert("Sorry... This username already exists! 😥😥 \n\nPlease, choose another username...")
        login();
    }
}

function enterChat(){
    

}