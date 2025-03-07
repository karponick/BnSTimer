let highestChannel = 0;

function addChannel() {
    console.log("click");
    highestChannel++;
    try {
        let channel = document.createElement("div");
        channel.id = highestChannel;
        channel.className = "Channel";

        let div1 = document.createElement("div");
        let num = document.createElement("label");
        let drop = document.createElement("label");
        let normal = document.createElement("div");
        let mutant = document.createElement("div");
        let time = document.createElement("label");
        let del = document.createElement("label");

        num.textContent = "Channel " + highestChannel;
        drop.textContent = "▾";
        drop.className = "Drop";
        normal.className = "Button";
        normal.textContent = "Normal";
        mutant.className = "Button";
        mutant.textContent = "Mutant";
        time.textContent = "0:00";
        del.id = "Delete" + highestChannel;
        del.className = "Delete";
        del.textContent = "X";

        div1.appendChild(num);
        div1.appendChild(drop);
        channel.appendChild(div1);
        channel.appendChild(normal);
        channel.appendChild(mutant);
        channel.appendChild(time);
        channel.appendChild(del);
        getElement("Channel-Grid").appendChild(channel);
    } catch (e) {
        console.log(e);
    }
}

function getElement(id) {
    return document.getElementById(id);
}

window.onload = function () {
    getElement("Add").addEventListener(onclick, addChannel());
};
