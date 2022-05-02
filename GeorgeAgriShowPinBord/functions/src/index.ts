import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as cors from "cors";

admin.initializeApp({
  credential: admin.credential.applicationDefault()
});

interface PushMsg {
  notification: { title: string; body: string };
  token: string;
}

// const options = {
//   priority: "high",
//   timeToLive: 60 * 60 * 24
// };

const corsOptions = { origin: true };
const corsMiddleware = cors(corsOptions);

exports.sendPushOnNewTask = functions.https.onRequest(async (req, res) => {
  corsMiddleware(req, res, async () => {
    console.log("REQ BODY", JSON.stringify(req.body));

    try {
      console.log("INSIDE TRY");
      // Create a list containing up to 500 messages.
      let messages: PushMsg[] = [];

      req.body.data.users.forEach((entry: { token: string; name: string }) => {
        messages.push({
          notification: {
            title: `${entry.name}`,
            body: `you have a new task ${req.body.data.task.name} assigned to you please view and complete`
          },
          token: entry.token
        });
      });

      console.log("BEFORE SEND ", JSON.stringify(messages));
      //Send Notification
      return await admin
        .messaging()
        .sendAll(messages)
        .then((response) => {
          console.log(response.successCount + " messages were sent successfully");
          return res.send({
            status: 200,
            data: ` ${response.failureCount} failed ${response.successCount} sucsess, ${response.responses.length} total`
          });
        })
        .catch((error) => {
          console.error("ERRROR IN SEND", error);
          return res.send({
            status: 500,
            data: "ERRROR IN SEND"
          });
        });
    } catch (error) {
      console.error("ERRROR IN CATCH DID NOT SUCSEED IN TRY", error);
      return res.send({
        status: 500,
        data: "ERRROR IN CATCH DID NOT SUCSEED IN TRY"
      });
    }
  });
});

exports.sendPushOnUpdatedTask = functions.https.onRequest(async (req, res) => {
  corsMiddleware(req, res, async () => {
    console.log("REQ BODY", JSON.stringify(req.body));

    corsMiddleware(req, res, async () => {
      console.log("REQ BODY", JSON.stringify(req.body));

      try {
        console.log("INSIDE TRY");
        // Create a list containing up to 500 messages.
        let messages: PushMsg[] = [];

        req.body.data.users.forEach((entry: { token: string; name: string }) => {
          messages.push({
            notification: {
              title: `${entry.name}`,
              body: `you have a new task ${req.body.data.task.name} assigned to you please view and complete`
            },
            token: entry.token
          });
        });

        console.log("BEFORE SEND ", JSON.stringify(messages));
        //Send Notification
        return await admin
          .messaging()
          .sendAll(messages)
          .then((response) => {
            console.log(response.successCount + " messages were sent successfully");
            return res.send({
              status: 200,
              data: ` ${response.failureCount} failed ${response.successCount} sucsess, ${response.responses.length} total`
            });
          })
          .catch((error) => {
            console.error("ERRROR IN SEND", error);
            return res.send({
              status: 500,
              data: "ERRROR IN SEND"
            });
          });
      } catch (error) {
        console.error("ERRROR IN CATCH DID NOT SUCSEED IN TRY", error);
        return res.send({
          status: 500,
          data: "ERRROR IN CATCH DID NOT SUCSEED IN TRY"
        });
      }
    });
  });
});
