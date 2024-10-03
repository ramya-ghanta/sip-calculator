import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useMainStore = defineStore('counter', () => {
  const investmentValue = ref(0);
  const estimatedReturnsValue = ref(0);
  const totalReturensValue = ref(0);

  return { investmentValue, estimatedReturnsValue, totalReturensValue };
});
