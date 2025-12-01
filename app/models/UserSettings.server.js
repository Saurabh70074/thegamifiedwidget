import db from "../db.server";

export async function getUserSettings(shop) {
  return db.userSettings.findFirst({ where: { shop } });
}

export async function upsertUserSettings({ shop, userToken, websiteUrl }) {
  return db.userSettings.upsert({
    where: { shop },
    update: { userToken, websiteUrl },
    create: { shop, userToken, websiteUrl },
  });
}
