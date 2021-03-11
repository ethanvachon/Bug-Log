<template>
  <div class="home flex-grow-1 d-flex flex-column">
    <table border="2" class="mt-5">
      <tr class="font-weight-bold">
        <td @click="filter()">
          Status
        </td>
        <td id="title">
          Title
        </td>
        <td>Reported By</td>
        <td>Date</td>
      </tr>
      <bug-component v-for="bug in state.bugs" :key="bug._id" :bug="bug">
      </bug-component>
    </table>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { bugsService } from '../services/BugsService'
import { AppState } from '../AppState'
export default {
  name: 'Home',
  setup() {
    const state = reactive({
      bugs: computed(() => AppState.bugs),
      filtered: 'Resolved'
    })
    onMounted(() => {
      bugsService.getBugs()
    })
    return {
      state,
      async filter() {
        if (state.filtered === 'Resolved') {
          await bugsService.getBugs()
          AppState.bugs = AppState.bugs.filter(b => b.closed === false)
          state.filtered = 'Unresolved'
        } else if (state.filtered === 'Unresolved') {
          await bugsService.getBugs()
          AppState.bugs = AppState.bugs.filter(b => b.closed === true)
          state.filtered = 'Resolved'
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
.home{
  text-align: center;
  user-select: none;
  > img{
    height: 200px;
    width: 200px;
  }
}
#title {
  width: 35vw;
}
</style>
