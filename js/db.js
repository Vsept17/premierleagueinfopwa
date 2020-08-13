const dbPromised = idb.open("favorite-teams", 2, function(upgradeDb) {
    var favTeamsObjectStore = upgradeDb.createObjectStore("favTeams", {
      keyPath: "id"
    });
    
  });

  function saveForLater(favTeams) {
    dbPromised
      .then(function(db) {
        var tx = db.transaction("favTeams", "readwrite");
        var store = tx.objectStore("favTeams");
        console.log(favTeams);
        store.put(favTeams);
        return tx.complete;
      })
      .then(function() {
        console.log("Berhasil menambah tim favorit kamu.");
      });
  }

  function getAll() {
    return new Promise(function(resolve, reject) {
      dbPromised
        .then(function(db) {
          var tx = db.transaction("favTeams", "readonly");
          var store = tx.objectStore("favTeams");
          return store.getAll();
        })
        .then(function(favTeams) {
          resolve(favTeams);
        });
    });
  }

  function getById(id) {
    return new Promise(function(resolve, reject) {
      dbPromised
        .then(function(db) {
          var tx = db.transaction("favTeams", "readonly");
          var store = tx.objectStore("favTeams");
          return store.get(id);
        })
        .then(function(favteams) {
          resolve(favteams);
        });
    });
  }

  function deleteTeam(id) {
      dbPromised.then(function(db) {
        var tx = db.transaction('favTeams', 'readwrite');
        var store = tx.objectStore('favTeams');

        store.delete(id.id);
        return tx.complete;
      }).then(function(id) {
        console.log(`Done`);
      });

  };
  