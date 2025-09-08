console.log('Cajero.js cargado');

// Definir mensajes de error para los campos del formulario
const mensajesError = {
    idVale: 'El ID del vale no es válido.'
};

document.addEventListener('DOMContentLoaded', function() {
    // Referencias a elementos del DOM
    const formVale = document.getElementById('form-vale');
    const tablaVales = document.querySelector('.tabla-vales tbody');

    const regex = {
        idVale: /^[A-Za-z0-9\s]{3,20}$/ //3 a 20 caracteres
    };

    function inicializar() {
        // Cargar clientes existentes al iniciar
        cargarVales();
        
        // Agregar event listeners
        formVale.addEventListener('submit', procesarValeIngresado);
        
        // Agregar validación en tiempo real
        agregarValidacionTiempoReal();
    }

    function agregarValidacionTiempoReal() {
        const campos = ['idVale'];
        campos.forEach(campo => {
            const input = document.getElementById(campo);
            input.addEventListener('blur', () => validarCampo(input));
            input.addEventListener('input', () => limpiarError(input));
        });
    }

    function validarCampo(campo) {
        let valido = true;
        let mensaje = '';
        
        switch(campo.id) {
            case 'idVale':
                valido = regex.idVale.test(campo.value.trim());
                mensaje = mensajesError.idVale;
                break;
        }
        
        if (!valido) {
            mostrarError(campo, mensaje);
        } else {
            limpiarError(campo);
        }
        
        return valido;
    }

    function mostrarError(campo, mensaje) {
        console.warn(`Error en ${campo.id}: ${mensaje}`);
    }

    function limpiarError(campo) {
        // Quitar mensajes de error visuales
    }

    function procesarValeIngresado(e) {
        e.preventDefault();
            
        // Valida los campos
        const campos = ['idVale'];
        let formularioValido = true;
        
        campos.forEach(campoId => {
            const campo = document.getElementById(campoId);
            if (!validarCampo(campo)) {
                formularioValido = false;
            }
        });
        
        // Guarda el vale si no fue ingresado anteriormente
        if (formularioValido) {
            guardarValeIngresado();
        } else {
            alert('Por favor completa el campo ID Vale correctamente');
        }
    }

    // Guarda el vale ingresado en localStorage
    function guardarValeIngresado() {
        const vale = {
            fecha: new Date().toLocaleString(),
            idVale: document.getElementById('idVale').value.trim(),
        };

        let vales = obtenerVales();
        const existe = vales.some(c => c.idVale === vale.idVale);

        if (existe) {
            alert('Ya se ha ingresado este Vale');
            return;
        }

        vales.push(vale);
        localStorage.setItem('vales', JSON.stringify(vales));
        cargarVales();
        formVale.reset();
        alert('Vale ingresado con éxito');
    }

    function obtenerVales() {
        const valesJSON = localStorage.getItem('vales');
        return valesJSON ? JSON.parse(valesJSON) : [];
    }

    function cargarVales() {
        const vales = obtenerVales();
        tablaVales.innerHTML = '';

        vales.forEach(vale => {
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${vale.idVale}</td>
                <td>${vale.fecha}</td>
            `;
            tablaVales.prepend(fila);
        });
    }

    inicializar();
});