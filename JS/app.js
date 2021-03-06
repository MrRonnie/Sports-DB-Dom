const allplayers = () => {
    document.getElementById("player-container").innerHTML = "";
 
    const searchValue = document.getElementById("search-box").value;

    const url = `https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=${searchValue}
    `;
 
    fetch(url)
     .then((response) => response.json())
     .then((data) => showPlayersDetails(data.player));

    
}

const showPlayersDetails = (players) => {
    for (const player of players){

        const parent = document.getElementById('player-container');

    const div = document.createElement("div");
    div.innerHTML = `
    <div class="card border p-5 m-2">
      <div class="pro-pic">
          <img class="w-25" src="${player.strThumb}" alt="">
      </div>
      <h2>Name:${player.strPlayer}</h2>
      <h4>Country:${player.strNationality} </h4>
      <p></p>
      <div class="allbutton">
          <button class="btn btn-danger">Delete</button>
          <button onclick="details('${player.idPlayer}')" class="btn btn-success">Details</button>
      </div>
    </div>
    `;
    parent.appendChild(div);
    };
  
}


const details = (playerId) => {
    const url = `
    https://www.thesportsdb.com/api/v1/json/2/lookupplayer.php?id=${playerId}
 
    `;
    fetch(url)
      .then((response) => response.json())
      .then ((data) => setPlayerDetails(data.players[0]));
};

const setPlayerDetails = (info) => {
    console.log(info.strGender);

    if (info.strGender == "Male") {
        document.getElementById("male").style.display = "block";
        document.getElementById("female").style.display = "none";
    }
    else {
        document.getElementById("male").style.display = "none";
        document.getElementById("female").style.display = "block";
    }
   
   document.getElementById("details-container").innerHTML = `
   <div class="card border p-5 m-2">
      <div>
          <img class="w-25" src="${info.strThumb}" alt="">
      </div>
      <h2>Name:${info.strPlayer}</h2>
      <a href="">${info.strInstagram}</a> 
    </div>
   `;
};