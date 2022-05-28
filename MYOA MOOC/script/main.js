// object that has all useful info about the app channels
const channels = {};

/* Variables */
let selectedChannel = 1;

/* Functions */
// executes when the app is loaded
function app_alive() {
    console.log("App is alive!");
    createChannelsObjects();
}

// create an object to hold all channels info
function createChannelsObjects() {
    elements = document.querySelectorAll(".channel-list li span");
    for (let index = 0; index < elements.length; index++) {
        channels[index] = {
            id: elements[index].id,
            name: elements[index].textContent,
            favorite: false,
        };
    }
    console.log(channels);
}

// changes channel and highlight it
function switchChannel(channel) {
    // remove o último selecionado
    document.getElementsByClassName("selected")[0].classList.remove("selected");
    // document.getElementsByClassName("mes-outgoing").classList.add(".hide-intes");

    let channels_lenght = Object.keys(channels).length;
    // acha as informações da id passada
    for (let index = 0; index < channels_lenght; index++) {
        if (channel.id == channels[index].id) {
            // salva o index do canal selecionado
            selectedChannel = index;
        }
    }

    // hightlight no canal clicado
    document
        .getElementById(channels[selectedChannel].id)
        .parentElement.classList.add("selected");

    // pega o titulo na tela das mensagens e substitui pelo cannal selecionado
    showHeader(channel);

    // Verifica se o canal está favorito
    isFavorite();
}

// change the header to the selected channel name
function showHeader(channel) {
    document.getElementById("channelName").innerHTML = channel.textContent;
}

// verify is channel is favorite
function isFavorite() {
    if (channels[selectedChannel].favorite) {
        document.getElementById("favorite-bt").innerHTML = "favorite";
    } else {
        document.getElementById("favorite-bt").innerHTML = "favorite_border";
    }
}

// add or remove channels from favorites
function add_to_fav() {
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
}

function sendMessage() {
    var current = new Date();
    // pega a mensagem escrita
    var messageText = document.getElementById("message-input").value;
    console.log("Message: " + messageText);
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
        current.getHours() +
        ":" +
        current.getMinutes() +
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
}

// auto scroll page
function bottom() {
    console.log("Bottom");
    document.getElementById("bottom").scrollIntoView();
}

