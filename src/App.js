import React from 'react';
import './bootstrap.css';


document.addEventListener('submit', event => {
  event.preventDefault();

  //verrataan kumpaa submittia painettiin
  if (document.getElementById("formadd").style.display == 'block'){

    console.log("submit started");
    //post prosessi
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ "artist" : event.target.elements.artist.value, "title" : event.target.elements.title.value, "album" : event.target.elements.album.value })
    };
    fetch('https://nodejssecond.onrender.com/api/add', requestOptions)
        .then(response => {
          console.log(response)
          //ajastettu timeout koska post ei ehtinyt suoriutua jostain syystä ilman
          window.setTimeout(window.location.reload(false), 2000);
        });
  } else if (document.getElementById("formupdate").style.display == 'block') {
    console.log("modify started");
    //update prosessi
    var url = "https://nodejssecond.onrender.com/api/update/"+event.target.elements.ids.value;
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ "artist" : event.target.elements.artist.value, "title" : event.target.elements.title.value, "album" : event.target.elements.album.value })
    };
    fetch(url, requestOptions)
        .then(response => {
          console.log(response)
          //ajastettu timeout koska post ei ehtinyt suoriutua jostain syystä ilman
          window.setTimeout(window.location.reload(false), 2000);
        });
  } else {
    console.log("modify started");
    //poisto prosessi
    var url = "https://nodejssecond.onrender.com/api/delete/"+event.target.elements.ids.value;
    const requestOptions = {
        method: 'DELETE'
    };
    fetch(url, requestOptions)
        .then(response => {
          console.log(response)
          //ajastettu timeout koska post ei ehtinyt suoriutua jostain syystä ilman
          window.setTimeout(window.location.reload(false), 2000);
        });
  }
});

function update() {
  document.getElementById("formupdate").style.display = "block";
  document.getElementById("formremove").style.display = "none";
  document.getElementById("formadd").style.display = "none";
}

function add() {
  document.getElementById("formupdate").style.display = "none";
  document.getElementById("formremove").style.display = "none";
  document.getElementById("formadd").style.display = "block";
}

function remove() {
  document.getElementById("formupdate").style.display = "none";
  document.getElementById("formremove").style.display = "block";
  document.getElementById("formadd").style.display = "none";
}

document.addEventListener("DOMContentLoaded", () =>{
  document.getElementById("remove").addEventListener("click", remove);
  document.getElementById("list").addEventListener("click", add);
  document.getElementById("update").addEventListener("click", update);
  document.getElementById("formupdate").style.display = "none";
  document.getElementById("formremove").style.display = "none";
  document.getElementById("formadd").style.display = "block";
  console.log("Attempting getall")
  fetch("https://nodejssecond.onrender.com/api/getall")
  .then((result) => {
  console.log("Result: "+result)
  return result.json();
  })
  .then((data) => {
  console.log("Data: "+data)
  var jsonData = data;

  let container = document.getElementById("id01");
  let table = document.createElement("table");
  table.classList.add("table");
  table.setAttribute("id","table");
  table.classList.add("table-striped");

  //jsonData.forEach(function(x){ delete x._id });

  let cols = Object.keys(jsonData[0]);
    
  // Create the header element
  let thead = document.createElement("thead");
  thead.classList.add("thead-dark");
  let tr = document.createElement("tr");
  // Loop through the column names and create header cells
  cols.forEach((item) => {
    let th = document.createElement("th");
    th.classList.add("col");
    // eslint-disable-next-line default-case
    switch (item) {
      case "_id":
        item = "ID"
        break;
    }
    th.innerText = item; // Set the column name as the text of the header cell
    tr.appendChild(th); // Append the header cell to the header row
  });
  thead.appendChild(tr); // Append the header row to the header
  table.append(tr) // Append the header to the table
  
  // Loop through the JSON data and create table rows
  jsonData.forEach((item) => {
    let tr = document.createElement("tr");
    
    // Get the values of the current object in the JSON data
    let vals = Object.values(item);
    
    // Loop through the values and create table cells
    vals.forEach((elem) => {
      let td = document.createElement("td");
      console.log("elem "+elem);
      let compare = JSON.stringify(elem);
      let result = compare.includes("Z");
      if (result === true){
        var newelem;
        newelem = elem.slice(11,16);
        console.log(newelem);
        elem = newelem;
      }
      td.innerText = elem; // Set the value as the text of the table cell
      tr.appendChild(td); // Append the table cell to the table row
    });
    table.appendChild(tr); // Append the table row to the table
  });
  container.appendChild(table) // Append the table to the container element

  });
});


const App = () => (

    <div className="container-fluid">
    <div className="row">
      <div className="col-md-12">
        <h3>
          React Frontend for RESTAPI
        </h3>
        <ul className="nav nav-pills">
          <li className="nav-item">
            <button className="btn btn-primary" id="list">Lisää</button>
          </li>
          <li className="nav-item">
            <button className="btn btn-secondary" id="update">Päivitä</button>
          </li>
          <li className="nav-item">
            <button className="btn btn-danger" id="remove">Poista</button>
          </li>
        </ul>

        <form role="form" id="formadd">
          <div className="form-group">
            <p className="help-block">
              Add a entry
            </p>
            <label for="artist">
              Artist
            </label>
            <input type="artist" className="form-control" id="artist" />
          </div>
          <div className="form-group">
            
            <label for="title">
              Title
            </label>
            <input type="title" className="form-control" id="title" />
          </div>
          <div className="form-group">             
            <label for="album">
              Album
            </label>
            <input type="album" className="form-control" id="album" />
          </div>
          <button type="submit" className="btn btn-primary">
            Add
          </button>
        </form>

        <form role="form" id="formremove">
          <div className="form-group">
            <p className="help-block">
              Remove entry
            </p>         
            <label for="ids">
              ID of entry to be removed
            </label>
            <input type="ids" className="form-control" id="ids" />
          </div>
          <button type="submit" className="btn btn-primary">
            Remove
          </button>
        </form>

        <form role="form" id="formupdate">
        <div className="form-group">
          <p className="help-block">
          Update a entry
          </p>
          <label for="artist">
            Artist
          </label>
          <input type="artist" className="form-control" id="artist" />
        </div>
        <div className="form-group">
          
          <label for="title">
            Title
          </label>
          <input type="title" className="form-control" id="title" />
        </div>
        <div className="form-group">        
          <label for="album">
            Album
          </label>
          <input type="album" className="form-control" id="album" />
        </div>
        <div className="form-group">               
        <label for="ids">
          ID of entry
        </label>
        <input type="ids" className="form-control" id="ids" />
        <p className="help-block">
          Type the ID of the entry you want to modify
        </p>
      </div>
        <button type="submit" className="btn btn-primary">
          Päivitä
        </button>
      </form>
        <div className="row">
          <div className="col-md-6" id="id01">
          </div>
        </div>
      </div>
    </div>
    </div>
)

export default App;