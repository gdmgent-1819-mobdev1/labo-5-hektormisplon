//  INIT FIREBASE
    (function() {
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
    
//  GET DOM ELEMENTS
    const authContainer = document.querySelector('.container__auth');
    const blogContainer = document.querySelector('.container__blog');

    const emailEl = document.querySelector('.input__email');
    const passwordEl = document.querySelector('.input__password');
    const loginBtn = document.querySelector('.btn__login');
    const registerBtn = document.querySelector('.btn__signup');
    const googleLoginBtn = document.querySelector('.btn__google-login');

    const logoutBtn = document.querySelector('.btn__logout');

    const formError = document.querySelector('.form__error');

    const headerEl = document.querySelector('.blog__header__greet');


//  SEND NOTIFICATION
    function notify(notificationText) {
        if (Notification.permission !== 'granted') {
            Notification.requestPermission(function(permission) {
                if(permission === 'granted') {
                    notify('Notifications enabled: ' + notificationText);
                }
            });
        }
        if (Notification.permission === "granted") {
          let notification = new Notification("Welcome!", {
            body: notificationText
          });
          setTimeout(notification.close.bind(notification), 4000);
        }
      }

//  SEND VERIFICATION EMAIL
    function verifyEmail(email) {
    email.sendEmailVerification()
        .then(function() {
            console.log('Email sent');
        })
        .catch(function(error) {
            console.log(error);
        });
    }

//  SIGN IN EVENT
    loginBtn.addEventListener('click', e => {

        const email = emailEl.value;
        const password = passwordEl.value;

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(response => {
                console.log(response);
                notify(`Welcome back, ${email}!`);
                headerEl.textContent = `Welcome back ${email}!`;

            })
            // catch errors from auth promise
            .catch(error => {
                formError.textContent = error.message;
            });
    });

//  SIGN UP EVENT
    registerBtn.addEventListener('click', e => {

        const email = emailEl.value;
        const password = passwordEl.value;

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(response => {
                verifyEmail(response.user);
                notify(`You signed up succesfully with ${email}, please confirm your registration.`);
                headerEl.textContent = `Welcome ${email}, please check your email to confirm your registration!`;
            })
            // catch errors from auth promise
            .catch(error => {
                formError.textContent = error.message;
            });
    });
    // GOOGLE SIGN IN

    googleLoginBtn.addEventListener('click', e => {

        const provider = new firebase.auth.GoogleAuthProvider();

        firebase.auth().signInWithPopup(provider).then(function(result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            // ...
          }).catch(function(error) {
            formError.textContent = error.message;
          });
    });

//  LOG OUT EVENT
    logoutBtn.addEventListener('click', e => {
        firebase.auth().signOut();
        formError.textContent = 'You logged out.';
    });

//  REALTIME LISTENER (instead of promises which only resolve once)
    firebase.auth().onAuthStateChanged(firebaseUser => {
        if(firebaseUser) {
            console.log(firebaseUser);
            logoutBtn.classList.replace('btn--hide', 'btn');
            authContainer.classList.replace('container__auth', 'container__auth--hide');
            blogContainer.classList.replace('container__blog--hide', 'container__blog');
        } else {
            logoutBtn.classList.replace('btn', 'btn--hide');
            authContainer.classList.replace('container__auth--hide', 'container__auth');
            blogContainer.classList.replace('container__blog', 'container__blog--hide');
        }
    });



