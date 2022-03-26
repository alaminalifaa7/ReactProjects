import React, { useState } from "react";
import Author from "./Author";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function Authors({
  authors,
  currentPage,
  handleNext,
  handlePrev,
  setLocalStorageAuthors,
  fromFav,
}) {
  let fav = false;
  let getFromLocal = JSON.parse(localStorage.getItem("localStorageAuthors"));
  return (
    <div>
      <section>
        <div>
          {authors.map((author) => {
            {
              if (
                getFromLocal &&
                getFromLocal.some((el) => el._id === author._id)
              ) {
                fav = true;
              } else {
                fav = false;
              }
            }
            return (
              <Author
                key={author._id}
                {...author}
                fav={fav}
                setLocalStorageAuthors={setLocalStorageAuthors}
              />
            );
          })}
        </div>
        {!fromFav ? (
          <div className="button-container">
            <button className="prev-btn" onClick={handlePrev}>
              <FiChevronLeft />
            </button>
            <span className="pageNumber">Page: {currentPage}</span>
            <button className="next-btn" onClick={handleNext}>
              <FiChevronRight />
            </button>
          </div>
        ) : (
          <div></div>
        )}
      </section>
    </div>
  );
}
