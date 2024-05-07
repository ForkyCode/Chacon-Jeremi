document.getElementById('fibForm').addEventListener('submit', handleFormSubmit);

function handleFormSubmit(e) {
    e.preventDefault();
    const num = document.getElementById('num').value;
    const fibSeries = getFibonacci(num);
    displayFibonacci(fibSeries);
}

function getFibonacci(n) {
    if (n <= 0) return [];
    if (n === 1) return [0];
    const fibSeries = [0, 1];
    while (fibSeries.length < n) {
        const nextNum = fibSeries[fibSeries.length - 1] + fibSeries[fibSeries.length - 2];
        fibSeries.push(nextNum);
    }
    return fibSeries;
}

function displayFibonacci(fibSeries) {
    const container = document.getElementById('cardContainer');
    container.innerHTML = '';
    fibSeries.forEach(num => {
        const card = createCard(num);
        container.appendChild(card);
    });
}

function createCard(num) {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerText = num;
    card.addEventListener('click', function() {
        if (window.confirm('¿Desea eliminar esta tarjeta?')) {
            card.remove();
        }
    });
    return card;
}
