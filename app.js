// require('dotenv').config()
// console.log(process.env)

const express = require("express");
const ejsMate = require("ejs-mate");
const app = express();
const mysql = require("mysql2");
const path = require("path");

const port = process.env.PORT || 3000;


app.set("view engine" , "ejs");
app.use(express.json()); // Parses JSON requests
app.use(express.urlencoded({ extended: true })); // Parses URL-encoded requests
app.engine('ejs' , ejsMate);
app.set("views",path.join(__dirname , "/views"));
app.use(express.static(path.join(__dirname,"/public")));

const connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    database : 'sci_astra',
    password : 'Vishakha#1469'
});

// let q = 'INSERT INTO blog_posts (title, content, publish_date, statuc ,image_url) VALUES ?';
// let blogs = [
//     ['Introduction to Web Development', 'Learn the basics of HTML, CSS, and JavaScript.', '2024-11-05 ', 'published', 'https://example.com/images/web-development.jpg'],
//     ['Advanced CSS Techniques', 'Explore advanced CSS concepts including Flexbox and Grid.', '2024-11-06 ', 'scheduled', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvMD5V0P7zfTa_P1lOZPOJ86LzX80XwMoAYg&s'],
//     ['JavaScript ES6 Features', 'A deep dive into new ES6 features like arrow functions and promises.', '2024-11-07 ', 'published', 'https://example.com/images/es6-features.jpg'],
//     ['Getting Started with Node.js', 'A guide to starting with Node.js and building server-side applications.', '2024-11-08 ', 'scheduled', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvMD5V0P7zfTa_P1lOZPOJ86LzX80XwMoAYg&s'],
//     ['Understanding Databases', 'Learn about SQL and NoSQL databases and when to use each.', '2024-11-09 ', 'published', 'https://example.com/images/databases.jpg'],
//     ['Responsive Web Design', 'Learn techniques to make web pages look good on all devices.', '2024-11-10 ', 'scheduled', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvMD5V0P7zfTa_P1lOZPOJ86LzX80XwMoAYg&s'],
//     ['Introduction to REST APIs', 'Understand REST principles and how to build RESTful APIs.', '2024-11-11 ', 'published', 'https://example.com/images/rest-apis.jpg'],
//     ['Python for Beginners', 'An introduction to Python programming for beginners.', '2024-11-12 ', 'scheduled', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvMD5V0P7zfTa_P1lOZPOJ86LzX80XwMoAYg&s'],
//     ['Data Structures in Java', 'Learn about common data structures and their implementations in Java.', '2024-11-13 ', 'published', 'https://example.com/images/java-data-structures.jpg'],
//     ['Version Control with Git', 'A guide to using Git for version control in software projects.', '2024-11-14 ', 'scheduled', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvMD5V0P7zfTa_P1lOZPOJ86LzX80XwMoAYg&s']
// ];

// connection.connect((err)=>{
//     if(err)throw err;
//     console.log("DB connected");
//     try{
//         connection.query(q ,[blogs] ,(err,result)=>{
//             if(err)throw err;
//             console.log(result);
//         });
//     }catch(err){
//         console.log(err);
//     }
//     connection.end();
// })

app.get("/blog" , (req,res)=>{
    let q = `SELECT * FROM blog_posts`;
    try{
        connection.query(q,(err,blogs)=>{
            if(err)throw err;
            res.render("index.ejs",{blogs});
        })
    }catch(err){
        res.send(err);
    }
});

//add new blog form route
app.get("/blog/new" , (req,res)=>{
    res.render("new.ejs");
});

app.get("/blog/:id" , (req,res)=>{
    let {id} = req.params;
    let q = `SELECT * FROM blog_posts WHERE id = ${id}`;
    try{
        connection.query(q,(err,result)=>{
         if(err)throw err;
         let blog = result[0];
         res.render("show.ejs",{blog});
        })
    }catch(err){
        console.error(err);
    }
})

app.post("/blog",(req,res)=>{;
    res.redirect("/blog");
});

 //add new blog route
 app.post("/blog",(req,res)=>{
    // console.log(req.body);
    let{title:title,content:content,publish_date:publish_date,statuc:statuc,image_url:image_url} = req.body;
    // if (!publish_date) {
    //     console.error("Publish date is missing or undefined");
    //     return res.status(400).send("Publish date is required");
    // }
    const formattedPublishDate = new Date(publish_date).toISOString().slice(0, 19).replace('T', ' ');
    let q = `INSERT INTO blog_posts (title, content, publish_date, statuc ,image_url) VALUES ('${ title}','${content}','${formattedPublishDate}','${statuc}','${image_url}')`;
    try{
        connection.query(q,(err,result)=>{
          if(err)throw err;
          console.log(result);
          res.redirect("/blog");
        });
    }catch(err){
      res.send("Something went wrong while adding courses details");
    }
})

app.get("/blog/:id/pay",(req,res)=>{
    let {id} = req.params;
    let q = `SELECT * FROM blog_posts WHERE id = ${id}`;
    try{
        connection.query(q,(err,result)=>{
         if(err)throw err;
         let blog = result[0];
         res.render("pay",{blog});
        })
    }catch(err){
        console.error(err);
    }
});




app.listen(port , ()=>{
    console.log(`listining on port ${port}`);
});