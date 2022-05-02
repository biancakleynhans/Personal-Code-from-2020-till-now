import { IonApp, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

import Routing from "./routes/Routing";
import AuthContextProvider from "./firebase/FirebaseAuthContext";
import MenuComponent from "./components/headersFooters/MenuComponent";

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
