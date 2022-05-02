import { IonButton, IonIcon, IonItem, IonLabel, IonThumbnail } from "@ionic/react";
import { addCircleOutline, pencilOutline, trashBinOutline } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import AddEditCatSubCat from "../../components/Forms/AddEditCatSubCat";
import { AddNewSubCat, DeleteSubCat, isend, UpdateSubCat } from "../../firebase/FirebaseAdmin";
import { ImageArr, UploadImagesAndGetUrl } from "../../firebase/FirebaseStorage";
import { useData } from "../../hooks/AdminDataHook";
import Grided from "../../layout/Grided";
import { iCatSubCat } from "../../models/CatsSubCats";
import { stringToImgArr } from "../../utils/Helpers";

const defaultCatSubCat: iCatSubCat = {
  images: [],
  name: ""
};

export default function SubCategory() {
  const { subcategories } = useData();
  const [addNew, setaddNew] = useState<boolean>(false);
  const [showedit, setshowedit] = useState<boolean[]>([]);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    if (subcategories) {
      let temp: boolean[] = [];
      Object.keys(subcategories).forEach((c) => {
        temp.push(false);
      });
      setshowedit(temp);
    }
  }, [subcategories]);

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

  function addNewSubCat(cat: iCatSubCat) {
    setloading(true);
    console.log("New: ", cat);
    // Upload images first
    UploadImagesAndGetUrl(cat.images).then((imgs) => {
      console.log("Imgs", imgs);
      //   save new Maincat to db
      let temp: isend = { name: cat.name, images: imgs };
      AddNewSubCat(temp).then(() => {
        setloading(false);
        setaddNew(!addNew);
      });
    });
  }

  function updateSubCat(cat: iCatSubCat) {
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
      UpdateSubCat(temp).then(() => {
        setloading(false);
        setaddNew(!addNew);
      });
    });
  }

  function deleteSubCat(name: string) {
    console.log("??", name);
    let con = window.confirm("Are you sure you want to delete this subcategory? This action cannot be undone");
    if (con) {
      setloading(true);
      DeleteSubCat(name).then(() => {
        setloading(false);
      });
    }
  }

  function displayAdding() {
    return (
      <>
        <IonButton color='success' fill='clear' onClick={() => setaddNew(!addNew)}>
          <IonIcon icon={addCircleOutline} style={{ padding: "4px" }} /> Subcategory
        </IonButton>

        {addNew && (
          <AddEditCatSubCat
            type='add'
            catSubCat='subcategory'
            default={defaultCatSubCat}
            onAdd={(cat: iCatSubCat) => {
              addNewSubCat(cat);
            }}
            onUpdate={(cat: iCatSubCat) => {
              updateSubCat(cat);
            }}
            onDelete={(id: string) => {
              deleteSubCat(id);
            }}
          />
        )}
      </>
    );
  }

  function displayEditing() {
    return (
      <>
        {subcategories &&
          Object.keys(subcategories).map((cat, index) => {
            // console.log("???", cat, subcategories[cat].name);
            return (
              <React.Fragment key={index}>
                {!showedit[index] ? (
                  <IonItem>
                    {subcategories[cat] && subcategories[cat].images && (
                      <IonThumbnail slot='start'>
                        <img src={subcategories[cat].images[0]} />
                      </IonThumbnail>
                    )}

                    <IonLabel>{subcategories[cat]?.name}</IonLabel>

                    <IonButton
                      fill='clear'
                      onClick={() => {
                        editS(index);
                      }}>
                      <IonIcon color='warning' slot='icon-only' icon={pencilOutline} />
                    </IonButton>

                    <IonButton fill='clear' onClick={() => deleteSubCat(cat)}>
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
                    default={{ name: subcategories[cat].name, images: stringToImgArr(subcategories[cat].images) }}
                    onAdd={(cat: iCatSubCat) => {
                      addNewSubCat(cat);
                    }}
                    onUpdate={(cat: iCatSubCat) => {
                      updateSubCat(cat);
                    }}
                    onDelete={(id: string) => {
                      deleteSubCat(id);
                    }}
                  />
                )}
              </React.Fragment>
            );
          })}
      </>
    );
  }

  return <Grided addingJsx={displayAdding()} displayEditList={displayEditing()} header='Subcategories' loading={loading} />;
}
