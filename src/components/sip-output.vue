<template>
  <div :class="$style.output">
    <div :class="$style.category">
      Invested Amount
      <span :class="$style['no-wrap']"
        >&#8377;{{ formatCurrencyValue(investment) }} ({{ formatPrice(investment) }})</span
      >
    </div>
    <div :class="$style.category">
      Return generated in {{ years }} years<span :class="$style['no-wrap']"
        >&#8377;{{ formatCurrencyValue(returns) }} ({{ formatPrice(returns) }})</span
      >
    </div>
    <div :class="$style.category">
      Total Wealth generated in {{ years }} years<span :class="$style['no-wrap']"
        >&#8377;{{ formatCurrencyValue(totalReturns) }} ({{ formatPrice(totalReturns) }})</span
      >
    </div>
    <div
      v-if="investmentType == InvestmentTypes.STEPUP || investmentType == InvestmentTypes.SWP"
      :class="$style.category"
    >
      {{ years }}th year SIP with step up<span :class="$style['no-wrap']"
        >&#8377;{{ formatCurrencyValue(stepUpReturns) }} ({{ formatPrice(stepUpReturns) }})</span
      >
    </div>
    <template v-if="investmentType == InvestmentTypes.SWP">
      <div :class="$style.category">
        Wealth when starting SWP<span :class="$style['no-wrap']"
          >&#8377;{{ formatCurrencyValue(totalReturns) }} ({{ formatPrice(totalReturns) }})</span
        >
      </div>
      <div :class="$style.category">
        Total Withdrawl made<span :class="$style['no-wrap']"
          >&#8377;{{ formatCurrencyValue(totalWithdrawls) }} ({{
            formatPrice(totalWithdrawls)
          }})</span
        >
      </div>
      <div :class="$style.category">
        Final Value<span :class="$style['no-wrap']"
          >&#8377;{{ formatCurrencyValue(finalValue) }} ({{ formatPrice(finalValue) }})</span
        >
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { InvestmentTypes } from '@/constants';
import { formatCurrencyValue } from './sip-calculator';

defineProps({
  years: {
    type: Number,
    required: true
  },
  investment: {
    type: Number,
    required: true
  },
  returns: {
    type: Number,
    required: true
  },
  totalReturns: {
    type: Number,
    required: true
  },
  totalWithdrawls: {
    type: Number,
    required: true
  },
  finalValue: {
    type: Number,
    required: true
  },
  stepUpReturns: {
    type: Number,
    required: true
  },
  investmentType: {
    type: String,
    required: true
  }
});

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
  gap: 1rem;
}

.no-wrap {
  white-space: nowrap;
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
