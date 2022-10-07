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
        console.log(answer);
    } catch(error) {
        console.warn(error);
    }
}

function registerBtn(regi) {
    regi.preventDefault();
    console.log("kjør");
    const usernameR = usernameRegister.value.trim();
    const passwordR = passwordRegister.value.trim();
    const nameR = nameRegister.value.trim()
}

loginBtnRegister.addEventListener('click', validateForm)


//---------------------------------------- auth

//usernameR
//nameR
//passwordR

const usernameMsg = document.getElementById("usernameMsg")
const mailMsg = document.getElementById("mailMsg")
const passwordMsg = document.getElementById("passwordMsg")

function validateForm(val) {
    val.preventDefault();

    const registerUser = {
        name: nameR,
        email: usernameR,
        password: passwordR,
    }

    if (nameR.length > 2) {
        usernameMsg.innerHTML = "";
        console.log(nameR);
    } else {
        usernameMsg.innerHTML = "Your name must be atleast 2 characters long"
        console.log("bad");
    }

    if (usernameR.includes("@stud.noroff.no") || usernameR.includes("@noroff.no")) {
        mailMsg.innerHTML = "";
        console.log(usernameR);
    } else {
        mailMsg.innerHTML = "Email is not valid"
        console.log("wrong");
    }

    if (passwordR.length < 8) {
        passwordMsg.innerHTML = "You need atleast 8 characters"
    } else {
        passwordMsg.innerHTML = "";
    }


    
    registerNewUser(registerURL, registerUser);

}


