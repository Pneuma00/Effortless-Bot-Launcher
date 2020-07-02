document.getElementById('tokenInput').value = localStorage.text || '';

const client = new Discord.Client();

document.getElementById('loginButton').addEventListener('click', () => {
    localStorage.text = document.getElementById('tokenInput').value;

    client.login(localStorage.text);
});

client.on('ready', () => {
    console.log(`Ready! Logged in as ${client.user.tag}!`);
});