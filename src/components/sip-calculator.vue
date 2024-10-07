<template>
  <div>
    <h1 style="text-align: center; flex-grow: 1">{{ investmentType }} Calculator</h1>
    <div>
      <div v-if="investmentType != InvestmentTypes.LUMPSUM" :class="$style.options">
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
                  @blur="
                    {
                      scaleInvestment(), (showInvestmentText = true);
                    }
                  "
                  v-else
                />
              </div>
            </div>
          </div>
        </div>
        <Slider
          v-model="sliderValue"
          :max="380"
          :step="1"
          :tooltips="false"
          :lazy="false"
          @update="onValueChange()"
        />
      </div>
      <div v-if="investmentType === InvestmentTypes.LUMPSUM" :class="$style.options">
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
          :max="5000000"
          :step="investmentInterval"
          :tooltips="false"
          :lazy="false"
          @update="onValueChange()"
        />
      </div>
      <div
        v-if="investmentType == InvestmentTypes.STEPUP || investmentType === InvestmentTypes.SWP"
        :class="$style.options"
      >
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
          <span> Tenure Of Investment (Yr) </span>
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
    <div v-if="investmentType == InvestmentTypes.SWP">
      <div :class="$style.options">
        <div :class="$style.category">
          <span> Withdrawl Percentage Per Year (%) </span>
          <div style="display: flex; justify-content: flex-end">
            <span v-if="swpWithdrawl < 1" :class="$style.tooltip">
              <i class="fas fa-exclamation-circle"></i>
              <span :class="$style['tooltip-text']" style="left: -700%"
                >Value must greater than 1</span
              >
            </span>
            <div :class="$style['input-field']">
              <input type="number" v-model="swpWithdrawl" min="1" :class="$style['text-box']" />
            </div>
          </div>
        </div>
        <Slider
          v-model="swpWithdrawl"
          :max="30"
          :step="1"
          :tooltips="false"
          :lazy="false"
          @update="onValueChange()"
        />
      </div>
      <div :class="$style.options">
        <div :class="$style.category">
          <span> Expected Return (%) during SWP </span>
          <div style="display: flex; justify-content: flex-end">
            <span v-if="swpReturnRate < 1" :class="$style.tooltip">
              <i class="fas fa-exclamation-circle"></i>
              <span :class="$style['tooltip-text']" style="left: -700%"
                >Value must greater than 1</span
              >
            </span>
            <div :class="$style['input-field']">
              <input type="number" v-model="swpReturnRate" min="1" :class="$style['text-box']" />
            </div>
          </div>
        </div>
        <Slider
          v-model="swpReturnRate"
          :max="30"
          :step="1"
          :tooltips="false"
          :lazy="false"
          @update="onValueChange()"
        />
      </div>
      <div :class="$style.options">
        <div :class="$style.category">
          <span> SWP Time period </span>
          <div style="display: flex; justify-content: flex-end">
            <span v-if="swpTenure < 1" :class="$style.tooltip">
              <i class="fas fa-exclamation-circle"></i>
              <span :class="$style['tooltip-text']" style="left: -700%"
                >Value must greater than 1</span
              >
            </span>
            <div :class="$style['input-field']">
              <input type="number" v-model="swpTenure" min="1" :class="$style['text-box']" />
            </div>
          </div>
        </div>
        <Slider
          v-model="swpTenure"
          :max="50"
          :step="1"
          :tooltips="false"
          :lazy="false"
          @update="onValueChange()"
        />
      </div>
    </div>
    <SIPOutput
      :years="timePeriod"
      :investment="investmentValue"
      :returns="estimatedReturnsValue"
      :totalReturns="totalReturnsValue"
      :totalWithdrawls="totalWithdrawals"
      :finalValue="finalValue"
      :stepUpReturns="steupReturns"
      :investmentType="investmentType"
      style="margin-top: 1rem"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { calculateSWP, calculateReturns } from './sip-calculator';
import SIPOutput from './sip-output.vue';
import Slider from '@vueform/slider';
import { InvestmentTypes } from '../constants';

const emits = defineEmits(['update']);

const props = defineProps({
  investmentType: {
    type: String,
    required: true
  }
});

const investment = ref(25000);
const sliderValue = ref(25000);
const lumpInvestment = ref(100000);
const investmentValue = ref(0);
const estimatedReturnsValue = ref(0);
const totalReturnsValue = ref(0);
const swpWithdrawl = ref(6);
const swpReturnRate = ref(10);
const swpTenure = ref(30);
const expectedReturn = ref(12);
const timePeriod = ref(10);
const totalInvestment = ref(0);
const estimatedReturns = ref(0);
const stepup = ref(10);
const totalReturn = ref(0);
const showInvestmentText = ref(true);
const showLumpInvestmentText = ref(true);
const totalWithdrawals = ref(0);
const finalValue = ref(0);
const steupReturns = ref(0);
const showError = computed(() =>
  props.investmentType === InvestmentTypes.LUMPSUM
    ? lumpInvestment.value < 100
    : investment.value < 100
);
const investmentInterval = ref(1);

