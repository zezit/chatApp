// object that has all useful info about the app channels
const channels = {
    id: "",
    name: "",
    favorite: false, // True when is favorite and false when its not
};

// create every channel object
const ch1 = Object.create(channels);
const ch2 = Object.create(channels);
const ch3 = Object.create(channels);
const ch4 = Object.create(channels);

/* Variables */
let selectedChannel = "ch1";

/* Functions */
// executes when the app is loaded
function app_alive() {
    console.log("App is alive!");
    get_channels_info();
}

// get all channels info
function get_channels_info() {
    // get all channels exist
    elements = document.querySelectorAll(".channel-list li span");
    // for every chanel
    for (var i = 0; i < elements.length; i++) {
        switch (i) {
            case 0:
                ch1.id = elements[i].id;
                ch1.name = elements[i].textContent;
                ch1.favorite = false;
                break;
            case 1:
                ch2.id = elements[i].id;
                ch2.name = elements[i].textContent;
                ch2.favorite = true;
                break;
            case 2:
                ch3.id = elements[i].id;
                ch3.name = elements[i].textContent;
                ch3.favorite = false;
                break;
            case 3:
                ch4.id = elements[i].id;
                ch4.name = elements[i].textContent;
                ch4.favorite = false;
                break;

            default:
                break;
        }
    }
}

function get_selected() {
    if (selectedChannel == "ch1") return ch1;
    else if (selectedChannel == "ch2") return ch2;
    else if (selectedChannel == "ch3") return ch3;
    else if (selectedChannel == "ch4") return ch4;
}

function switchChannel(channel) {
    console.log("Selected channel: " + channel.name);

    // remove o último selecionado
    document.getElementsByClassName("selected")[0].classList.remove("selected");

    selectedChannel = channel.id;

    // hightlight no canal clicado
    document
        .getElementById(selectedChannel)
        .parentElement.classList.add("selected");

    // pega o titulo na tela das mensagens e substitui pelo cannal selecionado
    showHeader(channel);

    // Verifica se o canal está favorito
    isFavorite(channel);
    // console.log(get_selected());
}

function showHeader(channel) {
    document.getElementById("channelName").innerHTML = channel.name;
}

function isFavorite(channel) {
    if (channel.favorite) {
        document.getElementById("favorite-bt").innerHTML = "favorite";
    } else {
        document.getElementById("favorite-bt").innerHTML = "favorite_border";
    }
}

function add_to_fav(channel) {
    if (channel.favorite == false) {
        console.log("Adding " + channel.name + "to favorites");
        channel.favorite = true;
        document.getElementById("favorite-bt").innerHTML = "favorite";
    } else {
        console.log("Removing " + channel.name + "to favorites");
        channel.favorite = false;
        document.getElementById("favorite-bt").innerHTML = "favorite_border";
    }
    // console.log(document.getElementById(channel));
    isFavorite(channel);
}
