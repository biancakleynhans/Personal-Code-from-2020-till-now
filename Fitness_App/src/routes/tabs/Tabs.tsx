// /** @format */

// import React, { Component } from 'react';
// import { IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon, IonLabel, IonButton, IonBadge, IonPage } from '@ionic/react';
// import { calendar, personCircle, map, informationCircle } from 'ionicons/icons';
// import { Route } from 'react-router';
// import HomePage from '../../pages/004_sliders/Home';
// import VloermoerPage from '../../pages/004_sliders/Vloermoer';

// export class Tabs extends Component {
// 	render() {
// 		return (
// 			<IonPage id="main">
//       <IonTabs>
//         <IonRouterOutlet>
//           <Route path="/:tab(tab1)" component={HomePage} exact={true} />
//           <Route path="/:tab(tab2)" component={VloermoerPage} />
//         </IonRouterOutlet>
//         <IonTabBar slot="bottom">
//           <IonTabButton tab="tab1" href="/tab1">
//             <IonIcon name="flash" />
//             <IonLabel>Tab One</IonLabel>
//           </IonTabButton>
//           <IonTabButton tab="tab2" href="/tab2">
//             <IonIcon name="apps" />
//             <IonLabel>Tab Two</IonLabel>
//           </IonTabButton>
//         </IonTabBar>
//       </IonTabs>
//     </IonPage>
// 		);
// 	}
// }

// export default Tabs;


import React  from 'react';
import { IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/react';
import { Route, Redirect } from 'react-router';
import { calendar,  map, informationCircle , chatbox} from 'ionicons/icons';
import AddBookToLibary from '../../pages/000_adminOnlyPages/AddBookToLibary';
import VloermoerPage from '../../pages/004_sliders/Vloermoer';
import HomePage from '../../pages/004_sliders/Home';
import FastTimerPage from '../../pages/001_fasting/002FastTimer';


interface MainTabsProps { }

const Tabs: React.FC<MainTabsProps> = () => {

  return (
    <IonTabs>
      <IonRouterOutlet>
        <Redirect exact path="/tabs" to="/tabs/schedule" />
        {/* 
          Using the render method prop cuts down the number of renders your components will have due to route changes.
          Use the component prop when your component depends on the RouterComponentProps passed in automatically.        
        */}
        <Route path="/tabs/schedule" render={() => <AddBookToLibary />} exact={true} />
        <Route path="/tabs/speakers" render={() => <VloermoerPage />} exact={true} />
        <Route path="/tabs/map" render={() => <HomePage />} exact={true} />
        <Route path="/tabs/about" render={() => <FastTimerPage />} exact={true} />
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="schedule" href="/tabs/schedule">
          <IonIcon icon={calendar} />
          <IonLabel>Schedule</IonLabel>
        </IonTabButton>
        <IonTabButton tab="speakers" href="/tabs/speakers">
          <IonIcon icon={chatbox} />
          <IonLabel>Speakers</IonLabel>
        </IonTabButton>
        <IonTabButton tab="map" href="/tabs/map">
          <IonIcon icon={map} />
          <IonLabel>Map</IonLabel>
        </IonTabButton>
        <IonTabButton tab="about" href="/tabs/about">
          <IonIcon icon={informationCircle} />
          <IonLabel>About</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default Tabs;
