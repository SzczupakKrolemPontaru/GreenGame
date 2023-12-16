<template>
  <div class="quiz-container">
    <div v-if="isOnTitlePage" class="title-page">
      <h1>Witaj w Quizie!</h1>
      <button @click="startQuiz">Rozpocznij Quiz</button>
    </div>
    <div v-else>
      <div v-if="currentQuestionIndex < questions.length" class="question-card">
        <h3>{{ questions[currentQuestionIndex].text }}</h3>
        <div class="answer-options">
          <div
              v-for="(answer, ansIndex) in questions[currentQuestionIndex].answers"
              :key="ansIndex"
              class="answer"
              :class="{
              'selected': selectedAnswerIndex === ansIndex,
              'correct': selectedAnswerCorrect && selectedAnswerIndex === ansIndex,
              'incorrect': selectedAnswerIndex === ansIndex && !selectedAnswerCorrect
              }"
              @click="selectedAnswerIndex = ansIndex"
          >
            <input type="radio" v-model="selectedAnswerIndex" :value="ansIndex" />
            {{ answer }}
          </div>
        </div>
        <button @click="checkAnswer">Sprawdź</button>
        <button @click="exitQuiz" class="exit-quiz-button">Wyjdź z Quizu</button>
      </div>
      <div v-else class="result-card">
        <h3>Wynik: {{ score }} / {{ questions.length }}</h3>
        <button @click="resetQuiz">Wybierz następny Quiz!</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Quiz",
  props: {
    questions: Array,
  },
  data() {
    return {
      selectedAnswerCorrect: null,
      isOnTitlePage: true,
      currentQuestionIndex: 0,
      score: 0,
      selectedAnswerIndex: null,
    };
  },
  methods: {
    exitQuiz() {
      this.isOnTitlePage = true;
      this.resetQuiz();
    },
    startQuiz() {
      this.isOnTitlePage = false;
    },
    checkAnswer() {
      if (this.selectedAnswerIndex !== null) {
        const correctAnswerIndex = this.questions[this.currentQuestionIndex].correctAnswerIndex;
        this.selectedAnswerCorrect = this.selectedAnswerIndex === correctAnswerIndex;
        if (this.selectedAnswerCorrect) {
          this.score++;
        }

        this.currentQuestionIndex++;
        this.selectedAnswerIndex = null;
        this.selectedAnswerCorrect = null;
      }
    },
    resetQuiz() {
      this.currentQuestionIndex = 0;
      this.score = 0;
      this.selectedAnswerIndex = null;
      this.isOnTitlePage = true;
    },
  },
};
</script>

<style scoped>
.exit-quiz-button {
  margin-right: 5px;
}
.answer-options {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin-top: 20px;
}

.answer {
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  aspect-ratio: 1;
}

.answer input[type="radio"] {
  display: none;
}
.quiz-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 600px;
  margin: 0 auto;
}

.question-card, .result-card {
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  width: 100%;
  margin-bottom: 20px;
}

.question-card h3, .result-card h3 {
  font-size: 20px;
  margin: 0;
}

.answer {
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
  margin-bottom: 10px;
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
}

.answer input[type="radio"] {
  margin-right: 10px;
}

.answer.selected {
  background-color: #4caf50;
  color: #fff;
  border-color: #4caf50;
}

button {
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s;
  display: block;
  margin: 20px auto;
}

button:hover {
  background-color: #0056b3;
}
</style>