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
  var counter =t;

  document.getElementById("form").addEventListener("submit",(e)=>{
    var producto = document.getElementById("producto").value;
    var precio = document.getElementById("precio").value;
    var proveedor = document.getElementById("proveedor").value;
    var cantidad = document.getElementById("cantidad").value;
    var fcompra = document.getElementById("fcompra").value;
    var fventa = document.getElementById("fventa").value;
    e.preventDefault();
    createTask(producto,precio,proveedor,cantidad,fcompra,fventa);
    form.reset();
  });

  function createTask(producto,precio,proveedor,cantidad,fcompra,fventa){
      console.log(counter);
      counter+=1;
      console.log(counter);
      var producto={
          id: counter,
          producto: producto,
          precio:precio,
          proveedor:proveedor,
          cantidad:cantidad,
          fcompra:fcompra,
          fventa:fventa
      }
      let db= firebase.database().ref("productos/"+counter);
      db.set(producto);
      document.getElementById("cardSection").innerHTML='';
      readTask();

  }

  function readTask(){
      var producto= firebase.database().ref("productos/");
      producto.on("child_added",function(data){
        var productoValue= data.val();
        
        document.getElementById("cardSection").innerHTML+=`
        <div class="card mb-3">
        <div class="card-body">
        <h5 class="card-title">${productoValue.producto}</h5>
        <p class="card-text">${productoValue.precio}</p>
        <p class="card-text">${productoValue.proveedor}</p>
        <p class="card-text">${productoValue.cantidad}</p>
        <p class="card-text">${productoValue.fcompra}</p>
        <p class="card-text">${productoValue.fventa}</p>
        <button type="submit" style="color:white" class="btn btn-warning" onclick="updateTask(${productoValue.id},'${productoValue.producto}','${productoValue.precio}','${productoValue.proveedor}','${productoValue.cantidad}','${productoValue.fcompra}','${productoValue.fventa}')"> 
        <i class="fas fa-edit"></i>Edit task</button>
        <button type="submit" class="btn btn-danger" onclick="deleteTask(${productoValue.id})">
        <i class="fas fa-trash-alt"></i>Delete task</button>
         </div> 
        </div>
        `
      })
  }

  function reset(){
      document.getElementById("firstSection").innerHTML=`
      <form class="border p-4 mb-4" id="form">
      <div class="form-group">
      <label>Producto</label>
      <input type="text" class="form-control" id="producto" placeholder="Producto">
  </div>
  <div class="form-group">
      <label>Precio</label>
      <input type="text" class="form-control" id="precio" placeholder="Precio"></div>
      <div class="form-group">
      <label>Proveedor</label>
      <input type="text" class="form-control" id="proveedor" placeholder="proveedor"></div>
      <div class="form-group">
      <label>Cantidad</label>
      <input type="text" class="form-control" id="cantidad" placeholder="Cantidad"></div>
      <div class="form-group">
      <label>Fecha de Compra</label>
      <input type="text" class="form-control" id="fcompra" placeholder="Fecha de Compra"></div>
      <div class="form-group">
      <label>Fecha de Venta</label>
      <input type="text" class="form-control" id="fventa" placeholder="Fecha de Venta"></div>


      <button type="submit" id="button1" class="btn btn-primary"><i class="fas fa-plus"></i>Add task</button>
      <button style="display: none" id="button2" class="btn btn-success">Update task</button>
      <button style="display: none" id="button3" class="btn btn-danger">Cancel</button>

      </form>
      `;

      document.getElementById("form").addEventListener("submit",(e)=>{
        var producto = document.getElementById("producto").value;
    var precio = document.getElementById("precio").value;
    var proveedor = document.getElementById("proveedor").value;
    var cantidad = document.getElementById("cantidad").value;
    var fcompra = document.getElementById("fcompra").value;
    var fventa = document.getElementById("fventa").value;
        e.preventDefault();
        createTask(producto,precio,proveedor,cantidad,fcompra,fventa);
        form.reset();
      });
  }

  function updateTask(id,producto,precio,proveedor,cantidad,fcompra,fventa){
      document.getElementById("firstSection").innerHTML=`
      <form class="border p-4 mb-4" id="form2">
      <div class="form-group">
      <label>Producto</label>
      <input type="text" class="form-control" id="producto" placeholder="Producto"></div>
      <div class="form-group">
      <label>Precio</label>
      <input type="text" class="form-control" id="precio" placeholder="Precio"></div>
      <div class="form-group">
      <label>Proveedor</label>
      <input type="text" class="form-control" id="proveedor" placeholder="proveedor"></div>
      <div class="form-group">
      <label>Cantidad</label>
      <input type="text" class="form-control" id="cantidad" placeholder="Cantidad"></div>
      <div class="form-group">
      <label>Fecha de Compra</label>
      <input type="text" class="form-control" id="fcompra" placeholder="Fecha de Compra"></div>
      <div class="form-group">
      <label>Fecha de Venta</label>
      <input type="text" class="form-control" id="fventa" placeholder="Fecha de Venta"></div>

      <button style="display: none" id="button1" class="btn btn-primary">Add task</button>
      <button type="submit" style="display: inline-block" id="button2" class="btn btn-success"><i class="fas fa-sync-alt"></i>Update task</button>
      <button style="display: inline-block" id="button3" class="btn btn-danger"><i class="fas fa-ban"></i>Cancel</button>

      </form>
      `;
      document.getElementById("form2").addEventListener("submit",(e)=>{
        e.preventDefault();
      });
      document.getElementById("button3").addEventListener("click",(e)=>{
        reset();
      });
      document.getElementById("button2").addEventListener("click",(e)=>{
        updateTask2(id,document.getElementById("producto").value,document.getElementById
        ("precio").value,document.getElementById("proveedor").value,document.getElementById
        ("cantidad").value,document.getElementById("fcompra").value,document.getElementById
        ("fventa").value);
    });
      
      document.getElementById("producto").value=producto;
      document.getElementById("precio").value=precio;
      document.getElementById("proveedor").value=proveedor;
      document.getElementById("cantidad").value=cantidad;
      document.getElementById("fcompra").value=fcompra;
      document.getElementById("fventa").value=fventa;

  }

  function updateTask2(id,producto,precio,proveedor,cantidad,fcompra,fventa){
    var taskUpdated={
        id: counter,
          producto: producto,
          precio:precio,
          proveedor:proveedor,
          cantidad:cantidad,
          fcompra:fcompra,
          fventa:fventa

    }
    let db= firebase.database().ref("productos/"+id);
    db.set(taskUpdated);

    document.getElementById("cardSection").innerHTML='';
    readTask();
    reset();
  }

  function deleteTask(id){
      var producto= firebase.database().ref("productos/"+id);
      producto.remove();
      reset();
      document.getElementById("cardSection").innerHTML='';
      readTask();
  }


  