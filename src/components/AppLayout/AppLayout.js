import React from "react";
import HeaderNav from "../../containers/HeaderNav/HeaderNav";
import "./AppLayout.scss";

export const AppLayout = props => {
  return (
    <div className="app-layout">
      <HeaderNav />
      {props.children}
    </div>
  );
};
