//console.log('hi from signin.js')

document.querySelector('#sign-in-form').addEventListener('submit', (event) => {
    event.preventDefault()
    const email = event.target.elements.email.value
    const password = event.target.elements.password.value

    const body = {email, password}
    console.log('email: '+body.email + 'pass: ' + body.password)

})