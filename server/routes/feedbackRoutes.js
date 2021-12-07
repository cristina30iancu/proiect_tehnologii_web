const express = require('express');
const Feedback = require('../models/Feedback');
const app = express();


/**
 * GET the list of feedbacks.
 */
app.get('/', async (request, response, next) => {
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

/**
 * GET a feedback by id.
 */
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

/**
 * POST a new feedback made by a user at an activity.
 */
app.post('/new/users/:userId/activities/:activityId', async (req, response, next) => {
    try {
        const user = await User.findByPk(req.params.userId);
        if (user) {
            if (user.usertypeId == 2) {
                const activities = await user.getActivities({ id: req.params.activityId });
                const activity = activities.shift();
                if (activity) {
                    if (req.body.description && req.body.type && req.body.date) {
                        const feedback = await Feedback.create(req.body);
                        activity.addFeedback(feedback);
                        await activity.save();
                        response.status(201).json({ message: 'Feedback Created!' });
                    }
                    else response.status(400).json({ message: 'Malformed request!' });
                } else response.status(404).json({ message: 'Student is not enrolled at such activity!' });
            } else response.status(400).json({ message: 'User must be a professor!' });
        } else {
            response.status(404).json({ message: 'User not found!' });
        }
    } catch (error) {
        next(error);
    }
});

/**
 * PUT to update a feedback.
 */
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

/**
 * DELETE a feedback.
 */
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