const API_BASE_URL = 'https://nf-api.onrender.com';

//password:"heiheihei"
//username:"kasomskjer@stud.noroff.no"

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
        const json = await response.json()
        ListPosts(json);

    } catch(error) {
        console.log(error);
    }
}

const postsUrl = `${API_BASE_URL}/api/v1/social/posts/?_author=true`;

const ListPosts = (post) => {
    console.log(post);
    for(let inn of post){
        //console.log(inn.title);
        let newDiv = `
        <div class="card col-sm-10 col-lg-8 mx-auto mb-5 border-primary">
            <div class="card-body">
                <h2 class="card-title mt-2">${inn.title}</h2>
                <img src="${inn.media}">
                <p class="card-text mt-4 mb-3">${inn.body}</p>
                <a href="" class="text-black text-decoration-none"><em>@${inn.author.name}</em></a>
                <button class="btn btn-outline-white my-2 btn-sm my-sm-0 btn-primary" id="postBtn" type="submit">Delete</button>
            </div>
        </div>
        `;
        outPost.innerHTML += newDiv;
    
    }
}
getWhitToken(postsUrl);

const titlePost = document.getElementById('title').value;
const bodyPost = document.getElementById('inlegg').value;
const btnPost = document.getElementById('postBtn')

async function submittPost(url) {
    const titlePost = document.getElementById('title').value;
    const bodyPost = document.getElementById('inlegg').value;
    const userToPost = {
        title: titlePost,
        body: bodyPost,
    }    
    try {
        const token = localStorage.getItem('accessToken');
        const postData = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,

            },
            body: JSON.stringify(userToPost),
        };
        const response = await fetch(url, postData)
        console.log(response);
        const json = await response.json();
        document.location.reload();
        titlePost = "";
        bodyPost = "";
    

    } catch(error) {
        console.log(error);
    }
}

btnPost.addEventListener('click', postFunction)

function postFunction(event) {
    event.preventDefault();
    console.log(submittPost());
    submittPost(postsUrl);
}



