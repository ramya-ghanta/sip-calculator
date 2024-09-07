<template>
  <div>
    <h1 style="text-align: center">SIP Calculator</h1>
    <div>
      <div :class="$style.toggleContainer">
        <div
          :class="[$style.option, investmentType === 'SIP' ? $style.selected : '']"
          @click="onInvestmentTypeChange('SIP')"
        >
          SIP
        </div>
        <div
          :class="[$style.option, investmentType === 'Lumpsum' ? $style.selected : '']"
          @click="onInvestmentTypeChange('Lumpsum')"
        >
          Lumpsum
        </div>
      </div>
    </div>
    <div>
      <div :class="$style.options">
        <div :class="$style.category">
          <span> {{ investmentTitle }} </span>
          <div style="display: flex; justify-content: flex-end">
            <span v-if="showError" :class="$style.tooltip">
              <i class="fas fa-exclamation-circle"></i>
              <span :class="$style['tooltip-text']" style="left: -1425%"
                >Value must be between 100 and 1,000,000</span
              >
            </span>
            <div :class="$style['input-field']">
              <div>
                <div
                  v-if="showInvestmentText && !showError"
                  @click="showInvestmentText = false"
                  style="width: 64px; display: flex; justify-content: flex-end"
                >
                  {{ formatPrice(investment) }}
                </div>
                <input
                  type="number"
                  v-model="investment"
                  :class="$style['text-box']"
                  @blur="showInvestmentText = true"
                  v-else
                />
              </div>
            </div>
          </div>
        </div>
        <Slider
          v-model="investment"
          :max="1000000"
          :step="investmentInterval"
          :tooltips="false"
          :lazy="false"
          @update="onValueChange()"
        />
      </div>
      <div :class="$style.options">
        <div :class="$style.category">
          <span> Expected Return (%) </span>
          <div style="display: flex; justify-content: flex-end">
            <span v-if="expectedReturn < 1" :class="$style.tooltip">
              <i class="fas fa-exclamation-circle"></i>
              <span :class="$style['tooltip-text']" style="left: -700%"
                >Value must greater than 1</span
              >
            </span>
            <div :class="$style['input-field']">
              <input type="number" v-model="expectedReturn" min="1" :class="$style['text-box']" />
            </div>
          </div>
        </div>
        <Slider
          v-model="expectedReturn"
          :max="30"
          :step="0.1"
          :tooltips="false"
          :lazy="false"
          @update="onValueChange()"
        />
      </div>
      <div :class="$style.options">
        <div :class="$style.category">
          <span> Time Period (Yr) </span>
          <div style="display: flex; justify-content: flex-end">
            <span v-if="timePeriod < 1" :class="$style.tooltip">
              <i class="fas fa-exclamation-circle"></i>
              <span :class="$style['tooltip-text']" style="left: -700%"
                >Value must greater than 1</span
              >
            </span>
            <div :class="$style['input-field']">
              <input type="number" v-model="timePeriod" min="1" :class="$style['text-box']" />
            </div>
          </div>
        </div>

        <Slider
          v-model="timePeriod"
          :max="60"
          :step="1"
          :tooltips="false"
          :lazy="false"
          @update="onValueChange()"
        />
      </div>
    </div>

    <div :class="$style.output">
      <div :class="$style.category">
        Invested Amount
        <span>{{ formatPrice(totalInvestment) }}</span>
      </div>
      <div :class="$style.category">
        Est. returns<span>{{ formatPrice(estimatedReturns) }}</span>
      </div>
      <div :class="$style.category">
        Future Value<span>{{ formatPrice(totalReturn) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { calculateSIP, calculateLump } from './sip-calculator';
import Slider from '@vueform/slider';

const emits = defineEmits(['update']);

const investment = ref(0);
const expectedReturn = ref(0);
const timePeriod = ref(0);
const totalInvestment = ref(0);
const estimatedReturns = ref(0);
const totalReturn = ref(0);
const showInvestmentText = ref(true);
const investmentType = ref('SIP');
const showError = computed(() => investment.value < 100);
const investmentInterval = ref(1);

onMounted(() => {
  investment.value = 25000;
  expectedReturn.value = 12;
  timePeriod.value = 10;
  onValueChange();
});

const investmentTitle = computed(() =>
  investmentType.value === 'SIP' ? 'Monthly Investment' : 'Total Investment'
);

const onInvestmentTypeChange = (type: string) => {
  investmentType.value = type;
  onValueChange();
};

const formatPrice = (price: number) => {
  if (isNaN(price)) {
    price = 0;
  }

  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(price);
};

const onValueChange = () => {
  investmentInterval.value = investment.value < 500 ? 1 : investment.value < 100000 ? 500 : 5000;

  const {
    totalInvestment: totalInvestedAmount,
    estimatedReturns: finalEstimatedReturns,
    totalReturn: finalReturns
  } = investmentType.value === 'SIP'
    ? calculateSIP(timePeriod.value, investment.value, expectedReturn.value)
    : calculateLump(timePeriod.value, investment.value, expectedReturn.value);

  totalInvestment.value = totalInvestedAmount;
  estimatedReturns.value = finalEstimatedReturns;
  totalReturn.value = finalReturns;

  emits('update', {
    totalInvestment: totalInvestment.value,
    estimatedReturns: estimatedReturns.value,
    totalReturn: totalReturn.value,
    expectedReturn: expectedReturn.value,
    investment: investment.value,
    investmentType: investmentType.value,
    years: timePeriod.value
  });
};
</script>

<style src="@vueform/slider/themes/default.css"></style>

<style module>
.options {
  display: flex;
  flex-direction: column;
  padding-bottom: 5%;
  gap: 0.5rem;
}

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

.toggleContainer {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.option {
  padding: 5px 20px;
  border-radius: 20px;
  cursor: pointer;
  background-color: #f9f9f9;
  text-align: center;
}

.selected {
  background-color: #10b981;
  color: white;
}

.text-box {
  border: none;
  text-align: right;
  outline: 0px;
  background-color: #fbfbfa;
  width: 60px;
  font-size: medium;
}

.input-field {
  border-bottom: 1px dashed #10b981;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type='number'] {
  -moz-appearance: textfield;
}

.tooltip {
  position: relative;
  cursor: pointer;
  color: red;
}

.tooltip-text {
  content: attr(title);
  visibility: hidden;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 5px;
  padding: 5px;
  position: absolute;
  z-index: 1;
  top: 50%;
  transform: translateY(-50%);
  white-space: nowrap;
}

.tooltip:hover .tooltip-text {
  visibility: visible;
}
</style>
