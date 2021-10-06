import React from "react";

export default function News({ news }) {
  return (
    <>
      {news.map((item) => (
        <div className="tweet" key={item.id}>
            {/* only change code below */}
          <h3 className="title"> </h3> 
          <p data-testid={item.id}> </p>
        </div>))}  </>
  );
}

