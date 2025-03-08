var channels = {};
var selectedChannelNum = 0;
var dropVis = false;

// Add Channel Tab
function addChannel() {
    try {
        const currentTimeInMilliseconds = Date.now();
        selectedChannelNum = currentTimeInMilliseconds;
        let channel = document.createElement("div");
        channel.id = "Channel" + selectedChannelNum;
        channel.className = "Channel";

        let del = document.createElement("label");
        let div1 = document.createElement("div");
        let text = document.createElement("label");
        let drop = document.createElement("label");
        let normal = document.createElement("div");
        let mutant = document.createElement("div");
        let time = document.createElement("label");
        let move = document.createElement("label");

        del.id = "Delete" + selectedChannelNum;
        del.className = "Delete";
        del.textContent = "x";

        text.id = "Text" + selectedChannelNum;
        text.textContent = "Channel";

        drop.textContent = "▾";
        drop.id = "Drop" + selectedChannelNum;
        drop.className = "Drop";
        drop.setAttribute("onclick", `dropDown("${text.id}")`);

        normal.className = "Button";
        normal.textContent = "Normal";

        mutant.className = "Button";
        mutant.textContent = "Mutant";

        time.textContent = "0:00";

        move.className = "Move";
        move.textContent = "≡";

        div1.appendChild(text);
        div1.appendChild(drop);
        channel.appendChild(del);
        channel.appendChild(div1);
        channel.appendChild(normal);
        channel.appendChild(mutant);
        channel.appendChild(time);
        channel.appendChild(move);

        getElement("Channel-Grid").appendChild(channel);
        dropVis = false;
        dropDown(text.id);
        del.setAttribute("onclick", `deleteChannel("Channel${selectedChannelNum}")`);
    } catch (e) {
        console.log(e);
    }
}

// View/Hide Drop Down menu for channel number select
function dropDown(textId) {
    let drop = getElement("DropDown");
    selectedChannelNum = getElement(textId).parentElement.parentElement.id.substring(7);
    var rect = getElement(textId).getBoundingClientRect();
    if (dropVis) {
        if (drop.style.top != rect.bottom + 10 + "px") {
            drop.style.top = rect.bottom + 10 + "px";
        } else {
            hideDrop();
        }
    } else if (!dropVis) {
        dropVis = true;
        drop.style.top = rect.bottom + 10 + "px";
        drop.style.left = rect.left - 45 + "px";

        var children = drop.children;
        for (let index = 0; index < children.length; index++) {
            var child = children[index];
            if (channels["Channel" + (index + 1)]) child.className = "DropChoiceTaken";
        }

        drop.style.visibility = "visible";
    }
}

// Selecting channel number
function dropSelect(num) {
    // Channel
    getElement("Channel" + selectedChannelNum).id = "Channel" + num;
    // Delete
    getElement("Delete" + selectedChannelNum).id = "Delete" + num;
    getElement("Delete" + num).setAttribute("onclick", `deleteChannel("Channel${num}")`);
    // Text
    getElement("Text" + selectedChannelNum).id = "Text" + num;
    getElement("Text" + num).textContent = "Channel " + num;
    // Drop
    getElement("Drop" + selectedChannelNum).id = "Drop" + num;
    getElement("Drop" + num).setAttribute("onclick", `dropDown("Text${num}")`);
    hideDrop();
    clearDropNum(selectedChannelNum);
    channels["Channel" + num] = true;
    selectedChannelNum = num;
}

// Remove Channel Tab
function deleteChannel(channelId) {
    console.log(channelId);
    getElement("Channel-Grid").removeChild(getElement(channelId));
    hideDrop();
    clearDropNum(channelId.substring(7));
}

// Hides Drop Down menu for channel
function hideDrop() {
    dropVis = false;
    getElement("DropDown").style.visibility = "hidden";
}

// Clears selection for channel number
function clearDropNum(num) {
    if (num < 31) {
        channels["Channel" + num] = false;
        getElement("p" + num).className = "DropChoice";
    }
}

// Sort channels by Time Remaining OR Channel Number
function sort() {}

// Shorter get elementbyid... but still kinda long idk why I did this
function getElement(id) {
    return document.getElementById(id);
}

// Create Drop Down menu on load and add event listeners for adding channel and drop down selections
window.onload = function () {
    getElement("Add").setAttribute("onclick", "addChannel()");

    var dropDiv = document.createElement("div");
    dropDiv.id = "DropDown";
    for (let index = 1; index < 31; index++) {
        let p = document.createElement("p");
        p.textContent = index;
        p.id = "p" + index;
        p.className = "DropChoice";
        p.setAttribute("onclick", `dropSelect(${index})`);
        dropDiv.appendChild(p);
    }
    document.body.appendChild(dropDiv);
};
