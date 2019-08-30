//console.log('requests.js has been called')

const endpoints = {
    users: 'http://localhost:3000/users',
    usersLogin: 'http://localhost:3000/users/login',
    usersMe: 'http://localhost:3000/users/me',
    usersLogout: 'http://localhost:3000/users/logout',
    usersLogoutAll: 'http://localhost:3000/users/logoutall',
    usersChangeDetails:'http://localhost:3000/users/changedetails',
    tasks: 'http://localhost:3000/tasks'
}

// generic request as promise (can use for GET, POST, DELETE and PATCH)
// added token argument which is added to all requests if provided
const makeRequestAsPromise = (method, url, id=undefined, body=undefined, token=undefined) => {
    return new Promise ((resolve, reject) => {
        const xhr = new XMLHttpRequest()

        if (id) {
            url = url + '/' + id
        }

        xhr.open(method, url)

        xhr.setRequestHeader('Authorization', 'Bearer ' + token)

        if(body) {
            xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8')
        }

        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status <=299){
                resolve(xhr.response)
                
                //reject(`${xhr.status} ${xhr.statusText} ${xhr.responseText}`)
            }
            
            reject(xhr.response)
            //resolve(JSON.parse(xhr.response))
        }

        xhr.send(JSON.stringify(body))
    })
}

// creating functions for get, post, delete and patch from generic. 
// Just choose your endpoint (tasks or users) and give your arguments

//GET
const getFromPromise = (endpoint) => {
    return makeRequestAsPromise('GET', endpoint)
}

// testing a GET with auth token. works.
const getFromPromisewithToken = (endpoint, token) => {
    return makeRequestAsPromise('GET', endpoint, null, null, token)
}

// so now get all tasks would be:
// getFromPromise(endpoints.tasks)

//POST
const postFromPromise = (endpoint, body) => {
    return makeRequestAsPromise('POST', endpoint, null, body)
    //await makeRequestAsPromise('POST', endpoint, null, body).then((response)=> console.log(response)).catch((e)=>console.log(e))
}

//postFromPromise(endpoints.tasks, {name:'handover money'})

//DELETE
const deleteFromPromise = (endpoint, id) =>{
    return makeRequestAsPromise('DELETE', endpoint, id)
}

//deleteFromPromise(endpoints.tasks, '5d5c2025e121b053063140b8')

//PATCH
const patchFromPromise = async (endpoint, id, body) =>{
    return makeRequestAsPromise('PATCH', endpoint, id, body)
}

// create a GET request with Authorization token

const makeRequestAsPromiseWithToken = (method, url, id=undefined, body=undefined, token=undefined) => {
    return new Promise ((resolve, reject) => {
        const xhr = new XMLHttpRequest()

        if (id) {
            url = url + '/' + id
        }

        xhr.open(method, url)
        xhr.setRequestHeader('Authorization', 'Bearer ' + token)

        if(body) {
            xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8')
        }

        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status <=299){
                resolve(xhr.response)
                
                //reject(`${xhr.status} ${xhr.statusText} ${xhr.responseText}`)
            }
            
            reject(xhr.response)
            //resolve(JSON.parse(xhr.response))
        }

        xhr.send(JSON.stringify(body))
    })
}




//patchFromPromise(endpoints.users,'5d5c20c0ff346c5317868949', {password:'doodle'})
//patchFromPromise(endpoints.tasks,'5d5cf6e094db1f5827116e9c', {name:32})

// old code from here down:

// const getRequest = (url) => {

//     const xhr = new XMLHttpRequest()

//     xhr.open('GET', url)
//     xhr.onload = () => {
//         if (!xhr.status ===200){
//             return console.log(xhr.status + xhr.statusText)
//         }
        
//         //const res = JSON.parse(xhr.responseText)
//         console.log(JSON.parse(xhr.response))
//     }
//     xhr.send()
// }

// const getRequestAsPromise = (url) => {
//     return new Promise ((resolve, reject) => {
//         const xhr = new XMLHttpRequest()

//         xhr.open('GET', url)
//         xhr.onload = () => {
//         if (!xhr.status ===200){
//             reject(xhr.status + xhr.statusText)
//         }
//         resolve(JSON.parse(xhr.response))
//     }
//         xhr.send()
//     })
// }

// const postRequestAsPromise = (url, body) => {
//     return new Promise ((resolve, reject) => {
//         const xhr = new XMLHttpRequest()
        
//         xhr.open('POST', url)
//         xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8')

//         xhr.onload = () => {
//             if(!xhr.status === 201){
//                 reject(xhr.statusText)
//             }
//             resolve(xhr.response)
//         }
//         xhr.send(JSON.stringify(body))
//     })
// }

// const deleteTaskRequestAsPromise = (id) => {
//     return new Promise ((resolve, reject) => {
//         const xhr = new XMLHttpRequest()

//         xhr.open('DELETE', 'http://localhost:3000/tasks/' + id)
//         xhr.onloadend = () => {
//             if (!xhr.status === 200){
//                 reject('An error occured with deleteRequestAsPromise')
//             }
//             resolve(xhr.response)
//         }
//         xhr.send()
//     })
// }
// postRequest used by postUser within signup pages 
// const postRequest = (body, url) => {
//     const xhrPost = new XMLHttpRequest()

//     xhrPost.open('POST', url)
//     xhrPost.setRequestHeader('Content-Type', 'application/json; charset=utf-8')

//     xhrPost.onload = () => {
//         if (!xhrPost.status === 201) {
//             return console.log(xhrPost.status + xhrPost.statusText)
//         }
//         console.log(JSON.parse(xhrPost.response))
//     }
//     xhrPost.send(JSON.stringify(body))
// }

// patchRequest not yet used

// const patchRequest = (body, url) => {
//     const xhrPost = new XMLHttpRequest()

//     xhrPost.open('PATCH', url)
//     xhrPost.setRequestHeader('Content-Type', 'application/json; charset=utf-8')

//     xhrPost.onloadend = () => {
//         if (!xhrPost.status === 200) {
//             return console.log(xhrPost.status + xhrPost.statusText)
//         }
//         console.log(JSON.parse(xhrPost.response))
//     }
//     xhrPost.send(JSON.stringify(body))
// }

// // define specific get and post requests

// const getUsers = () => {
//     getRequest(endpoints.users)
// }

// // getUser - not yet used
// const getUser = (userId) => {
//     getRequest(endpoints.users + '/'+ userId)
// }

// // patchUser - not yet used
// const patchUser = (userId, body) => {
//     patchRequest(body, endpoints.users + '/' + userId)
// }

// // postUser used in signup pages along with postRequest

// const postUser = (user) => {
//     postRequest(user, endpoints.users)
// }

// // getTasks - not used anymore
// const getTasks = () => {
//     getRequest(endpoints.tasks)
// }

// // getTask - not used

// const getTask = (taskId) => {
//     getRequest(endpoints.tasks + '/'+ taskId)
// }

// // patchTask - not used
// const patchTask = (taskId, body) => {
//     patchRequest(body, endpoints.tasks + '/' + taskId)
// }

// // postTask - not used (using promises instead)
// const postTask = (body) => {
//     postRequest(body, endpoints.tasks)
// }