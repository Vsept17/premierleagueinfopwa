document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.fixed-action-btn');
    M.FloatingActionButton.init(elems);
  });

if ("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
      navigator.serviceWorker
        .register("/sw.js")
        .then(function() {
          console.log("Pendaftaran ServiceWorker berhasil");
        })
        .catch(function() {
          console.log("Pendaftaran ServiceWorker gagal");
        });
    });
  } else {
    console.log("ServiceWorker belum didukung browser ini.");
  }

  document.addEventListener("DOMContentLoaded", function() {
    var urlParams = new URLSearchParams(window.location.search);
    var isFromSaved = urlParams.get("/teams.html");
    var btnDelete = document.getElementById("delete");
    var btnSave = document.getElementById("favorite");

    if (isFromSaved) {
      btnDelete.style.display = "none";
    } else {
      var item = getTeams();
    }
        
        btnSave.onclick = function() {
        console.log("Tombol FAB di klik.");
        item.then(function (teams) {
            saveForLater(teams);
    });
    };
          btnDelete.onclick = function() {
          console.log("Tim berhasil dihapus");
          item.then(function(id) {
            deleteTeam(id);
          });
        };
  });