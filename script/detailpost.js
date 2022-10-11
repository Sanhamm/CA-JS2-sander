const queryString  = document.location.search;

const params = new URLSearchParams(queryString);
const id = params.get('id');
const API_BASE_URL = 'https://nf-api.onrender.com';

async function detailPosts(url) {
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

const detailUrl = `${API_BASE_URL}/api/v1/social/posts/${id}`;
const outPost = document.getElementById('detailPost')

const ListPosts = (post) => {
    console.log(post);
    document.title = post.title
    console.log(post.title);

    outPost.innerHTML = ""
        console.log(post.id);
        let newDiv = `
        <div class="card col-sm-10 col-lg-10 mx-auto mb-5 border-primary">
            <div class="card-body">
                <h2 class="card-title mt-2">${post.title}</h2>
                <img class = "img-fluid" src="${post.media}">
                <p class="card-text mt-4 mb-3">${post.body}</p>
                <button class="btn btn-outline-white my-2 btn-sm my-sm-0 btn-primary" id="deleteBtn" type="button">Delete</button>
            </div>
        </div>
        `;
        outPost.innerHTML += newDiv;
}
detailPosts(detailUrl);


