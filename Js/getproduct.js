const getProducts = () => {
    fetch('juegos.json')
        .then(response => response.json())
        .then((juegos) => {
            // const juegos = data;
            // Ahora puedes utilizar el array juegos
            console.log(juegos);
            mostrarJuegos(juegos);
        })
        .catch(error => console.error('Error al leer el archivo JSON:', error));

}