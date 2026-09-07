const mongoose = require('mongoose');

const preferenceSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
      index: true
    },
    tempUnit: {
      type: String,
      enum: ['celsius', 'fahrenheit'],
      default: 'celsius'
    },
    windUnit: {
      type: String,
      enum: ['kmh', 'mph'],
      default: 'kmh'
    },
    theme: {
      type: String,
      enum: ['light', 'dark', 'system'],
      default: 'system'
    },
    dashboardSections: {
      precip: { type: Boolean, default: true },
      celestial: { type: Boolean, default: true },
      airQuality: { type: Boolean, default: true },
      map: { type: Boolean, default: true },
      compare: { type: Boolean, default: true },
      timeline: { type: Boolean, default: true },
      risk: { type: Boolean, default: true }
    },
    defaultLocation: {
      name: { type: String, default: 'London' },
      latitude: { type: Number, default: 51.5072 },
      longitude: { type: Number, default: -0.1276 }
    }
  },
  {
    timestamps: true
  }
);

preferenceSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.__v;
  return obj;
};

module.exports = mongoose.model('Preference', preferenceSchema);
