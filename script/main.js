const API_BASE_URL = 'https://nf-api.onrender.com';
const outPost = document.getElementById("outPost")

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

const postsUrl = `${API_BASE_URL}/api/v1/social/posts/?_author=true`;

const ListPosts = (post) => {
    outPost.innerHTML = ""
    for(let inn of post){
        const deleteBtn = `<button class="btn btn-outline-primary my-2 btn-sm my-sm-0  deleteBtn"  data-delete="${inn.id}">Delete</button>`
        const editBtn = `<button class="btn btn-outline-primary my-2 btn-sm my-sm-0 editBtn"  data-edit="${inn.id}"><a href="edit-post.html?id=${inn.id}"text-underline-none">Edit</a></button>`

        let newDiv = `
        <div class="card col-sm-10 col-lg-10 mx-auto mb-5 border-primary">
            <div class="card-body">
                <h2 class="card-title mt-2"><a href="./detailPosts.html?id=${inn.id}">${inn.title}</a></h2>
                <img class = "img-fluid" src="${inn.media}">
                <p class="card-text mt-4 mb-3">${inn.body}</p>
                <a href="" class="text-black text-decoration-none"><em>@${inn.author.name}</em></a>
                ${
                    localStorage.getItem("username") === inn.author.email ? deleteBtn : ""
                }
                ${
                    localStorage.getItem("username") === inn.author.email ? editBtn : "" 
                }
            </div>
        
        `;
        outPost.innerHTML += newDiv;
        //console.log("HEI");
    }

    const buttonDelete = document.querySelectorAll("button.deleteBtn")

    for (let btnDelete of buttonDelete) {
        btnDelete.addEventListener("click", () => {
        if (confirm("you want to delete this post?")) {
            deletePosts(btnDelete.getAttribute("data-delete"));
            }
    });
    }
}

async function deletePosts(id) {
    const url = `${API_BASE_URL}/api/v1/social/posts/${id}`
    try {
        const token = localStorage.getItem("accessToken")
        const deleteData = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        };
        const response = await fetch(url, deleteData);
        const json = await response.json()
        if (response.status === 200) window.location = "../index.html";

    } catch(error) {
        console.log(error);
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
    submittPost(postsUrl);
}

const search = document.getElementById("searchFilter")
search.addEventListener("keyup", filterFunction)

function filterFunction () {
    const filterQuery = search.value.toLowerCase();

    const filtering = filterList.filter((json) => {
        const user = json.author.name;
        const title = json.title
        const body = json.body

        if(user.indexOf(filterQuery) > -1) return true;
        if(title.indexOf(filterQuery) > -1) return true;
        if(body.indexOf(filterQuery) > -1) return true;
        return false;
    })
        ListPosts(filtering)
    }




