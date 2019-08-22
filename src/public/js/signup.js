document.querySelector('#sign-up-form').addEventListener('submit', (e) => {
    e.preventDefault()
    const name = e.target.elements.name.value
    const email = e.target.elements.email.value
    const password = e.target.elements.password.value

    const user = {
        name, email, password
    }
    
    postFromPromise(endpoints.users, user)
    .then((response)=> {
        location.assign('/createtask') // if successful forward to tasks area
    })
    .catch((e)=>console.log(e)) // if unsuccessful log the error to client console

})