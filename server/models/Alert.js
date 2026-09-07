const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    location: {
      name: { type: String, required: true },
      latitude: { type: Number, required: true },
      longitude: { type: Number, required: true }
    },
    alertType: {
      type: String,
      enum: ['rain', 'temp_high', 'temp_low', 'wind', 'aqi'],
      required: true
    },
    threshold: {
      type: Number,
      required: true
    },
    enabled: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

alertSchema.index({ userId: 1, alertType: 1 });

alertSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.__v;
  return obj;
};

module.exports = mongoose.model('Alert', alertSchema);
