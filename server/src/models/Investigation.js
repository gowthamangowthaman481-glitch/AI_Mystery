import mongoose from 'mongoose';

const investigationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  scenario: { type: String, required: true },
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'], required: true },
  caseSummary: { type: String, required: true },
  suspects: { type: [mongoose.Schema.Types.Mixed], required: true },
  timeline: { type: [mongoose.Schema.Types.Mixed], required: true },
  evidence: { type: [mongoose.Schema.Types.Mixed], required: true },
  culpritId: { type: String, required: true },
  solution: { type: mongoose.Schema.Types.Mixed, required: true },
  status: { type: String, enum: ['active', 'completed'], default: 'active' },
  selectedSuspectId: String,
  isCorrect: Boolean,
  completedAt: Date
}, { timestamps: true, minimize: false });

export default mongoose.models.Investigation || mongoose.model('Investigation', investigationSchema);
