const express = require('express');
const cors = require('cors');
const morgan = require('morgan'); //  middleware care stocheaza cererile
const app = express();
const loginRoutes = require('./routes/loginRoutes');
const activityRoutes = require('./routes/activityRoutes');
const dbRoutes = require('./routes/dbRoutes');
const usersRoutes = require('./routes/usersRoutes');

app.use(express.json({ limit: '20mb' }));
app.use(cors({ origin: 'http://localhost:3000' }));
const port = Number.parseInt(process.env.PORT);

// we can now see in the console which requests were sent
app.use(morgan('dev'));
app.use('/login', loginRoutes);
app.use('/activities',activityRoutes);
app.use('/db',dbRoutes);
app.use('/users',usersRoutes);

// Handle all sorts of errors that are thrown
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

app.listen(port, () => console.log(`Server deschis pe port ${port}`));
