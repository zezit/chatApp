export { channel1, channel2, channel3, channel4, mockMessages };

// array that stores channels informations
const mockChannels = [
    { id: "" },
    { name: "" },
    { favorite: false },
    { messages: [] },
    { latestMessage: "" },
];

// array that stores messages informations
const mockMessages = [
    { createdBy: "" },
    { createdOn: new Date("") },
    { channel: "" },
    { own: false },
    { text: "" },
];

const Channel1Message1 = Object.create(mockMessages);
const Channel1Message2 = Object.create(mockMessages);

// Previous channels
const channel1 = Object.create(mockChannels);
channel1.id = "ch1";
channel1.name = "Friends";
channel1.favorite = true;
channel1.messages = [];
channel1.latestMessage = new Date;

const channel2 = Object.create(mockChannels);
channel2.id = "ch2";
channel2.name = "College";
channel2.favorite = false;
channel2.messages = [];
channel2.messages.push(Channel1Message1);
channel2.messages.push(Channel1Message2);
channel2.latestMessage = new Date;

const channel3 = Object.create(mockChannels);
channel3.id = "ch3";
channel3.name = "Work";
channel3.favorite = false;
channel3.messages = [];
channel3.latestMessage = new Date;

const channel4 = Object.create(mockChannels);
channel4.id = "ch4";
channel4.name = "Gym";
channel4.favorite = false;
channel4.messages = [];
channel4.latestMessage = new Date;

// Previous messages
Channel1Message1.createdBy = "Peter Pan";
Channel1Message1.createdOn = new Date('May 25, 2022 19:11:00');
Channel1Message1.channel = "College";
Channel1Message1.own = false;
Channel1Message1.text =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras massa diam, eleifend ut rutrum sit amet, dictum eu nulla. Integer porta et mauris et tristique.";

Channel1Message2.createdBy = "José Victor";
Channel1Message2.createdOn = new Date('May 25, 2022 19:13:00');
Channel1Message2.channel = "College";
Channel1Message2.own = true;
Channel1Message2.text =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin lacinia ante et urna mattis hendrerit. Sed ac mi fermentum massa.";
