import "./App.css";
import "@carbon/styles/css/styles.css";
import { Header, HeaderName, Content, Grid, Column } from "@carbon/react";
import UserData from "./components/UserData/UserData";

function App() {
  return (
    <div className="App">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Header aria-label="AE Top Trumps">
        <HeaderName href="#" prefix="AE">
          Top Trumps
        </HeaderName>
      </Header>
      <Content className="main-content" id="main-content">
        <Grid>
          <Column
            sm={4}
            md={{ span: 6, offset: 1 }}
            lg={{ span: 8, offset: 4 }}
          >
            <UserData />
          </Column>
        </Grid>
      </Content>
    </div>
  );
}

export default App;
