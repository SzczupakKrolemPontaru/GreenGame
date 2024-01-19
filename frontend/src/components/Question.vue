/* eslint-disable */
<template>
  <div>
    <Quiz :questions="questions" @start-quiz="handleStartQuiz"/>
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
      questions: [],
      selectedQuizId: null,
    };
  },
  methods: {
    async created(selectedQuizId) {
      const quizDAO = new QuizDAO();
      const quizFromFirestore = await quizDAO.getQuiz(selectedQuizId);

      if (quizFromFirestore) {
        this.questions = quizFromFirestore.questions;
        console.log(this.questions[0].correctIndex)
      } else {
        console.error('Nie udało się pobrać pytań z Firestore.');
      }
    },

    handleStartQuiz(quizId) {
      this.selectedQuizId = quizId;
      this.created(this.selectedQuizId);
    },
  }

};
</script>
/* eslint-disable */