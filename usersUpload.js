const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");
const usersData = require("./users.json"); // Загружаем данные из JSON файла

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

(async () => {
  try {
    for (const [key, user] of Object.entries(usersData)) {
      await db.collection("users").doc(key).set(user);
      console.log(`Added user: ${key}`);
    }
    console.log("All users added successfully!");
  } catch (error) {
    console.error("Error adding users:", error);
  } finally {
    process.exit();
  }
})();
