document.querySelector('#sign-up-form').addEventListener('submit', (e) => {
    e.preventDefault()
    const name = e.target.elements.name.value
    const email = e.target.elements.email.value
    const password = e.target.elements.password.value

    const user = {
        name, email, password
    }
    //console.log(name, email, password)
    postUser(user)
    e.target.reset()
    const thankYou = `<h3> Thanks ${name} for signing up!</h3>
    <p>please click <a href="/index.html">here</a> to sign-in</p>`
    document.querySelector('.container').innerHTML = thankYou
})