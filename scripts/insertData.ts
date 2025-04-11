import * as sqlite3 from 'sqlite3';
import { open } from 'sqlite';

(async () => {
  // Ouvrir la base de données
  const db = await open({
    filename: './db.sqlite',
    driver: sqlite3.Database
  });

  // Créer la table si elle n'existe pas
  await db.exec(`
    CREATE TABLE IF NOT EXISTS korrigan (
      id INTEGER PRIMARY KEY,
      name TEXT,
      value TEXT
    );
  `);

  // Données à insérer
  const data = [
    { name: "Korry Gan", theme: null },
    { name: "Queen Aman", theme: "Histoire" },
    { name: "Poudredesscampec", theme: "Légendes" },
    { name: "Rouledépecs", theme: "Mégalithes" },
    { name: "Captain O'ssec", theme: "Mer" },
    { name: "Barbobec", theme: "Urbain" },
    { name: "Selfie", theme: "Points de vue & Nature" },
    { name: "Beursalec", theme: "Gastronomie" },
    { name: "Kronomec", theme: "Sport" },
    { name: "Panosolec", theme: "Ecologie" },
    { name: "Marin d'Odouss", theme: "Ecluses & Canaux" },
    { name: "Cromatik", theme: "Arts & Savoir-faire" },
    { name: "Epidanl'bec", theme: "Retour à la nature" },
    { name: "Pluzinkopec", theme: "Commerce" },
    { name: "Darkann", theme: "Le méchant" },
  ];

  // Insérer les données
  for (const item of data) {
    await db.run(
      'INSERT INTO korrigan (name, theme) VALUES (?, ?)',
      item.name, item.theme
    );
    console.log(`Inserted row with name ${item.name}`);
  }

  console.log('Data insertion completed.');
})();
