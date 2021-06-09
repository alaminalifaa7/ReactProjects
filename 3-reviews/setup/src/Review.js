import React, { useState } from "react";
import people from "./data";
import { FaChevronLeft, FaChevronRight, FaQuoteRight } from "react-icons/fa";

const Review = () => {
  const [index, setIndex] = useState(0);
  const { name, job, image, text } = people[index];

  const nextPerson = () => {
    if (index + 1 < people.length) {
      setIndex(index + 1);
    } else if (index === people.length - 1) {
      setIndex(0);
    }
  };
  const prevPerson = () => {
    if (index - 1 >= 0) {
      setIndex(index - 1);
    } else if (index === 0) {
      setIndex(people.length - 1);
    }
  };

  return (
    <article className="review">
      <div className="img-container">
        <img src={image} alt={name} className="person-img" />
        <span className="quote-icon">
          <FaQuoteRight />
        </span>
      </div>
      <h4 className="author">{name}</h4>
      <p className="job">{job}</p>
      <p className="info">{text}</p>
      <div>
        <button className="prev-btn" onClick={prevPerson}>
          <FaChevronLeft />
        </button>
        <button className="next-btn" onClick={nextPerson}>
          <FaChevronRight />
        </button>
      </div>
      <button
        className="random-btn"
        onClick={() => {
          setIndex(Math.floor(Math.random() * people.length));
        }}
      >
        surprise me
      </button>
    </article>
  );
};

export default Review;
