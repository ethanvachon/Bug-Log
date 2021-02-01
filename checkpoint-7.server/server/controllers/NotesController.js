import { notesService } from '../services/NotesService'
import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'

export class NotesController extends BaseController {
  constructor() {
    super('api/notes')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .delete('/:id', this.delete)
      .put('/:id', this.edit)
  }

  async create(req, res, next) {
    try {
      req.body.userId = req.userInfo.id
      res.send(await notesService.create(req.body))
    } catch (error) {
      next(error)
    }
  }

  edit(req, res, next) {
    try {
      req.body.userId = req.userInfo.id
      req.body.id = req.params.id
      res.send(notesService.edit(req.body))
    } catch (error) {
      next(error)
    }
  }

  async delete(req, res, next) {
    try {
      const query = { _id: req.params.id, userId: req.userInfo.id }
      res.send(await notesService.delete(query))
    } catch (error) {
      next(error)
    }
  }
}
