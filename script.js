let username;

login();

function login(){

    const name = prompt("What's lovely your name ?");

    username= {
        name: name
    }

    const promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", username);

    setInterval(keepingConnection, 5000, username);

    promise.then(keepingConnection);
    promise.catch(handleError);

    setInterval(fetchMessages, 3000);
}



function keepingConnection(){
   const online = axios.post("https://mock-api.driven.com.br/api/v6/uol/status", username);

}



function handleError(error){

    if(error.response.status === 400){
        alert("Sorry... This username already exists! 😥😥 \n\nPlease, choose another username...")
        login();
    }
}




function fetchMessages(){
    const promise = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");

    promise.then(displayChatroom);
    console.log(promise);

}




function displayChatroom(messages){
    document.querySelector(".main").innerHTML = "";

    
    let chatMessages = messages.data;
   

    let messagesDisplayed= document.querySelector(".main");

    for(let i = 0; i< chatMessages.length; i++){
        if(chatMessages[i].type === "status"){
            messagesDisplayed.innerHTML +=`
            <div class="chat-message gray">
            <p><span class="time">(${chatMessages[i].time})</span> <span class="username">${chatMessages[i].from}</span> ${chatMessages[i].text}</p>
            </div>`
        }

        if(chatMessages[i].type === "message"){
            messagesDisplayed.innerHTML +=`
            <div class="chat-message white">
            <p><span class="time">(${chatMessages[i].time})</span> <span class="username">${chatMessages[i].from}</span> para <span class="receiver">${chatMessages[i].to}: </span> ${chatMessages[i].text}</p>
            </div>`
        }

        if(chatMessages[i].type === "private_message" && username.name === chatMessages[i].to){
            messagesDisplayed.innerHTML +=`
            <div class="chat-message red">
            <p><span class="time">(${chatMessages[i].time})</span> <span class="username">${chatMessages[i].from}</span> reservadamente para <span class="receiver">${chatMessages[i].to}: </span> ${chatMessages[i].text}</p>
            </div>`
        }
    }

    let lastMessage = messagesDisplayed.lastChild;
    lastMessage.scrollIntoView();


}




function sendMessage(){
    let typedMessage;
    const typing = document.querySelector("textarea").value;

    typedMessage = {
        from: username.name,
        to: "Todos",
        text: typing,
        type: "message"
    }

    const promise2 = axios.post("https://mock-api.driven.com.br/api/v6/uol/messages", typedMessage);

    promise2.then(fetchMessages);
    promise2.catch(refreshPage);
    
    document.querySelector("textarea").value = "";
    

 }


function refreshPage(){
    window.location.reload();
}

