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
