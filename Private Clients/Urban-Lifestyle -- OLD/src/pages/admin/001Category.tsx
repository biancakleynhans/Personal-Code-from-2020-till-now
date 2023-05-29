import { IonButton, IonIcon, IonItem, IonLabel, IonThumbnail } from "@ionic/react";
import { addCircleOutline, pencilOutline, trashBinOutline } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import AddEditCatSubCat from "../../components/Forms/AddEditCatSubCat";
import Grided from "../../layout/Grided";
import { AddNewCat, DeleteCat, isend, UpdateCat } from "../../firebase/FirebaseAdmin";
import { ImageArr, UploadImagesAndGetUrl } from "../../firebase/FirebaseStorage";
import { useData } from "../../hooks/AdminDataHook";
import { iCatSubCat } from "../../models/CatsSubCats";
import { stringToImgArr } from "../../utils/Helpers";

const defaultCatSubCat: iCatSubCat = {
  images: [],
  name: ""
};

export default function Category() {
  const { categories } = useData();
  const [addNew, setaddNew] = useState<boolean>(false);
  const [showedit, setshowedit] = useState<boolean[]>([]);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    if (categories) {
      let temp: boolean[] = [];
      Object.keys(categories).forEach((c) => {
        temp.push(false);
      });
      setshowedit(temp);
    }
  }, [categories]);

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

  function addNewCat(cat: iCatSubCat) {
    setloading(true);
    console.log("New: ", cat);
    // Upload images first
    UploadImagesAndGetUrl(cat.images).then((imgs) => {
      console.log("Imgs", imgs);
      //   save new Maincat to db
      let temp: isend = { name: cat.name, images: imgs };
      AddNewCat(temp).then(() => {
        setloading(false);
        setaddNew(!addNew);
      });
    });
  }

  function updateCat(cat: iCatSubCat) {
    console.log("edit", cat);
    setloading(true);
    let newUpload = [];
    let old: string[] = [];

    let t = cat.images.filter((e) => e.data.size === 0);
    old = t.map((e) => e.url);
    newUpload = cat.images.filter((e) => e.data.size > 0);

    console.log("old", old, "new", newUpload);

    // Upload images first
    UploadImagesAndGetUrl(newUpload).then((imgs) => {
      console.log("Imgs", imgs);
      //   //   save new Maincat to db
      let temp: isend = { name: cat.name, images: [...old, ...imgs] };
      console.log("SENDING...", temp);
      UpdateCat(temp).then(() => {
        setloading(false);
        setaddNew(!addNew);
      });
    });
  }

  function deleteCat(name: string) {
    console.log("??", name);
    let con = window.confirm("Are you sure you want to delete this category? This action cannot be undone");
    if (con) {
      setloading(true);
      DeleteCat(name).then(() => {
        setloading(false);
      });
    }
  }

  function displayAdding() {
    return (
      <>
        <IonButton color='success' fill='clear' onClick={() => setaddNew(!addNew)}>
          <IonIcon icon={addCircleOutline} style={{ padding: "4px" }} /> Category
        </IonButton>

        {addNew && (
          <AddEditCatSubCat
            type='add'
            catSubCat='category'
            default={defaultCatSubCat}
            onAdd={(cat: iCatSubCat) => {
              addNewCat(cat);
            }}
            onUpdate={(cat: iCatSubCat) => {
              updateCat(cat);
            }}
            onDelete={(id: string) => {
              deleteCat(id);
            }}
          />
        )}
      </>
    );
  }

  function displayEditing() {
    return (
      <>
        {categories &&
          Object.keys(categories).map((cat, index) => {
            // console.log("???", cat, categories[cat].name);
            return (
              <React.Fragment key={index}>
                {!showedit[index] ? (
                  <IonItem>
                    <IonThumbnail slot='start'>
                      <img src={categories[cat].images[0]} />
                    </IonThumbnail>

                    <IonLabel>{categories[cat].name}</IonLabel>

                    <IonButton
                      fill='clear'
                      onClick={() => {
                        editS(index);
                      }}>
                      <IonIcon color='warning' slot='icon-only' icon={pencilOutline} />
                    </IonButton>

                    <IonButton fill='clear' onClick={() => deleteCat(cat)}>
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
                    catSubCat='category'
                    default={{ name: categories[cat].name, images: stringToImgArr(categories[cat].images) }}
                    onAdd={(cat: iCatSubCat) => {
                      addNewCat(cat);
                    }}
                    onUpdate={(cat: iCatSubCat) => {
                      updateCat(cat);
                    }}
                    onDelete={(id: string) => {
                      deleteCat(id);
                    }}
                  />
                )}
              </React.Fragment>
            );
          })}
      </>
    );
  }

  return <Grided addingJsx={displayAdding()} displayEditList={displayEditing()} header='Categories' loading={loading} />;
}
