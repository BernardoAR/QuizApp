<template>
  <div>
    <b-container>
      <b-card class="col-md-8 mt-5 mx-auto">
        <Header :length="length" @changePage="changePage"></Header>
        <b-card-body class="text-center">
          <b-card-title>{{ question }}</b-card-title>
          <Answers :answers="answers"></Answers>
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
      this.question = he.decode(this.triviaQuestions[0].question);
      this.length = results.length;

      this.answers = [...this.triviaQuestions[0].incorrect_answers]
        .concat(this.triviaQuestions[0].correct_answer)
        .sort();
    });
  },
  methods: {
    changePage(id) {
      console.log(id);
    },
  },
  data() {
    return {
      selectedQuestion: 0,
      length: 0,
      question: "",
      answers: [],
      triviaQuestions: [],
    };
  },
};
</script>