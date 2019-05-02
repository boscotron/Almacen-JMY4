$(document).ready(function () {

    $("#guardar_proveedor").on('click',function () {
        let formulario = [];
        $(".formulario").each(function () {
            let temporal = {};
            temporal[$(this).attr('id')]=$(this).val();            
            formulario.push(temporal);
        });

        console.log('formulario',formulario);
        console.log('peticion a:',$("#url_base").val()+"almacen/proeveedor");
        

    });
});