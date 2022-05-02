import { IonApp } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

/* Own Components and data*/
import Routing from "./routes/Routing";

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <Routing />
    </IonReactRouter>
  </IonApp>
);

export default App;
