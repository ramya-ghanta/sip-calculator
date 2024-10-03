<template>
  <div>
    <h1 style="text-align: center">SIP Calculator</h1>
    <SIPOptions @onInvestmentTypeChange="onInvestmentTypeChange" />
    <div>
      <div v-if="investmentType != 'Lumpsum'" :class="$style.options">
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
                  style="line-height: 18px; font-size: medium"
                  :class="$style['text-box']"
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
          :step="1"
          :tooltips="false"
          :lazy="false"
          @update="onValueChange()"
        />
      </div>
      <div v-if="investmentType === 'Lumpsum'" :class="$style.options">
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
                  v-if="showLumpInvestmentText && !showError"
                  @click="showLumpInvestmentText = false"
                  style="line-height: 18px; font-size: medium"
                  :class="$style['text-box']"
                >
                  {{ formatPrice(lumpInvestment) }}
                </div>
                <input
                  type="number"
                  v-model="lumpInvestment"
                  :class="$style['text-box']"
                  @blur="showLumpInvestmentText = true"
                  v-else
                />
              </div>
            </div>
          </div>
        </div>
        <Slider
          v-model="lumpInvestment"
          :max="200000000"
          :step="investmentInterval"
          :tooltips="false"
          :lazy="false"
          @update="onValueChange()"
        />
      </div>
      <div v-if="investmentType == 'swp'" :class="$style.options">
        <div :class="$style.category">
          <span> Withdrawl Per Month </span>
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
                  v-if="showSwpWithdrawlText && !showError"
                  @click="showSwpWithdrawlText = false"
                  style="line-height: 18px; font-size: medium"
                  :class="$style['text-box']"
                >
                  {{ formatPrice(investment) }}
                </div>
                <input
                  type="number"
                  v-model="swpWithdrawl"
                  :class="$style['text-box']"
                  @blur="showSwpWithdrawlText = true"
                  v-else
                />
              </div>
            </div>
          </div>
        </div>
        <Slider
          v-model="swpWithdrawl"
          :max="1000000"
          :step="1"
          :tooltips="false"
          :lazy="false"
          @update="onValueChange()"
        />
      </div>
      <div v-if="investmentType == 'step'" :class="$style.options">
        <div :class="$style.category">
          <span> Annual step up (%) </span>
          <div style="display: flex; justify-content: flex-end">
            <span v-if="stepup < 1" :class="$style.tooltip">
              <i class="fas fa-exclamation-circle"></i>
              <span :class="$style['tooltip-text']" style="left: -700%"
                >Value must greater than 1</span
              >
            </span>
            <div :class="$style['input-field']">
              <input type="number" v-model="stepup" min="1" :class="$style['text-box']" />
            </div>
          </div>
        </div>
        <Slider
          v-model="stepup"
          :max="50"
          :step="1"
          :tooltips="false"
          :lazy="false"
          @update="onValueChange()"
        />
      </div>
      <div v-if="investmentType == 'step'" :class="$style.options">
        <div :class="$style.category">
          <span> Annual step up (%) </span>
          <div style="display: flex; justify-content: flex-end">
            <span v-if="stepup < 1" :class="$style.tooltip">
              <i class="fas fa-exclamation-circle"></i>
              <span :class="$style['tooltip-text']" style="left: -700%"
                >Value must greater than 1</span
              >
            </span>
            <div :class="$style['input-field']">
              <input type="number" v-model="stepup" min="1" :class="$style['text-box']" />
            </div>
          </div>
        </div>
        <Slider
          v-model="stepup"
          :max="50"
          :step="1"
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
    <SIPOutput />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import {
  calculateSIP,
  calculateLump,
  calculateStepUpSIP,
  calculateYearlySIP
} from './sip-calculator';
import SIPOutput from './sip-output.vue';
import SIPOptions from './sip-options.vue';
import Slider from '@vueform/slider';
import { useMainStore } from '../store';
import { storeToRefs } from 'pinia';

const { investmentValue, estimatedReturnsValue, totalReturensValue } = storeToRefs(useMainStore());

