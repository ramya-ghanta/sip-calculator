<template>
  <div>
    <h1 style="text-align: center">FIRE Calculator</h1>
    <div>
      <div :class="$style.options">
        <div :class="$style.category">
          <span> Monthly Expense </span>
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
                  style="width: 76px; display: flex; justify-content: flex-end"
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
          :max="100000"
          :step="5000"
          :tooltips="false"
          :lazy="false"
          @update="onValueChange()"
        />
      </div>
      <div :class="$style.options">
        <div :class="$style.category">
          <span> Current Age </span>
          <div style="display: flex; justify-content: flex-end">
            <span v-if="currentAge < 1" :class="$style.tooltip">
              <i class="fas fa-exclamation-circle"></i>
              <span :class="$style['tooltip-text']" style="left: -700%"
                >Value must greater than 1</span
              >
            </span>
            <div :class="$style['input-field']">
              <input type="number" v-model="currentAge" min="1" :class="$style['text-box']" />
            </div>
          </div>
        </div>
        <Slider v-model="currentAge" :tooltips="false" :lazy="false" @update="onValueChange()" />
      </div>
      <div :class="$style.options">
        <div :class="$style.category">
          <span> Retirement Age </span>
          <div style="display: flex; justify-content: flex-end">
            <span v-if="retirementAge < 1" :class="$style.tooltip">
              <i class="fas fa-exclamation-circle"></i>
              <span :class="$style['tooltip-text']" style="left: -700%"
                >Value must greater than 1</span
              >
            </span>
            <div :class="$style['input-field']">
              <input type="number" v-model="retirementAge" min="1" :class="$style['text-box']" />
            </div>
          </div>
        </div>
        <Slider
          v-model="retirementAge"
          :max="30"
          :step="0.1"
          :tooltips="false"
          :lazy="false"
          @update="onValueChange()"
        />
      </div>
      <div :class="$style.options">
        <div :class="$style.category">
          <span> Rate of Inflation (%) </span>
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
          <span> Desired Coast FIRE age </span>
          <div style="display: flex; justify-content: flex-end">
            <span v-if="fireAge < 1" :class="$style.tooltip">
              <i class="fas fa-exclamation-circle"></i>
              <span :class="$style['tooltip-text']" style="left: -700%"
                >Value must greater than 1</span
              >
            </span>
            <div :class="$style['input-field']">
              <input type="number" v-model="fireAge" min="1" :class="$style['text-box']" />
            </div>
          </div>
        </div>

        <Slider
          v-model="fireAge"
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
        Expense Today
        <span>{{ formatPrice(expenseToday) }}</span>
      </div>
      <div :class="$style.category">
        Expense At {{ retirementAge }}<span>{{ formatPrice(expenseAtRetirement) }}</span>
      </div>
      <div :class="$style.category">
        LEAN FIRE <span>{{ formatPrice(leanFIREValue) }}</span>
      </div>
      <div :class="$style.category">
        FIRE <span>{{ formatPrice(fireValue) }}</span>
      </div>
      <div :class="$style.category">
        FAT FIRE <span>{{ formatPrice(fatFIREValue) }}</span>
      </div>
      <div :class="$style.category">
        COAST FIRE <span>{{ formatPrice(coastFIREValue) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import Slider from '@vueform/slider';
import { calculateFIRE } from './fire-claculator';

const investment = ref(50000);
const expectedReturn = ref(10);
const expenseToday = ref(0);
const expenseAtRetirement = ref(0);
const leanFIREValue = ref(0);
const fireValue = ref(0);
const coastFIREValue = ref(0);
const fatFIREValue = ref(0);
const showInvestmentText = ref(true);
const currentAge = ref(20);
const retirementAge = ref(40);
const fireAge = ref(22);
const showError = computed(() => investment.value < 100);

onMounted(() => {
  onValueChange();
});

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
  const { annualExpenseToday, annualExpenseAtRetirement, leanFIRE, coastFIRE, fire, fatFIRE } =
    calculateFIRE(
      investment.value,
      currentAge.value,
      retirementAge.value,
      expectedReturn.value,
      fireAge.value
    );

  expenseToday.value = annualExpenseToday;
  expenseAtRetirement.value = annualExpenseAtRetirement;
  leanFIREValue.value = leanFIRE;
  fireValue.value = fire;
  coastFIREValue.value = coastFIRE;
  fatFIREValue.value = fatFIRE;
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
  background-color: #fbfbfa;
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
  width: 72px;
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
