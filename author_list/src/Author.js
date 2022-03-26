import React, { useState, useRef } from "react";

export default function Author({
  _id,
  name,
  bio,
  link,
  fav,
  setLocalStorageAuthors,
}) {
  const idRef = useRef(null);
  const nameRef = useRef(null);
  const linkRef = useRef(null);
  const bioRef = useRef(null);
  let getFromLocal = JSON.parse(localStorage.getItem("localStorageAuthors"));
  const addToFav = () => {
    const favAuthor = {
      _id: idRef.current.value,
      name: nameRef.current.innerText,
      bio: bioRef.current.innerText,
      link: linkRef.current.innerText,
    };
    let newLocal = JSON.parse(localStorage.getItem("localStorageAuthors"));
    console.log(newLocal);
    if (newLocal) {
      if (!newLocal.some((el) => el._id === favAuthor._id)) {
        newLocal.push(favAuthor);
      }
    } else {
      newLocal = [];
      newLocal.push(favAuthor);
    }

    localStorage.setItem("localStorageAuthors", JSON.stringify(newLocal));
    setLocalStorageAuthors(newLocal);
  };
  const removeFromFav = () => {
    let _id = idRef.current.value;

    const newLocal = getFromLocal.filter((obj) => {
      return obj._id !== _id;
    });
    console.log(newLocal);
    localStorage.clear();
    localStorage.setItem("localStorageAuthors", JSON.stringify(newLocal));
    setLocalStorageAuthors(newLocal);
  };
  return (
    <article className="author">
      <header className="author-header-div">
        <input type="hidden" value={_id} ref={idRef} />
        <h3 ref={nameRef}>{name}</h3>
        {!fav ? (
          <button className="btn" onClick={addToFav}>
            Add to fav
          </button>
        ) : (
          <button className="delete-btn" onClick={removeFromFav}>
            Remove From Fav
          </button>
        )}
      </header>
      <p ref={bioRef}>{bio}</p>
      <a href={link} ref={linkRef}>
        {link}
      </a>
    </article>
  );
}
