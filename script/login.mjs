


export async function loginUser(url, userData) {
    try {
        const postData = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        };
        const response = await fetch(url, postData)
        console.log(response);
        const json = await response.json();
        console.log(json);
        const accessToken = json.accessToken;
        localStorage.setItem('accessToken', accessToken)
    } catch(error) {
        console.log(error);
    }
}

const userToLogin = {
    email: 'sanham22362@stud.noroff.no',
    password: 'hammersland123'
}

const loginUrl = `${API_BASE_URL}/api/v1/social/auth/login`

loginUser(loginUrl, userToLogin);