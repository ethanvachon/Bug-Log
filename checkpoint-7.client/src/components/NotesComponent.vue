<template>
  <div class="d-flex pt-2 border-top width" v-if="note">
    <p class="pr-2 pl-3 border-right bold" v-if="note.userId.name">
      {{ note.userId.name }}
    </p>
    <p class="pl-2" :contenteditable="state.edit" @blur="editNote">
      {{ note.body }}
    </p>
    <div v-if="note.userId.name === user.name">
      <i class="fas fa-trash" @click="deleteNote()"></i>
      <i class="fas fa-edit" @click="state.edit = !state.edit"></i>
    </div>
  </div>
</template>
<script>
import { computed, reactive } from 'vue'
import { AppState } from '../AppState'
import { bugsService } from '../services/BugsService'
import { logger } from '../utils/Logger'
export default {
  props: {
    note: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const state = reactive({
      edit: false
    })
    return {
      state,
      user: computed(() => AppState.user),
      async editNote(e) {
        try {
          await bugsService.editNote(props.note.id, e.target.innerText, props.note.bug.id)
        } catch (error) {
          logger.error(error)
        }
      },
      async deleteNote() {
        try {
          await bugsService.deleteNote(props.note)
        } catch (error) {
          logger.error(error)
        }
      }
    }
  }
}
</script>
<style scoped>
.fa-trash {
  position: absolute;
  right: 10px;
}
.fa-edit {
  position: absolute;
  right: 30px
}
</style>
