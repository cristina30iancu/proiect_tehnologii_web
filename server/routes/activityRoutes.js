const express = require('express');
const app = express();

// Import created models
const User = require('../models/User');
const UserType = require('../models/UserType');
const Activity = require('../models/Activity');
// Define entities relationship
//UserType.hasMany(User); si user are usertypeid
// Activity.belongsToMany(User);// user are activityId
// User.hasMany(Activity,{ target: 'Enrollments'});


/**
 * GET the list of activities.
 */
 app.get('/', async (request, response, next) => {
    try {
        const activities = await Activity.findAll();
        if (activities.length > 0) {
          response.json(activities);
        } else {
          response.sendStatus(204);
        }
    } catch (error) {
      next(error);
    }
  });
  
  /**
   * GET an activity by id.
   */
  app.get('/:activityId', async (request, response, next) => {
    try {
      const activity = await Activity.findByPk(request.params.activityId);
      if (activity) {
          response.json(activity);
      } else {
        response.sendStatus(404);
      }
    } catch (error) {
      next(error);
    }
  });
  
  /**
   * POST a new activity made by a professor.
   */
  app.post('/:userId', async (req, response, next) => {
    try {
      const user = await User.findByPk(req.params.userId);
      if (user) {
          if(user.usertypeId == 2){
            if(req.body.description&&req.body.code&&req.body.date){
              const par = {
                description: req.body.description,
                code: req.body.code,
                date: new Date(req.body.date),
                creator : req.params.userId
              };
            await Activity.create(par);
            response.status(201).json({ message: 'Activity Created!' });
            }
            else response.status(400).json({ message: 'Malformed request!' });
          } else response.status(400).json({ message: 'User must be a professor!' });
        } else {
         response.status(404).json({ message: 'User not found!' });
      }
    } catch (error) {
      next(error);
    }
  });
  
  /**
   * PUT to update an activity.
   */
  app.put('/:activityId', async (request, response, next) => {
    try {
      const activity = await Activity.findByPk(request.params.activityId);
      if (activity) {
        if(request.body.description&&request.body.code&&request.body.date){
          const par = {
            description: req.body.description,
            code: req.body.code,
            date: new Date(req.body.date),
            creator : req.params.userId
          };
          await activity.update(par);
        } else response.status(400).json({ message: 'Malformed request!' });
      } else {
        response.sendStatus(404);
      }
    } catch (error) {
      next(error);
    }
  });  
  
  /**
   * DELETE an activity.
   */
   app.delete('/:activityId', async (request, response, next) => {
    try {
      const activity = await Activity.findByPk(request.params.activityId);
      if (activity) {
          await activity.destroy();
      } else {
        response.sendStatus(404);
      }
    } catch (error) {
      next(error);
    }
  });  
  
  module.exports = app; 