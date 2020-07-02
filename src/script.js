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
});

client.on('message', message => {
    if (message.system) return;
    if (message.author.bot) return;

    if (!message.content.startsWith(document.getElementById('prefixInput').value)) return;

    if (client.blacklist.includes(message.author.id)) message.reply(`You're banned from using this bot!`);

    console.log(message.author.tag, ': ', message.content);

    const replySearchRes = client.replyData.search(message.content)
    if (replySearchRes.length) {
        console.log('Matched!');
        message.channel.send(replySearchRes[0]);
    }
});

document.getElementById('tokenInput').value = localStorage.text || '';

document.getElementById('loginButton').addEventListener('click', () => {
    localStorage.text = document.getElementById('tokenInput').value;

    client.login(localStorage.text);
});

document.getElementById('replyAddButton').addEventListener('click', () => {
    const replyContainer = document.createElement('div');
    replyContainer.innerHTML = `
<input class="replyQuery" type="text"><br>
<input class="replyContent" type="text">`

    client.replyData.add(replyContainer);

    document.getElementById('replyListContainer').appendChild(replyContainer);
    document.getElementById('replyListContainer').appendChild(document.createElement('hr'));
});
