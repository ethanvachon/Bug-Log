import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class NotesService {
  async create(data) {
    return await dbContext.Notes.create(data)
  }

  async getNotes(query) {
    return await dbContext.Notes.find(query).populate('bug').populate('userId', '-_id')
  }

  async edit(body) {
    const edited = await dbContext.Notes.findOneAndUpdate({ _id: body.id, userId: body.userId }, body, { new: true, runValidators: true })
    if (!edited) {
      throw new BadRequest('invalid id')
    }
    return edited
  }

  async delete(query) {
    const deleted = await dbContext.Notes.findOneAndDelete(query)
    if (!deleted) {
      throw new BadRequest('invalid id')
    }
    return `deleting ${deleted.body}`
  }
}

export const notesService = new NotesService()
