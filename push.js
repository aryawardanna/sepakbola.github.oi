const webPush = require('web-push');

let vapidKeys = {
    "publicKey": "BG_OpzwwrZwCL0oTA6Sa0kzSocLtCgWU-2WJzjfhW8GppSYsLZ4HwKQcicxDGS1M80o3Hlk8kgLh7dJ6Z3h34jw",
    "privateKey": "jYSw4miBKPUc9ChCub9X27KTnxXRM4FlHuexj24OaSE"
};


webPush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
let pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/d5Ykk-eSQ_o:APA91bFz2u1pgUFbBLnB77HGHAO4mULOxomx4CPgFcM_6kbTSXEzEMIznPgpxvyRS3YPmeEBpRrbpEaNPO-Cnoe5x8cNLGg9rMnjQkj8-NcLpyq_6qgw6Nr64IKZMjDZBY9BXZW9oMpy",
    "keys": {
        "p256dh": "BAiyL478QqRdLB7k0309bD3ZcN5uhqszCVn3btMkUdflKQHUlBiyOCDBObiTV8SrjcdiwuchMPbnXIxmG5FvYL4=",
        "auth": "BQZ4APhGsYzH6Qk0hYfirQ=="
    }
};
const payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';

let options = {
    gcmAPIKey: '225780221509',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);