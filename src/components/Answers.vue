<template>
  <div class="d-grid gap-2 col-10 mx-auto">
    <b-button
      squared
      class="btn-block"
      :disabled="disabled"
      :variant="changeColor(key)"
      v-for="(value, key) in answers"
      :key="value"
      :state="true"
      @click="select(key)"
      >{{ value }}</b-button
    >
  </div>
</template>

<script>
export default {
  data() {
    return {
      disabled: false,
      indexSelected: null,
      correct: null,
      incorrect: null,
      answers: [],
    };
  },
  methods: {
    cleanValues() {
      this.indexSelected = null;
      this.correct = null;
      this.incorrect = null;
    },
    checkAnswer(correct) {
      let isCorrect = false;
      if (this.answers[this.indexSelected] == correct) {
        isCorrect = true;
        this.correct = this.indexSelected;
      } else {
        this.correct = this.answers.indexOf(correct);
        this.incorrect = this.indexSelected;
      }
      return {
        isCorrect: isCorrect,
        correct: this.correct,
        incorrect: this.correct,
      };
    },
    changeColor(key) {
      if (this.incorrect == key) return "danger";
      if (this.correct == key) return "success";
      if (this.indexSelected == key) return "primary";
      return "outline-primary";
    },
    select(key) {
      this.indexSelected = key;
    },
  },
};
</script>

<style>
</style>