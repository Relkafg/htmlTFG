// iniciodesesion.js

document.addEventListener('DOMContentLoaded', function() {
    // Seleccionar el formulario y agregar un evento de escucha para el envío
    var form = document.querySelector('form');
    form.addEventListener('submit', function(event) {
        // Evitar que el formulario se envíe de forma predeterminada
        event.preventDefault();

        // Obtener los valores del usuario y la contraseña
        var user = form.querySelector('input[type="text"]').value;
        var password = form.querySelector('input[type="password"]').value;

        // Aquí podrías realizar la lógica de autenticación con los valores ingresados

        // Redirigir a otra página después de la autenticación exitosa
        window.location.href = 'matapersonajes.html';
    });
});
