export async function SaveBatchedDataToDB(data: any) {
  let complete = "";
  // await Promise.all(
  //   data.map((entry: any) => {
  //     return new Promise<string>((resolve, reject) => {
  //       UploadImagesAndGetUrl(entry.ImageFiles).then(async (arr) => {
  //         // console.log("Back here", arr);
  //         entry.ImageFiles = arr;
  //         console.log("???", entry);

  //         await addDoc("", entry)
  //           .then((res) => {
  //             console.log("RES", res);
  //             complete = "Sucsess";
  //             resolve(complete);
  //           })
  //           .catch((err) => {
  //             console.log("ERROR", err);
  //             complete = "Error";
  //             resolve(complete);
  //           });
  //       });
  //     });
  //   })
  // );
  return Promise.resolve(complete);
}

export async function SaveSingleDataToDB(data: any) {
  let complete = "";

  return new Promise<string>((resolve, reject) => {
    // UploadImagesAndGetUrl(data.ImageFiles).then(async (arr) => {
    //   // console.log("Back here", arr);
    //   data.ImageFiles = arr;
    //   console.log("???", data);
    //   await addDoc(curr, data)
    //     .then((res) => {
    //       console.log("RES", res);
    //       complete = "Sucsess";
    //       resolve(complete);
    //     })
    //     .catch((err) => {
    //       console.log("ERROR", err);
    //       complete = "Error";
    //       resolve(complete);
    //     });
    // });
  });
}
