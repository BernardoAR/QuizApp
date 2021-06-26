<template>
  <b-card-header>
    <b-row>
      <b-button
        class="col-sm-1 ms-1 mt-1 nowrap"
        squared
        :disabled="disabled"
        :variant="changeColor(key)"
        @click="selectPage(key)"
        v-for="(number, key) in length"
        :key="number"
        >{{ number }}</b-button
      >
    </b-row>
  </b-card-header>
</template>

<script>
export default {
  props: ["length", "disabled"],
  data() {
    return {
      answered: [],
      indexSelected: 0,
    };
  },
  methods: {
    changeColor(key) {
      if (this.answered[key] == null) {
        if (this.indexSelected == key) return "primary";
        else return "outline-primary";
      }
      if (this.answered[key].isCorrect) return "success";
      else return "danger";
    },
    selectPage(key) {
      this.indexSelected = key;
      this.$emit("changePage", key);
    },
  },
};
</script>

<style scoped>
.nowrap {
  white-space: nowrap;
}
</style>