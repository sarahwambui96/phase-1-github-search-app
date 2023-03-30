document.addEventListener('DOMContentLoaded', () =>{
    const form = document.querySelector('#github-form')
    form.addEventListener('submit', searchUser)
})

//fetch user details using given url
function searchUser(e){
    e.preventDefault()
    const search = document.querySelector('#search').value 
    const userName = search.split(' ').join('')
    fetch(`https://api.github.com/search/users?q=${userName}`)
    .then(resp => resp.json())
    .then(users => {
        renderDetails(users.items)
    })
}

//render details for each user
function renderDetails(users){
    users.forEach(user => {
        createUserElement(user)
    })
}

//create element for details and interpolate them
function createUserElement(user){
    const userElement = document.createElement('div')
    document.body.append(userElement)
    userElement.innerHTML = `<h3>${user.login}</h3>`
                          + `<img src="${user.avatar_url}">` 
                          + `<a href="${user.html_url}" target="_blank">View Profile</a>`
                          + `<button id="button">Click ${user.login} Repos</button>`
    userElement.querySelector('#button').addEventListener('click', ()=>{
        fetchRepos(user)
    })
}
//fetch details using given url
function fetchRepos(userName){
    fetch(`https://api.github.com/users/${userName.login}/repos`)
    .then(resp => resp.json())
    .then(repos =>{
        renderRepos(repos)
    })
}

//render repo details
function renderRepos(repos){
    repos.forEach(repo =>{
        createRepoElement(repo)
    })
}

//create an element and child elements and 
function createRepoElement(repo){

    const reposList = document.createElement('ul')
    document.body.appendChild(reposList)
                            
    const reposName = document.createElement('li')
    console.log(reposName)
    reposName.textContent = repo.name
    reposList.appendChild(reposName)
                        

}