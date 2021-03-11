<template>
  <div v-if="state.bug">
    <div class="card">
      <div class="card-body">
        <h1 class="card-title">
          {{ state.bug.title }}
        </h1>
        <div v-if="state.bug.userId">
          <!-- <button class="btn btn-danger" @click="closeBug()" v-if="state.bug.userId.name === state.user.name && state.bug.closed === false">
            Close Bug
          </button>
          <i class="fas fa-edit" v-if="state.bug.userId.name === state.user.name && state.bug.closed === false" @click="state.edit = !state.edit"></i>
        </div> -->

          <div class="dropdown" v-if="state.bug.userId.name === state.user.name">
            <h6>
              ...
            </h6>
            <div class="dropdown-content">
              <p v-if="state.bug.userId.name === state.user.name && state.bug.closed === false" @click="state.edit = !state.edit">
                Edit
              </p>
              <p @click="closeBug()" v-if="state.bug.userId.name === state.user.name && state.bug.closed === false">
                Close bug
              </p>
            </div>
          </div>

          <h5 class="border-bottom pb-1" v-if="state.bug.userId">
            {{ state.bug.userId.name }}
          </h5>
          <p class="card-text pb-2" :contenteditable="state.edit" @blur="editBug">
            {{ state.bug.description }}
          </p>
        </div>
        <notes-component v-for="note in state.notes" :key="note._id" :note="note">
        </notes-component>
        <form v-if="user.isAuthenticated" @submit.prevent="addNote(state.bug.id)" class="py-2 d-flex align-items-center">
          <input placeholder="add note" type="text" v-model="state.newNote">
          <button type="submit" class="btn btn-success">
            Submit
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import { computed, onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { bugsService } from '../services/BugsService'
export default {
  setup() {
    const route = useRoute()
    const state = reactive({
      bug: computed(() => AppState.current),
      notes: computed(() => AppState.notes),
      newNote: '',
      user: computed(() => AppState.user),
      edit: false
    })
    onMounted(async() => {
      try {
        await bugsService.getOne(route.params.id)
        await bugsService.getNotes(route.params.id)
      } catch (error) {
        logger.error(error)
      }
    })
    return {
      state,
      user: computed(() => AppState.user),
      async addNote(id) {
        try {
          await bugsService.addNote(id, state.newNote)
          state.newNote = ''
        } catch (error) {
          logger.error(error)
        }
      },
      async closeBug() {
        try {
          await bugsService.closeBug(route.params.id)
        } catch (error) {
          logger.error(error)
        }
      },
      async editBug(e) {
        try {
          await bugsService.editBug(e.target.innerText, route.params.id)
        } catch (error) {
          logger.error(error)
        }
      }
    }
  }
}
</script>
<style scoped>
.card {
  width: 80vw;
  margin-left: 10vw;
  margin-top: 5vh
}
input {
  width: 50vw;
  margin-left: 5vw;
  margin-right: 5vw;
  height: 4vh
}
.btn-danger {
  position: absolute;
  top: 20px;
  right: 20px
}
.fa-edit {
  position: absolute;
  top: 20px;
  right: 140px
}

.dropdown {
  position: absolute;
  display: inline-block;
  top: 0px;
  right: 10px;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  padding: 12px 16px;
  z-index: 1;
}

.dropdown:hover .dropdown-content {
  display: block;
  height: 10vh
}
</style>
