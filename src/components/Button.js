import React from "react";

import "components/Button.scss";

//Import classnames:
const classnames = require('classnames');

//Change Button component file to render a button element. It should use the props.children value as the button text:
export default function Button(props) {
   const buttonClass = classnames("button", {
     "button--confirm": props.confirm,
     "button--danger": props.danger
   });
 
   return (
     <button
       className={buttonClass}
       onClick={props.onClick}
       disabled={props.disabled}
     >
       {props.children}
     </button>
   );
 }