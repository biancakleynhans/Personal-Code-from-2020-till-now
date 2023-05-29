import { IonButton, IonIcon, IonItem, IonLabel, IonThumbnail } from "@ionic/react";
import { addCircleOutline, pencilOutline, trashBinOutline } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import AddEditCatSubCat from "../../components/Forms/AddEditCatSubCat";
import Grided from "../../layout/Grided";
import { AddNewBrand, AddNewCat, DeleteBrand, DeleteCat, isend, UpdateBrand, UpdateCat } from "../../firebase/FirebaseAdmin";
import { UploadImagesAndGetUrl } from "../../firebase/FirebaseStorage";
import { useData } from "../../hooks/AdminDataHook";
import { iCatSubCat } from "../../models/CatsSubCats";
import { stringToImgArr } from "../../utils/Helpers";

const defaultBrand: iCatSubCat = {
  images: [],
  name: ""
};

export default function Brand() {
  const { brands } = useData();
  const [addNew, setaddNew] = useState<boolean>(false);
  const [showedit, setshowedit] = useState<boolean[]>([]);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    if (brands) {
      let temp: boolean[] = [];
      Object.keys(brands).forEach((c) => {
        temp.push(false);
      });
      setshowedit(temp);
    }
  }, [brands]);

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

  function addNewBrand(brand: iCatSubCat) {
    setloading(true);
    console.log("New: ", brand);
    // Upload images first
    UploadImagesAndGetUrl(brand.images).then((imgs) => {
      console.log("Imgs", imgs);
      let temp: isend = { name: brand.name, images: imgs };
      AddNewBrand(temp).then(() => {
        setloading(false);
        setaddNew(!addNew);
      });
    });
  }

  function updateBrand(brand: iCatSubCat) {
    console.log("edit", brand);
    setloading(true);
    let newUpload = [];
    let old: string[] = [];

    let t = brand.images.filter((e) => e.data.size === 0);
    old = t.map((e) => e.url);
    newUpload = brand.images.filter((e) => e.data.size > 0);

    console.log("old", old, "new", newUpload);

    // Upload images first
    UploadImagesAndGetUrl(newUpload).then((imgs) => {
      console.log("Imgs", imgs);
      //   //   save new Mainbrand to db
      let temp: isend = { name: brand.name, images: [...old, ...imgs] };
      console.log("SENDING...", temp);
      UpdateBrand(temp).then(() => {
        setloading(false);
        setaddNew(!addNew);
      });
    });
  }

  function deletebrand(name: string) {
    console.log("??", name);
    let con = window.confirm("Are you sure you want to delete this brand? This action cannot be undone");
    if (con) {
      setloading(true);
      DeleteBrand(name).then(() => {
        setloading(false);
      });
    }
  }

  function displayAdding() {
    return (
      <>
        <IonButton color='success' fill='clear' onClick={() => setaddNew(!addNew)}>
          <IonIcon icon={addCircleOutline} style={{ padding: "4px" }} /> BRAND
        </IonButton>

        {addNew && (
          <AddEditCatSubCat
            type='add'
            catSubCat='brand'
            default={defaultBrand}
            onAdd={(cat: iCatSubCat) => {
              addNewBrand(cat);
            }}
            onUpdate={(cat: iCatSubCat) => {
              updateBrand(cat);
            }}
            onDelete={(id: string) => {
              deletebrand(id);
            }}
          />
        )}
      </>
    );
  }

  function displayEditing() {
    return (
      <>
        {brands &&
          Object.keys(brands).map((cat, index) => {
            // console.log("???", cat, brands[cat].name);
            return (
              <React.Fragment key={index}>
                {!showedit[index] ? (
                  <IonItem>
                    <IonThumbnail slot='start'>
                      <img src={brands[cat].images[0]} />
                    </IonThumbnail>

                    <IonLabel>{brands[cat].name}</IonLabel>

                    <IonButton
                      fill='clear'
                      onClick={() => {
                        editS(index);
                      }}>
                      <IonIcon color='warning' slot='icon-only' icon={pencilOutline} />
                    </IonButton>

                    <IonButton fill='clear' onClick={() => deletebrand(cat)}>
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
                {showedit[index] && (
                  <AddEditCatSubCat
                    type='edit'
                    catSubCat='brand'
                    default={{ name: brands[cat].name, images: stringToImgArr(brands[cat].images) }}
                    onAdd={(cat: iCatSubCat) => {
                      addNewBrand(cat);
                    }}
                    onUpdate={(cat: iCatSubCat) => {
                      updateBrand(cat);
                    }}
                    onDelete={(id: string) => {
                      deletebrand(id);
                    }}
                  />
                )}
              </React.Fragment>
            );
          })}
      </>
    );
  }

  return <Grided addingJsx={displayAdding()} displayEditList={displayEditing()} header='Brands' loading={loading} />;
}
