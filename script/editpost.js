const API_BASE_URL = 'https://nf-api.onrender.com';
const queryString  = document.location.search;

const params = new URLSearchParams(queryString);
const id = params.get('id');

editUrl = `${API_BASE_URL}/api/v1/social/posts/${id}`
const outEdit = document.getElementById("edit")

async function getWhitToken(url) {
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
        filterList = json
        ListPosts(json);

    } catch(error) {
        console.log(error);
    }
}

const ListPosts = (post) => {
    outEdit.innerHTML = ""
        let newDiv = ` 
        <div class="form-group col-sm-10 col-lg-8 mx-auto mb-5">
            <label for="innlegg"></label>
            <input type="text" id="title" value="${post.title}" class="form-control mb-4 border border-primary">
            <textarea value="${post.body}" class="form-control mb-4 border border-primary" id="inlegg" style="resize: none;" rows="5">${post.body}</textarea>
        </div>
        `;
        outEdit.innerHTML += newDiv;
    }



getWhitToken(editUrl);




async function editPost(url) {
    const titleEdit = document.getElementById('title').value;
    const bodyEdit = document.getElementById('inlegg').value;
    const userToEdit = {
        title: titleEdit,
        body: bodyEdit,
    }    
    try {
        const token = localStorage.getItem('accessToken');
        const editData = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,

            },
            body: JSON.stringify(userToEdit),
        };
        const response = await fetch(url, editData)
        const json = await response.json();
        window.location = "index.html"

    } catch(error) {
        console.log(error);
    }
}

const btnEdit = document.getElementById("editBtn")

btnEdit.addEventListener('click', postFunction)

function postFunction(event) {
    event.preventDefault();
    editPost(editUrl);
}
