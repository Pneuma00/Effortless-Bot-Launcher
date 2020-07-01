document.getElementById('textInput').value = localStorage.text || '';

document.getElementById('saveButton').addEventListener('click', () => {
    localStorage.text = document.getElementById('textInput').value;
});