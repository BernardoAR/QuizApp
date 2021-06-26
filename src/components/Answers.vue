<template>
  <div class="d-grid gap-2 col-10 mx-auto">
    <b-button
      squared
      class="btn-block"
      :variant="isSelected(key)"
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
      key: [],
      indexSelected: null,
      correct: null,
      incorrect: null,
      selected: "",
      answers: [],
    };
  },
  methods: {
    isSelected(key) {
      if (this.indexSelected == key) return "primary";
      else return "outline-primary";
    },
    select(key) {
      this.indexSelected = key;
    },
  },
};
</script>

<style>
</style>