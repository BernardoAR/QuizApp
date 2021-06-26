<template>
  <div>
    <b-container>
      <b-card class="col-md-8 mt-5 mx-auto">
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
            @click="checkAnswer"
            pill
            >Finish Quiz</b-button
          >
        </b-card-body>
      </b-card>
    </b-container>
  </div>
</template>

<script>
import Questions from "../services/questions";
import Header from "./Header.vue";
import Answers from "./Answers.vue";
import * as he from "he";
export default {
  components: { Header, Answers },
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
    changePage(id) {
      this.id = id;
      this.question = he.decode(this.triviaQuestions[id].question);
      this.$refs.answers.cleanValues();
      this.changeAnswers(id);
    },
    changeAnswers(id) {
      this.$refs.answers.answers = [
        ...this.triviaQuestions[id].incorrect_answers,
      ]
        .concat(this.triviaQuestions[id].correct_answer)
        .sort();
    },
    checkAnswer() {
      this.answered[this.id] = this.$refs.answers.checkAnswer(
        this.triviaQuestions[this.id].correct_answer
      );
      this.$refs.header.answered = this.answered;
    },
  },

  data() {
    return {
      id: 0,
      length: 0,
      question: "",
      triviaQuestions: [],
      answered: {},
    };
  },
};
</script>