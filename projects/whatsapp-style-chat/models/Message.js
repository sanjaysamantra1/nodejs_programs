import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema(
  {
    from: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true, required: true },
    to: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true, required: true },
    content: { type: String, required: true },
    readAt: { type: Date, default: null }
  },
  { timestamps: true }
);

MessageSchema.index({ from: 1, to: 1, createdAt: 1 });

export default mongoose.model('Message', MessageSchema);
