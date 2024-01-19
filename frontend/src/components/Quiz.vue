/* eslint-disable */
<template>
  <div class="quiz-container">
    <div v-if="isOnTitlePage" class="title-page">
      <h1>Witaj w Quizie!</h1>
      <div class="quiz-box-container">
        <div
            v-for="box in quizBoxes"
            :key="box.id"
            class="quiz-box"
            :class="{ 'selected': selectedBoxId === box.id }"
            @click="selectBox(box.id)">
          {{ box.name }}
        </div>
      </div>
      <button @click="startQuiz">Rozpocznij Quiz</button>
    </div>

    <div v-else>
      <div v-if="currentQuestionIndex < questions.length" class="question-card">
        <div class="alert alert-danger" role="alert" v-if="showAlert">
        Udało ci się wykonać Quiz!
        </div>
        <h3>{{ questions[currentQuestionIndex].question }}</h3>
        <div class="answer-options">
          <div
              v-for="(answer, ansIndex) in questions[currentQuestionIndex].answers"
              :key="ansIndex"
              class="answer"
              :class="{'selected': selectedAnswerIndex === ansIndex}"
              @click="selectAnswer(ansIndex)"
          >
            <span v-if="answered && selectedAnswerIndex === ansIndex && selectedAnswerCorrect">✔️ {{ answer }}</span>
            <span v-else-if="answered && selectedAnswerIndex === ansIndex && !selectedAnswerCorrect">❌ {{ answer }}</span>
            <span v-else>{{ answer }}</span>
          </div>
        </div>
        <button @click="checkAnswer">Sprawdź</button>
        <button @click="nextQuestion" v-if="answered">Następne</button>
        <button @click="exitQuiz" class="exit-quiz-button">Wyjdź z Quizu</button>
      </div>
      <div v-else class="result-card">
        <h3>Wynik: {{ score }} / {{ questions.length }}</h3>
        <p v-if="score === 5">Gratulacje!</p>
        <p v-else>Niestety, nie udało się.</p>
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
      quizBoxes: [
        { id: "Quiz1", name: 'Quiz 1' },
        { id: "Quiz2", name: 'Quiz 2' },
        { id: "Quiz3", name: 'Quiz 3' }
      ],
      selectedBoxId: null,
      answered: false,
      //showAlert: false,
    };
  },
  methods: {
    selectBox(id) {
      this.selectedBoxId = id;
    },
    selectAnswer(ansIndex) {
      if (!this.answered) {
        this.selectedAnswerIndex = ansIndex;
      }
    },
    checkAnswer() {
      if (this.selectedAnswerIndex !== null) {
        const correctAnswerIndex = this.questions[this.currentQuestionIndex].correctIndex;
        this.selectedAnswerCorrect = this.selectedAnswerIndex === correctAnswerIndex;
        if (this.selectedAnswerCorrect) {
          this.score++;
        }
        this.answered = true;
      }
    },
    nextQuestion() {
      if (this.currentQuestionIndex < this.questions.length - 1) {
        this.currentQuestionIndex++;
      } else {
        this.exitQuiz();
      }
      this.selectedAnswerIndex = null;
      this.selectedAnswerCorrect = null;
      this.answered = false;
    },
    exitQuiz() {
      this.isOnTitlePage = true;
      this.resetQuiz();
    },
    startQuiz() {
      this.isOnTitlePage = false;
      this.$emit('start-quiz', this.selectedBoxId);
    },
    resetQuiz() {
      this.currentQuestionIndex = 0;
      this.score = 0;
      this.selectedAnswerIndex = null;
      this.selectedBoxId = null;
      this.answered = false;
    },
  },
  watch: {
    score(){
      if (this.score === 5) {
        this.showAlert = true;
        setTimeout(() => {
          this.showAlert = false; 
          this.$router.push({ name: 'gamechoose' });
        }, 3000);
        
      }
    
    }
  }
};
</script>

<style scoped>

.quiz-box-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-bottom: 20px;
}

.quiz-box {
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
}

.quiz-box.selected {
  border-color: #007bff;
  background-color: #e7f0fd;
}


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
  background-color: #71badd;
  color: #fff;
  border-color: #71badd;
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
/* eslint-disable */