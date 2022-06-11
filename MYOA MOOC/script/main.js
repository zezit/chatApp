import {
    channel1,
    channel2,
    channel3,
    channel4,
    mockMessages,
    mockChannels,
} from "./channels.js";

/* Variables */
let channels = [];

let selectedChannel = 1;
let toChangeTime;
var channel_name;
let numberOfChannels = 4; // Saves the number of channels
/* Functions */
// executes when the app is loaded
window.init = function () {
    console.log("App is initialized");
    atualize();

    // send area
    document
        .getElementById("send-button")
        .addEventListener("click", sendMessage);
    document
        .querySelector("#input-area input")
        .addEventListener("keypress", treatSendKey);

    // new channel
    document
        .querySelector("#action-button")
        .addEventListener("click", createNewChannel);
    document
        .querySelector("#new-channel-name")
        .parentElement.addEventListener("keydown", treatCreateNewChannelKeys);
    document
        .querySelectorAll("section")[0]
        .addEventListener("keydown", treatCancelNewChannelKeys);
    document.querySelector("#cancel").addEventListener("click", cancel);
    document.querySelector("#create").addEventListener("click", newChannel);

    // emoji area
    //     document
    //         .getElementById("emoticon-button")
    //         .addEventListener("click", toggleEmojiArea);
    //     document
    //         .getElementById("close-emoticon-button")
    //         .addEventListener("click", toggleEmojiArea);
};

const atualize = () => {
    getChannels();
    getMessages();
    initLastMessage(channels[selectedChannel].latestMessage);
    getLists();
    isFavorite();
};

const cancel = () => {
    var body = document.querySelector(".all");
    body.classList.remove("blur");

    var popup = document.querySelector(".new-channel");
    popup.classList.add("display");
    popup.classList.remove("new-channel");
};
const newChannel = () => {
    var name = document.querySelector(".new-channel input");
    if (name.value) {
        var totalChannels = channels.length;

        // Verifica se já existe
        channels.forEach((element) => {
            if (element.name == name.value) {
                window.alert("Channel name already exists!");
                return;
            }
        });

        const channelNew = Object.create(mockChannels);

        // create new channel
        channelNew.id = "ch" + String(totalChannels + 1);
        channelNew.name = name.value;
        channelNew.favorite = false;
        channelNew.messages = [];
        channelNew.latestMessage = "No messages";

        channels.push(channelNew);

        atualize();

        name.value = "";

        cancel();

        switchChannel(channelNew.id);
    } else {
        window.alert("You have to insert a name!");
    }
};

const createNewChannel = () => {
    var popup = document.querySelector(".display");
    popup.classList.remove("display");

    var body = document.querySelector(".all");
    body.classList.add("blur");
    popup.classList.add("new-channel");
};

const treatSendKey = () => {
    if (window.event.key === "Enter") {
        document.getElementById("send-button").click();
    }
};

const treatCreateNewChannelKeys = () => {
    if (window.event.key === "Enter") {
        document.getElementById("create").click();
    }
};
const treatCancelNewChannelKeys = () => {
    if (window.event.key === "Escape") {
        document.getElementById("cancel").click();
    }
};

const getLists = () => {
    const favoriteList = document.getElementById("favorite-channels");
    const regularList = document.getElementById("regular-channels");

    let favoritesCount = 0;
    let timeLastMessage;
    // clear lists
    favoriteList.innerHTML = "";
    regularList.innerHTML = "";

    channels.forEach((element) => {
        if (element.favorite) {
            // console.log(element);
            favoritesCount++;
            const currentListHtml =
                `<li onclick="switchChannel('` +
                element.id +
                `')">
                      <i class="material-icons">group</i
                      ><span id="` +
                element.id +
                `">` +
                element.name +
                `</span><small>` +
                element.latestMessage +
                `</small>
                  </li>`;

            const div = document.querySelector("#favorite-channels");
            // console.log(currentListHtml);
            div.innerHTML += currentListHtml;
        } else {
            // console.log(element);
            const currentListHtml =
                `<li onclick="switchChannel('` +
                element.id +
                `')">
                      <i class="material-icons">group</i
                      ><span id="` +
                element.id +
                `">` +
                element.name +
                `</span><small>` +
                element.latestMessage +
                `</small>
                  </li>`;

            const div = document.querySelector("#regular-channels");
            div.innerHTML += currentListHtml;
        }
    });

    // console.log("fav:" + favoritesCount);
    if (!favoritesCount) {
        const currentListHtml = `<li>None</li>`;

        const div = document.querySelector("#favorite-channels");
        // console.log(currentListHtml);
        div.innerHTML += currentListHtml;
    }

    document
        .getElementById(channels[selectedChannel].id)
        .parentElement.classList.add("selected");
};

