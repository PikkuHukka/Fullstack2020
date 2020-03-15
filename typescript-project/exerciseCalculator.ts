
const exerciseCalculator = (values: Array<number>, targetValue: number) => {
  const trainingDays = values.filter(v => v !== 0);
  const sum: number = values.reduce((a, b) => a + b, 0);
  console.log('sum: ', sum);
  const averageTime: number = (Number(sum) / values.length * 1.0);
  let description = "Bad";

  let rating = 1;
  if (averageTime > 2) {
    description = "Very Good";
    rating = 3;
  } else if (averageTime > 1) {
    description = "Decent";
    rating = 2;
  }


  return {
    periodLength: values.length,
    trainingDays: trainingDays.length,
    success: (targetValue < averageTime),
    rating: rating,
    ratingDescription: description,
    targetValue: targetValue,
    averaverageTime: averageTime
  };

};


const values: Array<number> = [3, 0, 2, 4.5, 0, 3, 1];
const target = 2.5;

console.log(exerciseCalculator(values), target);

export default exerciseCalculator