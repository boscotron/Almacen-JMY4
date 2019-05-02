var config = {
    apiKey: "AIzaSyAYxVpEPJeu18b9yU2SsDiUexAgU5_NM7c",
    authDomain: "prueb-eb7a8.firebaseapp.com",
    databaseURL: "https://prueb-eb7a8.firebaseio.com",
    projectId: "prueb-eb7a8",
    storageBucket: "prueb-eb7a8.appspot.com",
    messagingSenderId: "487645823863"
};
firebase.initializeApp(config);

var d = new Date();
var t = d.getTime();
var counter = t;

document.getElementById("form").addEventListener("submit", (e) => {
    var nombreProv = document.getElementById("nombreProv").value;
    var telProv = document.getElementById("telProv").value;
    var direccionProv = document.getElementById("direccionProv").value;
    var diaPedido = document.getElementById("diaPedido").value;
    e.preventDefault();
    createTask(nombreProv, telProv, direccionProv, diaPedido);
    form.reset();
});

function createTask(nombreProv, telProv, direccionProv, diaPedido) {
    console.log(counter);
    counter += 1;
    console.log(counter);
    var nombreProv = {
        id: counter,
        nombreProv: nombreProv,
        telProv: telProv,
        direccionProv: direccionProv,
        diaPedido: diaPedido

    }
    let db = firebase.database().ref("proveedores/" + counter);
    db.set(nombreProv);
    document.getElementById("cardSection").innerHTML = '';
    readTask();

}

function readTask() {
    var proveedor = firebase.database().ref("proveedores/");
    proveedor.on("child_added", function (data) {
        var proveedorValue = data.val();

        document.getElementById("cardSection").innerHTML += `
        <div class="card mb-3">
        <div class="card-body">
        <h5 class="card-title">${proveedorValue.nombreProv}</h5>
        <p class="card-text">${proveedorValue.telProv}</p>
        <p class="card-text">${proveedorValue.direccionProv}</p>
        <p class="card-text">${proveedorValue.diaPedido}</p>
        <button type="submit" style="color:white" class="btn btn-warning" onclick="updateTask(${proveedorValue.id},'${proveedorValue.nombreProv}','${proveedorValue.telProv}','${proveedorValue.direccionProv}','${proveedorValue.diaPedido}')"> 
        <i class="fas fa-edit"></i>Edit task</button>
        <button type="submit" class="btn btn-danger" onclick="deleteTask(${proveedorValue.id})">
        <i class="fas fa-trash-alt"></i>Delete task</button>
         </div> 
        </div>
        `
    })
}

function reset() {
    document.getElementById("firstSection").innerHTML = `
      <form class="border p-4 mb-4" id="form">
      <div class="form-group">
      <label>Proveedor</label>
      <input type="text" class="form-control" id="nombreProv" placeholder="Nombre">
  </div>
  <div class="form-group">
      <label>Telefono</label>
      <input type="text" class="form-control" id="telProv" placeholder="Telefono"></div>
      <div class="form-group">
      <label>Dirección</label>
      <input type="text" class="form-control" id="direccionProv" placeholder="Dirección"></div>
      <div class="form-group">
      <label>Dia de Pedido</label>
      <input type="text" class="form-control" id="diaPedido" placeholder="Dia de Pedido"></div>


      <button type="submit" id="button1" class="btn btn-primary"><i class="fas fa-plus"></i>Add task</button>
      <button style="display: none" id="button2" class="btn btn-success">Update task</button>
      <button style="display: none" id="button3" class="btn btn-danger">Cancel</button>

      </form>
      `;

    document.getElementById("form").addEventListener("submit", (e) => {
        var nombreProv = document.getElementById("nombreProv").value;
        var telProv = document.getElementById("telProv").value;
        var direccionProv = document.getElementById("direccionProv").value;
        var diaPedido = document.getElementById("diaPedido").value;
        e.preventDefault();
        createTask(nombreProv, telProv, direccionProv, diaPedido);
        form.reset();
    });
}

function updateTask(id, nombreProv, telProv, direccionProv, diaPedido) {
    document.getElementById("firstSection").innerHTML = `
      <form class="border p-4 mb-4" id="form2">
      <div class="form-group">
      <label>Proveedor</label>
      <input type="text" class="form-control" id="nombreProv" placeholder="Nombre">
  </div>
  <div class="form-group">
      <label>Telefono</label>
      <input type="text" class="form-control" id="telProv" placeholder="Telefono"></div>
      <div class="form-group">
      <label>Dirección</label>
      <input type="text" class="form-control" id="direccionProv" placeholder="Dirección"></div>
      <div class="form-group">
      <label>Dia de Pedido</label>
      <input type="text" class="form-control" id="diaPedido" placeholder="Dia de Pedido"></div>

      <button style="display: none" id="button1" class="btn btn-primary">Add task</button>
      <button type="submit" style="display: inline-block" id="button2" class="btn btn-success"><i class="fas fa-sync-alt"></i>Update task</button>
      <button style="display: inline-block" id="button3" class="btn btn-danger"><i class="fas fa-ban"></i>Cancel</button>

      </form>
      `;
    document.getElementById("form2").addEventListener("submit", (e) => {
        e.preventDefault();
    });
    document.getElementById("button3").addEventListener("click", (e) => {
        reset();
    });
    document.getElementById("button2").addEventListener("click", (e) => {
        updateTask2(id, document.getElementById("nombreProv").value, document.getElementById
            ("telProv").value, document.getElementById("direccionProv").value, document.getElementById("diaPedido").value);
    });

    document.getElementById("nombreProv").value = nombreProv;
    document.getElementById("telProv").value = telProv;
    document.getElementById("direccionProv").value = direccionProv;
    document.getElementById("diaPedido").value = diaPedido;


}

function updateTask2(id, nombreProv, telProv, direccionProv, diaPedido) {
    var taskUpdated = {
        id: counter,
        nombreProv: nombreProv,
        telProv: telProv,
        direccionProv: direccionProv,
        diaPedido: diaPedido


    }
    let db = firebase.database().ref("proveedores/" + id);
    db.set(taskUpdated);

    document.getElementById("cardSection").innerHTML = '';
    readTask();
    reset();
}

function deleteTask(id) {
    var nombreProv = firebase.database().ref("proveedores/" + id);
    nombreProv.remove();
    reset();
    document.getElementById("cardSection").innerHTML = '';
    readTask();
}
