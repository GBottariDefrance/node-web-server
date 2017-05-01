const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

let app = express();

hbs.registerPartials('./views/partials')
app.set('view engine', 'hbs');

// middlewares
app.use((req, res, next) =>{
    let now = new Date().toString();
    let log = `${now}: ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err){
            console.log('Unable to append to server.log')
        }
    });
    next();
});
// app.use((req, res, next) =>{
//     res.render('maintenance.hbs');
// });
app.use(express.static('./public'));

// handlebar helpers -> see html files for usage
hbs.registerHelper('getCurrentYear', () => {
    return (new Date()).getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

// express getters
app.get('/', (req, res) => {
    //response.send('<h1>eeeeello friend</h1>');
    // response.send({
    //     name:'Gabriel',
    //     likes:[
    //         'Volleyball',
    //         'Games',
    //         'Programming'
    //     ]
    // });
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to paradise friends'
    });
});
app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});
app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to handle request'
    });
});

// express listener on port 3000 -> localhost:3000
app.listen(3000, () => {
    console.log('Server is up on port 3000');
});