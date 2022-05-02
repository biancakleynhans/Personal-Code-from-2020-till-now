import { IonApp, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

import Routing from "./routes/Routing";
import AuthContextProvider from "./firebase/FirebaseAuthContext";
import MenuComponent from "./components/headersFooters/MenuComponent";
import DataContextProvider from "./firebase/FirebaseDataContext";

setupIonicReact();

const App: React.FC = () => (
  <AuthContextProvider>
    <DataContextProvider>
      <IonApp>
        <IonReactRouter>
          <MenuComponent />
          <Routing />
        </IonReactRouter>
      </IonApp>
    </DataContextProvider>
  </AuthContextProvider>
);

export default App;
