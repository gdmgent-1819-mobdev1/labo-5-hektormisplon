// assign the CKEditor to textarea with id of blog__editor
CKEDITOR.replace('blog__editor');

const dbBlog = firebase.database();
const blogPostEl = document.querySelector('.blog__post');
const dbBlogObject = dbBlog.ref().child('blog');

//sync blog post changes
//dbBlogObject.on('value', snap => console.log(snap.val()));
// dbBlogObject.on('value', snap => {
//     //blogPostBodyEl.innerText = JSON.stringify(snap.val(), null, 3);
//     const blogObject = snap.val();
//     console.log(blogObject);
// });

var database = firebase.database().ref().child('blog');
database.once('value', function(snapshot){
    if(snapshot.exists()){
        snapshot.forEach(function(post){
            const blogPost = {
                title: `<h1>${post.val().title}<h1>`,
                author: `<h3>${post.val().author}<h4>`,
                date: `<span>${post.val().date}<span>`,
                body: `<p>${post.val().body}<p>`
            }
            blogPostEl.innerHTML += blogPost.title;
            blogPostEl.innerHTML += blogPost.author;
            blogPostEl.innerHTML += blogPost.body;
            blogPostEl.innerHTML += blogPost.date;
        });
    }
});

