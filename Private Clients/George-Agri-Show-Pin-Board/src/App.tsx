import { IonApp, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Routing from './routes/Routing';
import AuthContextProvider from './firebase/FirebaseContextAuth';
import DataContextProvider from './firebase/FirebaseContextData';
import MenuComponent from './components/headersFooters/MenuComponent';
import ChecklistDataContextProvider from './firebase/FirebaseContextCheckList';

setupIonicReact();

const App: React.FC = () => (
  <AuthContextProvider>
    <DataContextProvider>
      <ChecklistDataContextProvider>
        <IonApp>
          <IonReactRouter>
            <MenuComponent />
            <Routing />
          </IonReactRouter>
        </IonApp>
      </ChecklistDataContextProvider>
    </DataContextProvider>
  </AuthContextProvider>
);
export default App;
