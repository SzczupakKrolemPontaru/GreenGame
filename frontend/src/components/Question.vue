<template>
  <div>
    <Quiz :q="text" :a="answers" :c="correctAnswerIndex"/>
  </div>
</template>


<script>
import Quiz from './Quiz.vue';

export default {
  name: "Question",
  components: {
    Quiz
  },
  data() {
    return {
      text: 'Które z poniższych gazów jest głównym gazem cieplarnianym, odpowiedzialnym za globalne ocieplenie?',
      answers: ['Tlen (O2)', 'Azot (N2)', 'Dwutlenek węgla (CO2)', 'Metan (CH4)'],
      correctAnswerIndex: 2
    };
  },
};
</script>
