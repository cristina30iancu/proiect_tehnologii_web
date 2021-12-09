const express = require('express');
const Activity = require('../models/Activity');
const Feedback = require('../models/Feedback');
const User = require('../models/User');
const app = express();


// GET the list of feedbacks.
app.get('', async (request, response, next) => {
    try {
        const feedbacks = await Feedback.findAll();
        if (feedbacks.length > 0) {
            response.json(feedbacks);
        } else {
            response.sendStatus(204);
        }
    } catch (error) {
        next(error);
    }
});

// GET a feedback by id.
app.get('/:feedbackId', async (request, response, next) => {
    try {
        const feedback = await Feedback.findByPk(request.params.feedbackId);
        if (feedback) {
            response.json(feedback);
        } else {
            response.status(404).json({ message: 'Feedback Not Found!' })
        }
    } catch (error) {
        next(error);
    }
});

// POST a new feedback made by a user at an activity.
app.post('/users/:userId/activities/:activityId', async (req, response, next) => {
    try {
        const user1 = await User.findByPk(req.params.userId);
        if (user1) {
            const activity = await Activity.findByPk(req.params.activityId);
            if (activity) {
                const users = await activity.getUsers();
                const user2 = users.shift();
                if (user2.usertypeId == 1 && user2.id == req.params.userId) {
                    if (req.body.description && req.body.type && req.body.date) {
                        const feedback = await Feedback.create(req.body);
                        activity.addFeedback(feedback);
                        await activity.save();
                        response.status(201).json({ message: 'Feedback Created!' });
                    }
                    else response.status(400).json({ message: 'Malformed request!' });
                } else response.status(404).json({ message: 'Student is not enrolled at such activity!' });
            } else response.status(404).json({ message: 'Student is not enrolled at such activity!' });
        } else {
            response.status(404).json({ message: 'User not found!' });
        }
    } catch (error) {
        next(error);
    }
});

// PUT to update a feedback.
app.put('/:feedbackId', async (request, response, next) => {
    try {
        const feedback = await Feedback.findByPk(request.params.feedbackId);
        if (feedback) {
            if (request.body.description && request.body.type && request.body.date) {
                await feedback.update(request.body);
            } else response.status(400).json({ message: 'Malformed request!' });
        } else {
            response.sendStatus(404);
        }
    } catch (error) {
        next(error);
    }
});

// DELETE a feedback.
app.delete('/:feedbackId', async (request, response, next) => {
    try {
        const feedback = await Feedback.findByPk(request.params.feedbackId);
        if (feedback) {
            await feedback.destroy();
        } else {
            response.sendStatus(404);
        }
    } catch (error) {
        next(error);
    }
});

module.exports = app;