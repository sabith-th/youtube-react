import React, { Component } from "react";
import HeaderNav from "./containers/HeaderNav/HeaderNav";
import { Home } from "./containers/Home/Home";
import { SideBar } from "./containers/SideBar/SideBar";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <HeaderNav />
        <SideBar />
        <Home />
      </React.Fragment>
    );
  }
}

export default App;
