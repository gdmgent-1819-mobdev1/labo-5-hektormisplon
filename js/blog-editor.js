// assign the CKEditor to textarea with id of blog__editor
CKEDITOR.replace('blog__editor');

const dbBlog = firebase.database();
const dbBlogObject = dbBlog.ref().child('blog');
const blogPostGroupEl = document.querySelector('.blog__post-group');

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

            const blogPostEl = document.createElement('div');
            blogPostEl.setAttribute('class', 'blog__post');

            const blogPostHeader = document.createElement('h4');
            blogPostHeader.setAttribute('class', 'blog__post__header');

            const blogPost = {
                title: post.val().title,
                author: post.val().author,
                date: post.val().date,
                body: post.val().body
            }
            blogPostHeader.textContent += blogPost.title;
            blogPostEl.textContent += blogPost.author;
            blogPostEl.textContent += blogPost.body;
            blogPostEl.textContent += blogPost.date;

            blogPostEl.append(blogPostHeader);
            blogPostGroupEl.append(blogPostEl);
        });
    }
});

