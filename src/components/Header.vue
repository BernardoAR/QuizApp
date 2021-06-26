<template>
  <b-card-header>
    <b-row>
      <b-button
        class="col-sm-1 ms-1 mt-1 nowrap"
        squared
        :variant="isSelected(key)"
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
  props: ["length"],
  data() {
    return {
      answered: [],
      indexSelected: 0,
    };
  },
  methods: {
    isSelected(key) {
      if (this.answered[key] == null) {
        if (this.indexSelected == key) return "primary";
        else return "outline-primary";
      }
      if (this.answered[key].isCorrect) return "success";
      if (!this.answered[key].isCorrect) return "danger";
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