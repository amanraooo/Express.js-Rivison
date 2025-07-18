const express = require('express');
const app = express();
const port = 8000

//middleware :- the req asked byuser forst reach to midwares and then the midware sends it to the route using next()
// app.use((req,res,next)=>{
//     console.log(`request recieved ${req.method} and url ${req.url}`)
//     next();
// })  
app.get('/', (req, res) => {
  res.send('L3- middlewares');
});

app.get('/middleware', (req, res) => {
  res.send('learn midware');
});

//Show Time of Request
app.use((req,res,next)=>{
    req.requestTime = new Date().toLocaleTimeString();
    next();
})
app.get('/time',(req,res)=>{
    res.send(`you came at ${req.requestTime}`)
})

//auth==true midware
const checkAuth =(req,res,next)=>{
    if(req.query.auth==='true'){
        next();
    }
    else{
        res.status(401).send('unauthorised')
    }
}

app.get('/secure',checkAuth,(req,res)=>{
    res.send('you are welcome')
})

//admin check midware
const checkAdmin = (req,res,next)=>{  
    if(req.query.role==='admin'){
        next();
    }
    else return res.status(403).send('only admins allowed')
}
app.get('/admin', checkAdmin,(req,res)=>{
    res.send('welcome admin')
})

//prank midware
const checkPerson =(req, res , next)=>{
    if(req.query.iam==='srishti'){
        next();
    }
    else return res.status(403).send('fuck off')
}
app.get('/person', checkPerson,(req,res)=>{
    res.send('hello preety little baby');
})


//middlware chaining

//logger midware
const logger = (req,res, next)=>{
    console.log(`[LOG] ${req.method} ${req.path}`);
  next();
}

// check if user is loggedin
const  checkLogin = (req,res,next)=>{
    if(req.query.user==='true'){
        next();
    } else{
        res.status(401).send('login first')
    }
}

//check if user is vip
const  checkVip = (req,res,next)=>{
    if(req.query.vip==='true'){
        next();
    } else{
        res.status(403).send(' VIP members only!');
    }
}

app.get('/vip-club',logger,checkLogin, checkVip ,(req,res)=>{
    res.send('welcome to the vip club sir ')
})

// route that causes error 
app.get('/error-cause',(req,res)=>{
    throw new error('something went error');
})

//route that cause error 2
app.get('/divide',(req,res,next)=>{
    const a = parseFloat(req.query.a);
    const b = parseFloat(req.query.b);

    if(a===0 || b===0){
        const err = new Error('Division by zero not allowed!');
        return next(err);
    }
    const result = a/b;
    res.send(`result ${result}`);

})
 
// Error handling middleware - MUST BE IN LAST
app.use((err,req,res,next)=>{
    console.error('error',err.message)
    res.status(500).send('Internal Server Error');
})


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
