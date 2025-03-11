import { URI } from "./uri.js";
var chanObjs = {};
var selectedChannelNum = 0;
var dropVis = false;
var soundOn = true;
var animationOn = true;
var styleOn = true;

class Channel {
    constructor(id) {
        this._id = id;
        this.timerInterval = setInterval(function () {}, 1000);
        this.time = 0;
        // Create elements
        this.channel = document.createElement("div");
        this.delX = document.createElement("label");
        this.chanText = document.createElement("label");
        this.normalBut = document.createElement("div");
        this.mutantSpawnBut = document.createElement("div");
        this.mutantBut = document.createElement("div");
        this.timer = document.createElement("label");
        this.moveBut = document.createElement("label");
    }

    // Function to create elements for a channel
    createChannel() {
        // Set ids
        this.setIds(this._id);

        // Set class names
        this.channel.className = "Channel";
        this.delX.className = "Delete";
        this.chanText.className = "ChanText";
        this.normalBut.className = "Button";
        this.mutantSpawnBut.className = "Button";
        this.mutantBut.className = "Button";
        this.timer.className = "Timer";
        this.moveBut.className = "Move";

        // Set texts
        this.delX.textContent = "X";
        this.chanText.textContent = "▾ Channel";
        this.normalBut.textContent = "Normal";
        this.mutantSpawnBut.textContent = "Lightning";
        this.mutantBut.textContent = "Mutant";
        this.timer.textContent = "0:00";
        this.moveBut.textContent = "≡";

        // Add children to channel
        this.channel.appendChild(this.delX);
        this.channel.appendChild(this.chanText);
        this.channel.appendChild(this.normalBut);
        this.channel.appendChild(this.mutantSpawnBut);
        this.channel.appendChild(this.mutantBut);
        this.channel.appendChild(this.timer);
        // this.channel.appendChild(this.moveBut);
        getElement("Channel-Grid").appendChild(this.channel);

        // Add event listeners
        this.delX.addEventListener("click", () => {
            deleteChannel(this._id, this.channel);
        });
        this.chanText.addEventListener("click", () => {
            dropDown(this);
        });
        this.normalBut.addEventListener("click", () => {
            this.time = 300;
            setTimer(this);
        });
        this.mutantSpawnBut.addEventListener("click", () => {
            this.time = 120;
            setTimer(this);
            this.channel.className = "ChannelLightning";
        });
        this.mutantBut.addEventListener("click", () => {
            this.time = 480;
            setTimer(this);
        });

        dropDown(this); // Open drop down for channel select when creating new channel
    }

    setIds(id) {
        this._id = id;
        this.channel.id = "Channel" + id;
        this.delX.id = "Delete" + id;
        this.chanText.id = "Text" + id;
        this.timer.id = "Timer" + id;
        this.moveBut.id = "Move" + id;
    }
}
// Add Channel Tab
function addChannel() {
    try {
        var chan = new Channel(Date.now()); // Current time in ms)
        chan.createChannel();
        chanObjs[chan._id] = chan;
    } catch (e) {
        console.log(e);
    }
}

// View/Hide Drop Down menu for channel number select
function dropDown(channel) {
    let drop = getElement("DropDown");
    selectedChannelNum = channel._id;
    var rect = channel.channel.getBoundingClientRect();
    if (dropVis) {
        let dropTopNum = drop.style.top.substring(0, drop.style.top.length - 2);
        if (Math.trunc(dropTopNum) != Math.trunc(rect.bottom)) {
            drop.style.top = rect.bottom + "px";
        } else {
            hideDrop();
        }
    } else if (!dropVis) {
        dropVis = true;
        drop.style.top = rect.bottom + "px";
        drop.style.left = rect.left + "px";

        var children = drop.children;
        for (let index = 0; index < children.length; index++) {
            var child = children[index];
            if (chanObjs[index + 1]) child.className = "DropChoiceTaken";
        }

        drop.style.visibility = "visible";
    }
}

// Selecting channel number
function dropSelect(num) {
    if (!chanObjs[num]) {
        chanObjs[selectedChannelNum].setIds(num);
        chanObjs[num] = chanObjs[selectedChannelNum];
        delete chanObjs[selectedChannelNum];
        chanObjs[num].chanText.textContent = "▾ Channel " + num;
        hideDrop();
        clearDropNum(selectedChannelNum);
    }
}

// Remove Channel Tab
function deleteChannel(channelNum, channel) {
    getElement("Channel-Grid").removeChild(channel);
    hideDrop();
    delete chanObjs[channelNum];
    clearDropNum(channelNum);
}

// Hides Drop Down menu for channel
function hideDrop() {
    dropVis = false;
    getElement("DropDown").style.visibility = "hidden";
}

// Clears selection for channel number
function clearDropNum(num) {
    if (num < 31) {
        getElement("p" + num).className = "DropChoice";
    }
}

