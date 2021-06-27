<template>
  <b-card-body class="text-center">
    <b-card-title>Your Result:</b-card-title>
    <div class="d-grid gap-2 col-10 mx-auto">
      <label class="display-2">{{ correctAnswers }}/{{ length }}</label>
    </div>
    <b-button class="ms-3 mt-3" variant="primary" href="/" pill
      >New Quiz</b-button
    >
  </b-card-body>
</template>

<script>
export default {
  data() {
    return { correctAnswers: 0, length: 0 };
  },
};
</script>