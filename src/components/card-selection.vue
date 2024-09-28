<template>
  <div :class="$style.container">
    <Card card-type="SIP Calculator" @click="$emit('card-change', 'sip')" />
    <Card card-type="Inflation Calculator" @click="$emit('card-change', 'inflation')" />
    <Card card-type="FIRE Calculator" @click="$emit('card-change', 'fire')" />
  </div>
</template>

<script setup lang="ts">
import Card from './calcultor-card.vue';
</script>

<style module>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
}
</style>
