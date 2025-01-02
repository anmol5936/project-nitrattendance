const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  class: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['present', 'absent'],
    required: true
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  verificationMethod: {
    type: String,
    enum: ['biometric', 'geofence', 'both'],
    required: true
  },
  isMockLocation: {
    type: Boolean,
    default: false
  },
  verifiedAt: {
    type: Date,
    default: Date.now
  }
});

// Index for geospatial queries
attendanceSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Attendance', attendanceSchema);