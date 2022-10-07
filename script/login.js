const API_BASE_URL = 'https://nf-api.onrender.com';

const usernameInput = document.getElementById('mailInput')
const passwordInput = document.getElementById('passwordInput')
const loginBtn = document.getElementById("knappen")

const username = usernameInput.value.trim();
const password = passwordInput.value.trim();

async function loginUser(url, userData) {
    try {
        const postData = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        };
        const response = await fetch(url, postData)
        //console.log(response);
        const json = await response.json();
        const accessToken = json.accessToken;
        localStorage.setItem('accessToken', accessToken);
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();
        localStorage.setItem('username', username);

    } catch(error) {
        console.log(error);
    }
}

const loginUrl = `${API_BASE_URL}/api/v1/social/auth/login`

loginBtn.addEventListener('click', doStuff);
function doStuff(event) {
event.preventDefault();
const username = usernameInput.value.trim();
const password = passwordInput.value.trim();
const userToLogin = {
    email: username,
    password: password,
}
loginUser(loginUrl, userToLogin);
}