// console.log("createtask.js running")

const resultsArea = document.querySelector('#results-area')


const printTasksFromPromise = async () => {
    let resultsHTML = '<h3>Your Tasks</h3>'
    const tasks = await getRequestAsPromise('http://localhost:3000/tasks')
    resultsHTML += '<ul>'
    tasks.forEach((task)=>{
        resultsHTML +=`<li>${task.name}</li>`
    })
    resultsHTML += '</ul>'
    resultsArea.innerHTML = resultsHTML
}

//printTasksFromPromise()

const printTasksAndRemovesFromPromise = async () => {
    const resultsArea = document.querySelector('#results-area')
    resultsArea.innerHTML = ''

    const tasks = await getRequestAsPromise('http://localhost:3000/tasks')

    const allTasksTitle = document.createElement('h3')
    allTasksTitle.textContent = 'Your Tasks'
    resultsArea.appendChild(allTasksTitle)

    tasks.forEach((task)  => {
        const taskContainer = document.createElement('div')
        taskContainer.className = 'task-container'
        const taskDIV = document.createElement('div')
        taskDIV.className = 'task-div'
        const removeButton = document.createElement('button')
        removeButton.textContent = 'Remove'
        removeButton.className = 'remove-task'

        taskDIV.textContent = task.name
        removeButton.addEventListener('click', () => {
            deleteTaskRequestAsPromise(task._id)
            printTasksAndRemovesFromPromise()
        })

        taskDIV.appendChild(removeButton)
        taskContainer.appendChild(taskDIV)
        resultsArea.appendChild(taskContainer)
    })
}

printTasksAndRemovesFromPromise()


// creates a task based on form data

document.querySelector('#create-task-form').addEventListener('submit', (e)=>{
    e.preventDefault()
    const name = e.target.elements.taskTitle.value
    const description =  e.target.elements.taskDescription.value
    const completed = e.target.elements.completed.checked

    const task = {
        name, 
        description,
        completed
    }

    postRequestAsPromise('http://localhost:3000/tasks', task)
    printTasksFromPromise()
    e.target.reset()
})


