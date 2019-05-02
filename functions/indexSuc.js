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
    var sucursal = document.getElementById("sucursal").value;
    var telSuc = document.getElementById("telSuc").value;
    var direccionSuc = document.getElementById("direccionSuc").value;
    var responsable = document.getElementById("responsable").value;
    e.preventDefault();
    createTask(sucursal,telSuc,direccionSuc,responsable);
    form.reset();
  });

  function createTask(sucursal,telSuc,direccionSuc,responsable){
      console.log(counter);
      counter+=1;
      console.log(counter);
      var sucursal={
          id: counter,
          sucursal: sucursal,
          telSuc:telSuc,
          direccionSuc:direccionSuc,
          responsable:responsable
    
      }
      let db= firebase.database().ref("sucursales/"+counter);
      db.set(sucursal);
      document.getElementById("cardSection").innerHTML='';
      readTask();

  }

  function readTask(){
      var proveedor= firebase.database().ref("sucursales/");
      proveedor.on("child_added",function(data){
        var sucursalesValue= data.val();
        
        document.getElementById("cardSection").innerHTML+=`
        <div class="card mb-3">
        <div class="card-body">
        <h5 class="card-title">${sucursalesValue.sucursal}</h5>
        <p class="card-text">${sucursalesValue.telSuc}</p>
        <p class="card-text">${sucursalesValue.direccionSuc}</p>
        <p class="card-text">${sucursalesValue.responsable}</p>
        <button type="submit" style="color:white" class="btn btn-warning" onclick="updateTask(${sucursalesValue.id},'${sucursalesValue.sucursal}','${sucursalesValue.telSuc}','${sucursalesValue.direccionSuc}','${sucursalesValue.responsable}')"> 
        <i class="fas fa-edit"></i>Edit task</button>
        <button type="submit" class="btn btn-danger" onclick="deleteTask(${sucursalesValue.id})">
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
      <label>Sucusal</label>
      <input type="text" class="form-control" id="sucursal" placeholder="Sucusal">
      </div>
      <div class="form-group">
      <label>Telefono</label>
      <input type="text" class="form-control" id="telSuc" placeholder="Telefono"></div>
      <div class="form-group">
      <label>Dirección</label>
      <input type="text" class="form-control" id="direccionSuc" placeholder="Dirección"></div>
      <div class="form-group">
      <label>Responsable</label>
      <input type="text" class="form-control" id="responsable" placeholder="Responsable"></div>


      <button type="submit" id="button1" class="btn btn-primary"><i class="fas fa-plus"></i>Add task</button>
      <button style="display: none" id="button2" class="btn btn-success">Update task</button>
      <button style="display: none" id="button3" class="btn btn-danger">Cancel</button>

      </form>
      `;

      document.getElementById("form").addEventListener("submit",(e)=>{
        var sucursal = document.getElementById("sucursal").value;
    var telSuc = document.getElementById("telSuc").value;
    var direccionSuc = document.getElementById("direccionSuc").value;
    var responsable = document.getElementById("responsable").value;
        e.preventDefault();
        createTask(sucursal,telSuc,direccionSuc,responsable);
        form.reset();
      });
  }

  function updateTask(id,sucursal,telSuc,direccionSuc,responsable){
      document.getElementById("firstSection").innerHTML=`
      <form class="border p-4 mb-4" id="form2">
      <div class="form-group">
      <label>Sucusal</label>
      <input type="text" class="form-control" id="sucursal" placeholder="Sucusal">
      </div>
      <div class="form-group">
      <label>Telefono</label>
      <input type="text" class="form-control" id="telSuc" placeholder="Telefono"></div>
      <div class="form-group">
      <label>Dirección</label>
      <input type="text" class="form-control" id="direccionSuc" placeholder="Dirección"></div>
      <div class="form-group">
      <label>Responsable</label>
      <input type="text" class="form-control" id="responsable" placeholder="Responsable"></div>

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
        updateTask2(id,document.getElementById("sucursal").value,document.getElementById
        ("telSuc").value,document.getElementById("direccionSuc").value,document.getElementById("responsable").value);
    });
      
      document.getElementById("sucursal").value=sucursal;
      document.getElementById("telSuc").value=telSuc;
      document.getElementById("direccionSuc").value=direccionSuc;
      document.getElementById("responsable").value=responsable;


  }

  function updateTask2(id,sucursal,telSuc,direccionSuc,responsable){
    var taskUpdated={
        id: counter,
          sucursal: sucursal,
          telSuc:telSuc,
          direccionSuc:direccionSuc,
          responsable:responsable
          

    }
    let db= firebase.database().ref("sucursales/"+id);
    db.set(taskUpdated);

    document.getElementById("cardSection").innerHTML='';
    readTask();
    reset();
  }

  function deleteTask(id){
      var sucursal= firebase.database().ref("sucursales/"+id);
      sucursal.remove();
      reset();
      document.getElementById("cardSection").innerHTML='';
      readTask();
  }
