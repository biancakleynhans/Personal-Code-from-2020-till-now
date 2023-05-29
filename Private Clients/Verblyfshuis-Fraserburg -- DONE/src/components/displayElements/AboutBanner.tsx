import React from 'react';
import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonGrid, IonLabel, IonRow, IonToolbar } from '@ionic/react';

export default function AboutBanner(props: { showfull: boolean }) {
  return (
    <IonToolbar style={{ '--background': 'transparent', '--ion-color-base': 'transparent !important', paddingLeft: '10%', paddingRight: '10%' }}>
      <IonGrid>
        <IonRow class='ion-align-self-center'>
          <IonCol class='ion-align-self-center' className='AboutImg' />

          <IonCol class='ion-align-self-center'>
            <IonCard color='none'>
              <IonCardHeader>
                <IonCardTitle>
                  <IonLabel color='primary' class='ion-text-wrap' style={{ fontSize: '28px' }}>
                    Welcome to Verblyfhuis!
                  </IonLabel>
                </IonCardTitle>
              </IonCardHeader>

              <IonCardContent>
                <IonLabel class="class='ion-text-wrap">
                  Rehoboth is a working sheep farm 50 km from the town of Fraserburg on the escarpment of the “Nuweveld” mountains. The emphasis is on land preservation and
                  improvement, and on the raising of Meatmaster sheep and cattle by natural grazing.
                </IonLabel>
                <br />
                <br />
                <br />
                <IonLabel class="class='ion-text-wrap">
                  ​The vistas are breath-taking, as far as the “Swartberge”; there are deep valleys and mountains, and natural beauty in abundance. The air is clean and there is no
                  sound pollution. Indigenous wildlife is plentiful and left undisturbed. The tour guide is your senses. You can walk, climb, cycle at your heart’s delight, or just
                  sit on the stoep with your thoughts.
                </IonLabel>

                <br />
                <br />
                <br />

                {props.showfull && (
                  <>
                    <IonLabel class="class='ion-text-wrap">
                      The main bedroom has a double bed and a small lounge, and the second bedroom two single beds. The kitchen, with gas stove, cooking utensils and fridge, is
                      open plan with the lounge. The bathroom has a walk-in shower (water is heated by a solar geyser), washbasin and toilet. Solar power provides electricity. Wifi
                      and TV are not available although wifi can be accessed at our house, a three minute walk from the Verblyfhuis.
                    </IonLabel>
                    <IonLabel class="class='ion-text-wrap">
                      {' '}
                      Slow cooked “organic” lamb and free range chicken meals, as well as freshly baked bread, are available by prior arrangement. There is a scenic 4x4 service
                      road to top of a mountain towards the westernmost part of the farm. It is not open to 4x4 enthusiasts because road maintenance is too time consuming. But if
                      arranged in advance, I can take a party on an open Land Cruiser for a picnic at the summit (this is a day trip).
                    </IonLabel>
                    <IonLabel class="class='ion-text-wrap">
                      {' '}
                      The Verblyfhuis is a retreat and not an overnight stay. The 50 km trip takes at least 1.5 hours to complete when the road is in good condition. So, stay a few
                      days.
                    </IonLabel>

                    <IonLabel class="class='ion-text-wrap">
                      {' '}
                      Please note: a vehicle with elevated clearance (SUV, pickup) is required to negotiate the gravel roads and dirt humps (installed to manage heavy down pours).
                      4x4 traction is not necessary. On/off road bikes will manage with ease, as long as caution is a priority.
                    </IonLabel>
                  </>
                )}
              </IonCardContent>
            </IonCard>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonToolbar>
  );
}
