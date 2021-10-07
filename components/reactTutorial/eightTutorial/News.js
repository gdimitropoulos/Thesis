import React from "react";
import {
    Link
  } from "react-router-dom";
export default function News({ news }) {
  return (
    <>
      {news.map((item) => (
        <div className="tweet"  key={item.id}>
          <h3 >{item.title} </h3> <p >{item.text}</p>
          <Link data-testid={item.id} to={item.target}>Read More </Link>
        </div>))}  </>
  );
}

