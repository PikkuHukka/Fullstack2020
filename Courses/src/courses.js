import React from "react";
import ReactDOM from "react-dom";
const Course = ({ course }) => {
  const summa = course.parts.reduce((sum, part) => {
    return (sum += part.exercises);
  }, 0);

  const parts = () =>
    course.parts.map((part, index) => (
      <p>
        {part.name} {part.exercises}
      </p>
    ));

  return (
    <div>
      <h1>{course.name}</h1>
      {parts()}
      <p>Yhteensä {summa} tehtävää</p>
    </div>
  );
};

const Courses = ({ courses }) => {
  return courses.map((course, index) => {
    return <Course key={index} course={course} />;
  });
};

export default Courses