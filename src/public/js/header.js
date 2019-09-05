document.querySelector('#logout').addEventListener('click', () => {
    const token = JSON.parse(localStorage.getItem('token'))
    getFromPromisewithToken(endpoints.usersLogout, token)
    .then((response) => {
        console.log(response)
        localStorage.clear()
        location.assign('/')
    }).catch((e)=>{
        console.log(e)
    })
})

document.querySelector('#logout-all').addEventListener('click', ()=>{
    const token = JSON.parse(localStorage.getItem('token'))
    getFromPromisewithToken(endpoints.usersLogoutAll, token)
    .then((response) => {
        console.log(response)
        localStorage.clear()
        location.assign('/')
    }).catch((e) => {
        console.log(e)
    })
})

// document.querySelector('#go-to-tasks').addEventListener('click', () => {
//     location.assign('/createtask')
// })