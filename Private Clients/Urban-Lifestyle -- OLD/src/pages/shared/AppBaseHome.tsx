import { IonContent, IonPage } from '@ionic/react';
import { useEffect } from 'react';
import FooterBar from '../../components/headersFooters/FooterBar';
import HeaderBar from '../../components/headersFooters/HeaderBar';
import PageHeader from '../../components/headersFooters/PageHeader';
import GroupedCards from '../../components/products/GroupedCards';
import { useData } from '../../hooks/AdminDataHook';
import { RoutesObj } from '../../routes/Routes';
import { LOGO } from '../../constants/AppBasedd';

export default function AppBaseHome() {
  const { categories } = useData();

  const r = RoutesObj.products.cat.path.replace(':cat', '');

  useEffect(() => {}, [categories]);

  return (
    <IonPage>
      <HeaderBar />
      <IonContent fullscreen>
        <PageHeader header='Welcom to Urban Lifestyle ' />
        {categories == null ? (
          <img src={LOGO} style={{ height: '350px', width: 'auto', marginTop: '100px' }} />
        ) : (
          <GroupedCards arrToDisplay={categories ? Object.values(categories) : []} route={r} title='Categories' prodOrCat='cat' />
        )}
      </IonContent>
      <FooterBar />
    </IonPage>
  );
}
