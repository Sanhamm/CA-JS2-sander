const API_BASE_URL = 'https://nf-api.onrender.com';

const usernameRegister = document.getElementById('mailRegister')
const nameRegister = document.getElementById('nameRegister')
const passwordRegister = document.getElementById('passwordRegister')
const loginBtnRegister = document.getElementById("knappenRegister")

const usernameR = usernameRegister.value.trim();
const passwordR = passwordRegister.value.trim();
const nameR = nameRegister.value.trim()

const registerURL = `${API_BASE_URL}/api/v1/social/auth/register`;

async function registerNewUser(url, data) {
    try {
        const options = {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify(data),
        };
        const response = await fetch(url, options);
        const answer = await response.json();
        console.log(response.ok);
        console.log(answer.statusCode);
        if (response.ok == true) {
            window.location = "../login.html"
        }
        if (answer.statusCode == 400) {
            usernameMsg.innerHTML = "Something went wrong, try again"
        }
    } catch(error) {
        console.warn(error);
    }
}

function registerBtn(regi) {
    regi.preventDefault();
    const usernameR = usernameRegister.value.trim();
    const passwordR = passwordRegister.value.trim();
    const nameR = nameRegister.value.trim()
}

const usernameMsg = document.getElementById("usernameMsg")
const mailMsg = document.getElementById("mailMsg")
const passwordMsg = document.getElementById("passwordMsg")


function validateForm(val) {
    val.preventDefault();

    const usernameR = usernameRegister.value.trim();
    const passwordR = passwordRegister.value.trim();
    const nameR = nameRegister.value.trim()

    let userVal = false;
    let mailVal = false;
    let passwordVal = false;

    const registerUser = {
        name: nameR,
        email: usernameR,
        password: passwordR,
    }

    if (nameR.length > 2) {
        usernameMsg.innerHTML = "";
        userVal = true;
    } else {
        usernameMsg.innerHTML = "Your name must be atleast 2 characters long"
    }

    if (usernameR.includes("@stud.noroff.no") || usernameR.includes("@noroff.no")) {
        mailMsg.innerHTML = "";
        mailVal = true;
    } else {
        mailMsg.innerHTML = "Email is not valid"
    }

    if (passwordR.length < 8) {
        passwordMsg.innerHTML = "You need atleast 8 characters"
    } else {
        passwordMsg.innerHTML = "";
        passwordVal = true;
    }

    if (userVal === true && mailVal === true && passwordVal === true) {
        registerNewUser(registerURL, registerUser);
    } 
}

loginBtnRegister.addEventListener('click', validateForm)
