<template>
  <div :class="$style.card">
    <div class="container">
      <h4>{{ cardType }}</h4>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  cardType: {
    type: String,
    required: true
  }
});
</script>

<style module>
.card {
  border: 1px solid rgb(209, 207, 207);
  border-radius: 8px;
  color: grey;
  height: 150px;
  overflow: hidden;
  padding: 5%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-width: 200px;
}

.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}

@media (max-width: 1200px) {
  .card {
    height: 50px;
    padding: 1%;
    min-width: 0;
  }
}
</style>
