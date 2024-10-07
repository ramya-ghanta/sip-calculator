<template>
  <div style="overflow: auto">
    <h2 style="text-align: center">Investment Summary</h2>
    <table>
      <thead>
        <tr>
          <th>{{ investmentDetails.investmentTitle }}</th>
          <th>Year</th>
          <th>Return Rate (%)</th>
          <th>Principal</th>
          <th>Estimated Returns</th>
          <th>Total Wealth Generated</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(value, index) in investmentDetails.investment" :key="index">
          <td>{{ formatPrice(value) }}</td>
          <td>{{ index + 1 }}</td>
          <td>{{ investmentDetails.returnRate }}%</td>
          <td>{{ formatPrice(investmentDetails.principal[index]) }}</td>
          <td>{{ formatPrice(investmentDetails.expectedReturns[index]) }}</td>
          <td>{{ formatPrice(investmentDetails.totalReturns[index]) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup lang="ts">
import type { PropType } from 'vue';
import { formatPrice } from './sip-calculator';

interface InvestmentDetails {
  investment: number[];
  principal: number[];
  expectedReturns: number[];
  totalReturns: number[];
  returnRate: number;
  investmentTitle: string;
}

defineProps({
  investmentDetails: {
    type: Object as PropType<InvestmentDetails>,
    required: false,
    default: () => {
      return {
        investment: [] as number[],
        principal: [] as number[],
        expectedReturns: [] as number[],
        totalReturns: [] as number[],
        returnRate: 0,
        investmentTitle: 'Monthly Investment'
      };
    }
  }
});
</script>

<style>
table {
  width: 100%;
  border-collapse: collapse;
}
th,
td {
  border: 1px solid #ddd; /* Adding border to table cells */
  padding: 8px;
  text-align: right;
}
th {
  background-color: #f2f2f2;
  text-align: center;
}
tr:nth-child(even) {
  background-color: #f9f9f9;
}
</style>
