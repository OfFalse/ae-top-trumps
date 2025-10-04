import "./App.css";
import "@carbon/styles/css/styles.css";
import { Header, HeaderName } from "@carbon/react";
import UserData from "./components/UserData/UserData";

function App() {
  return (
    <div className="App">
      <Header aria-label="AE Top Trumps">
        <HeaderName href="#" prefix="AE">
          Top Trumps
        </HeaderName>
      </Header>
      <header className="App-header">
        <UserData />
      </header>
    </div>
  );
}

export default App;
