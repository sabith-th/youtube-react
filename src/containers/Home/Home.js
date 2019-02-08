import React from "react";
import { SideBar } from "../SideBar/SideBar";
import "./Home.scss";
import { HomeContent } from "./HomeContent/HomeContent";

export class Home extends React.Component {
  render() {
    return (
      <React.Fragment>
        <SideBar />
        <HomeContent />
      </React.Fragment>
    );
  }
}
