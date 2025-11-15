import admin from "firebase-admin";
import { readFile } from "fs/promises";

const serviceAccount = JSON.parse(
  await readFile(
    new URL(
      "./fir-assignment-57281-firebase-adminsdk-fbsvc-5d89602571.json",
      import.meta.url
    )
  )
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export default admin;
