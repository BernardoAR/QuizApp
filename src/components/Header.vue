<template>
  <b-card-header>
    <b-row>
      <b-button
        class="col-sm-1 ms-1 mt-1"
        squared
        variant="outline-primary"
        v-for="number in length"
        :key="number"
        @click="$emit('changePage', number)"
        >{{ number }}</b-button
      >
    </b-row>
  </b-card-header>
</template>

<script>
export default {
  props: ["length"],
};
</script>

<style>
</style>