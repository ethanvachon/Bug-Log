import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = mongoose.Schema.Types.ObjectId

const Note = new Schema(
  {
    body: { type: String, required: true },
    bug: { type: ObjectId, ref: 'Bug', required: true },
    userId: { type: String, ref: 'Account', required: true }
  }, { timestamps: true, toJSON: { virtuals: true } }
)

Note.virtual('user', {
  localField: 'userId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})

export default Note
