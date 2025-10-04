import React from "react";
import "./App.css";
import "@carbon/styles/css/styles.css";
import { Header, HeaderName } from "@carbon/react";
import UserForm from "./components/Form/Form";

function App() {
  return (
    <div className="App">
      <Header aria-label="AE Top Trumps">
        <HeaderName href="#" prefix="AE">
          Top Trumps
        </HeaderName>
      </Header>
      <header className="App-header">
        <UserForm />
      </header>
    </div>
  );
}

export default App;
