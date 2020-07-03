const client = new Discord.Client();

client.replyList = {
    data: [],

    add: replyContainer => {
        const children = replyContainer.children;
        client.replyList.data.push({
            query: children[0],
            content: children[2]
        });
    },

    search: text => {
        const res = [];
        for (let reply of client.replyList.data) {
            const query = reply.query.value;
            const content = reply.content.value;
            if (text === query) res.push(content);
        }
        return res;
    }
}

client.blacklist = [];

client.on('ready', () => {
    console.log(`Ready! Logged in as ${client.user.tag}!`);
    document.getElementById('inviteLinkOutput').value = `https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot`;
});

client.on('message', message => {
    if (message.system) return;
    if (message.author.bot) return;

    // Reply check
    const replySearchRes = client.replyList.search(message.content)
    if (replySearchRes.length) {
        document.getElementById('logTextarea').value += message.author.tag + ': ' + message.content + '\n';
        message.channel.send(replySearchRes[0]);
    }
    
    // Prefix check
    if (!message.content.startsWith(document.getElementById('prefixInput').value)) return;

    // Logging
    document.getElementById('logTextarea').value += message.author.tag + ': ' + message.content + '\n';

    // Blacklist check
    if (client.blacklist.includes(message.author.id)) message.reply(`You're banned from using this bot!`);

    // TODO: Command check
});

// General
document.getElementById('tokenInput').value = localStorage.text || '';

document.getElementById('loginButton').addEventListener('click', () => {
    localStorage.text = document.getElementById('tokenInput').value;

    client.login(localStorage.text);
});

document.getElementById('inviteLinkCopyButton').addEventListener('click', () => {
    const copyText = document.getElementById('inviteLinkOutput');
    copyText.select();
    document.execCommand('Copy');
});

// Reply
document.getElementById('replyAddButton').addEventListener('click', () => {
    const replyContainer = document.createElement('div');
    replyContainer.innerHTML = `
<input class="replyQuery" type="text"><br>
<input class="replyContent" type="text">`

    client.replyList.add(replyContainer);

    document.getElementById('replyListContainer').appendChild(replyContainer);
    document.getElementById('replyListContainer').appendChild(document.createElement('hr'));
});

// Blacklist
document.getElementById('banIdSubmitButton').addEventListener('click', () => {
    client.blacklist.push(document.getElementById('banIdInput').value);
});
