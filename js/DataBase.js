const dbPromised = idb.open("gila-bola", 1, upgradeDB => {
    const TeamObjectStore = upgradeDB.createObjectStore("teams", {
        keyPath: "id"
    });
    TeamObjectStore.createIndex("name", "name", {
        unique: false
    });
});

function saveForLater(team) {
    dbPromised.then(function (db) {
        let tx = db.transaction("teams", "readwrite");
        let store = tx.objectStore("teams");

        console.log(team);
        store.put(team);

        return tx.complete;
    }).then(function () {
        console.log("Team Fav succes to saved");
    }).catch(function () {
        console.error("Team Fav is failed to saved");
    });
}

function deleteTeam(teamId) {
    dbPromised
        .then(function (db) {
            let tx = db.transaction("teams", "readwrite");
            let store = tx.objectStore("teams");
            // console.log(team);
            store.delete(teamId);
            return tx.complete;
        })
        .then(function () {
            getSavedFav();
        });
}



function getAll() {
    return new Promise(function (resolve, reject) {
        dbPromised.then(function (db) {
            let tx = db.transaction("teams", "readonly");
            let store = tx.objectStore("teams");

            return store.getAll();
        }).then(function (data) {
            resolve(data);
        })
    });
}

function getById(id) {
    return new Promise(function (resolve, reject) {
        dbPromised.then(function (db) {
            let tx = db.transaction("teams", "readonly");
            let store = tx.objectStore("teams");

            return store.get(id);
        }).then(function (data) {
            resolve(data);
        })
    })
}