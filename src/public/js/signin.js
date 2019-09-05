//console.log('hi from signin.js')

let token = ''

document.querySelector('#sign-in-form').addEventListener('submit', (event) => {
    //event.preventDefault()
    const email = event.target.elements.email.value
    const password = event.target.elements.password.value

    const body = {email, password}

    // sign in with email and password
    postFromPromise(endpoints.usersLogin, body)
    .then((response)=>{
        token = JSON.parse(response).token
        // save token given to local storage
        localStorage.setItem('token', JSON.stringify(token))
        // location.assign('/users/me')
    })
    .catch((e)=> console.log(e))
})

// change profile details
// can't get this to work. I want to have the user login, then click the change details button
// and it sends you on to the changedetails page with a pre-filled form of user details
// user changes their details and clicks save which sends a patch to users/me
// document.querySelector('#change-details').addEventListener('click', () => {
//     // location.assign(endpoints.ChangeDetails)
//     const token = JSON.parse(localStorage.getItem('token'))
//     getFromPromisewithToken(endpoints.ChangeDetails, token)
//     .then((response)=> {
//         console.log(response)
//         //location.assign(response)
//     })
//     .catch((e)=>console.log(e))
// })

// document.querySelector('#view-details').addEventListener('click', () => {
//     const token = JSON.parse(localStorage.getItem('token'))
//     getFromPromisewithToken(endpoints.usersMe, token)
//     .then((response) => {
//         console.log(response)
//     }).catch((e)=>{
//         console.log(e)
//     })
// })

// ADD A BUTTON TO INDEX.HBS (SIGNIN PAGE) WHICH WHEN CLICKED MAKES A GET REQUEST TO /USERS/ME
// RETRIEVING THE TOKEN FROM LOCALSTORAGE
// THEN CONSOLE LOG THE RESPONSE. THAT ROUTE IS BEHIND AUTH SO SHOULDN'T WORK WITHOUT THE TOKEN

// document.querySelector('#logout').addEventListener('click', () => {
//     const token = JSON.parse(localStorage.getItem('token'))
//     getFromPromisewithToken(endpoints.usersLogout, token)
//     .then((response) => {
//         console.log(response)
//         localStorage.clear()
//     }).catch((e)=>{
//         console.log(e)
//     })
// })


// FINISH THIS UP
// document.querySelector('#delete-account').addEventListener('click', async () => {
//     const token = JSON.parse(localStorage.getItem('token'))
//     // get user id
//     const userRaw = await getFromPromisewithToken(endpoints.usersMe, token)
//     const user = JSON.parse(userRaw)

//     await deleteFromPromiseWithToken(endpoints.users, token).then((res) => {
//         console.log(res)
//     }).catch((e) =>{
//         console.log(e)
//     })
// })