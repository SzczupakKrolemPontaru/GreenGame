<template>
  <div class="home">
    <Quiz/>
  </div>
</template>

<script>
// @ is an alias to /src
import Quiz from '@/components/Quiz.vue'

export default {
  name: 'HomeView',
  components: {
    Quiz
  }
}
</script>
