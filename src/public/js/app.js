// define generic get and post requests
// console.log('app.js has been called')

const endpoints = {
    users: 'http://127.0.0.1:3000/users',
    tasks: 'http://localhost:3000/tasks',
}

const getRequest = (url) => {

    const xhr = new XMLHttpRequest()

    xhr.open('GET', url)
    xhr.onload = () => {
        if (!xhr.status ===200){
            return console.log(xhr.status + xhr.statusText)
        }
        
        //const res = JSON.parse(xhr.responseText)
        console.log(JSON.parse(xhr.response))
    }
    xhr.send()
}

const getRequestAsPromise = (url) => {
    return new Promise ((resolve, reject) => {
        const xhr = new XMLHttpRequest()

        xhr.open('GET', url)
        xhr.onload = () => {
        if (!xhr.status ===200){
            reject(xhr.status + xhr.statusText)
        }
        resolve(JSON.parse(xhr.response))
    }
        xhr.send()
    })
}

// generic request as promise (can use for GET, POST and DELETE)

const makeRequestAsPromise = (method, url, id=undefined, body=undefined) => {
    return new Promise ((resolve, reject) => {
        const xhr = new XMLHttpRequest()

        if (id) {
            url = url + '/' + id
        }

        xhr.open(method, url)

        if(body) {
            xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8')
        }

        xhr.onload = () => {
            if (!xhr.status >= 200 && !xhr.status >=300){
                reject(xhr.status)
            }
            resolve(xhr.response)
        }

        xhr.send(JSON.stringify(body))
    })
}

const getFromPromise = async (endpoint) => {
    const res = await makeRequestAsPromise('GET', endpoint)
    console.log(res)
}

//getFromPromise(endpoints.tasks) // get all tasks
//getFromPromise(endpoints.users) // get all users

const postFromPromise = async (endpoint, body) => {
    const res = await makeRequestAsPromise('POST', endpoint, null, body)
    console.log(res)
}

//postFromPromise(endpoints.tasks, {name:'handover money'})

const deleteFromPromise = async (endpoint, id) =>{
    const res = await makeRequestAsPromise('DELETE', endpoint, id)
    console.log(res)
}

//deleteFromPromise(endpoints.tasks, '5d5c2025e121b053063140b8')

const patchFromPromise = async (endpoint, id, body) =>{
    const res = await makeRequestAsPromise('PATCH', endpoint, id, body)
    console.log(res)
}

//patchFromPromise(endpoints.tasks, '5d5c46d764b99f540c3cbbff', {name:'throw rubbish'})


const postRequestAsPromise = (url, body) => {
    return new Promise ((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        
        xhr.open('POST', url)
        xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8')

        xhr.onload = () => {
            if(!xhr.status === 201){
                reject(xhr.statusText)
            }
            resolve(xhr.response)
        }
        xhr.send(JSON.stringify(body))
    })
}

const deleteTaskRequestAsPromise = (id) => {
    return new Promise ((resolve, reject) => {
        const xhr = new XMLHttpRequest()

        xhr.open('DELETE', 'http://localhost:3000/tasks/' + id)
        xhr.onloadend = () => {
            if (!xhr.status === 200){
                reject('An error occured with deleteRequestAsPromise')
            }
            resolve(xhr.response)
        }
        xhr.send()
    })
}
// postRequest used by postUser within signup pages 
const postRequest = (body, url) => {
    const xhrPost = new XMLHttpRequest()

    xhrPost.open('POST', url)
    xhrPost.setRequestHeader('Content-Type', 'application/json; charset=utf-8')

    xhrPost.onload = () => {
        if (!xhrPost.status === 201) {
            return console.log(xhrPost.status + xhrPost.statusText)
        }
        console.log(JSON.parse(xhrPost.response))
    }
    xhrPost.send(JSON.stringify(body))
}

// patchRequest not yet used

const patchRequest = (body, url) => {
    const xhrPost = new XMLHttpRequest()

    xhrPost.open('PATCH', url)
    xhrPost.setRequestHeader('Content-Type', 'application/json; charset=utf-8')

    xhrPost.onloadend = () => {
        if (!xhrPost.status === 200) {
            return console.log(xhrPost.status + xhrPost.statusText)
        }
        console.log(JSON.parse(xhrPost.response))
    }
    xhrPost.send(JSON.stringify(body))
}

// define specific get and post requests

const getUsers = () => {
    getRequest(endpoints.users)
}

// getUser - not yet used
const getUser = (userId) => {
    getRequest(endpoints.users + '/'+ userId)
}

// patchUser - not yet used
const patchUser = (userId, body) => {
    patchRequest(body, endpoints.users + '/' + userId)
}

// postUser used in signup pages along with postRequest

const postUser = (user) => {
    postRequest(user, endpoints.users)
}

// getTasks - not used anymore
const getTasks = () => {
    getRequest(endpoints.tasks)
}

// getTask - not used

const getTask = (taskId) => {
    getRequest(endpoints.tasks + '/'+ taskId)
}

// patchTask - not used
const patchTask = (taskId, body) => {
    patchRequest(body, endpoints.tasks + '/' + taskId)
}

// postTask - not used (using promises instead)
const postTask = (body) => {
    postRequest(body, endpoints.tasks)
}