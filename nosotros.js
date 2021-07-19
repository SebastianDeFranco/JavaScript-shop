const URLJSON = "./api.json"

$.getJSON(URLJSON, function (respuesta, estado) {
    if(estado === "success"){
        let misDatos = respuesta;

        misDatos.forEach(dato=>{$('#chef').append(`
            <div class="card col-4" style="width: 20rem;"">
                <img src="${dato.imagen}" class="card-img-top">
                <div class="card-body">
                    <h3 class="card-title">${dato.nombre}</h3>
                    <p class="card-text"> ${dato.profesion}</p>
                </div>
            </div>`)
        })
}
});




