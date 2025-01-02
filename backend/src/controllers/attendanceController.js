const Attendance = require('../models/Attendance');
const Class = require('../models/Class');
const { isLocationWithinGeofence } = require('../utils/locationUtils');

exports.markAttendance = async (req, res) => {
  try {
    const { classId, location, verificationMethod } = req.body;
    const studentId = req.user.id;

    // Find the class
    const classDoc = await Class.findById(classId);
    if (!classDoc) {
      return res.status(404).json({ message: 'Class not found' });
    }

    // Verify if student is enrolled in the class
    if (!classDoc.students.includes(studentId)) {
      return res.status(403).json({ message: 'Student not enrolled in this class' });
    }

    // Check if within geofence
    const isWithinGeofence = isLocationWithinGeofence(
      location,
      classDoc.geofence.center,
      classDoc.geofence.radius
    );

    if (!isWithinGeofence) {
      return res.status(400).json({ message: 'Location outside class geofence' });
    }

    // Create attendance record
    const attendance = new Attendance({
      student: studentId,
      class: classId,
      date: new Date(),
      status: 'present',
      location: {
        type: 'Point',
        coordinates: [location.longitude, location.latitude]
      },
      verificationMethod,
      isMockLocation: false // You should implement mock location detection
    });

    await attendance.save();

    res.status(201).json({
      message: 'Attendance marked successfully',
      attendance
    });
  } catch (error) {
    console.error('Mark attendance error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getAttendanceHistory = async (req, res) => {
  try {
    const { role, id } = req.user;
    const { classId, startDate, endDate } = req.query;

    let query = {};

    if (role === 'student') {
      query.student = id;
    } else if (role === 'teacher') {
      if (!classId) {
        return res.status(400).json({ message: 'Class ID required for teachers' });
      }
      query.class = classId;
    }

    if (startDate && endDate) {
      query.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    const attendance = await Attendance.find(query)
      .populate('student', 'name rollNumber')
      .populate('class', 'name course')
      .sort({ date: -1 });

    res.json(attendance);
  } catch (error) {
    console.error('Get attendance history error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};