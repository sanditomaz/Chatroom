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
    promise.then(keepingConnection);
    promise.catch(handleError);

}

function keepingConnection(username){
   const online = axios.post("https://mock-api.driven.com.br/api/v6/uol/status",username);
   console.log(online);
}

//login();

function handleError(error){
    //const error400 = document.querySelector(".hidden");

    if(error.response.status === 400){
        //error400.classList.remove("hidden");
        alert("Sorry... This username already exists! 😥😥 \n\nPlease, choose another username...")
        login();
    }
}

function fetchMessages(){
    const promise = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");

    promise.then(displayChatroom);
    console.log(promise)

}

fetchMessages();
//setInterval(fetchMessages, 3000);
let chatMessages;

function displayChatroom(messages){

    chatMessages = messages.data
    console.log(chatMessages);
    console.log(messages.status);

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

        if(chatMessages[i].type === "private_message"){
            messagesDisplayed.innerHTML +=`
            <div class="chat-message red">
            <p><span class="time">(${chatMessages[i].time})</span> <span class="username">${chatMessages[i].from}</span> reservadamente para <span class="receiver">${chatMessages[i].to}: </span> ${chatMessages[i].text}</p>
            </div>`
        }
    }

    let lastMessage = messagesDisplayed.lastChild;
    lastMessage.scrollIntoView();

    console.log(lastMessage);

}
