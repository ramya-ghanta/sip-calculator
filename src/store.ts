import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useMainStore = defineStore('counter', () => {
  const investmentValue = ref(0);
  const estimatedReturnsValue = ref(0);
  const totalReturnsValue = ref(0);
  const menuOpen = ref(false);

  return { investmentValue, estimatedReturnsValue, totalReturnsValue, menuOpen };
});
