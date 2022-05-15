const pieces = document.getElementsByTagName('svg');
const add = document.getElementById('add');
const area = document.getElementById('area');
const areas = document.getElementById('areas');
// const malestar = document.getElementById('malestar');
window.onload = function () {
    agregarArea();
}

function agregarArea() {
    for (var i = 0; pieces.length; i++) {
        let _piece = pieces[i];
        _piece.onclick = function (t) {
            if (t.target.getAttribute('data-position') != null) document.getElementById('data').innerHTML = t.target.getAttribute('data-position');
            if (t.target.parentElement.getAttribute('data-position') != null) document.getElementById('data').innerHTML = t.target.parentElement.getAttribute('data-position');
            add.style.display = "block";
        }
    }

}

function clonar() {
    function malestar(zona, tipoDolor) {
        this.zona = zona;
        this.tipoDolor = tipoDolor;
    }
    var zonaDolor = document.getElementById('data').textContent;
    var tipoMalestar = document.getElementById('malestar').value;
    nuevoMalestar = new malestar(zonaDolor, tipoMalestar);
    //console.log(nuevoMalestar);
    agregar();
    document.getElementById('data').innerHTML = "";
    document.getElementById('malestar').value = "";

}
var arrayMalestar = [];
function agregar() {
    arrayMalestar.push(nuevoMalestar);
    //console.log(arrayMalestar);
    document.getElementById('table').innerHTML += '<tbody><td>' + nuevoMalestar.zona + '</td><td>' + nuevoMalestar.tipoDolor + '</td></tbody>'
};
var arrayFinal = [];
function obtenerDatos() {
    let edad = document.getElementById("edad").value;
    let sexo = document.getElementById("sexo").value;
    arrayFinal.push(edad);
    arrayFinal.push(sexo);
    arrayFinal.push(arrayMalestar);
   // console.log(arrayFinal);
    usuarioJson = JSON.stringify(arrayFinal);
    console.log(usuarioJson)

    //     $.ajax({
    //     data: JSON.stringify(arrayFinal),
    //     url: "https://api.infermedica.com/v3/parse",
    //     type: 'POST',
    //     dataType: 'json',
    //     contentType: 'application/json',
    //     success: function() {
    //         console.log(data);
    //     },
    //     error: function(){
    //         alert("wrong");
    //     }
    // })

    fetch("https://api.infermedica.com/v3/parse", {
        method: "POST",
        mode:"cors",
        credentials:{
            "appId": "9a953412",
            "appKey": "2bb6773e4623c98dcbc2e5e8c80927cd"
        },
        headers: { "Content-Type": "application/json" },
        body: usuarioJson
    })
        .then(response => response.json()
            .then(json => console.log(json)));

}


// function peticion() {
//    fetch("https://api.infermedica.com/v3/parse",{
//        method: "POST",
//        mode: "App-Id: 9a953412", "App-Key: 2bb6773e4623c98dcbc2e5e8c80927cd",
//        headers:{"Content-Type: application/json" },
//        body: usuarioJson
//    })
//    .then(response => response.json()
//    .then(json=>console.log(json)));
// }

// curl "https://api.infermedica.com/v3/parse" \
// -X "POST" \
// -H "App-Id: 9a953412" - H "App-Key: 2bb6773e4623c98dcbc2e5e8c80927cd" \
// -H "Content-Type: application/json" \
// usuarioJson '{"text": "I often feel sad.", "age": {"value":30}, "include_tokens": true}'