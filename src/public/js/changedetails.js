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
    }).then(() => {
        setTimeout(()=>{
            document.querySelector('#msg').textContent = 'Redirecting to home'
        }, 2000)
    }).then(() => {
        setTimeout(() => {
            location.assign('/')
        }, 3000)
    }).catch((e)=>console.log(e))
})


document.querySelector('#delete-account').addEventListener('click', async () => {
    const token = JSON.parse(localStorage.getItem('token'))
    // get user id
    localStorage.clear()
    const userRaw = await getFromPromisewithToken(endpoints.usersMe, token)
    const user = JSON.parse(userRaw)

    await deleteFromPromiseWithToken(endpoints.users, token).then((res) => {
        document.querySelector('#msg').textContent = 'Account and all tasks removed'
        document.querySelector('#msg').className = 'red'
        setTimeout(()=>{
            location.assign('/')
        }, 2000)
    }).catch((e) =>{
        console.log(e)
    })
})