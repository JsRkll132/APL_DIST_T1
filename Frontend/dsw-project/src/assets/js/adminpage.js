
function admin_page21(){
    document.addEventListener("DOMContentLoaded", function() {
        // Obtener todos los botones
        const buttons = document.querySelectorAll("#button-container button");
    
        // Obtener el ancho máximo de los botones
        let maxWidth = 0;
        buttons.forEach(button => {
            const width = button.offsetWidth;
            if (width > maxWidth) {
                maxWidth = width;
            }
        });
    
        // Establecer el ancho máximo para todos los botones
        buttons.forEach(button => {
            button.style.width = `${maxWidth}px`;
        });
    });
}
