<template>
  <div>
    <div :class="$style['sip-options']">
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
      <div
        :class="[$style.option, investmentType === 'step' ? $style.selected : '']"
        @click="onInvestmentTypeChange('step')"
      >
        Step Up SIP
      </div>
      <div
        :class="[$style.option, investmentType === 'yearly' ? $style.selected : '']"
        @click="onInvestmentTypeChange('yearly')"
      >
        Yearly SIP
      </div>
      <div
        :class="[$style.option, investmentType === 'swp' ? $style.selected : '']"
        @click="onInvestmentTypeChange('swp')"
      >
        SWP
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const emits = defineEmits(['onInvestmentTypeChange']);
const investmentType = ref('SIP');
const onInvestmentTypeChange = (type: string) => {
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
