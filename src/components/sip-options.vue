<template>
  <div>
    <div :class="[$style['sip-options'], menuOpen ? $style['open'] : '']">
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
import { useMainStore } from '@/store';
import { storeToRefs } from 'pinia';

const { menuOpen } = storeToRefs(useMainStore());

const emits = defineEmits(['onInvestmentTypeChange']);
const investmentType = ref(InvestmentTypes.SIP);

const onInvestmentTypeChange = (type: InvestmentTypes) => {
  investmentType.value = type;
  emits('onInvestmentTypeChange', type);
  menuOpen.value = false;
};
</script>

<style module>
.sip-options {
  display: flex;
  justify-content: center;
  flex-direction: row;
  margin: 1rem;
  overflow: auto;
  scrollbar-width: thin;
  flex-wrap: wrap;
}

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

@media (max-width: 768px) {
  .sip-options {
    display: none;
    flex-direction: column;
  }

  .sip-options.open {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .option {
    flex: 1 1 auto;
    width: 80%;
  }
}
</style>
