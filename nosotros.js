// const chef = document.getElementById('chef');

// function Ajax() {
//     let trabajadores = {
//         "first_name": "Robert",
//         "last_name": "Gutierrez",
//         "avatar": "https://reqres.in/img/faces/7-image.jpg"
//     }
//     $.post("https://reqres.in/api/users?page=2", trabajadores).done(function(info) {
//         console.log("Data que retorna la API de reqres: " + JSON.stringify(info));
//     });
//     $.get("https://reqres.in/api/users?page=2").done(function(resultado2) {
//         console.log("Lo que retorna la API con GET: ");
//         console.log(resultado2);
//         let arrayUsuarios = resultado2.data;
//         arrayUsuarios.forEach(chef => {
//             $('#chef').append("<h3>" + chef.first_name + "</h3>");
//             $('#chef').append("<img  src=" + chef.avatar + ">");
//         });
//     })
// }
// Ajax();

// const URLGET   = "https://reqres.in/api/users?page=2"
//Declaramos la información a enviar


// const infoPost =  { first_name: "Adrian", last_name: "Pizzero", avatar: "./img/pizza-2.jpg" }



//Agregamos un botón con jQuery
//Escuchamos el evento click del botón agregado

// $.post(URLGET, infoPost ,(respuesta, estado) => {
//         if(estado === "success"){
//             $("#chef").prepend(`<div>
//         <h1>${respuesta.first_name}</h1>
//         <p>${respuesta.last_name}
//         </div>`);
//         }  
//     });


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




