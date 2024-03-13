// When we send the data in the form of get request then it is accessed through req.query
// When we send the data in the form of post request then it is accessed through req.body

const express = require('express');
const app = express();
const hbs = require('hbs');
const {v4:uuidv4}=require('uuid');

app.use(express.urlencoded({extended:true}))
app.set('view engine' ,'hbs');

app.use(express.json());
hbs.registerPartials(__dirname + '/partials');

/// app.use(express.static(__dirname))

// app.use('/' (req, res) {
    
// })

app.use('/' , (req , res, next) => {
    console.log("Middle ware");
    // res.send("Hello ji");
    next();
})

// app.get('http://127.0.0.1:3000/' , (req , res) => {
//     console.log(req.params);
//     res.send("Hello Params");
// });

app.get('/addtask',(req , res) => {
    // Use request query to accept responses that are send using query
    console.log('Hello')
    console.log(req.query); // This data will be stored in the query params..
    res.send("Hello ji")
    // res.send(req.query);
})

let blogarr = []; // Here will store all the blogs which will be send through our form

app.post("/addblog" , (req , res) => {
    const {author , category , blog} = req.body;
    const obj = {
        author : author,
        category : category,
        blog : blog,
        blogId:uuidv4()
    }
    blogarr.push(obj);
    // We could also redirect from here using the res.redirect method to some other url.
    res.send("Blog added successfully");
})

app.get('/getblogPage' , (req , res) => {
    res.render('blogpage'); // Here we will pass the file name
})

app.get('/getblogs' , (req , res) => {
    res.render('allblogs' , {blogarr}); // Second parameter here is the data Object passed or send to the file...
})

app.get("/delete/:blogId",(req,res)=>{
    // console.log(req.para=ms);
    blogs=blogs.filter((item)=>item.blogId!=req.params.blogId)
})                                                                                                                                                                                                                                                             

app.get("/update/:blogId",(req,res)=>{
    const updateblog=blogs.filter((item)=>item.blogId!=req.params.blogId)
    
})
const PORT = 3000;
app.listen(PORT , () => {
    console.log("Server Connected");
})