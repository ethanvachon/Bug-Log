import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'
class BugsService {
  async getAll(query) {
    return await dbContext.Bugs.find(query).populate('userId')
  }

  async getOne(id) {
    return await dbContext.Bugs.findById(id).populate('userId')
  }

  async create(data) {
    return await dbContext.Bugs.create(data)
  }

  async edit(body) {
    const edited = await dbContext.Bugs.findByIdAndUpdate({ _id: body.id, userId: body.userId }, body, { new: true, runValidators: true })
    if (!edited) {
      throw new BadRequest('invalid id')
    }
    return edited
  }

  async delete(body) {
    const deleted = await dbContext.Bugs.findOneAndUpdate({ _id: body.id, userId: body.userId }, { closed: true }, { new: true, runValidators: true })
    if (!deleted) {
      throw new BadRequest('invalid id')
    }
    return deleted
  }
}

export const bugsService = new BugsService()
