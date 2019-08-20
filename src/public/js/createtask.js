// console.log("createtask.js running")

const resultsArea = document.querySelector('#results-area')

const printTasksAndRemovesFromPromise = async () => {
    const resultsArea = document.querySelector('#results-area')
    resultsArea.innerHTML = ''

    const tasks = await getRequestAsPromise('http://localhost:3000/tasks')

    if (tasks.length > 0) {
        const allTasksTitle = document.createElement('h2')
        allTasksTitle.className = 'tasks-area-title'

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
    
            taskContainer.appendChild(taskDIV)
            taskContainer.appendChild(removeButton)
            resultsArea.appendChild(taskContainer)
        })

    }
    

    
}

printTasksAndRemovesFromPromise()


// creates a task from form data

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
    printTasksAndRemovesFromPromise()
    e.target.reset()
})


