import { IonApp, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import MenuComponent from "./components/headersFooters/MenuComponent";
import Routing from "./routes/Routing";
import AuthContextProvider from "./services/firebase/FirebaseAuthContext";

setupIonicReact();

const App: React.FC = () => (
  <AuthContextProvider>
    <IonApp>
      <IonReactRouter>
        <MenuComponent />
        <Routing />
      </IonReactRouter>
    </IonApp>
  </AuthContextProvider>
);

export default App;
