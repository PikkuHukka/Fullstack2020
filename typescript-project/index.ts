import bmiCalculator from './bmiCalculator';
import exerciseCalculator from './exerciseCalculator'
import express from 'express';
import { isNumber, isArray } from 'util';
const bodyParser = require('body-parser');

const app = express();

type exerciseInfo = {
  daily_exercises: Array<number>,
  target: number
};


const checkBody = (body: exerciseInfo) => {
  if (!body || !body.daily_exercises || !body.target) {
    throw new Error('parameters missing')
  }

  if (!isNumber(body.target) || !Array.isArray(body.daily_exercises)) {
    throw new Error('malformatted arguments')
  }


  return null
}

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.get('/hello', (req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  res.send(bmiCalculator(req.query.height, req.query.weight));
});

app.post('/exercise', (req, res) => {
  const parameterCheck = checkBody(req.body)

  if (parameterCheck !== null) {
    res.send(parameterCheck)
  }

  res.send(exerciseCalculator(req.body.daily_exercises, req.body.target));
});


const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});