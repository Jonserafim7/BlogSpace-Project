const blogForm = document.getElementById("blog-form")
let postsArr = []

function getBlogHTML(array) {
    let postsHTML = ""

    array.map(function(post){
        postsHTML += `
        <h3>${post.title}</h3>
        <p>${post.body}</p>
        <hr />
        `
    }).join("")

    document.getElementById("posts").innerHTML = postsHTML
}

fetch("https://apis.scrimba.com/jsonplaceholder/posts")
    .then(request => request.json())
    .then(data => {
        postsArr = data.slice(0,5)
        
        getBlogHTML(postsArr)
})

blogForm.addEventListener("submit",function(e){
    e.preventDefault()
   
    const blogFormData = new FormData(blogForm)

    const blogTitle = blogFormData.get("blog-title")
    
    const blogBody = blogFormData.get("blog-body")

    const blogObj = {
        title: blogTitle,
        body:blogBody
    }

    const options = {
        method:"POST",
        body: JSON.stringify(blogObj),
        headers: {"Content-Type": "application/json"} 
    }  

    fetch("https://apis.scrimba.com/jsonplaceholder/posts", options) 
        .then(res => res.json())
        .then(data => {
            postsArr.unshift(data)
            getBlogHTML(postsArr)
        })

    blogForm.reset()
})

