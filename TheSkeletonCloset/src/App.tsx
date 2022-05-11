import { IonApp, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Menu from "./components/headersFooters/Menu";
import Routing from "./routes/Routing";

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <Menu />
      <Routing />
    </IonReactRouter>
  </IonApp>
);

export default App;
