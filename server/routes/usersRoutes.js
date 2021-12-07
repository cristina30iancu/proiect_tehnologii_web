const express = require('express');
const app = express();
const sequelize = require('../sequelize');
const bcrypt = require('bcrypt');

// Import created models
const User = require('../models/User');
const UserType = require('../models/UserType');
const Activity = require('../models/Activity');
/**
 * GET all the users from the database.
 */
app.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
});
app.get('/usertypes', async (req, res, next) => {
  try {
    const users = await UserType.findAll();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
});
/**
 * POST a new usertype to the database.
 */
app.post('/usertype', async (req, res, next) => {
  try {
    if (req.body.id && req.body.description) {
      await UserType.create(req.body);
      res.status(201).json({ message: 'UserType Created!' });
    } else {
      res.status(400).json({ message: 'Malformed request!' });
    }
  } catch (err) {
    next(err);
  }
});
/**
 * POST a new user to the database.
 */
app.post('/:usertypeId', async (req, res, next) => {
  try {
    if ( req.body.lastName && req.body.firstName && req.body.userName && req.body.password ) {
      const usertype = await UserType.findByPk(req.params.usertypeId);
      if (usertype) {
        const hashedPassword = await bcrypt.hash(
          req.body.password,
          Number.parseInt(process.env.NUMBER_OF_SALTS)
        );
        const par = {
          lastName: req.body.lastName,
          firstName: req.body.firstName,
          userName: req.body.userName,
          password: hashedPassword,
        };
        const user = await User.create(par);
        usertype.addUser(user);
        await usertype.save();
        res.status(201).json({ message: 'User Created!' });
      } else {
        res.status(400).json({ message: 'User Type not defined!' });
      }
    } else {
      res.status(400).json({ message: 'Malformed request!' });
    }
  } catch (err) {
    next(err);
  }
});

/**
 * POST a new user into an activity.
 */
app.post('/enroll/:userId/activities/:activityId',async (request, response, next) => {
    try {
      const user = await User.findByPk(request.params.userId);
      const activity = await Activity.findByPk(request.params.activityId);
      if (user && activity) {
        if(user.usertypeId == 1){
          activity.addUser(user);
          await activity.save();
          response.status(201).json({ message: 'Enrollement is done!' });
        } else response.status(400).json({ message: 'Only a student can be enrolled!' });
      } else {
        response.sendStatus(404);
      }
    } catch (error) {
      next(error);
    }
  }
);

module.exports = app;
