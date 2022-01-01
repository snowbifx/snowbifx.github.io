var self = "";
var cpeer = "";
var blocked = [];
var cstyle = "styling_modern";

function $(id) {return document.getElementById(id);}

function peer_loop(peer, loop) {
    let id = `chattie-${self}:${peer}`;
    console.log(`Fetching ${id}`);
    fetch(`https://ppng.io/${id}`).then(res => {
        // Response returned, now get text
        res.text().then(text => {
            let talk = document.createElement('div');
            talk.innerText = text;
            talk.classList.add('chat-peer');
            talk.classList.add('message');
            $(`:${peer}`).appendChild(talk);
            peer_loop(peer, loop);
        });
    });
}

function send(peer, text) {
    fetch(`https://ppng.io/chattie-${peer}:${self}`, {
        method: 'POST',
        body: text
    });

    let talk = document.createElement('div');
    talk.innerText = text;
    talk.classList.add('chat-me');
    talk.classList.add('message');
    $(`:${peer}`).appendChild(talk);
}

function connect(peer) {
    // Validate
    if (!/^[A-Za-z0-9]{40}$/.test(peer) || blocked.includes(peer)) return;

    // <li class="text connection" onclick="alert('peer_id')">peer_id</li>
    let item = document.createElement('li');
    item.innerText = peer;
    item.setAttribute("onclick", `show_chatbox("${peer}");`);
    item.classList.add('text');
    item.classList.add('connection');
    $("connections-list").appendChild(item);

    // <div class="chatbox" id=":peer_id"></div>
    let box = document.createElement('div');
    box.id = `:${peer}`;
    box.classList.add("chatbox");
    peertext = "";
    if (peer == self) {
        peertext = `<code>${peer.substr(0, 6)}</code>...- hey wait, that's you!`;
    } else {
        peertext = `<code>${peer.substr(0, 15)}...</code>,`;
    }
    box.innerHTML = `<p class="title">You are now chatting with ${peertext} <a href="etiquette.html" target="_blank"><b>Remember the etiquette</b></a></p><hr>`;
    $("chatboxes").appendChild(box);

    // Display chatbox
    show_chatbox(peer);

    peer_loop(peer, true);

    blocked.push(peer);
}

function show_chatbox(peer) {
    for (chatbox of $("chatboxes").children) {
        if (chatbox.id == ":" + peer) {
            chatbox.style = "";
        } else {
            chatbox.style = "display: none"
        }
    }

    cpeer = peer;
}

function on_keypress(e, text) {
    if (e.keyCode == 13 && !e.shiftKey) {
        if (text.trim() != "" && cpeer != "") {
            send(cpeer, text.trim());
            $("input").value = "";
        } else if (text == "\n" || text == "\r\n") {
            $("input").value = "";
        }
    }
}

window.onload = function() {
    let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let res   = "";
    for (let i = 0; i < 40; i++) res += chars.charAt(Math.floor(Math.random() * chars.length));
    $("self-id").value = res;
    self = res;
}

function change_style() {
    if (cstyle == "styling_modern") 
        cstyle = "styling_web10";
    else cstyle = "styling_modern";
    $("style").href = "./" + cstyle + ".css";

    $("stylename").innerText = cstyle == "styling_modern" ? "web 1.0" : "modern";
}