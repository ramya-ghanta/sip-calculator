<template>
  <div :class="$style.output">
    <div :class="$style.category">
      Invested Amount
      <span
        >&#8377;{{ formatCurrencyValue(investmentValue) }} ({{
          formatPrice(investmentValue)
        }})</span
      >
    </div>
    <div :class="$style.category">
      Est. returns<span
        >&#8377;{{ formatCurrencyValue(estimatedReturnsValue) }} ({{
          formatPrice(estimatedReturnsValue)
        }})</span
      >
    </div>
    <div :class="$style.category">
      Future Value<span
        >&#8377;{{ formatCurrencyValue(totalReturensValue) }} ({{
          formatPrice(totalReturensValue)
        }})</span
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatCurrencyValue } from './sip-calculator';
import { useMainStore } from '../store';
import { storeToRefs } from 'pinia';

const { investmentValue, estimatedReturnsValue, totalReturensValue } = storeToRefs(useMainStore());

const formatPrice = (price: number) => {
  if (isNaN(price)) {
    price = 0;
  }

  return new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: 0
  }).format(price);
};
</script>

<style module>
.category {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
}

.output {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border: 1px solid rgb(209, 207, 207);
  border-radius: 5px;
  box-shadow:
    -3px -3px 3px rgba(222, 221, 221, 0.75),
    3px 3px 3px rgba(222, 221, 221, 0.75);
  padding: 1rem;
}
</style>
