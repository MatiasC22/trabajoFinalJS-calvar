const getProducts = () => {
    fetch('juegos.json')
        .then(response => response.json())
        .then(data => {
            juegos = data; 
            mostrarJuegos(juegos); 
        })
        .catch(error => console.error('Error al leer el archivo JSON:', error));
}