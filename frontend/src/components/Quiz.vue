<template>
  <div>
    <h3>{{ q }}</h3>
    <div v-for="(answer, ansIndex) in a" :key="ansIndex">
      <label>
        {{ answer }}
      </label>
    </div>
  </div>
</template>

<script>

export default {
  name:"Quiz",
  props: {
    q: String,
    a: Array,
    c: Number
  },
  data() {
    return {
    };
  }
};
</script>
