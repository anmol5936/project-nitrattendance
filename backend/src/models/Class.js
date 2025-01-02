const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  course: {
    code: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  },
  schedule: {
    dayOfWeek: {
      type: Number,
      required: true,
      min: 0,
      max: 6
    },
    startTime: {
      type: String,
      required: true
    },
    endTime: {
      type: String,
      required: true
    }
  },
  geofence: {
    center: {
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
    radius: {
      type: Number,
      required: true,
      min: 10,
      max: 1000
    }
  },
  students: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  semester: {
    type: Number,
    required: true
  },
  active: {
    type: Boolean,
    default: true
  }
});

// Index for geospatial queries
classSchema.index({ 'geofence.center': '2dsphere' });

module.exports = mongoose.model('Class', classSchema);