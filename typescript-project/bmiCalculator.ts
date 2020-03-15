const calculateBmi = (height: number, weight: number) => {
  const heightInMeters = (height / 100);
  const bmi = weight / (heightInMeters * heightInMeters);
  console.log(bmi);
  let bmiRating = "";

  if (bmi < 15) {
    bmiRating = "Very severely underweight";
  } else if (bmi < 16) {
    bmiRating = "Severely underweight";
  }
  else if (bmi < 18.5) {
    bmiRating = "Underweight";
  } else if (bmi < 25) {
    bmiRating = "Normal (healthy weight)";
  } else if (bmi < 30) {
    bmiRating = "Overweight";
  }
  else if (bmi < 35) {
    bmiRating = "Obese Class II(Severely obese)";
  }
  else if (bmi < 35) {
    bmiRating = "(Obese Class II(Severely obese))";
  }
  else {
    bmiRating = "Obese Class III(Very severely obese)";
  }

  return {
    weight: weight,
    height: height,
    bmi: bmiRating
  };
};



const a = Number(process.argv[2]);
const b = Number(process.argv[3]);

console.log(calculateBmi(a, b));

export default calculateBmi;