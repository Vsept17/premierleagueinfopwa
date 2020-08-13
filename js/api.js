const base_url = 'https://api.football-data.org/v2/';


const myHeaders = new Headers();
  myHeaders.append("X-Auth-Token", "215c663ec786440d86ac68951005cdd4");
  
  const requestOptions = {
    headers: myHeaders
  };

function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    return Promise.reject(new Error(response.statusText));
  } else {
    return Promise.resolve(response);
  }
}

function json(response) {
  return response.json();
}

function error(error) {
  console.log("Error : " + error);
}

function getStandings() {
  if ("caches" in window) {
    caches.match(`${base_url}competitions/2021/standings`)
    .then(function(response) {
      if (response) {
        response.json()
        .then(function(data) {
          let standingsHTML = "";
          data.standings[0].table.forEach(function(table) {
            standingsHTML += `
            <tr> 
                <td class="center-align">${table.position}</td>
                <td><a href="./teams.html?id=${table.team.id}"><img class="responsive-img" src="${table.team.crestUrl}" alt="${table.team.name}"></a></td>
                <td class="bold">${table.team.name}</td>
                <td class="center-align">${table.playedGames}</td>
                <td class="center-align">${table.won}</td>
                <td class="center-align">${table.draw}</td>
                <td class="center-align">${table.lost}</td>
                <td class="center-align">${table.points}</td>
            </tr>
                `;
          });
          document.getElementById("standings").innerHTML = standingsHTML;
        });
      } else {
        fetch(`${base_url}competitions/2021/standings`, requestOptions)
       .then(status)
       .then(json)
       .then(function(data) {
         let standingsHTML = "";
         data.standings[0].table.forEach(function(table) {
           standingsHTML += `
           <tr> 
               <td class="center-align">${table.position}</td>
               <td><a href="./teams.html?id=${table.team.id}"><img class="responsive-img" src="${table.team.crestUrl}" alt="${table.team.name}"></a></td>
               <td class="bold">${table.team.name}</td>
               <td class="center-align">${table.playedGames}</td>
               <td class="center-align">${table.won}</td>
               <td class="center-align">${table.draw}</td>
               <td class="center-align">${table.lost}</td>
               <td class="center-align">${table.points}</td>
           </tr>
               `;
         });
         document.getElementById("standings").innerHTML = standingsHTML;
       });
     }
    });
  } 
}

function getTeams() {
  return new Promise(function(resolve,reject) {
  const urlParams = new URLSearchParams(window.location.search);
  const idParam = urlParams.get("id");

  if ("caches" in window) {
    caches.match(base_url + "teams/" + idParam).then(function(response) {
      if (response) {
        response.json().then(function(data) {
          let clubHTML = `

            <div class="col s12">
              <h4 class="bold">${data.name}</h4>
            </div>

            <div class="col s12 m5">
              <img src="${data.crestUrl}" alt="${data.name}"/>
            </div>

            <div class="col s12 m7">
            <table>
                <tbody>
                <tr>
                <th>Tahun Berdiri:</th>
                <td>${data.founded}</td>
                </tr>
                <tr>
                <th>Stadion:</th>
                <td>${data.venue}</td>
                <tr>
                <th>Alamat:</th>
                <td>${data.address}</td>
                </tr>
                <tr>
                <th>Telepon:</th>
                <td>${data.phone}</td>
                </tr>
                <tr>
                <th>Website:</th>
                <td><a href="${data.website}">${data.website}</a></td>
                </tr>
                <tr>
                <th>Warna Jersey:</th>
                <td>${data.clubColors}</td>
                </tr>
                </tbody>
              </table>
            </div>
                `;
      let teamsHTML ="";
      data.squad.forEach(function(squad) {
         teamsHTML += `
          <tr>
            <td class="bold">${squad.name}</td>
            <td>${squad.dateOfBirth}</td>
            <td>${squad.countryOfBirth}</td>
            <td>${squad.nationality}</td>
            <td>${squad.role}</td>
            <td>${squad.position}</td>
          </tr>
          `;
         })

          document.getElementById("body-teams").innerHTML = teamsHTML;
          document.getElementById("body-club").innerHTML = clubHTML;
          resolve(data);
        });
      } else {
        fetch(base_url + "teams/" + idParam, requestOptions)
        .then(status)
        .then(json)
        .then(function(data) {
    
          console.log(data);
    
          let clubHTML = `
            <div class="col s12">
              <h4 class="bold">${data.name}</h4>
            </div>
    
            <div class="col s12 m5">
              <img src="${data.crestUrl}" alt="${data.name}"/>
            </div>
    
            <div class="col s12 m7">
              <table>
                <tbody>
                  <tr>
                    <th>Tahun Berdiri:</th>
                    <td>${data.founded}</td>
                  </tr>
                  <tr>
                    <th>Stadion:</th>
                    <td>${data.venue}</td>
                  </tr>
                  <tr>
                    <th>Alamat:</th>
                    <td>${data.address}</td>
                  </tr>
                  <tr>
                    <th>Telepon:</th>
                    <td>${data.phone}</td>
                  </tr>
                  <tr>
                    <th>Website:</th>
                    <td><a href="${data.website}">${data.website}</a></td>
                  </tr>
                  <tr>
                    <th>Warna Jersey:</th>
                    <td>${data.clubColors}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            `;
          let teamsHTML ="";
          data.squad.forEach(function(squad) {
             teamsHTML += `
            <tr>
              <td class="bold">${squad.name}</td>
              <td>${squad.dateOfBirth}</td>
              <td>${squad.countryOfBirth}</td>
              <td>${squad.nationality}</td>
              <td>${squad.role}</td>
              <td>${squad.position}</td>
            </tr>
                  `;
                })
    
          document.getElementById("body-teams").innerHTML = teamsHTML;
          document.getElementById("body-club").innerHTML = clubHTML;
          resolve(data);
        });
        }
    });
  } 
  });
}

function getFavoriteTeams() {
  getAll().then(function(favTeams) {
    console.log(favTeams);

    let favTeamsHTML ="";
    favTeams.forEach(function(data) {
      const description = data;
      favTeamsHTML += `
      <div class="col s12 m3">
        <div class="card">
          <span class="card-title center-align">${data.name}</span>
        <div class="card-image">
          <a href="./teams.html?id=${data.id}&saved=true">
          <img class="responsive-img" src="${data.crestUrl}" alt="${data.name}"></a>
        </div>
        </div>
    </div>
       
       
      `;
    })

    document.getElementById("favTeams").innerHTML = favTeamsHTML;
  });
}

function getFavoriteTeamsById() {
  const urlParams = new URLSearchParams(window.location.search);
  const idParam = urlParams.get("id");

  getById(idParam).then(function(data) {
    tableHTML = '';
    let tableHTML = `
    <h4 class="bold">${data.name}</h4>
        <a href="./teams.html?id=${data.id}&saved=true">
        <img class="responsive-img" src="${data.crestUrl}" alt="${data.name}"></a>
    `;
    document.getElementById("favTeams").innerHTML = tableHTML;
  })
}
