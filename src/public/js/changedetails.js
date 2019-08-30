// pre-fill form if user logged in
const token = JSON.parse(localStorage.getItem('token'))
if (token){
    getFromPromisewithToken(endpoints.usersMe, token).then((response)=>{
        const user = JSON.parse(response)
        document.querySelector('#name').value = user.name
        document.querySelector('#email').value = user.email
        document.querySelector('#age').value = user.age
    })
} else {
    document.querySelector('#msg').textContent = 'Please Login First'
    document.querySelector('#msg').className = 'red'
}

// save updates to profile on form submission

document.querySelector('#change-details-form').addEventListener('submit', (e) => {
    e.preventDefault()
    const user = {}
    user.name = e.target.elements.name.value
    user.email = e.target.elements.email.value
    user.age = e.target.elements.age.value

    patchFromPromiseWithToken(endpoints.usersMe, user, token)
    .then(() => {
        document.querySelector('#msg').textContent = 'Updates Saved'
        document.querySelector('#msg').className = 'green'
    })
    .catch((e)=>console.log(e))
})