window.getChannels = function () {
    channels[0] = channel1;
    channels[1] = channel2;
    channels[2] = channel3;
    channels[3] = channel4;

    console.log(channels);
};

// create an object to hold all messages from channels
window.getMessages = function () {
    let muchMessages = channels[selectedChannel].messages;
    let messageContainer;

    if (Array.isArray(muchMessages)) {
        muchMessages.forEach((element) => {
            if (element.own) {
                messageContainer =
                    `<div class="incomming">
            <div>
                <div class="mes-content-self">
                    <p>` +
                    element.text +
                    `</p>
                </div>

                <small>` +
                    element.createdOn.getHours() +
                    ":" +
                    element.createdOn.getMinutes() +
                    `</small>
            </div>
            <div class="inc-icon">
                <i class="material-icons">account_circle</i>
            </div>
        </div>`;
            } else {
                messageContainer =
                    `<div class="mes">
                        <div class="inc-icon">
                            <i class="material-icons">account_circle</i>
                        </div>
                        <div>
                            <div class="mes-content">
                                <h2>` +
                    element.createdBy +
                    `</h2>

                                <p>
                                    ` +
                    element.text +
                    `
                                </p>
                            </div>
                            <small>` +
                    element.createdOn.getHours() +
                    ":" +
                    element.createdOn.getMinutes() +
                    `</small>
                        </div>
                    </div>`;
            }
            const div = document.querySelector(".all-mes-wraper");
            if (messageContainer != "") {
                div.innerHTML += messageContainer;
            }
        });
    }
};

const timeFormated = (aux) => {
    var lastTime;
    if (aux.getHours() < 10) {
        // console.log("hour less than 10");
        lastTime = "0";
        lastTime += aux.getHours();
        // console.log("Last: " + lastTime);
    } else {
        lastTime = aux.getHours();
    }
    // console.log("Last: " + aux.getHours());

    lastTime += ":";
    // console.log("Last: " + lastTime);

    if (aux.getMinutes() < 10) {
        // console.log("minutes less than 10");
        lastTime += "0";
        // console.log("Last: " + lastTime);
    }
    lastTime += aux.getMinutes();
    lastTime = String(lastTime);
    // console.log("Last: " + lastTime);

    return lastTime;
};

function attLastMessage() {
    var lastTime = "",
        aux,
        size;
    // cria instancia de tempo
    aux = new Date();
    // Salva hora e minuto
    lastTime = timeFormated(aux);
    // lastTime = aux.getHours() + ":" + aux.getMinutes();
    channels[selectedChannel].latestMessage = lastTime;
    // initLastMessage(lastTime);

    getIndividualLastTime(lastTime);
}

const getIndividualLastTime = (lastTime) => {
    toChangeTime.lastElementChild.innerHTML = lastTime;
};

function initLastMessage(lastTime) {
    // var lastTime = "",
    var aux, size;
    channels.forEach((element) => {
        size = element.messages.length;
        if (size < 0) {
            size = 0;
        }
        if (size != 0) {
            // aux = new Date(element.messages[size - 1].createdOn);
            // lastTime = aux.getHours() + ":" + aux.getMinutes();
            element.latestMessage = lastTime;
            // console.log(element.name);
            // console.log(lastTime);
            // console.log(element.latestMessage);
        }
    });
    // getLists();
    lastTime = "";
    size = 0;
}

