<template>
  <!-- Button trigger modal -->

  <!-- Modal -->
  <div class="modal fade"
       id="modelId"
       tabindex="-1"
       role="dialog"
       aria-labelledby="modelTitleId"
       aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">
            Report a bug
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="createBug()">
            <input type="text" class="my-2" placeholder="title" v-model="state.newTitle">
            <input type="text" class="my-2" placeholder="description" v-model="state.newDescription">
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">
                Close
              </button>
              <button type="submit" class="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { logger } from '../utils/Logger'
import { reactive } from 'vue'
import { bugsService } from '../services/BugsService'
import { useRouter } from 'vue-router'
export default {
  setup() {
    const router = useRouter()
    const state = reactive({
      newTitle: '',
      newDescription: ''
    })
    return {
      state,
      async createBug() {
        try {
          const newBug = await bugsService.createBug({ title: state.newTitle, description: state.newDescription })
          router.push({ name: 'BugInfo', params: { id: newBug.data.id } })
        } catch (error) {
          logger.error(error)
        }
      }
    }
  }
}
</script>
<style scoped>
input{
  width: 100%
}
</style>
