var webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BElpwrNIHQmoYFFB1lefIslfo9duZomAjRlx-hcs_bZHGBxTlFY7TKAr6XtgWsugQSSy8I7puNPbGWQYTiK9iso",
   "privateKey": "uAUAlmEAnHcPf_rLbmtvcHYsO_N-j_54qaG6C1UV7ek"
};
 
 
webPush.setVapidDetails(
   'mailto:verzchseptian@gmail.com',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/dBCiiREZUIM:APA91bF6ocUKIoU2jWW40fr2sDmArsjYFArzqOG4YYSsM2yEa0YbjgklNpAXkLsftVywX95RFnbC6DnBPkz5iSo_DODEa4-h5FOHz5fS_imF5bOwgQ2Qbbrnfi15f2VmNi9xWNlZBeWt",
   "keys": {
       "p256dh": "BB1H9PwvtKTkpj7vkXoGEr/K9bWvllS9PJ4EmJyoQbW2CPwUg0QR5NNJoYvnN2PHAog03qVRldGqVV/RUy6St2E=",
       "auth": "z78O6pPTAAAfr9FSCBbZ+g=="
   }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
 
var options = {
   gcmAPIKey: '1063795582956',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);