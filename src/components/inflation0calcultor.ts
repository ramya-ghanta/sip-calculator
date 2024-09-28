export const calculateInfation = (years: number, currentCost: number, inflationRate: number) => {
  const futureValue =   currentCost * Math.pow((1 + inflationRate / 100), years);

  return {
    totalInvestment: Math.round(currentCost),
    estimatedReturns: Math.round(futureValue - currentCost),
    totalReturn: Math.round(futureValue)
  };
};
