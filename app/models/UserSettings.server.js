import db from "../db.server";

export async function getUserSettings(shop) {
  return db.userSettings.findFirst({
    where: { shop },
  });
}

export async function upsertUserSettings(data) {
  return db.userSettings.upsert({
    where: { shop: data.shop },
    update: {
      shopName: data.shopName,
      secret: data.secret,
      websiteUrl: data.websiteUrl,
    },
    create: {
      shop: data.shop,
      shopName: data.shopName,
      secret: data.secret,
      websiteUrl: data.websiteUrl,
    },
  });
}
