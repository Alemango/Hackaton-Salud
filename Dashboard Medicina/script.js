const dataMedicina = document.querySelector('[dataMedicina]');
const nombre = document.querySelector('[dataNombre]');
const imagen = document.querySelector('[dataImagen]');
const imgContainer = document.querySelector('[dataImgContainer]');
const id = document.querySelector('[dataId]');
const tipos = document.querySelector('[dataTipo]');
const info = document.querySelector('[informacion]');
const medicamentos = document.querySelector('[medicamento]');
const indicacion = document.querySelector('[indicaciones]');
const indTitulo = document.querySelector('[indicacionesTitulo');
const vsIndTitle = document.querySelector('[contraTitulo]');
const vsInd = document.querySelector('[contra]')
const dosT = document.querySelector('[dosisTitulo]');
const doss = document.querySelector('[dosis]');
const interT = document.querySelector('[interaccionesTitulo]');
const inter = document.querySelector('[interacciones]')

const typeColors = {
    Oral: '#FBD39C',
    Inyectable: '#D38675',
    Cutánea: '#E34287'
};

const buscaMedicamento = event =>{
    event.preventDefault();
    let {value} = event.target.medicina;
    fetch(`https://medicamentoapi-default-rtdb.firebaseio.com/${value.toLowerCase()}.json`)
        .then(data => data.json())
        .then(response => renderData(response))
        .catch(error => renderNotFound());
}

const renderData = data =>{
    const sprite = data.media;
    const { generalidades,via,indicaciones,contraindicaciones,dosis,interacciones } = data;

    nombre.textContent = data.nombre;
    imagen.setAttribute('src', sprite);

    renderTipo(via);
    renderInfo(generalidades);
    renderIndicaciones(indicaciones);
    renderContraindicaciones(contraindicaciones);
    renderDosis(dosis);
    renderInteracciones(interacciones);
};

const renderTipo = tipes => {
    tipos.innerHTML = '';
    const colorOne = typeColors[tipes];
    const typeTextElement = document.createElement("div");
    typeTextElement.style.background = `radial-gradient( ${colorOne} 20%, transparent 80%)`;
    typeTextElement.textContent = tipes;
    tipos.appendChild(typeTextElement);
}

const renderInfo = inf => {
    info.innerHTML = '';
    const typeTextElement = document.createElement("div");
    typeTextElement.style.fontSize = '3vh';
    typeTextElement.textContent = inf;
    tipos.appendChild(typeTextElement);
}

const renderIndicaciones = ind => {
    indicacion.innerHTML = '';
    indTitulo.innerHTML = '';
    const typeTextElement = document.createElement("div");
    typeTextElement.style.fontWeight = 'bold';
    typeTextElement.textContent = 'Indicaciones:';
    indTitulo.appendChild(typeTextElement);
    ind.forEach(indi => {
        const statElement = document.createElement("div");
        const statElementName = document.createElement("div");
        statElementName.textContent = '-' + indi;
        statElement.appendChild(statElementName);
        indicacion.appendChild(statElement);
    });
};

const renderContraindicaciones = vs => {
    vsIndTitle.innerHTML = '';
    vsInd.innerHTML = '';

    const typeTextElement = document.createElement("div");
    typeTextElement.style.fontWeight = 'bold';
    typeTextElement.textContent = 'Contraindicaciones:';
    vsIndTitle.appendChild(typeTextElement);

    vs.forEach(vsin => {
        const statElement = document.createElement("div");
        const statElementName = document.createElement("div");
        statElementName.textContent = '-' + vsin;
        statElement.appendChild(statElementName);
        vsInd.appendChild(statElement);
    });
};
    
const renderDosis = ds => {
    dosT.innerHTML = '';
    doss.innerHTML = '';

    const typeTextElement = document.createElement("div");
    typeTextElement.style.fontWeight = 'bold';
    typeTextElement.textContent = 'Dosis: ';
    dosT.appendChild(typeTextElement);

    doss.textContent = '-' + ds.adultos;
};

const renderInteracciones = int => {
    inter.innerHTML = '';
    interT.innerHTML = '';

    const typeTextElement = document.createElement("div");
    typeTextElement.style.fontWeight = 'bold';
    typeTextElement.textContent = 'Interacciones: ';
    interT.appendChild(typeTextElement);

    int.forEach(ints => {
        const statElement = document.createElement("div");
        const statElementName = document.createElement("div");
        statElementName.textContent = '-' + ints;
        statElement.appendChild(statElementName);
        inter.appendChild(statElement);
    });
};

const renderNotFound = () => {
    nombre.textContent = 'No encontrado';
    imagen.setAttribute('src', "./assets/img/psyduck-2.jpg");
    tipos.innerHTML = '';
    indTitulo.innerHTML = '';
    indicacion.innerHTML = '';
    vsInd.innerHTML = '';
    vsIndTitle.innerHTML = '';
    inter.innerHTML = '';
    interT.innerHTML = '';
    dosT.innerHTML = '';
    doss.innerHTML = '';
}