// define generic get and post requests

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

const endpoints = {
    users: 'http://127.0.0.1:3000/users',
    tasks: 'http://127.0.0.1:3000/tasks',
}

const getUsers = () => {
    getRequest(endpoints.users)
}

const getUser = (userId) => {
    getRequest(endpoints.users + '/'+ userId)
}

const patchUser = (userId, body) => {
    patchRequest(body, endpoints.users + '/' + userId)
}

const postUser = (user) => {
    postRequest(user, endpoints.users)
}

const getTasks = () => {
    getRequest(endpoints.tasks)
}

const getTask = (taskId) => {
    getRequest(endpoints.tasks + '/'+ taskId)
}

const patchTask = (taskId, body) => {
    patchRequest(body, endpoints.tasks + '/' + taskId)
}

const postTask = (body) => {
    postRequest(body, endpoints.tasks)
}

// calls //
//getUsers()
//getUser('5d52e6bbad543c1294e0c6d8')
//getTasks()
//getTask('5d52e9fd754c6012b8113c23')
//getUser('5d52e7d9ef5018129938bc63')

const user1 = {
    name: 'Graham',
    email: 'Graham@221b.com',
    password: 'watson2'
}

//postUser(user1)

const task1 = {
    description: 'paint wall blue'
}

//postTask(task1)

//patchTask('5d545aed89b92918ab0faca8', {description: 'wash and waxe car'})
//patchUser('5d52e7d9ef5018129938bc63', {name:'Charlie Afif'})