export const calculateSIP = (years: number, investment: number, expectedReturn: number) => {
  const totalMonths = years * 12;
  const totalInvestment = investment * totalMonths;
  const monthlyReturnRate = expectedReturn / 12 / 100;
  const totalReturn =
    investment *
    (((1 + monthlyReturnRate) ** totalMonths - 1) / monthlyReturnRate) *
    (1 + monthlyReturnRate);

  return {
    totalInvestment: Math.round(totalInvestment),
    estimatedReturns: Math.round(totalReturn - totalInvestment),
    totalReturn: Math.round(totalReturn)
  };
};

export const calculateLump = (years: number, investment: number, expectedReturn: number) => {
  const ratePerPeriod = expectedReturn / 100;
  const totalReturn = investment * Math.pow(1 + ratePerPeriod, years);

  return {
    totalInvestment: Math.round(investment),
    estimatedReturns: Math.round(totalReturn - investment),
    totalReturn: Math.round(totalReturn)
  };
};

export const calculateStepUpSIP = (
  years: number,
  investment: number,
  annualStepUp: number,
  expectedReturn: number
) => {
  const monthlyReturnRate = expectedReturn / 12 / 100;
  let totalInvestment = 0;
  let totalReturn = 0;

  for (let year = 0; year < years; year++) {
    const yearlyInvestment = investment * Math.pow(1 + annualStepUp / 100, year);
    totalInvestment += yearlyInvestment * 12;
    for (let month = 0; month < 12; month++) {
      totalReturn +=
        yearlyInvestment * Math.pow(1 + monthlyReturnRate, (years - year) * 12 - month);
    }
  }

  return {
    totalInvestment: Math.round(totalInvestment),
    estimatedReturns: Math.round(totalReturn - totalInvestment),
    totalReturn: Math.round(totalReturn)
  };
};

export const calculateYearlySIP = (investment: number, expectedReturn: number, years: number) => {
  const rate = expectedReturn / 100;
  const totalInvestment = investment * years;
  const totalReturn = investment * ((Math.pow(1 + rate, years) - 1) / rate) * (1 + rate);

  return {
    totalInvestment: Math.round(totalInvestment),
    estimatedReturns: Math.round(totalReturn - totalInvestment),
    totalReturn: Math.round(totalReturn)
  };
};

export const calculateSWP = (
  investment: number,
  expectedReturn: number,
  years: number,
  swpWithdrawlRate: number,
  swpTenure: number,
  swpReturnRate: number,
  stepUpRate: number
) => {
  const { totalReturn } = calculateStepUpSIP(years, investment, stepUpRate, expectedReturn);

  let totalWithdrawals = 0;
  let finalValue = totalReturn;

  for (let i = 0; i < years; i++) {
    const annualWithdrawal = finalValue * (swpWithdrawlRate / 100);
    totalWithdrawals += annualWithdrawal;
    finalValue -= annualWithdrawal;
    finalValue *= 1 + swpReturnRate / 100;
  }

  const sipForFinalYear = investment * Math.pow(1 + stepUpRate / 100, years - 1);

  return {
    totalWithdrawals,
    finalValue,
    sipForFinalYear
  };
};

export const formatCurrencyValue = (value: number) => {
  if (value >= 10000000) {
    return (value / 10000000).toFixed(2) + ' Cr';
  } else if (value >= 100000) {
    return (value / 100000).toFixed(2) + ' Lakhs';
  } else {
    return value.toFixed(2);
  }
};
