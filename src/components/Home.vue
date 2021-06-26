<template>
  <div>
    <b-container>
      <b-card class="col-md-8 mt-5 mx-auto">
        <Header :length="length" @changePage="changePage" ref="length"></Header>
        <b-card-body class="text-center">
          <b-card-title>{{ question }}</b-card-title>
          <Answers ref="answers"></Answers>
          <b-button class="mt-3" variant="primary" pill>Answer</b-button>
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
      this.question = he.decode(this.triviaQuestions[id].question);
      this.changeAnswers(id);
    },
    changeAnswers(id) {
      this.$refs.answers.answers = [
        ...this.triviaQuestions[id].incorrect_answers,
      ]
        .concat(this.triviaQuestions[id].correct_answer)
        .sort();
    },
  },
  data() {
    return {
      selectedQuestion: 0,
      length: 0,
      question: "",
      triviaQuestions: [],
    };
  },
};
</script>