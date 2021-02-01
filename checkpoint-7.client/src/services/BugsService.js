import { AppState } from '../AppState'
import { api } from './AxiosService'

class BugsService {
  async getBugs() {
    const res = await api.get('api/bugs')
    AppState.bugs = res.data
  }

  async getOne(id) {
    const res = await api.get('api/bugs/' + id)
    AppState.current = res.data
  }

  async getNotes(id) {
    const res = await api.get('api/bugs/' + id + '/notes')
    AppState.notes = res.data
  }

  async addNote(id, body) {
    const res = await api.post('api/notes', { body: body, bug: id })
    this.getNotes(id)
    return res
  }

  async createBug(body) {
    const newBug = await api.post('api/bugs', body)
    this.getBugs()
    return newBug
  }

  async editNote(id, body, bugId) {
    await api.put('api/notes/' + id, { body: body })
    this.getNotes(bugId)
  }

  async editBug(body, id) {
    await api.put('api/bugs/' + id, { description: body })
    this.getOne(id)
  }

  async deleteNote(note) {
    confirm('are you sure you want to delete this note?')
    await api.delete('api/notes/' + note.id)
    this.getNotes(note.bug.id)
  }

  async closeBug(id) {
    confirm('are you sure you want to close this bug?')
    await api.delete('api/bugs/' + id)
  }
}

export const bugsService = new BugsService()
