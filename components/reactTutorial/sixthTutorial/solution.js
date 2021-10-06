import React from "react";

export default function News({ news }) {
  return (
    <>
      {news.map((item) => (
        <div className="tweet"  key={item.id}>
          <h3 >{item.title} </h3> <p data-testid={item.id}>{item.text}</p>

        </div>))}  </>
  );
}

