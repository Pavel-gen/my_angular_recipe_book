const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json"); // Путь к вашему JSON-ключу
const recipesData = require("./recipes.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

(async () => {
  for (const [key, recipe] of Object.entries(recipesData)) {
    await db.collection("recipes").doc(key).set(recipe);
    console.log(`Added recipe: ${key}`);
  }
  console.log("All recipes added successfully!");
  process.exit();
})();
