<template>
  <div>
    <div :class="$style['sip-options']">
      <div
        :class="[$style.option, investmentType === InvestmentTypes.SIP ? $style.selected : '']"
        @click="onInvestmentTypeChange(InvestmentTypes.SIP)"
      >
        SIP
      </div>
      <div
        :class="[$style.option, investmentType === InvestmentTypes.LUMPSUM ? $style.selected : '']"
        @click="onInvestmentTypeChange(InvestmentTypes.LUMPSUM)"
      >
        Lumpsum
      </div>
      <div
        :class="[$style.option, investmentType === InvestmentTypes.STEPUP ? $style.selected : '']"
        @click="onInvestmentTypeChange(InvestmentTypes.STEPUP)"
      >
        Step Up SIP
      </div>
      <div
        :class="[$style.option, investmentType === InvestmentTypes.YEARLY ? $style.selected : '']"
        @click="onInvestmentTypeChange(InvestmentTypes.YEARLY)"
      >
        Yearly SIP
      </div>
      <div
        :class="[$style.option, investmentType === InvestmentTypes.SWP ? $style.selected : '']"
        @click="onInvestmentTypeChange(InvestmentTypes.SWP)"
      >
        SIP + SWP
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { InvestmentTypes } from '../constants';

const emits = defineEmits(['onInvestmentTypeChange']);
const investmentType = ref(InvestmentTypes.SIP);
const onInvestmentTypeChange = (type: InvestmentTypes) => {
  investmentType.value = type;
  emits('onInvestmentTypeChange', type);
};
</script>

<style module>
.option {
  background-color: #fff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 15px;
  flex: 0 0 100px;
  text-align: center;
  border: 2px solid #fff;
  border-radius: 4px;
  box-shadow: 0px 1px 1px 0px #0000001a;
  margin-right: 10px;
  margin-bottom: 5px;
  cursor: pointer;
}

.selected {
  background-color: #10b981;
  color: white;
}

.sip-options {
  display: flex;
  justify-content: center;
  margin: 1rem;
  overflow: auto;
  scrollbar-width: thin;
  flex-wrap: wrap;
}
</style>
