//console.log('hi from signin.js')

document.querySelector('#sign-in-form').addEventListener('submit', (event) => {
    event.preventDefault()
    const email = event.target.elements.email.value
    const password = event.target.elements.password.value

    const body = {email, password}

    postFromPromise(endpoints.usersLogin, body)
    .then((response)=>{
        console.log(response)
        location.assign('/createtask')
    })
    .catch((e)=> console.log(e))
})