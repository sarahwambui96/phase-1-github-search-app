function searchUser(){
    const form = document.querySelector('#github-form')
    //console.log(form)
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        const search = document.querySelector('#search').value
        //console.log(search)

        const userName = search.split(' ').join('')
        //console.log(userName)
        fetch('https://api.github.com/search/users?q='+userName)
        .then(resp => resp.json())
        .then(searchResult => {
            //console.log(searchResult)
            let array = searchResult.items
            //console.log(array)
            const p = document.createElement('p')
            p.textContent = 'CLICK on the image to see repositories!'
            document.body.append(p)
            const userElement = document.createElement('div')
            document.body.append(userElement)
            //console.log(userElement)
    
            for (let i = 0; i < array.length; i++){
                let user = array[i];
                //console.log(i)
                
                
                const username = document.createElement('h3')
                username.textContent = user.login
                userElement.appendChild(username)

                const avatar = document.createElement('img')
                avatar.src = user.avatar_url
                userElement.appendChild(avatar)

                const profileLink = document.createElement('a')
                profileLink.textContent = 'View Profile'
                profileLink.href = user.html_url
                userElement.appendChild(profileLink)

                avatar.addEventListener('click', () =>{
                    fetch(`https://api.github.com/users/${userName}/repos`)
                    .then(resp => resp.json())
                    .then(repos =>{
                        //console.log(repos)

                        
                        repos.forEach(repo =>{
                            let repoData = repo
                            //console.log(repoData)

                            const reposList = document.createElement('ul')
                            document.body.appendChild(reposList)
                            //console.log(reposList)

                            const reposName = document.createElement('li')
                            console.log(reposName)
                            reposName.textContent = repoData.name
                            reposList.appendChild(reposName)
                        })

                    })
                })

            }
            
        })
    })

    

   
}
 



document.addEventListener('DOMContentLoaded', searchUser)

