var Candidatos = (function() {
    var agregarCandidato = function(nombre, color) {
        var div = document.createElement('div');
        var circle = document.createElement('span');
        var text = document.createElement('span');
        var counter = document.createElement('span');
        var button = document.createElement('button');
        var deleteButton = document.createElement('button');

        circle.style.display = 'inline-block';
        circle.style.width = '20px';
        circle.style.height = '20px';
        circle.style.borderRadius = '50%';
        circle.style.backgroundColor = color;
        circle.style.marginRight = '10px';

        text.textContent = nombre;
        text.style.marginRight = '10px';

        counter.textContent = '0';
        counter.style.marginRight = '10px';

        button.textContent = 'Votar';
        button.addEventListener('click', function() {
            counter.textContent = parseInt(counter.textContent) + 1;
            Barra.actualizarBarra();
        });

        deleteButton.textContent = 'x';
        deleteButton.style.marginLeft = '10px';
        deleteButton.addEventListener('click', function() {
            div.remove();
            Barra.actualizarBarra();
        });

        div.appendChild(circle);
        div.appendChild(text);
        div.appendChild(counter);
        div.appendChild(button);
        div.appendChild(deleteButton);

        document.querySelector('.listcand').appendChild(div);

        
        document.getElementById('nombreInput').value = '';
        Barra.actualizarBarra();
    };

    return {
        agregarCandidato: agregarCandidato
    };

})();

// Modulo para manejar mi barra de porcentaje
var Barra = (function() {
    var actualizarBarra = function() {
        var porcand = document.querySelector('.porcand');
        porcand.innerHTML = '';

        var candidatos = document.querySelectorAll('.listcand div');
        var totalVotos = 0;
        candidatos.forEach(function(item) {
            totalVotos += parseInt(item.children[2].textContent);
        });

        candidatos.forEach(function(item) {
            var votos = parseInt(item.children[2].textContent);
            var color = item.children[0].style.backgroundColor;

            var porcentaje = totalVotos === 0 ? 0 : votos / totalVotos * 100;

            var barra = document.createElement('div');
            barra.style.backgroundColor = color;
            barra.style.color = 'white';
            barra.style.width = porcentaje * 3  + '%';
            barra.style.height = '50px';
            barra.style.lineHeight = '20px';
            barra.textContent = porcentaje.toFixed(1) + '%';
            barra.style.textAlign = 'center';

            porcand.appendChild(barra);
        });
    };

    return {
        actualizarBarra: actualizarBarra
    };
})();

// Aca queda el evento de agregar candidato donde hace las llamadas al modulo. 
document.getElementById('agregarBtn').addEventListener('click', function() {
    var nombre = document.getElementById('nombreInput').value;
    var color = '#' + Math.floor(Math.random()*16777215).toString(16);
    Candidatos.agregarCandidato(nombre, color);
});

// pd: Construi el css acá ya que me puse a ver videos de como hacerlo primero con canvas.
// ya luego me aparecio uno para hacerlo con css puro, y el ejemplo me lo enseñaba así.
// No quise inventar mucho mandando todo a style.css porque no sabia como implementarlo.
// de antemano mi disculpa por el wacho. 
