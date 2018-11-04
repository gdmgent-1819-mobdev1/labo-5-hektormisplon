CKEDITOR.replace('blog__editor');

firebase.database();
console.log(firebase.database());

// create ref
const blogPostBodyEl = document.querySelector('.blog__post__body');
const dbBlogObject = firebase.database().ref().child('blog');
console.log(dbBlogObject);

//sync blog post changes
dbBlogObject.on('value', snap => console.log(snap.val()));

dbBlogObject.on('value', snap => {
    blogPostBodyEl.innerText = JSON.stringify(snap.val(), null, 3);
});