onMounted(() => {
  scaleInvestment();
  onValueChange();
});

const transformToDisplayValue = (value: number) => {
  if (value <= 200) {
    return value * 500;
  } else {
    return 100000 + (value - 200) * 5000;
  }
};

const transformToSliderValue = (value: number) => {
  if (value <= 100000) {
    return value / 500;
  } else {
    return 200 + (value - 100000) / 5000;
  }
};

watch(sliderValue, (newValue) => {
  investment.value = transformToDisplayValue(newValue);
  onValueChange();
});

const scaleInvestment = () => {
  sliderValue.value = transformToSliderValue(investment.value);
};

const investmentTitle = computed(() =>
  props.investmentType === InvestmentTypes.LUMPSUM ? 'Total Investment' : props.investmentType === InvestmentTypes.YEARLY ? "Yearly Investment": 'Monthly Investment'
);

const formatPrice = (price: number) => {
  if (isNaN(price)) {
    price = 0;
  }

  return new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: 0
  }).format(price);
};

const onValueChange = () => {
  if (props.investmentType === InvestmentTypes.SWP) {
    const { totalWithdrawals: swpWithdrawls, finalValue: swpFinal } = calculateSWP(
      investment.value,
      expectedReturn.value,
      timePeriod.value,
      swpWithdrawl.value,
      swpTenure.value,
      swpReturnRate.value,
      stepup.value
    );

    totalWithdrawals.value = swpWithdrawls;
    finalValue.value = swpFinal;
  }

  steupReturns.value = investment.value * Math.pow(1 + stepup.value / 100, timePeriod.value - 1);

  const {
    totalInvestment: totalInvestedAmount,
    estimatedReturns: finalEstimatedReturns,
    totalReturn: finalReturns
  } = calculateReturns(
    props.investmentType,
    props.investmentType === InvestmentTypes.LUMPSUM ? lumpInvestment.value : investment.value,
    expectedReturn.value,
    timePeriod.value,
    stepup.value
  );

  totalInvestment.value = totalInvestedAmount;
  investmentValue.value = totalInvestedAmount;
  estimatedReturnsValue.value = finalEstimatedReturns;
  totalReturnsValue.value = finalReturns;
  estimatedReturns.value = finalEstimatedReturns;
  totalReturn.value = finalReturns;

  emits('update', {
    totalInvestment: totalInvestment.value,
    estimatedReturns: estimatedReturns.value,
    totalReturn: totalReturn.value,
    expectedReturn: expectedReturn.value,
    investment:
      props.investmentType === InvestmentTypes.LUMPSUM ? lumpInvestment.value : investment.value,
    investmentType: props.investmentType,
    years: timePeriod.value,
    stepup: stepup.value,
    swpReturnRate: swpReturnRate.value,
    swpWithdrawl: swpWithdrawl.value,
    swpTenure: swpTenure.value
  });
};

const sipInvestment = ref(25000);
const LumpsumInvestment = ref(100000);
const stepInvestment = ref(25000);
const yearlyInvestment = ref(25000);
const swpInvestment = ref(25000);

watch(
  () => props.investmentType,
  (newValue, oldValue) => {
    if (oldValue === InvestmentTypes.SIP) {
      sipInvestment.value = investment.value;
    } else if (oldValue === InvestmentTypes.LUMPSUM) {
      LumpsumInvestment.value = investment.value;
    } else if (oldValue === InvestmentTypes.STEPUP) {
      stepInvestment.value = investment.value;
    } else if (oldValue === InvestmentTypes.YEARLY) {
      yearlyInvestment.value = investment.value;
    } else if (oldValue === InvestmentTypes.SWP) {
      swpInvestment.value = investment.value;
    }

    if (newValue === InvestmentTypes.SIP) {
      investment.value = sipInvestment.value;
    } else if (newValue === InvestmentTypes.LUMPSUM) {
      investment.value = LumpsumInvestment.value;
    } else if (newValue === InvestmentTypes.STEPUP) {
      investment.value = stepInvestment.value;
    } else if (newValue === InvestmentTypes.YEARLY) {
      investment.value = yearlyInvestment.value;
    } else if (newValue === InvestmentTypes.SWP) {
      investment.value = swpInvestment.value;
    }

    scaleInvestment();
    onValueChange();
  },
  { immediate: true }
);
</script>

<style src="@vueform/slider/themes/default.css"></style>

<style module>
.options {
  display: flex;
  flex-direction: column;
  padding-bottom: 4%;
  gap: 1.5rem;
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
