import { IonButton, IonCol, IonContent, IonGrid, IonPage, IonRow } from "@ionic/react";
import HeaderBar from "../../components/headersFooters/HeaderBar";
import PageHeader from "../../components/headersFooters/PageHeader";
import { RoutesObj } from "../../routes/Routes";

export default function AdminDash() {
  return (
    <IonPage>
      <HeaderBar />
      <IonContent fullscreen>
        <PageHeader header='Admin Dashboard' />
        <IonGrid>
          {/* Adding Categories, SubCategories, Products */}
          <IonRow>
            <IonCol>
              <IonButton fill='clear' routerLink={RoutesObj.admin.cats.path}>
                View All Categories
              </IonButton>
              <br />
              <IonButton fill='clear' routerLink={RoutesObj.admin.subcats.path}>
                View All Sub Categories
              </IonButton>
              <br />
              <IonButton fill='clear' routerLink={RoutesObj.admin.brands.path}>
                View All Brands
              </IonButton>
              <br />
              <IonButton fill='clear' routerLink={RoutesObj.admin.products.path}>
                View All Products
              </IonButton>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonButton fill='clear' color='secondary' routerLink={RoutesObj.admin.orders.path}>
                View All Orders
              </IonButton>
              <br />
              <IonButton fill='clear' color='secondary' routerLink={RoutesObj.admin.users.path}>
                View All Users
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
}
