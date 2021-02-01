<template>
  <tr @click="travel()">
    <td class="p-2 font-weight-bold">
      <p v-if="bug.closed === true" class="text-success">
        Resolved
      </p>
      <p v-if="bug.closed === false" class="text-danger">
        Unresolved
      </p>
    </td>
    <td class="p-2">
      <p>{{ bug.title }}</p>
    </td>
    <td class="p-2">
      <p>{{ bug.userId.name }}</p>
    </td>
    <td class="p-2">
      {{ bug.updatedAt.slice(0, 10) }}
    </td>
  </tr>
</template>
<script>
import { useRouter } from 'vue-router'
export default {
  props: {
    bug: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const router = useRouter()
    return {
      travel() {
        router.push({ name: 'BugInfo', params: { id: props.bug.id } })
      }
    }
  }
}
</script>
<style scoped>
  td{
    width: 20vw
  }
  p {
    margin-bottom: 0;
  }
</style>
