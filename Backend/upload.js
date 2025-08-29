const admin = require("firebase-admin");
const fs = require("fs");
const csv = require("csv-parser");

// Load your service account key (downloaded from Firebase console)
const serviceAccount = require("./serviceAccountKey.json");

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// Array to hold CSV data
const results = [];

// Read CSV and upload to Firestore
fs.createReadStream("cleaned_electronics_product.csv")
  .pipe(csv())
  .on("data", (data) => results.push(data))
  .on("end", async () => {
    console.log(`📦 Found ${results.length} products in CSV, uploading...`);

    for (const row of results) {
      try {
        await db.collection("products").add({
          name: row.name,
          main_category: row.main_category || null,
          sub_category: row.sub_category || null,
          image: row.image,
          ratings: row.ratings ? parseFloat(row.ratings) : null,
          no_of_ratings: row.no_of_ratings ? parseInt(row.no_of_ratings) : null,
          discount_price: row.discount_price ? parseFloat(row.discount_price) : null,
          actual_price: row.actual_price ? parseFloat(row.actual_price) : null,
        });
      } catch (err) {
        console.error("❌ Error uploading product:", row.name, err);
      }
    }

    console.log("✅ Data uploaded successfully to Firestore!");
  });
