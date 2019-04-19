const express = require('express');
const userRoutes = require('./user.route');
const authRoutes = require('./auth.route');
const coursRoutes = require('./cours.route');
const programmeRoutes = require('./programme.route');

const router = express.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/cours', coursRoutes);
router.use('/programme', programmeRoutes);

module.exports = router;