// changes channel and highlight it
window.switchChannel = function (channel) {
    // remove o último selecionado
    document.getElementsByClassName("selected")[0].classList.remove("selected");

    let channels_lenght = Object.keys(channels).length;
    // acha as informações da id passada
    for (let index = 0; index < channels_lenght; index++) {
        if (channel == channels[index].id) {
            // salva o index do canal selecionado
            selectedChannel = index;
            break;
        }
    }
    console.log(channels[selectedChannel]);
    // hightlight no canal clicado
    document
        .getElementById(channels[selectedChannel].id)
        .parentElement.classList.add("selected");

    // pega o titulo na tela das mensagens e substitui pelo cannal selecionado
    showHeader(channels[selectedChannel].name);

    // atualiza as mensagens
    channel_name = document.querySelectorAll("#channelName")[0].textContent;

    // limpa tela
    document.querySelectorAll(".all-mes-wraper")[0].innerHTML = "";

    getMessages();
    // Verifica se o canal está favorito
    isFavorite();
    console.log(channels[selectedChannel].messages);
};

// change the header to the selected channel name
window.showHeader = function (channel) {
    document.getElementById("channelName").innerHTML = channel;
};

// verify is channel is favorite
window.isFavorite = function () {
    if (channels[selectedChannel].favorite) {
        document.getElementById("favorite-bt").innerHTML = "favorite";
    } else {
        document.getElementById("favorite-bt").innerHTML = "favorite_border";
    }
};

// add or remove channels from favorites
window.add_to_fav = function () {
    if (channels[selectedChannel].favorite == false) {
        console.log(
            "Adding " + channels[selectedChannel].name + " to favorites"
        );
        channels[selectedChannel].favorite = true;
        document.getElementById("favorite-bt").innerHTML = "favorite";
    } else {
        console.log(
            "Removing " + channels[selectedChannel].name + " from favorites"
        );
        channels[selectedChannel].favorite = false;
        document.getElementById("favorite-bt").innerHTML = "favorite_border";
    }
    isFavorite();
    getLists();
};

window.addMessage = function (message, current_date) {
    const ChannelMessage = Object.create(mockMessages);

    ChannelMessage.createdBy = "José Victor";
    ChannelMessage.createdOn = new Date();
    ChannelMessage.channel = channels[selectedChannel].name;
    ChannelMessage.own = true;
    ChannelMessage.text = message;

    channels[selectedChannel].messages.push(ChannelMessage);
};

window.sendMessage = function () {
    var current = new Date();
    // pega a mensagem escrita
    var messageText = document.getElementById("message-input").value;
    if (messageText) {
        addMessage(messageText, current);
    }
    console.log("Message: " + messageText);

    var hours = current.getHours();
    var minutes = current.getMinutes();

    let messageString;
    messageString =
        `<div class="incomming">
            <div>
                <div class="mes-content-self">
                    <p>` +
        messageText +
        `</p>
                </div>

                <small>` +
        timeFormated(current) +
        `</small>
            </div>
            <div class="inc-icon">
                <i class="material-icons">account_circle</i>
            </div>
        </div>
    `;
    const div = document.querySelector(".all-mes-wraper");
    if (messageText != "") {
        div.innerHTML += messageString;
    }

    document.getElementById("message-input").value = "";
    bottom();
    // console.log(chaannels[selectedChannel].messages);
    if (channels[selectedChannel].favorite) {
        reorganizeLists(
            channels[selectedChannel].id,
            "#favorite-channels",
            document.querySelector("#" + channels[selectedChannel].id)
                .parentElement
        );
    } else {
        reorganizeLists(
            channels[selectedChannel].id,
            "#regular-channels",
            document.querySelector("#" + channels[selectedChannel].id)
                .parentElement
        );
    }
    attLastMessage();
};

const reorganizeLists = (channel, classSel, li) => {
    // ul
    toChangeTime = li;
    var test = classSel.replace("#", "");
    const reorganize = document.getElementById(test);
    console.log(reorganize);
    var shuffle = document.querySelectorAll(classSel + " li");
    console.log(shuffle);
    // specific li
    channel = classSel + " #" + channel;
    reorganize.innerHTML = "";
    // reorganize

    reorganize.appendChild(li);
    for (var i = 0; i < shuffle.length; i++) {
        if (shuffle[i] == li) {
            continue;
        }
        reorganize.appendChild(shuffle[i]);
    }
};

// auto scroll page
window.bottom = function () {
    console.log("Bottom");
    document.getElementById("bottom").scrollIntoView();
};
