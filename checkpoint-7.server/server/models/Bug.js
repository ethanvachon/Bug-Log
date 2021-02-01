import mongoose from 'mongoose'
const Schema = mongoose.Schema

const Bug = new Schema(
  {
    closed: { type: Boolean, default: false },
    description: { type: String, required: true },
    title: { type: String, required: true },
    userId: { type: String, ref: 'Account', required: true },
    closedDate: { type: String }
  }, { timestamps: true, toJSON: { virtuals: true } }
)

Bug.virtual('user', {
  localField: 'userId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})

export default Bug
