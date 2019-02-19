import React from "react";
import HeaderNav from "../../containers/HeaderNav/HeaderNav";
import ScrollToTop from "../ScrollToTop/ScrollToTop";
import "./AppLayout.scss";

export const AppLayout = props => {
  return (
    <ScrollToTop>
      <div className="app-layout">
        <HeaderNav />
        {props.children}
      </div>
    </ScrollToTop>
  );
};
