document.querySelector('#sign-up-form').addEventListener('submit', (e) => {
    e.preventDefault()
    const name = e.target.elements.name.value
    const email = e.target.elements.email.value
    const password = e.target.elements.password.value

    const user = {
        name, email, password
    }
    
    // possibleErrors = [{
    //     errorName: 'noPassword',
    //     errorText: 'User validation failed: password: Path `password` is required.',
    //     friendlyError: 'Please provide a password'
    // },
    // {
    //     errorName: 'duplicateEmail',
    //     errorText: '',
    //     friendlyError: 'User already exists, please sign-in'

    // }
    // ]

    postFromPromise(endpoints.users, user)
    .then((response)=> {
        console.log(response)
        //location.assign('/createtask')
    })
    .catch((e)=>console.log('an error occured with the async call'))
   
    
    
    // const thankYou = `<h3> Thanks ${name} for signing up!</h3>
    // <p>please click <a href="/index.html">here</a> to sign-in</p>`
    // document.querySelector('.container').innerHTML = thankYou
})