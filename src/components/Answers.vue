<template>
  <div class="d-grid gap-2 col-10 mx-auto">
    <b-button
      squared
      class="btn-block"
      :variant="isSelected(key)"
      v-for="(value, key) in answers"
      :key="value"
      @click="select(key)"
      >{{ value }}</b-button
    >
  </div>
</template>

<script>
export default {
  props: ["answers"],
  data() {
    return {
      key: [],
      indexSelected: null,
      selected: "",
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