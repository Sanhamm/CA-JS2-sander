const API_BASE_URL = 'https://nf-api.onrender.com';
const queryString  = document.location.search;

const params = new URLSearchParams(queryString);
const id = params.get('id');

editUrl = `${API_BASE_URL}/api/v1/social/posts/${id}`

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
