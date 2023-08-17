import mongoose from "mongoose";
import Manhwa from "./models/manhwa.js";
import manhwas from "./data/manhwas.json" assert { type: "json" };
import main from "./db.js";

async function manhwaSeed() {
  try {
    await main();
    await Manhwa.deleteMany(); // Supprime les données existantes
    await Manhwa.insertMany(manhwas); // Insère les nouvelles données
    console.log("Données insérées avec succès !");
  } catch (error) {
    console.error("Erreur lors de l'insertion des données :", error);
  } finally {
    mongoose.disconnect(); // Déconnectez-vous de la base de données après l'insertion
  }
}

manhwaSeed();
