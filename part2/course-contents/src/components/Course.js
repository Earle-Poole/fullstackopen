import React from "react";
import Total from "./Total";

const Course = ({ course }) => {
  const rows = course.parts.map(row => (
    <li key={row.id}>
      {row.name} {row.exercises}
    </li>
  ));

  return (
    <div>
      <h2>{course.name}</h2>
      {rows}
      <Total course={course} />
    </div>
  );
};

const Courses = ({ courses }) => {
  const mappedCourses = courses.map(course => (
    <Course course={course} key={course.id} />
  ));

  return <div>{mappedCourses}</div>;
};

export default Courses;
