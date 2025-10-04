import "./App.css";
import "@carbon/styles/css/styles.css";
import { Header, HeaderName, Content, Grid, Column } from "@carbon/react";
import UserData from "./components/UserData/UserData";

function App() {
  return (
    <div className="App">
      <Header aria-label="AE Top Trumps">
        <HeaderName href="#" prefix="AE">
          Top Trumps
        </HeaderName>
      </Header>
      <Content>
        <Grid fullWidth>
          <Column lg={8} md={6} sm={4}>
            <UserData />
          </Column>
        </Grid>
      </Content>
    </div>
  );
}

export default App;
