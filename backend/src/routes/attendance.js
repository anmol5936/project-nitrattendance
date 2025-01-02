const express = require('express');
const attendanceController = require('../controllers/attendanceController');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/mark',
  auth,
  attendanceController.markAttendance
);

router.get('/history',
  auth,
  attendanceController.getAttendanceHistory
);

module.exports = router;