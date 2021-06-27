<template>
  <div>
    <b-container>
      <b-card class="col-md-8 mt-5 mx-auto">
        <div v-if="finishedQuiz">
          <FinalResult ref="finalResult"></FinalResult>
        </div>
        <div v-else>
          <Header
            :length="length"
            :answered="answered"
            @changePage="changePage"
            ref="header"
          ></Header>
          <b-card-body class="text-center">
            <b-card-title>{{ question }}</b-card-title>
            <Answers ref="answers"></Answers>
            <b-button class="mt-3" variant="primary" @click="checkAnswer" pill
              >Answer</b-button
            >
            <b-button
              class="ms-3 mt-3"
              variant="primary"
              @click="finishQuiz"
              pill
              >Finish Quiz</b-button
            >
          </b-card-body>
        </div>
      </b-card>
    </b-container>
  </div>
</template>

<script>
import Questions from "../services/questions";
import Header from "./Header.vue";
import Answers from "./Answers.vue";
import * as he from "he";
import FinalResult from "./FinalResult.vue";
export default {
  components: { Header, Answers, FinalResult },
  created() {
    Questions.list().then((response) => {
      let results = response.data.results;
      this.triviaQuestions = results;
      this.length = results.length;
      this.changePage(0);
      this.changeAnswers(0);
    });
  },

  methods: {
    finishQuiz() {
      this.finishedQuiz = true;
      this.$nextTick(function () {
        this.$refs.finalResult.length = this.length;
        this.$refs.finalResult.correctAnswers = this.correctAnswers;
      });
    },
    changePage(id) {
      this.id = id;
      this.question = he.decode(this.triviaQuestions[id].question);
      this.$refs.answers.cleanValues();
      this.changeAnswers(id);
      this.changeDisabled(id);
    },
    changeDisabled(id) {
      if (this.answered[id] != null) {
        this.$refs.answers.correct = this.answered[id].correct;
        this.$refs.answers.incorrect = this.answered[id].incorrect;
        this.$refs.answers.disabled = true;
      }
    },
    changeAnswers(id) {
      this.$refs.answers.answers = [
        ...this.triviaQuestions[id].incorrect_answers,
      ]
        .concat(this.triviaQuestions[id].correct_answer)
        .sort();
    },
    checkAnswer() {
      if (this.answered[this.id] == null) {
        this.answered[this.id] = this.$refs.answers.checkAnswer(
          this.triviaQuestions[this.id].correct_answer
        );
        this.incrementCorrectAnswer();
        this.changeQuestion();
      }
    },
    incrementCorrectAnswer() {
      if (this.answered[this.id].isCorrect) this.correctAnswers++;
    },
    changeQuestion() {
      setTimeout(() => {
        this.$refs.header.answered[this.id] = this.answered[this.id];
        this.changePage(this.id + 1);
        this.$refs.header.selectPage(this.id);
      }, 500);
    },
  },

  data() {
    return {
      id: 0,
      length: 0,
      correctAnswers: 0,
      finishedQuiz: false,
      question: "",
      triviaQuestions: [],
      answered: {},
    };
  },
};
</script>