const emits = defineEmits(['update']);

const investment = ref(25000);
const lumpInvestment = ref(100000);
const swpWithdrawl = ref(10000);
const expectedReturn = ref(12);
const timePeriod = ref(10);
const totalInvestment = ref(0);
const estimatedReturns = ref(0);
const stepup = ref(10);
const totalReturn = ref(0);
const showInvestmentText = ref(true);
const showLumpInvestmentText = ref(true);
const showSwpWithdrawlText = ref(true);
const investmentType = ref('SIP');
const showError = computed(() =>
  investmentType.value === 'Lumpsum' ? lumpInvestment.value < 100 : investment.value < 100
);
const investmentInterval = ref(1);

onMounted(() => {
  onValueChange();
});

const investmentTitle = computed(() =>
  investmentType.value === 'SIP' || investmentType.value === 'step'
    ? 'Monthly Investment'
    : 'Total Investment'
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
    maximumFractionDigits: 0
  }).format(price);
};

const onValueChange = () => {
  const calculateReturns: any = () => {
    if (investmentType.value === 'SIP') {
      return calculateSIP(timePeriod.value, investment.value, expectedReturn.value);
    } else if (investmentType.value === 'Lmpsum') {
      return calculateLump(timePeriod.value, lumpInvestment.value, expectedReturn.value);
    } else if (investmentType.value === 'step') {
      return calculateStepUpSIP(
        timePeriod.value,
        investment.value,
        stepup.value,
        expectedReturn.value
      );
    } else if (investmentType.value === 'yearly') {
      return calculateYearlySIP(investment.value, expectedReturn.value, timePeriod.value);
    }
  };

  const {
    totalInvestment: totalInvestedAmount,
    estimatedReturns: finalEstimatedReturns,
    totalReturn: finalReturns
  } = calculateReturns();

  totalInvestment.value = totalInvestedAmount;
  investmentValue.value = totalInvestedAmount;
  estimatedReturnsValue.value = finalEstimatedReturns;
  totalReturensValue.value = finalReturns;
  estimatedReturns.value = finalEstimatedReturns;
  totalReturn.value = finalReturns;

  emits('update', {
    totalInvestment: totalInvestment.value,
    estimatedReturns: estimatedReturns.value,
    totalReturn: totalReturn.value,
    expectedReturn: expectedReturn.value,
    investment: investmentType.value === 'Lumpsum' ? lumpInvestment.value : investment.value,
    investmentType: investmentType.value,
    years: timePeriod.value,
    stepup: stepup.value
  });
};

let sipInvestment = 25000;
let LumpsumInvestment = 25000;
let stepInvestment = 25000;
let yearlyInvestment = 25000;

watch(investmentType, (newValue, oldValue) => {
  if (oldValue === 'SIP') {
    sipInvestment = investment.value;
  } else if (oldValue === 'Lumpsum') {
    LumpsumInvestment = investment.value;
  } else if (oldValue === 'step') {
    stepInvestment = investment.value;
  } else if (oldValue === 'yearly') {
    yearlyInvestment = investment.value;
  }

  if (newValue === 'SIP') {
    investment.value = sipInvestment;
  } else if (newValue === 'Lumpsum') {
    investment.value = LumpsumInvestment;
  } else if (newValue === 'step') {
    investment.value = stepInvestment;
  } else if (newValue === 'yearly') {
    investment.value = yearlyInvestment;
  }
});
</script>

<style src="@vueform/slider/themes/default.css"></style>

<style module>
.options {
  display: flex;
  flex-direction: column;
  padding-bottom: 4%;
  gap: 1rem;
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

.text-box {
  border: none;
  background: transparent;
  text-align: right;
  outline: 0px;
  background-color: #c1efd4;
  opacity: 1;
  padding: 0.2rem;
  width: 86px;
  font-size: medium;
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
  padding-right: 2px;
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

@media (max-width: 600px) {
  .option {
    flex: auto;
  }
}
</style>
