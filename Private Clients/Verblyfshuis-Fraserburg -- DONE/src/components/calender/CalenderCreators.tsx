import { IonCol, IonLabel } from "@ionic/react";

/*Creates the names of the week */
export function createWeedaysShort(weekdays: string[]) {
  const weekdayshortname = weekdays.map((day: any) => {
    return (
      <IonCol className='calRow' key={day}>
        <IonLabel>{day}</IonLabel>
      </IonCol>
    );
  });
  return weekdayshortname;
}
