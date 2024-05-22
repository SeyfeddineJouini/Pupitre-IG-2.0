import React from "react";
import { Outlet } from "react-router-dom";

export default function StepperComponent(props) {
  var currentQuestion = +props.currentQuestion || 0;
  var nbEtat = +props.nbEtat || 0;
return (
  <>
    <link
      href="//netdna.bootstrapcdn.com/font-awesome/3.2.1/css/font-awesome.css"
      rel="stylesheet"
    ></link>
    <div className="steps">
      {[...Array(nbEtat)].map((e, i) => {
        if (i + 1 < currentQuestion) {
          return (
            <div className="step done" key={i}>
              <i className="icon-ok"></i>
            </div>
          );
        } else if (i + 1 === currentQuestion) {
          return (
            <div className="step active" key={i}>
              {i + 1}
            </div>
          );
        } else {
          return (
            <div className="step" key={i}>
              {i + 1}
            </div>
          );
        }
      })}
    </div>
  </>
);
}