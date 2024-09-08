<template>
  <div :class="$style.main">
    <div :class="$style.container">
      <SipCalculator @update="onValuesUpdated($event)" :class="$style['sip-calculator']" />
      <div v-if="!showNoDataMessage" :class="$style.chartContainer">
        <Pie :data="data" :options="chartOptions" />
      </div>
      <div v-if="!showNoDataMessage" :class="$style.LineChartContainer">
        <Bar :data="lineData" :options="barChartOptions" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SipCalculator from './components/sip-calculator.vue';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement
} from 'chart.js';
import { ref } from 'vue';
import { Pie, Bar } from 'vue-chartjs';
import { calculateLump, calculateSIP } from './components/sip-calculator';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement
);

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    tooltip: {
      enabled: false
    }
  }
};

const formatNumber = (value: number) => {
  if (value >= 10000000) {
    return Math.round(value / 10000000) + 'Cr';
  } else if (value >= 100000) {
    return Math.round(value / 100000) + 'Lakhs';
  } else {
    return value;
  }
};

const barChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false
    },
    tooltip: {
      callbacks: {
        label: function () {
          return '';
        },
        afterLabel: function (context: any) {
          return [
            `Principal: ${formatNumber(investedAmount.value)}`,
            `Interest Rate: ${interestRate.value}%`,
            `Returns: ${formatNumber(context.raw)}`
          ];
        },
        title: function () {
          return '';
        }
      }
    }
  },
  scales: {
    x: {
      display: true,
      title: {
        display: true,
        text: 'Time Period (Years)'
      },
      stacked: true,
      barPercentage: 1.0,
      categoryPercentage: 1.0
    },
    y: {
      display: true,
      title: {
        display: true,
        text: 'Future Value'
      },
      ticks: {
        callback: function (value: any) {
          return formatNumber(value);
        }
      }
    }
  }
};

const data = ref({
  labels: ['Invested', 'Ést. returns'],
  datasets: [
    {
      backgroundColor: ['#dcdcdc ', '#36A2EB'],
      data: [50, 50]
    }
  ]
});

const lineData = ref({
  labels: [],
  datasets: [
    {
      label: 'Est. returns',
      data: []
    }
  ]
});

const investedAmount = ref(0);
const interestRate = ref(0);

const calculateChartData = (
  totalInvestment: number,
  estimatedReturns: number,
  totalReturn: number
) => {
  const investmentAmount = (totalInvestment / totalReturn) * 100;
  const returns = (estimatedReturns / totalReturn) * 100;
  return {
    labels: ['Invested', 'Ést. returns'],
    datasets: [
      {
        backgroundColor: ['#f4c430 ', '#36A2EB'],
        data: [investmentAmount, returns]
      }
    ]
  };
};

const calculateLineData = (
  investment: number,
  expectedReturn: number,
  investmentType: string,
  years: number
) => {
  const values: any = [];
  const labels: any = [];
  const investmentValues: any = [];
  for (let i = 1; i <= years; i += 1) {
    const { totalInvestment, totalReturn } =
      investmentType === 'SIP'
        ? calculateSIP(i, investment, expectedReturn)
        : calculateLump(i, investment, expectedReturn);

    labels.push(i);
    values.push(totalReturn);
    investmentValues.push(totalInvestment);
  }
  return {
    labels: labels,
    datasets: [
      {
        backgroundColor: '#f4c430 ',
        label: 'Invested Amount',
        data: investmentValues
      },
      {
        backgroundColor: '#36A2EB',
        label: 'Est. returns',
        data: values
      }
    ]
  };
};

const showNoDataMessage = ref(false);

const onValuesUpdated = (updatedData: any) => {
  const {
    totalInvestment,
    estimatedReturns,
    totalReturn,
    expectedReturn,
    investment,
    investmentType,
    years
  } = updatedData;

  const fieldsToCheck = [
    totalInvestment,
    estimatedReturns,
    totalReturn,
    expectedReturn,
    investment,
    years
  ];

  showNoDataMessage.value = false;

  fieldsToCheck.forEach((value) => {
    if (isNaN(value) || value === '' || value === 0) {
      showNoDataMessage.value = true;
    }
  });

  investedAmount.value = totalInvestment;
  interestRate.value = expectedReturn;

  data.value = calculateChartData(totalInvestment, estimatedReturns, totalReturn);
  lineData.value = calculateLineData(investment, expectedReturn, investmentType, years);
};
</script>

<style module>
.main {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

.container {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  padding: 1rem;
  box-sizing: border-box;
  justify-content: center;
  width: 60%;
  border-radius: 30px;
  background-color: #fbfbfa;
}

.chartContainer {
  max-width: 300px;
  min-width: 0;
  padding-top: 8%;
}

.LineChartContainer {
  min-width: 0;
  height: 400px;
  position: relative;
}

@media (min-width: 600px) {
  .sip-calculator,
  .chartContainer {
    flex: 1 1 45%;
  }
  .LineChartContainer {
    flex: 1 1 90%;
  }
}

@media (max-width: 599px) {
  .sip-calculator,
  .chartContainer,
  .LineChartContainer {
    flex: 1 1 100%;
  }
  .container {
    width: 100%;
    padding-top: 0%;
  }

  .main {
    align-items: normal;
  }
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell,
    'Helvetica Neue', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
