<template>
  <b-card-header>
    <b-row>
      <b-button
        class="col-sm-1 ms-1 mt-1"
        squared
        :variant="isSelected(key)"
        @click="select(key)"
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
      indexSelected: 0,
    };
  },
  methods: {
    isSelected(key) {
      if (this.indexSelected == key) return "primary";
      else return "outline-primary";
    },
    select(key) {
      this.indexSelected = key;
      this.$emit("changePage", key);
    },
  },
};
</script>

<style>
</style>