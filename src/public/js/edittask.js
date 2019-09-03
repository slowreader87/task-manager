const taskId = location.hash.substring(1)
const token = JSON.parse(localStorage.getItem('token'))
const formTaskName = document.querySelector('#input-task-name')
const formTaskDesc = document.querySelector('#task-description')
const formTaskCompleted = document.querySelector('#completed')

getFromPromisewithIdAndToken(endpoints.tasks, taskId, token).then((response)=>{
    const task = JSON.parse(response)
    formTaskName.value = task.name
    formTaskDesc.value = task.description
    formTaskCompleted.checked = task.completed
}).catch((e)=>{
    console.log(e)
})

document.querySelector('#edit-task-form').addEventListener('submit', (e) => {
    e.preventDefault()
    const task = {
        name: e.target.elements.taskName.value,
        description: e.target.elements.taskDescription.value,
        completed: e.target.elements.taskCompleted.checked
    }
    patchFromPromiseWithIdAndToken(endpoints.tasks, taskId, task, token)
    .then((response) => { 
        document.querySelector('#msg').textContent = 'Edits Saved'
        document.querySelector('#msg').className = 'green'
    // }).then(() => {
    //     setTimeout(()=>{
    //         document.querySelector('#msg').textContent = 'Redirecting back to tasks...'
    //     }, 1)
    }).then(() => {
        setTimeout(()=>{
            location.assign('/createtask')
        }, 2000)
    }).catch((e) => {
        console.log(e)
    })
})

// setTimeout(()=>{
//     console.log('delayed')
// }, 2000)