export const calculateFIRE = (
  monthlyExpense: number,
  currentAge: number,
  retirementAge: number,
  inflationRate: number,
  coastFIREAge: number
) => {
  const yearsToRetirement = retirementAge - currentAge;
  const yearsToCoastFIRE = coastFIREAge - currentAge;

  // Calculate expense today
  const annualExpenseToday = monthlyExpense * 12;

  // Calculate expense at retirement age
  const annualExpenseAtRetirement =
    annualExpenseToday * Math.pow(1 + inflationRate / 100, yearsToRetirement);

  // Calculate Lean FIRE (25 times annual expenses today)
  const leanFIRE = annualExpenseToday * 25;

  // Calculate Coast FIRE (25 times annual expenses at coast FIRE age)
  const coastFIRE = annualExpenseToday * Math.pow(1 + inflationRate / 100, yearsToCoastFIRE) * 25;

  // Calculate FIRE (25 times annual expenses at retirement age)
  const fire = annualExpenseAtRetirement * 25;

  // Calculate Fat FIRE (30 times annual expenses at retirement age)
  const fatFIRE = annualExpenseAtRetirement * 30;

  return {
    annualExpenseToday,
    annualExpenseAtRetirement,
    leanFIRE,
    coastFIRE,
    fire,
    fatFIRE
  };
};
