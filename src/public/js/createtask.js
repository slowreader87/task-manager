// console.log("createtask.js running")
// const getTasks = () => {

//     const xhr = new XMLHttpRequest()
//     const url = "http://localhost:3000/tasks"
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
const getTasksAndRender = async () => {
    const tasks = await getTasks()
    console.log(tasks)
}

getTasksAndRender()


