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
    var diaPedido = document.getElementById("diaPedido").value;
    var sucursal = document.getElementById("sucursal").value;
    var nombreProv = document.getElementById("nombreProv").value;
    var producto = document.getElementById("producto").value;
    var estatus = document.getElementById("estatus").value;
    e.preventDefault();
    createTask(diaPedido, sucursal, nombreProv,producto,estatus);
    form.reset();
});

function createTask(diaPedido, sucursal, nombreProv,producto,estatus) {
    console.log(counter);
    counter += 1;
    console.log(counter);
    var diaPedido = {
        id: counter,
        diaPedido: diaPedido,
        sucursal: sucursal,
        nombreProv: nombreProv,
        producto: producto,
        estatus: estatus

    }
    let db = firebase.database().ref("pedidos/" + counter);
    db.set(diaPedido);
    document.getElementById("cardSection").innerHTML = '';
    readTask();

}

function readTask() {
    var pedido = firebase.database().ref("pedidos/");
    pedido.on("child_added", function (data) {
        var pedidoValue = data.val();

        document.getElementById("cardSection").innerHTML += `
        <div class="card mb-3">
        <div class="card-body">
        <h5 class="card-title">${pedidoValue.diaPedido}</h5>
        <p class="card-text">${pedidoValue.sucursal}</p>
        <p class="card-text">${pedidoValue.nombreProv}</p>
        <p class="card-text">${pedidoValue.producto}</p>
        <p class="card-text">${pedidoValue.estatus}</p>
        <button type="submit" style="color:white" class="btn btn-warning" onclick="updateTask(${pedidoValue.id},'${pedidoValue.diaPedido}','${pedidoValue.sucursal}','${pedidoValue.nombreProv}','${pedidoValue.producto}','${pedidoValue.estatus}')"> 
        <i class="fas fa-edit"></i>Edit task</button>
        <button type="submit" class="btn btn-danger" onclick="deleteTask(${pedidoValue.id})">
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
      <label>Pedido</label>
                    </div>
                    <div class="form-group">
                        <label>Dia de Pedido</label>
                        <input type="text" class="form-control" id="diaPedido" placeholder="Dia de Pedido">
                    </div>
                    <div class="form-group">
                        <label>Sucusal</label>
                        <input type="text" class="form-control" id="sucursal" placeholder="Sucusal">
                    </div>
                    <div class="form-group">
                        <label>Proveedor</label>
                        <input type="text" class="form-control" id="nombreProv" placeholder="Proveedor">
                    </div>
                    <div class="form-group">
                            <label>Producto</label>
                            <input type="text" class="form-control" id="producto" placeholder="Producto">
                        </div>
                    <div class="form-group">
                        <label>Estatus</label>
                        <input type="text" class="form-control" id="estatus" placeholder="Estatus">
                    </div>


      <button type="submit" id="button1" class="btn btn-primary"><i class="fas fa-plus"></i>Add task</button>
      <button style="display: none" id="button2" class="btn btn-success">Update task</button>
      <button style="display: none" id="button3" class="btn btn-danger">Cancel</button>

      </form>
      `;

    document.getElementById("form").addEventListener("submit", (e) => {
        var diaPedido = document.getElementById("diaPedido").value;
        var sucursal = document.getElementById("sucursal").value;
        var nombreProv = document.getElementById("nombreProv").value;
        var producto = document.getElementById("producto").value;
        var estatus = document.getElementById("estatus").value;
        e.preventDefault();
        createTask(diaPedido, sucursal, nombreProv,producto,estatus);
        form.reset();
    });
}

function updateTask(id,diaPedido, sucursal, nombreProv,producto,estatus) {
    document.getElementById("firstSection").innerHTML = `
      <form class="border p-4 mb-4" id="form2">
      <div class="form-group">
      <label>Pedido</label>
      </div>
      <div class="form-group">
          <label>Dia de Pedido</label>
          <input type="text" class="form-control" id="diaPedido" placeholder="Dia de Pedido">
      </div>
      <div class="form-group">
          <label>Sucusal</label>
          <input type="text" class="form-control" id="sucursal" placeholder="Sucusal">
      </div>
      <div class="form-group">
          <label>Proveedor</label>
          <input type="text" class="form-control" id="nombreProv" placeholder="Proveedor">
      </div>
      <div class="form-group">
              <label>Producto</label>
              <input type="text" class="form-control" id="producto" placeholder="Producto">
          </div>
      <div class="form-group">
          <label>Estatus</label>
          <input type="text" class="form-control" id="estatus" placeholder="Estatus">
      </div>

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
        updateTask2(id, document.getElementById("diaPedido").value, document.getElementById
            ("sucursal").value, document.getElementById("nombreProv").value, document.getElementById("producto").value,document.getElementById("estatus").value);
    });

    document.getElementById("diaPedido").value = diaPedido;
    document.getElementById("sucursal").value = sucursal;
    document.getElementById("nombreProv").value = nombreProv;
    document.getElementById("producto").value = producto;
    document.getElementById("estatus").value = estatus;


}

function updateTask2(id, diaPedido, sucursal, nombreProv,producto,estatus) {
    var taskUpdated = {
        id: counter,
        diaPedido: diaPedido,
        sucursal: sucursal,
        nombreProv: nombreProv,
        producto: producto,
        estatus: estatus


    }
    let db = firebase.database().ref("pedidos/" + id);
    db.set(taskUpdated);

    document.getElementById("cardSection").innerHTML = '';
    readTask();
    reset();
}

function deleteTask(id) {
    var diaPedido = firebase.database().ref("pedidos/" + id);
    diaPedido.remove();
    reset();
    document.getElementById("cardSection").innerHTML = '';
    readTask();
}