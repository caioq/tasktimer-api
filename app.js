const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const workspaceRoutes = require('./routes/workspace');
const error = require('./middleware/error');

const User = require('./models/user');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); //fix request from any client
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS'); //fix request from any method
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization'); //only json request
  next();
});

app.use((req, res, next) => {
  User.findById('5c58e119d5e2b359800929a1')
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

// Routes
app.use('/workspace', workspaceRoutes);
app.use(error);

mongoose.connect('mongodb+srv://caio-queiroz:caioq123@cluster0-f7akh.mongodb.net/tasktimer?retryWrites=true', { useNewUrlParser: true })
  .then( result => {
    console.log('Conected!');
    User.findOne().then(user => {
      if (!user) {
        const user = new User({
          name: 'Caio'          
        });
        user.save();
      }
    });
    app.listen(3000);
  }).catch( err => {
    console.log(err);
  })