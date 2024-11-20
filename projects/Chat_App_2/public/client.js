const socket = io();

const inboxPeople = document.querySelector(".inbox__people");
const inputField = document.querySelector(".message_form__input");
const messageForm = document.querySelector(".message_form");
const messageBox = document.querySelector(".messages__history");
const fallback = document.querySelector(".fallback");

let userName = "";

const newUserConnected = (user) => {
    userName = user || `User${Math.floor(Math.random() * 1000000)}`;
    socket.emit("new user", userName);
    addToUsersBox(userName);
};

const addToUsersBox = (userName) => {
    if (!!document.querySelector(`.${userName}-userlist`)) {
        return;
    }

    const userBox = `
    <span class="chat_ib ${userName}-userlist">
      <span>${userName}</span>
    </span>
  `;
    inboxPeople.innerHTML += userBox;
};


const addNewMessage = ({ user, message }) => {
    const time = new Date();
    const formattedTime = time.toLocaleString("en-US", { hour: "numeric", minute: "numeric" });

    const receivedMsg = `
  <div class="incoming__message">
    <div class="received__message">
      <div>${message}</div>
      <div class="message__info">
        <span class="message__author">${user}</span>
        <span class="time_date">${formattedTime}</span>
      </div>
    </div>
  </div>`;

    const myMsg = `
  <div class="outgoing__message">
    <div class="sent__message">
      <div>${message}</div>
      <div class="message__info">
        <span class="time_date">${formattedTime}</span>
      </div>
    </div>
  </div>`;

    messageBox.innerHTML += user === userName ? myMsg : receivedMsg;
};

// new user is created so we generate nickname and emit event
newUserConnected(prompt('Enter your Name'));

messageForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!inputField.value) {
        return;
    }

    socket.emit("chat message", {
        message: inputField.value,
        nick: userName,
    });
    socket.emit("typing", {
        isTyping: false,
        nick: userName,
    });

    inputField.value = "";
});

// Fetch data from DB
let oldMessages = [
    { user: 'sainath', message: 'Helloooo' }    
]
for (ele of oldMessages) {
    addNewMessage({ user: ele.user, message: ele.message })
}

inputField.addEventListener("keyup", () => {
    socket.emit("typing", {
        isTyping: inputField.value.length > 0,
        nick: userName,
    });
});

socket.on("new user", function (data) {
    data.map((user) => addToUsersBox(user));
});

socket.on("user disconnected", function (userName) {
    document.querySelector(`.${userName}-userlist`).remove();
});

socket.on("chat message", function (data) {
    addNewMessage({ user: data.nick, message: data.message });
});


socket.on("typing", function (data) {
    const { isTyping, nick } = data;

    if (!isTyping) {
        fallback.innerHTML = "";
        return;
    }

    fallback.innerHTML = `<p>${nick} is typing...</p>`;
});