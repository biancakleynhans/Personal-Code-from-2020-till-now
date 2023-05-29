import { IonButton, IonIcon, IonItem, IonLabel, IonThumbnail } from "@ionic/react";
import { addCircleOutline, pencilOutline, trashBinOutline } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import AddEditProduct from "../../components/Forms/AddEditProduct";
import { DeleteProduct } from "../../firebase/FirebaseAdmin";
import { useData } from "../../hooks/AdminDataHook";
import Grided from "../../layout/Grided";
import { iProduct } from "../../models/Products";
import ProductUploadManual from "./002ProductsManual";

export default function Products() {
  const { inventory } = useData();
  const [addNew, setaddNew] = useState<boolean>(false);
  const [showedit, setshowedit] = useState<boolean[]>([]);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    if (inventory) {
      let temp: boolean[] = [];
      Object.keys(inventory).forEach((c) => {
        temp.push(false);
      });
      setshowedit(temp);
    }
  }, [inventory]);

  function editS(index: number) {
    let temp: boolean[] = [];

    showedit.forEach((c, i) => {
      if (i === index) {
        temp.push(!c);
      } else {
        temp.push(c);
      }
    });
    setshowedit(temp);
  }

  function deleteProduct(product: iProduct) {
    let con = window.confirm("Are you sure you want to delete this product? This action cannot be undone");
    if (con) {
      setloading(true);
      DeleteProduct(product)
        .then(() => {
          setloading(false);
          window.alert("Deleted product");
          window.location.reload();
        })
        .catch((err) => {
          console.log("ERROR", err);
        });
    }
  }

  function displayAdding() {
    return (
      <>
        <IonButton color='success' fill='clear' onClick={() => setaddNew(!addNew)}>
          <IonIcon icon={addCircleOutline} style={{ padding: "4px" }} /> Product
        </IonButton>

        {addNew && <AddEditProduct type='add' />}
      </>
    );
  }

  function displayEditing() {
    return (
      <>
        {inventory &&
          Object.keys(inventory).map((inv, index) => {
            return (
              <React.Fragment key={index}>
                {!showedit[index] ? (
                  <IonItem>
                    {inventory[inv] && inventory[inv].images && (
                      <IonThumbnail slot='start'>
                        <img src={inventory[inv]?.images[0]} />
                      </IonThumbnail>
                    )}

                    <IonLabel class='ion-text-wrap'>{inventory[inv]?.title} </IonLabel>

                    <IonButton
                      fill='clear'
                      onClick={() => {
                        editS(index);
                      }}>
                      <IonIcon color='warning' slot='icon-only' icon={pencilOutline} />
                    </IonButton>

                    <IonButton fill='clear' onClick={() => deleteProduct(inventory[inv])}>
                      <IonIcon color='danger' slot='icon-only' icon={trashBinOutline} />
                    </IonButton>
                  </IonItem>
                ) : (
                  <IonButton
                    fill='clear'
                    onClick={() => {
                      editS(index);
                    }}>
                    <IonIcon color='warning' slot='icon-only' icon={pencilOutline} />
                  </IonButton>
                )}
                {showedit[index] && <ProductUploadManual type='edit' default={inventory[inv]} />}
              </React.Fragment>
            );
          })}
      </>
    );
  }

  return <Grided addingJsx={displayAdding()} displayEditList={displayEditing()} header='Products' loading={loading} />;
}
