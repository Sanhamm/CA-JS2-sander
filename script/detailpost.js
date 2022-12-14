const queryString  = document.location.search;

const params = new URLSearchParams(queryString);
const id = params.get('id');
const API_BASE_URL = 'https://nf-api.onrender.com';

async function detailPosts(url) {
    try {
        const token = localStorage.getItem('accessToken');
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
    document.title = post.title

    outPost.innerHTML = ""
        let newDiv = `
        <div class="card col-sm-10 col-lg-10 mx-auto mb-5 border-primary">
            <div class="card-body">
                <h2 class="card-title mt-2">${post.title}</h2>
                <img class = "img-fluid" src="${post.media}">
                <p class="card-text mt-4 mb-3">${post.body}</p>
            </div>
        </div>
        `;
        outPost.innerHTML += newDiv;
}
detailPosts(detailUrl);


