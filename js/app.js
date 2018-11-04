(function() {
    // Initialize firebase;
    const config = {
        apiKey: "AIzaSyB2-sbDH5CYnXLvnItclxAlIrHAddxR0bs",
        authDomain: "labo-5-hektormisplon.firebaseapp.com",
        databaseURL: "https://labo-5-hektormisplon.firebaseio.com",
        projectId: "labo-5-hektormisplon",
        storageBucket: "labo-5-hektormisplon.appspot.com",
        messagingSenderId: "470326071314"
    };
    firebase.initializeApp(config);
}());

//  Get DOM elements
    const emailEl = document.querySelector('.input__email');
    const passwordEl = document.querySelector('.input__password');
    const loginBtn = document.querySelector('.btn__login');
    const registerBtn = document.querySelector('.btn__signup');
    const logoutBtn = document.querySelector('.btn__logout');
    const formError = document.querySelector('.form__error');
    const loginForm = document.querySelector('.form-group');

//  Add login event
    loginBtn.addEventListener('click', e => {

        const email = emailEl.value;
        const password = passwordEl.value;
        const auth = firebase.auth();

        auth.signInWithEmailAndPassword(email, password)
            .then(response => {
                console.log(response);
                formError.textContent = `You are logged in with ${email}`;
            })
            // catch errors from auth promise
            .catch(error => {
                formError.textContent = error.message;
            });
    });

//  Add signup event
    registerBtn.addEventListener('click', e => {

        const email = emailEl.value;
        const password = passwordEl.value;
        const auth = firebase.auth();

        auth.createUserWithEmailAndPassword(email, password)
            .then(response => {
                console.log(response);
                formError.textContent = `You registered using ${email}`;
            })
            // catch errors from auth promise
            .catch(error => {
                formError.textContent = error.message;
            });
    });

//  Add a logout event
    logoutBtn.addEventListener('click', e => {
        firebase.auth().signOut();
        formError.textContent = 'You logged out.';
    });

//  Add realtime listener instead of promise (promise only resolves once)
    firebase.auth().onAuthStateChanged(firebaseUser => {
        if(firebaseUser) {
            console.log(firebaseUser);
            logoutBtn.classList.replace('btn--hide', 'btn');
            loginForm.classList.replace('form-group', 'form-group--hide');
        } else {
            logoutBtn.classList.replace('btn', 'btn--hide');
            loginForm.classList.replace('form-group--hide', 'form-group');
        }
    });