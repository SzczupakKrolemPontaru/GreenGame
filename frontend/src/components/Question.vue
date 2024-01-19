/* eslint-disable */
<template>
  <div>
    <Quiz :questions="questions"/>
  </div>
</template>

<script>
import Quiz from './Quiz.vue';
import { QuizDAO } from '@/firebase/quizDAO';

export default {
  name: "Question",
  components: {
    Quiz
  },
  data() {
    return {
      questions: []
    };
  },
    async created() {
      const quizDAO = new QuizDAO();

      const quizFromFirestore = await quizDAO.getQuiz("Quiz1");

      if (quizFromFirestore) {
        this.questions = quizFromFirestore.questions;
      } else {
        console.error('Nie udało się pobrać pytań z Firestore.');
      }
    }

};
</script>
/* eslint-disable */