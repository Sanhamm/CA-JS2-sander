const API_BASE_URL = 'https://nf-api.onrender.com';

const usernameInput = document.getElementById('mailInput')
const passwordInput = document.getElementById('passwordInput')
const loginBtn = document.getElementById("knappen")

const username = usernameInput.value.trim();
const password = passwordInput.value.trim();
console.log(username, password);


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
        console.log(json);
        console.log(username, password);
        const accessToken = json.accessToken;
        localStorage.setItem('accessToken', accessToken)
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

    } catch(error) {
        console.log(error);
    }
}

const userToLogin = {
    email: username,
    password: password
}

const loginUrl = `${API_BASE_URL}/api/v1/social/auth/login`

//loginBtn.addEventListener("click", loginUser(loginUrl, userToLogin), console.log("username, password"));
//loginUser(loginUrl, userToLogin);

loginBtn.addEventListener('click', doStuff);
function doStuff(event) {
event.preventDefault();
//const username = usernameInput.value.trim();
//const password = passwordInput.value.trim();
console.log(username, password);
loginUser(loginUrl, userToLogin);
getWhitToken(postsUrl);
}
console.log(userToLogin);

const outPost = document.getElementById("outPost")

async function getWhitToken(url) {
    try {
        //console.log(url);
        const token = localStorage.getItem('accessToken');
        //console.log(token);
        const fetchData = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        };
        const response = await fetch(url, fetchData)
        //console.log(response);
        const json = await response.json()
        //console.log(json);
        ListPosts(json);

    } catch(error) {
        console.log(error);
    }
}


const postsUrl = `${API_BASE_URL}/api/v1/social/posts`;

//getWhitToken(postsUrl);

const ListPosts = (post) => {
    console.log(post);
    for(let inn of post){
        //console.log(inn.title);
        let newDiv = `
        <div class"card col-sm-10 col-lg-8 mx-auto mb-5 border-primary">
            <div class"card-body">
                <h2 class="card-title mt-2">${inn.title}</h2>
                <p class="card-text mt-4 mb-3">${inn.body}</p>
            </div>
        </div>
        `;
        outPost.innerHTML += newDiv;
    
    }
}

