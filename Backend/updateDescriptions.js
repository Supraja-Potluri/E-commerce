import fs from "fs";
import csv from "csv-parser";
import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

// Load Firebase service account
const serviceAccount = JSON.parse(fs.readFileSync("./serviceAccountKey.json", "utf8"));

// Initialize Firebase Admin
initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

// ✅ Path to your CSV file with new descriptions
const csvFilePath = "./electronics_with_descriptions.csv";

async function updateProductsByName() {
  const products = [];

  // Read CSV file
  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on("data", (row) => {
      products.push({
        name: row.name?.trim(),
        description: row.description?.trim(),
      });
    })
    .on("end", async () => {
      console.log(`✅ Loaded ${products.length} products from CSV`);
      const updates = [];

      for (const item of products) {
        if (!item.name || !item.description) continue;

        try {
          // Search Firestore by product name
          const snapshot = await db
            .collection("products")
            .where("name", "==", item.name)
            .get();

          if (!snapshot.empty) {
            snapshot.forEach((doc) => {
              updates.push(
                db.collection("products").doc(doc.id).update({
                  description: item.description,
                })
              );
              console.log(`✅ Updated: ${item.name}`);
            });
          } else {
            console.warn(`⚠️ No match found for: ${item.name}`);
          }
        } catch (error) {
          console.error(`❌ Error updating ${item.name}:`, error);
        }
      }

      try {
        await Promise.all(updates);
        console.log(`✅Firestore update complete! Updated ${updates.length} products.`);
      } catch (error) {
        console.error("❌ Error committing updates:", error);
      }
    });
}

updateProductsByName();
