import db from "../db.server";

export async function getUserSettings(shop) {
  return db.userSettings.findFirst({ where: { shop } });
}

// export async function upsertUserSettings({ shop, userToken, websiteUrl }) {
//   return db.userSettings.upsert({
//     where: { shop },
//     update: { userToken, websiteUrl },
//     create: { shop, userToken, websiteUrl },
//   });
// }

export async function upsertUserSettings(data) {
  return db.userSettings.upsert({
    where: { shop: data.shop },
    update: data,
    create: data,
  });
}




// import db from "../db.server";

// export async function getUserSettings(shop) {
//   return db.userSettings.findFirst({ where: { shop } });
// }

// export async function upsertUserSettings({
//   shop,
//   secret,
//   mobile,
//   email,
//   gender,
//   age,
//   transaction,
//   city,
//   state,
//   os,
//   device,
// }) {
//   return db.userSettings.upsert({
//     where: { shop },
//     update: {
//       secret,
//       mobile,
//       email,
//       gender,
//       age,
//       transaction,
//       city,
//       state,
//       os,
//       device,
//     },
//     create: {
//       shop,
//       secret,
//       mobile,
//       email,
//       gender,
//       age,
//       transaction,
//       city,
//       state,
//       os,
//       device,
//     },
//   });
// }