function setTimer(channel) {
    channel.channel.className = "Channel";
    clearInterval(channel.timerInterval);
    var negMin = "";
    var minutes = (minutes = Math.trunc(channel.time / 60));
    var seconds = 0;
    var secondsText = "00"; // initial seconds text
    channel.timer.textContent = `${minutes}:${secondsText}`;
    channel.timerInterval = setInterval(() => {
        channel.time--;
        minutes = Math.trunc(channel.time / 60);
        seconds = channel.time - minutes * 60;
        secondsText = ""; // clear seconds text
        if (seconds < 10 && seconds > -10) {
            secondsText += "0"; // add leading 0 if single digit
        }
        secondsText += Math.abs(seconds);
        if (seconds == -1) negMin = "-";
        else if (seconds == -60) negMin = "";
        channel.timer.textContent = `${negMin}${minutes}:${secondsText}`;
        // Stop timer once it hits 0
        if (channel.time == 0) {
            // clearInterval(channel.timerInterval);
            if (soundOn) ping();
            channel.channel.className = "ChannelReady";
        }
    }, 1000);
}

// Sort channels by Time Remaining OR Channel Number
function sortByChannelNum() {
    hideDrop();
    for (let [num, chan] of Object.entries(chanObjs)) {
        chan.channel.style.order = chan._id + 1;
    }
}

function sortByTime() {
    hideDrop();
    let times = [];
    for (let [num, chan] of Object.entries(chanObjs)) {
        let obj = { id: chan._id, time: chan.time };
        times.push(obj);
    }
    times.sort((a, b) => a.time - b.time);
    for (let index = 0; index < times.length; index++) {
        chanObjs[times[index].id].channel.style.order = index + 1;
    }
}

// Shorter get elementbyid... but still kinda long idk why I did this
function getElement(id) {
    return document.getElementById(id);
}

function ping() {
    var sound = new Audio("data:audio/wav;base64," + URI);
    sound.play();
}
function toggleSound() {
    let s = getElement("Sound");
    if (soundOn) {
        soundOn = false;
        s.textContent = "🕨 Timer Sound Off";
        s.style.color = "darkred";
    } else {
        soundOn = true;
        s.textContent = "🕪 Timer Sound On";
        s.style.color = "darkolivegreen";
        ping();
    }
}

function toggleAnimation() {
    let a = getElement("Animation");
    if (animationOn) {
        animationOn = false;
        a.textContent = "⏸Animations Off";
        a.style.color = "darkred";
        for (let [num, chan] of Object.entries(chanObjs)) {
            if (
                chan.channel.className == "ChannelReady" ||
                chan.channel.className == "ChannelLightning"
            ) {
                chan.channel.style.animationIterationCount = "0";
                console.log(chan.channel.style.iterationCount);
            }
        }
    } else {
        animationOn = true;
        a.textContent = "⏵Animations On";
        a.style.color = "darkolivegreen";
        for (let [num, chan] of Object.entries(chanObjs)) {
            if (
                chan.channel.className == "ChannelReady" ||
                chan.channel.className == "ChannelLightning"
            ) {
                chan.channel.style.animationIterationCount = "infinite";
            }
        }
    }
}

function toggleStyle() {
    let s = getElement("Style");
    if (styleOn) {
        styleOn = false;
        getElement("stylesheet").setAttribute("href", "style2.css");
        s.style.color = "darkred";
        getElement("Animation").setAttribute("hidden", "hidden");
    } else {
        styleOn = true;
        getElement("stylesheet").setAttribute("href", "style.css");
        s.style.color = "darkolivegreen";
        getElement("Animation").removeAttribute("hidden");
    }
}

// Create Drop Down menu on load and add event listeners for adding channel and drop down selections
window.onload = function () {
    getElement("Sound").addEventListener("click", () => {
        toggleSound();
    });
    getElement("Animation").addEventListener("click", () => {
        toggleAnimation();
    });
    getElement("Style").addEventListener("click", () => {
        toggleStyle();
    });
    let slider = getElement("Slider");
    slider.addEventListener("input", () => {
        var root = document.documentElement;
        root.style.setProperty("--shadowRadius", slider.value + "px");
    });
    getElement("Add").addEventListener("click", () => {
        addChannel();
    });
    getElement("SortNum").addEventListener("click", () => {
        sortByChannelNum();
    });
    getElement("SortTime").addEventListener("click", () => {
        sortByTime();
    });

    window.addEventListener("scroll", hideDrop);

    var dropDiv = document.createElement("div");
    dropDiv.id = "DropDown";
    for (let index = 1; index < 31; index++) {
        let p = document.createElement("p");
        p.textContent = index;
        p.id = "p" + index;
        p.className = "DropChoice";
        p.addEventListener("click", () => dropSelect(index));
        dropDiv.appendChild(p);
    }
    document.body.appendChild(dropDiv);
};
