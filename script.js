<<<<<<< HEAD
/**
 * Visualizador de Algoritmos de Ordenamiento
 * Sistema interactivo para aprender algoritmos de ordenamiento con animaciones
 */

// Variables globales del sistema
let conjuntoDatos = [];
let contadorComparaciones = 0;
let contadorIntercambios = 0;
let tiempoInicio = 0;
let procesoOrdenamiento = false;
let detenerProceso = false;
let velocidadAnimacion = 300; // milisegundos

// Referencias a elementos del DOM
const areaVisualizacion = document.getElementById('visualization');
const selectorAlgoritmo = document.getElementById('algorithm');
const botonGenerar = document.getElementById('generateBtn');
const botonOrdenar = document.getElementById('sortBtn');
const botonDetener = document.getElementById('stopBtn');
const inputTamano = document.getElementById('arraySize');
const selectorVelocidad = document.getElementById('speed');

// Información detallada de los algoritmos de ordenamiento
const informacionAlgoritmos = {
    bubble: {
        nombre: 'Ordenamiento Burbuja (Bubble Sort)',
        descripcion: 'Compara elementos adyacentes y los intercambia si están en el orden incorrecto. Es como burbujas que suben a la superficie - los elementos más grandes "burbujean" hacia el final del conjunto. Aunque es fácil de entender e implementar, es ineficiente para conjuntos grandes de datos.',
        complejidad: 'O(n²)',
        estable: true,
        memoria: 'O(1)',
        mejorCaso: 'O(n)',
        peorCaso: 'O(n²)',
        caracteristicas: [
            'Algoritmo de intercambio directo',
            'Fácil de implementar y entender',
            'Ineficiente para conjuntos grandes',
            'Realiza muchas comparaciones innecesarias'
        ]
    },
    selection: {
        nombre: 'Ordenamiento por Selección (Selection Sort)',
        descripcion: 'Encuentra repetidamente el elemento más pequeño del segmento no ordenado y lo coloca al principio. Divide el conjunto en dos partes: ordenada y no ordenada, expandiendo gradualmente la parte ordenada.',
        complejidad: 'O(n²)',
        estable: false,
        memoria: 'O(1)',
        mejorCaso: 'O(n²)',
        peorCaso: 'O(n²)',
        caracteristicas: [
            'Realiza el mínimo número de intercambios',
            'No es estable por naturaleza',
            'Rendimiento constante independientemente de los datos',
            'Útil cuando el costo de escritura es alto'
        ]
    },
    insertion: {
        nombre: 'Ordenamiento por Inserción (Insertion Sort)',
        descripcion: 'Construye el conjunto ordenado elemento por elemento, insertando cada nuevo elemento en su posición correcta dentro de la parte ya ordenada. Es similar a como ordenarías cartas en tu mano.',
        complejidad: 'O(n²)',
        estable: true,
        memoria: 'O(1)',
        mejorCaso: 'O(n)',
        peorCaso: 'O(n²)',
        caracteristicas: [
            'Muy eficiente para conjuntos pequeños',
            'Adaptativo - rápido para datos casi ordenados',
            'Estable y en línea',
            'Algoritmo de ordenamiento natural'
        ]
    },
    quick: {
        nombre: 'Ordenamiento Rápido (Quick Sort)',
        descripcion: 'Utiliza la estrategia "divide y vencerás". Selecciona un elemento como pivote y particiona el conjunto de modo que elementos menores estén a la izquierda y mayores a la derecha. Luego ordena recursivamente ambas particiones.',
        complejidad: 'O(n log n)',
        estable: false,
        memoria: 'O(log n)',
        mejorCaso: 'O(n log n)',
        peorCaso: 'O(n²)',
        caracteristicas: [
            'Muy rápido en promedio',
            'Algoritmo divide y vencerás',
            'Rendimiento depende del pivote elegido',
            'Ampliamente utilizado en sistemas reales'
        ]
    }
};

/**
 * Configuración de velocidades de animación
 */
const velocidades = {
    slow: 500,
    medium: 300,
    fast: 100
};

/**
 * Inicialización de eventos del sistema
 */
function inicializarEventos() {
    selectorAlgoritmo.addEventListener('change', actualizarInformacion);
    botonGenerar.addEventListener('click', generarConjuntoDatos);
    botonOrdenar.addEventListener('click', iniciarOrdenamiento);
    botonDetener.addEventListener('click', detenerOrdenamiento);
    selectorVelocidad.addEventListener('change', cambiarVelocidad);
    inputTamano.addEventListener('change', validarTamanoConjunto);
}

/**
 * Actualiza la información del algoritmo seleccionado
 */
function actualizarInformacion() {
    const algoritmoSeleccionado = selectorAlgoritmo.value;
    const informacion = informacionAlgoritmos[algoritmoSeleccionado];
    
    document.getElementById('info').innerHTML = `
        <h3 class="text-xl font-bold text-primary flex items-center gap-2">
            📚 ${informacion.nombre}
        </h3>
        <p class="text-gray-700 leading-relaxed info-text mb-4">
            ${informacion.descripcion}
        </p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
            <div class="space-y-2">
                <h4 class="font-semibold text-gray-800">🔍 Análisis de Complejidad:</h4>
                <ul class="text-sm text-gray-600 space-y-1">
                    <li>• Mejor caso: <span class="font-mono text-blue-600">${informacion.mejorCaso}</span></li>
                    <li>• Caso promedio: <span class="font-mono text-orange-600">${informacion.complejidad}</span></li>
                    <li>• Peor caso: <span class="font-mono text-red-600">${informacion.peorCaso}</span></li>
                </ul>
            </div>
            <div class="space-y-2">
                <h4 class="font-semibold text-gray-800">⚙️ Características:</h4>
                <ul class="text-sm text-gray-600 space-y-1">
                    ${informacion.caracteristicas.map(car => `<li>• ${car}</li>`).join('')}
                </ul>
            </div>
        </div>
        <div class="flex flex-wrap gap-3 text-sm">
            <span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">
                🔢 Complejidad: ${informacion.complejidad}
            </span>
            <span class="bg-${informacion.estable ? 'green' : 'red'}-100 text-${informacion.estable ? 'green' : 'red'}-800 px-3 py-1 rounded-full font-medium">
                📊 Estable: ${informacion.estable ? 'Sí' : 'No'}
            </span>
            <span class="bg-purple-100 text-purple-800 px-3 py-1 rounded-full font-medium">
                💾 Memoria: ${informacion.memoria}
            </span>
        </div>
    `;
    
    // Actualizar complejidad en el panel de estadísticas
    document.getElementById('complexity').textContent = informacion.complejidad;
}

/**
 * Cambia la velocidad de animación según la selección del usuario
 */
function cambiarVelocidad() {
    const velocidadSeleccionada = selectorVelocidad.value;
    velocidadAnimacion = velocidades[velocidadSeleccionada];
    console.log(`Velocidad de animación cambiada a: ${velocidadAnimacion}ms`);
}

/**
 * Valida el tamaño del conjunto de datos
 */
function validarTamanoConjunto() {
    const tamano = parseInt(inputTamano.value);
    if (tamano < 5) {
        inputTamano.value = 5;
        mostrarNotificacion('El tamaño mínimo del conjunto es 5 elementos', 'warning');
    } else if (tamano > 25) {
        inputTamano.value = 25;
        mostrarNotificacion('El tamaño máximo del conjunto es 25 elementos', 'warning');
    }
}

/**
 * Genera un nuevo conjunto de datos aleatorio
 */
function generarConjuntoDatos() {
    const tamano = parseInt(inputTamano.value);
    conjuntoDatos = [];
    
    // Generar valores únicos para mejor visualización
    const valoresDisponibles = Array.from({length: 95}, (_, i) => i + 5);
    
    for (let i = 0; i < tamano; i++) {
        const indiceAleatorio = Math.floor(Math.random() * valoresDisponibles.length);
        conjuntoDatos.push(valoresDisponibles.splice(indiceAleatorio, 1)[0]);
    }
    
    renderizarConjunto();
    reiniciarEstadisticas();
    mostrarNotificacion(`Nuevo conjunto de ${tamano} elementos generado correctamente`, 'success');
}

/**
 * Renderiza el conjunto de datos en la visualización
 */
function renderizarConjunto() {
    areaVisualizacion.innerHTML = '';
    const tamanoConjunto = conjuntoDatos.length;
    
    conjuntoDatos.forEach((valor, indice) => {
        const barra = document.createElement('div');
        barra.className = 'bar bar-loading';
        barra.style.height = valor * 4 + 'px';
        barra.style.width = Math.max(30, Math.min(50, 400 / tamanoConjunto)) + 'px';
        barra.textContent = valor;
        barra.id = 'barra-' + indice;
        
        // Añadir delay para animación escalonada
        barra.style.animationDelay = (indice * 50) + 'ms';
        
        areaVisualizacion.appendChild(barra);
    });
}

/**
 * Reinicia todas las estadísticas del sistema
 */
function reiniciarEstadisticas() {
    contadorComparaciones = 0;
    contadorIntercambios = 0;
    document.getElementById('comparisons').textContent = '0';
    document.getElementById('swaps').textContent = '0';
    document.getElementById('time').textContent = '0';
}

/**
 * Actualiza las estadísticas en tiempo real durante el ordenamiento
 */
function actualizarEstadisticas() {
    document.getElementById('comparisons').textContent = contadorComparaciones.toLocaleString();
    document.getElementById('swaps').textContent = contadorIntercambios.toLocaleString();
    const tiempoTranscurrido = Date.now() - tiempoInicio;
    document.getElementById('time').textContent = tiempoTranscurrido.toLocaleString();
}

/**
 * Muestra notificaciones al usuario
 * @param {string} mensaje - Mensaje a mostrar
 * @param {string} tipo - Tipo de notificación: success, warning, error, info
 */
function mostrarNotificacion(mensaje, tipo = 'info') {
    const colores = {
        success: 'bg-green-100 border-green-500 text-green-700',
        warning: 'bg-yellow-100 border-yellow-500 text-yellow-700',
        error: 'bg-red-100 border-red-500 text-red-700',
        info: 'bg-blue-100 border-blue-500 text-blue-700'
    };
    
    // Crear elemento de notificación
    const notificacion = document.createElement('div');
    notificacion.className = `fixed top-4 right-4 z-50 p-4 border-l-4 rounded-lg shadow-lg ${colores[tipo]} transform translate-x-full transition-transform duration-300`;
    notificacion.innerHTML = `
        <div class="flex items-center">
            <span class="mr-2">${tipo === 'success' ? '✅' : tipo === 'warning' ? '⚠️' : tipo === 'error' ? '❌' : 'ℹ️'}</span>
            <span>${mensaje}</span>
        </div>
    `;
    
    document.body.appendChild(notificacion);
    
    // Mostrar notificación
    setTimeout(() => {
        notificacion.style.transform = 'translateX(0)';
    }, 100);
    
    // Ocultar después de 3 segundos
    setTimeout(() => {
        notificacion.style.transform = 'translateX(full)';
        setTimeout(() => {
            document.body.removeChild(notificacion);
        }, 300);
    }, 3000);
}

/**
 * Resalta barras con una clase CSS específica
 * @param {number[]} indices - Índices de las barras a resaltar
 * @param {string} tipoResaltado - Tipo de resaltado: comparing, sorted, pivot
 */
async function resaltarBarras(indices, tipoResaltado = 'comparing') {
    indices.forEach(indice => {
        const barra = document.getElementById('barra-' + indice);
        if (barra) {
            barra.classList.add(tipoResaltado);
        }
    });
}

/**
 * Quita el resaltado de las barras especificadas
 * @param {number[]} indices - Índices de las barras
 */
async function quitarResaltado(indices) {
    indices.forEach(indice => {
        const barra = document.getElementById('barra-' + indice);
        if (barra) {
            barra.classList.remove('comparing', 'sorted', 'pivot');
        }
    });
}

/**
 * Intercambia dos barras con animación suave
 * @param {number} indiceA - Índice de la primera barra
 * @param {number} indiceB - Índice de la segunda barra
 */
async function intercambiarBarras(indiceA, indiceB) {
    const barra1 = document.getElementById('barra-' + indiceA);
    const barra2 = document.getElementById('barra-' + indiceB);

    if (!barra1 || !barra2) return;

    // Animación de elevación con efecto más suave
    await anime({
        targets: [barra1, barra2],
        translateY: -40,
        scale: 1.1,
        duration: velocidadAnimacion * 0.6,
        easing: 'easeOutCubic'
    }).finished;

    // Intercambio de valores en el conjunto de datos
    const valorTemporal = conjuntoDatos[indiceA];
    conjuntoDatos[indiceA] = conjuntoDatos[indiceB];
    conjuntoDatos[indiceB] = valorTemporal;

    // Actualización visual de las barras
    barra1.style.height = conjuntoDatos[indiceA] * 4 + 'px';
    barra1.textContent = conjuntoDatos[indiceA];
    barra2.style.height = conjuntoDatos[indiceB] * 4 + 'px';
    barra2.textContent = conjuntoDatos[indiceB];

    // Animación de descenso
    await anime({
        targets: [barra1, barra2],
        translateY: 0,
        scale: 1,
        duration: velocidadAnimacion * 0.6,
        easing: 'easeInCubic'
    }).finished;

    contadorIntercambios++;
    actualizarEstadisticas();
}

/**
 * Función de pausa para controlar la velocidad de animación
 * @param {number} duracion - Duración de la pausa (opcional, usa velocidadAnimacion por defecto)
 */
async function pausarAnimacion(duracion = null) {
    const tiempoPausa = duracion || velocidadAnimacion;
    return new Promise(resolve => setTimeout(resolve, tiempoPausa));
}

/**
 * Marca una barra como ordenada con animación especial
 * @param {number} indice - Índice de la barra a marcar
 */
async function marcarComoOrdenada(indice) {
    const barra = document.getElementById('barra-' + indice);
    if (barra) {
        await quitarResaltado([indice]);
        barra.classList.add('sorted');
        
        // Pequeña animación de celebración
        await anime({
            targets: barra,
            scale: [1, 1.15, 1],
            duration: 400,
            easing: 'easeOutElastic(1, .8)'
        }).finished;
    }
}

/**
 * Algoritmo de Ordenamiento Burbuja (Bubble Sort)
 * Compara elementos adyacentes y los intercambia si están desordenados
 */
async function ordenamientoBurbuja() {
    const longitudConjunto = conjuntoDatos.length;
    
    for (let i = 0; i < longitudConjunto - 1 && !detenerProceso; i++) {
        let seRealizaronIntercambios = false;
        
        for (let j = 0; j < longitudConjunto - i - 1 && !detenerProceso; j++) {
            // Resaltar elementos que se están comparando
            await resaltarBarras([j, j + 1], 'comparing');
            contadorComparaciones++;
            actualizarEstadisticas();
            await pausarAnimacion();
            
            // Si están en orden incorrecto, intercambiarlos
            if (conjuntoDatos[j] > conjuntoDatos[j + 1]) {
                await intercambiarBarras(j, j + 1);
                seRealizaronIntercambios = true;
            }
            
            await quitarResaltado([j, j + 1]);
        }
        
        // Marcar el elemento como ordenado al final de cada pasada
        await marcarComoOrdenada(longitudConjunto - i - 1);
        
        // Optimización: si no hubo intercambios, el conjunto ya está ordenado
        if (!seRealizaronIntercambios) {
            for (let k = 0; k < longitudConjunto - i - 1; k++) {
                await marcarComoOrdenada(k);
                await pausarAnimacion(50);
            }
            break;
        }
    }
}

/**
 * Algoritmo de Ordenamiento por Selección (Selection Sort)
 * Encuentra el elemento mínimo y lo coloca en la posición correcta
 */
async function ordenamientoPorSeleccion() {
    const longitudConjunto = conjuntoDatos.length;
    
    for (let i = 0; i < longitudConjunto - 1 && !detenerProceso; i++) {
        let indiceMinimo = i;
        await resaltarBarras([i], 'comparing');
        
        // Buscar el elemento mínimo en el resto del conjunto
        for (let j = i + 1; j < longitudConjunto && !detenerProceso; j++) {
            await resaltarBarras([j], 'comparing');
            contadorComparaciones++;
            actualizarEstadisticas();
            await pausarAnimacion();
            
            if (conjuntoDatos[j] < conjuntoDatos[indiceMinimo]) {
                await quitarResaltado([indiceMinimo]);
                indiceMinimo = j;
                await resaltarBarras([indiceMinimo], 'comparing');
            } else {
                await quitarResaltado([j]);
            }
        }
        
        // Intercambiar si se encontró un elemento menor
        if (indiceMinimo !== i) {
            await intercambiarBarras(i, indiceMinimo);
        }
        
        await quitarResaltado([i, indiceMinimo]);
        await marcarComoOrdenada(i);
    }
    
    // Marcar el último elemento como ordenado
    if (!detenerProceso) {
        await marcarComoOrdenada(longitudConjunto - 1);
    }
}

/**
 * Algoritmo de Ordenamiento por Inserción (Insertion Sort)
 * Construye el conjunto ordenado insertando cada elemento en su posición correcta
 */
async function ordenamientoPorInsercion() {
    const longitudConjunto = conjuntoDatos.length;
    
    // Marcar el primer elemento como ordenado
    await marcarComoOrdenada(0);
    
    for (let i = 1; i < longitudConjunto && !detenerProceso; i++) {
        const valorClave = conjuntoDatos[i];
        let j = i - 1;
        
        await resaltarBarras([i], 'comparing');
        await pausarAnimacion();
        
        // Mover elementos mayores hacia la derecha
        while (j >= 0 && conjuntoDatos[j] > valorClave && !detenerProceso) {
            contadorComparaciones++;
            actualizarEstadisticas();
            await resaltarBarras([j], 'comparing');
            await pausarAnimacion();
            
            await intercambiarBarras(j, j + 1);
            await quitarResaltado([j]);
            j--;
        }
        
        if (j >= 0) {
            contadorComparaciones++;
            actualizarEstadisticas();
        }
        
        await quitarResaltado([i]);
        await marcarComoOrdenada(i);
    }
}

/**
 * Algoritmo de Ordenamiento Rápido (Quick Sort)
 * Utiliza la estrategia divide y vencerás con un elemento pivote
 * @param {number} indiceInferior - Índice inicial del segmento
 * @param {number} indiceSuperior - Índice final del segmento
 */
async function ordenamientoRapido(indiceInferior = 0, indiceSuperior = conjuntoDatos.length - 1) {
    if (indiceInferior < indiceSuperior && !detenerProceso) {
        const indicePivote = await particionarConjunto(indiceInferior, indiceSuperior);
        
        // Ordenar recursivamente las particiones
        await ordenamientoRapido(indiceInferior, indicePivote - 1);
        await ordenamientoRapido(indicePivote + 1, indiceSuperior);
    }
}

/**
 * Función de partición para Quick Sort
 * Organiza elementos menores a la izquierda y mayores a la derecha del pivote
 * @param {number} indiceInferior - Índice inicial
 * @param {number} indiceSuperior - Índice final
 * @returns {number} Posición final del pivote
 */
async function particionarConjunto(indiceInferior, indiceSuperior) {
    const valorPivote = conjuntoDatos[indiceSuperior];
    await resaltarBarras([indiceSuperior], 'pivot');
    let indiceMenor = indiceInferior - 1;

    for (let j = indiceInferior; j < indiceSuperior && !detenerProceso; j++) {
        await resaltarBarras([j], 'comparing');
        contadorComparaciones++;
        actualizarEstadisticas();
        await pausarAnimacion();

        if (conjuntoDatos[j] < valorPivote) {
            indiceMenor++;
            if (indiceMenor !== j) {
                await intercambiarBarras(indiceMenor, j);
            }
        }
        await quitarResaltado([j]);
    }

    // Colocar el pivote en su posición correcta
    if (indiceMenor + 1 !== indiceSuperior) {
        await intercambiarBarras(indiceMenor + 1, indiceSuperior);
    }
    
    await quitarResaltado([indiceSuperior]);
    await marcarComoOrdenada(indiceMenor + 1);
    
    return indiceMenor + 1;
}

/**
 * Función principal para iniciar el proceso de ordenamiento
 */
async function iniciarOrdenamiento() {
    if (procesoOrdenamiento) {
        mostrarNotificacion('Ya hay un proceso de ordenamiento en ejecución', 'warning');
        return;
    }
    
    if (conjuntoDatos.length === 0) {
        mostrarNotificacion('Primero debe generar un conjunto de datos', 'error');
        return;
    }
    
    procesoOrdenamiento = true;
    detenerProceso = false;
    
    // Actualizar estado de los botones
    botonOrdenar.disabled = true;
    botonDetener.disabled = false;
    botonGenerar.disabled = true;
    selectorAlgoritmo.disabled = true;
    inputTamano.disabled = true;
    selectorVelocidad.disabled = true;
    
    // Reiniciar estadísticas y comenzar cronómetro
    reiniciarEstadisticas();
    tiempoInicio = Date.now();
    
    const algoritmoSeleccionado = selectorAlgoritmo.value;
    
    try {
        mostrarNotificacion(`Iniciando ${informacionAlgoritmos[algoritmoSeleccionado].nombre}...`, 'info');
        
        // Ejecutar el algoritmo correspondiente
        switch (algoritmoSeleccionado) {
            case 'bubble':
                await ordenamientoBurbuja();
                break;
            case 'selection':
                await ordenamientoPorSeleccion();
                break;
            case 'insertion':
                await ordenamientoPorInsercion();
                break;
            case 'quick':
                await ordenamientoRapido();
                break;
        }
        
        // Animación final si el proceso se completó sin interrupciones
        if (!detenerProceso) {
            await animacionCompletado();
            mostrarNotificacion('¡Ordenamiento completado con éxito!', 'success');
        } else {
            mostrarNotificacion('Proceso de ordenamiento detenido por el usuario', 'warning');
        }
        
    } catch (error) {
        console.error('Error durante el ordenamiento:', error);
        mostrarNotificacion('Ocurrió un error durante el proceso de ordenamiento', 'error');
    } finally {
        // Restaurar estado de la interfaz
        finalizarProceso();
    }
}

/**
 * Detiene el proceso de ordenamiento en ejecución
 */
function detenerOrdenamiento() {
    if (procesoOrdenamiento) {
        detenerProceso = true;
        mostrarNotificacion('Deteniendo proceso de ordenamiento...', 'info');
    }
}

/**
 * Animación especial cuando se completa el ordenamiento
 */
async function animacionCompletado() {
    // Limpiar cualquier resaltado previo
    for (let i = 0; i < conjuntoDatos.length; i++) {
        await quitarResaltado([i]);
    }
    
    // Animación de onda de completado
    for (let i = 0; i < conjuntoDatos.length; i++) {
        await marcarComoOrdenada(i);
        await pausarAnimacion(80);
    }
    
    // Efecto de celebración final
    const todasLasBarras = Array.from({length: conjuntoDatos.length}, (_, i) => 
        document.getElementById('barra-' + i)
    ).filter(Boolean);
    
    await anime({
        targets: todasLasBarras,
        scale: [1, 1.1, 1],
        rotate: [0, 5, -5, 0],
        duration: 800,
        delay: anime.stagger(50),
        easing: 'easeOutElastic(1, .8)'
    }).finished;
}

/**
 * Finaliza el proceso y restaura el estado de la interfaz
 */
function finalizarProceso() {
    procesoOrdenamiento = false;
    detenerProceso = false;
    
    // Rehabilitar controles
    botonOrdenar.disabled = false;
    botonDetener.disabled = true;
    botonGenerar.disabled = false;
    selectorAlgoritmo.disabled = false;
    inputTamano.disabled = false;
    selectorVelocidad.disabled = false;
    
    // Actualizar estadísticas finales
    actualizarEstadisticas();
}

/**
 * Verifica si el conjunto está ordenado correctamente
 * @returns {boolean} True si está ordenado, false en caso contrario
 */
function verificarOrdenamiento() {
    for (let i = 0; i < conjuntoDatos.length - 1; i++) {
        if (conjuntoDatos[i] > conjuntoDatos[i + 1]) {
            return false;
        }
    }
    return true;
}

/**
 * Inicialización completa del sistema
 */
function inicializarSistema() {
    console.log('🚀 Inicializando Visualizador de Algoritmos de Ordenamiento...');
    
    // Configurar eventos
    inicializarEventos();
    
    // Generar conjunto inicial
    generarConjuntoDatos();
    
    // Mostrar información inicial
    actualizarInformacion();
    
    // Aplicar animaciones de entrada
    document.querySelector('.container').classList.add('fade-in');
    
    console.log('✅ Sistema inicializado correctamente');
    mostrarNotificacion('¡Bienvenido al Visualizador de Algoritmos de Ordenamiento!', 'success');
}

// Ejecutar cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', inicializarSistema);

// Manejar visibilidad de la página para pausar animaciones si es necesario
document.addEventListener('visibilitychange', () => {
    if (document.hidden && procesoOrdenamiento) {
        console.log('Página oculta - considerando pausa del proceso...');
    } else if (!document.hidden && procesoOrdenamiento) {
        console.log('Página visible - reanudando proceso...');
    }
=======
/**
 * Visualizador de Algoritmos de Ordenamiento
 * Sistema interactivo para aprender algoritmos de ordenamiento con animaciones
 */

// Variables globales del sistema
let conjuntoDatos = [];
let contadorComparaciones = 0;
let contadorIntercambios = 0;
let tiempoInicio = 0;
let procesoOrdenamiento = false;
let detenerProceso = false;
let velocidadAnimacion = 300; // milisegundos

// Referencias a elementos del DOM
const areaVisualizacion = document.getElementById('visualization');
const selectorAlgoritmo = document.getElementById('algorithm');
const botonGenerar = document.getElementById('generateBtn');
const botonOrdenar = document.getElementById('sortBtn');
const botonDetener = document.getElementById('stopBtn');
const inputTamano = document.getElementById('arraySize');
const selectorVelocidad = document.getElementById('speed');

// Información detallada de los algoritmos de ordenamiento
const informacionAlgoritmos = {
    bubble: {
        nombre: 'Ordenamiento Burbuja (Bubble Sort)',
        descripcion: 'Compara elementos adyacentes y los intercambia si están en el orden incorrecto. Es como burbujas que suben a la superficie - los elementos más grandes "burbujean" hacia el final del conjunto. Aunque es fácil de entender e implementar, es ineficiente para conjuntos grandes de datos.',
        complejidad: 'O(n²)',
        estable: true,
        memoria: 'O(1)',
        mejorCaso: 'O(n)',
        peorCaso: 'O(n²)',
        caracteristicas: [
            'Algoritmo de intercambio directo',
            'Fácil de implementar y entender',
            'Ineficiente para conjuntos grandes',
            'Realiza muchas comparaciones innecesarias'
        ]
    },
    selection: {
        nombre: 'Ordenamiento por Selección (Selection Sort)',
        descripcion: 'Encuentra repetidamente el elemento más pequeño del segmento no ordenado y lo coloca al principio. Divide el conjunto en dos partes: ordenada y no ordenada, expandiendo gradualmente la parte ordenada.',
        complejidad: 'O(n²)',
        estable: false,
        memoria: 'O(1)',
        mejorCaso: 'O(n²)',
        peorCaso: 'O(n²)',
        caracteristicas: [
            'Realiza el mínimo número de intercambios',
            'No es estable por naturaleza',
            'Rendimiento constante independientemente de los datos',
            'Útil cuando el costo de escritura es alto'
        ]
    },
    insertion: {
        nombre: 'Ordenamiento por Inserción (Insertion Sort)',
        descripcion: 'Construye el conjunto ordenado elemento por elemento, insertando cada nuevo elemento en su posición correcta dentro de la parte ya ordenada. Es similar a como ordenarías cartas en tu mano.',
        complejidad: 'O(n²)',
        estable: true,
        memoria: 'O(1)',
        mejorCaso: 'O(n)',
        peorCaso: 'O(n²)',
        caracteristicas: [
            'Muy eficiente para conjuntos pequeños',
            'Adaptativo - rápido para datos casi ordenados',
            'Estable y en línea',
            'Algoritmo de ordenamiento natural'
        ]
    },
    quick: {
        nombre: 'Ordenamiento Rápido (Quick Sort)',
        descripcion: 'Utiliza la estrategia "divide y vencerás". Selecciona un elemento como pivote y particiona el conjunto de modo que elementos menores estén a la izquierda y mayores a la derecha. Luego ordena recursivamente ambas particiones.',
        complejidad: 'O(n log n)',
        estable: false,
        memoria: 'O(log n)',
        mejorCaso: 'O(n log n)',
        peorCaso: 'O(n²)',
        caracteristicas: [
            'Muy rápido en promedio',
            'Algoritmo divide y vencerás',
            'Rendimiento depende del pivote elegido',
            'Ampliamente utilizado en sistemas reales'
        ]
    }
};

/**
 * Configuración de velocidades de animación
 */
const velocidades = {
    slow: 500,
    medium: 300,
    fast: 100
};

/**
 * Inicialización de eventos del sistema
 */
function inicializarEventos() {
    selectorAlgoritmo.addEventListener('change', actualizarInformacion);
    botonGenerar.addEventListener('click', generarConjuntoDatos);
    botonOrdenar.addEventListener('click', iniciarOrdenamiento);
    botonDetener.addEventListener('click', detenerOrdenamiento);
    selectorVelocidad.addEventListener('change', cambiarVelocidad);
    inputTamano.addEventListener('change', validarTamanoConjunto);
}

/**
 * Actualiza la información del algoritmo seleccionado
 */
function actualizarInformacion() {
    const algoritmoSeleccionado = selectorAlgoritmo.value;
    const informacion = informacionAlgoritmos[algoritmoSeleccionado];
    
    document.getElementById('info').innerHTML = `
        <h3 class="text-xl font-bold text-primary flex items-center gap-2">
            📚 ${informacion.nombre}
        </h3>
        <p class="text-gray-700 leading-relaxed info-text mb-4">
            ${informacion.descripcion}
        </p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
            <div class="space-y-2">
                <h4 class="font-semibold text-gray-800">🔍 Análisis de Complejidad:</h4>
                <ul class="text-sm text-gray-600 space-y-1">
                    <li>• Mejor caso: <span class="font-mono text-blue-600">${informacion.mejorCaso}</span></li>
                    <li>• Caso promedio: <span class="font-mono text-orange-600">${informacion.complejidad}</span></li>
                    <li>• Peor caso: <span class="font-mono text-red-600">${informacion.peorCaso}</span></li>
                </ul>
            </div>
            <div class="space-y-2">
                <h4 class="font-semibold text-gray-800">⚙️ Características:</h4>
                <ul class="text-sm text-gray-600 space-y-1">
                    ${informacion.caracteristicas.map(car => `<li>• ${car}</li>`).join('')}
                </ul>
            </div>
        </div>
        <div class="flex flex-wrap gap-3 text-sm">
            <span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">
                🔢 Complejidad: ${informacion.complejidad}
            </span>
            <span class="bg-${informacion.estable ? 'green' : 'red'}-100 text-${informacion.estable ? 'green' : 'red'}-800 px-3 py-1 rounded-full font-medium">
                📊 Estable: ${informacion.estable ? 'Sí' : 'No'}
            </span>
            <span class="bg-purple-100 text-purple-800 px-3 py-1 rounded-full font-medium">
                💾 Memoria: ${informacion.memoria}
            </span>
        </div>
    `;
    
    // Actualizar complejidad en el panel de estadísticas
    document.getElementById('complexity').textContent = informacion.complejidad;
}

/**
 * Cambia la velocidad de animación según la selección del usuario
 */
function cambiarVelocidad() {
    const velocidadSeleccionada = selectorVelocidad.value;
    velocidadAnimacion = velocidades[velocidadSeleccionada];
    console.log(`Velocidad de animación cambiada a: ${velocidadAnimacion}ms`);
}

/**
 * Valida el tamaño del conjunto de datos
 */
function validarTamanoConjunto() {
    const tamano = parseInt(inputTamano.value);
    if (tamano < 5) {
        inputTamano.value = 5;
        mostrarNotificacion('El tamaño mínimo del conjunto es 5 elementos', 'warning');
    } else if (tamano > 25) {
        inputTamano.value = 25;
        mostrarNotificacion('El tamaño máximo del conjunto es 25 elementos', 'warning');
    }
}

/**
 * Genera un nuevo conjunto de datos aleatorio
 */
function generarConjuntoDatos() {
    const tamano = parseInt(inputTamano.value);
    conjuntoDatos = [];
    
    // Generar valores únicos para mejor visualización
    const valoresDisponibles = Array.from({length: 95}, (_, i) => i + 5);
    
    for (let i = 0; i < tamano; i++) {
        const indiceAleatorio = Math.floor(Math.random() * valoresDisponibles.length);
        conjuntoDatos.push(valoresDisponibles.splice(indiceAleatorio, 1)[0]);
    }
    
    renderizarConjunto();
    reiniciarEstadisticas();
    mostrarNotificacion(`Nuevo conjunto de ${tamano} elementos generado correctamente`, 'success');
}

/**
 * Renderiza el conjunto de datos en la visualización
 */
function renderizarConjunto() {
    areaVisualizacion.innerHTML = '';
    const tamanoConjunto = conjuntoDatos.length;
    
    conjuntoDatos.forEach((valor, indice) => {
        const barra = document.createElement('div');
        barra.className = 'bar bar-loading';
        barra.style.height = valor * 4 + 'px';
        barra.style.width = Math.max(30, Math.min(50, 400 / tamanoConjunto)) + 'px';
        barra.textContent = valor;
        barra.id = 'barra-' + indice;
        
        // Añadir delay para animación escalonada
        barra.style.animationDelay = (indice * 50) + 'ms';
        
        areaVisualizacion.appendChild(barra);
    });
}

/**
 * Reinicia todas las estadísticas del sistema
 */
function reiniciarEstadisticas() {
    contadorComparaciones = 0;
    contadorIntercambios = 0;
    document.getElementById('comparisons').textContent = '0';
    document.getElementById('swaps').textContent = '0';
    document.getElementById('time').textContent = '0';
}

/**
 * Actualiza las estadísticas en tiempo real durante el ordenamiento
 */
function actualizarEstadisticas() {
    document.getElementById('comparisons').textContent = contadorComparaciones.toLocaleString();
    document.getElementById('swaps').textContent = contadorIntercambios.toLocaleString();
    const tiempoTranscurrido = Date.now() - tiempoInicio;
    document.getElementById('time').textContent = tiempoTranscurrido.toLocaleString();
}

/**
 * Muestra notificaciones al usuario
 * @param {string} mensaje - Mensaje a mostrar
 * @param {string} tipo - Tipo de notificación: success, warning, error, info
 */
function mostrarNotificacion(mensaje, tipo = 'info') {
    const colores = {
        success: 'bg-green-100 border-green-500 text-green-700',
        warning: 'bg-yellow-100 border-yellow-500 text-yellow-700',
        error: 'bg-red-100 border-red-500 text-red-700',
        info: 'bg-blue-100 border-blue-500 text-blue-700'
    };
    
    // Crear elemento de notificación
    const notificacion = document.createElement('div');
    notificacion.className = `fixed top-4 right-4 z-50 p-4 border-l-4 rounded-lg shadow-lg ${colores[tipo]} transform translate-x-full transition-transform duration-300`;
    notificacion.innerHTML = `
        <div class="flex items-center">
            <span class="mr-2">${tipo === 'success' ? '✅' : tipo === 'warning' ? '⚠️' : tipo === 'error' ? '❌' : 'ℹ️'}</span>
            <span>${mensaje}</span>
        </div>
    `;
    
    document.body.appendChild(notificacion);
    
    // Mostrar notificación
    setTimeout(() => {
        notificacion.style.transform = 'translateX(0)';
    }, 100);
    
    // Ocultar después de 3 segundos
    setTimeout(() => {
        notificacion.style.transform = 'translateX(full)';
        setTimeout(() => {
            document.body.removeChild(notificacion);
        }, 300);
    }, 3000);
}

/**
 * Resalta barras con una clase CSS específica
 * @param {number[]} indices - Índices de las barras a resaltar
 * @param {string} tipoResaltado - Tipo de resaltado: comparing, sorted, pivot
 */
async function resaltarBarras(indices, tipoResaltado = 'comparing') {
    indices.forEach(indice => {
        const barra = document.getElementById('barra-' + indice);
        if (barra) {
            barra.classList.add(tipoResaltado);
        }
    });
}

/**
 * Quita el resaltado de las barras especificadas
 * @param {number[]} indices - Índices de las barras
 */
async function quitarResaltado(indices) {
    indices.forEach(indice => {
        const barra = document.getElementById('barra-' + indice);
        if (barra) {
            barra.classList.remove('comparing', 'sorted', 'pivot');
        }
    });
}

/**
 * Intercambia dos barras con animación suave
 * @param {number} indiceA - Índice de la primera barra
 * @param {number} indiceB - Índice de la segunda barra
 */
async function intercambiarBarras(indiceA, indiceB) {
    const barra1 = document.getElementById('barra-' + indiceA);
    const barra2 = document.getElementById('barra-' + indiceB);

    if (!barra1 || !barra2) return;

    // Animación de elevación con efecto más suave
    await anime({
        targets: [barra1, barra2],
        translateY: -40,
        scale: 1.1,
        duration: velocidadAnimacion * 0.6,
        easing: 'easeOutCubic'
    }).finished;

    // Intercambio de valores en el conjunto de datos
    const valorTemporal = conjuntoDatos[indiceA];
    conjuntoDatos[indiceA] = conjuntoDatos[indiceB];
    conjuntoDatos[indiceB] = valorTemporal;

    // Actualización visual de las barras
    barra1.style.height = conjuntoDatos[indiceA] * 4 + 'px';
    barra1.textContent = conjuntoDatos[indiceA];
    barra2.style.height = conjuntoDatos[indiceB] * 4 + 'px';
    barra2.textContent = conjuntoDatos[indiceB];

    // Animación de descenso
    await anime({
        targets: [barra1, barra2],
        translateY: 0,
        scale: 1,
        duration: velocidadAnimacion * 0.6,
        easing: 'easeInCubic'
    }).finished;

    contadorIntercambios++;
    actualizarEstadisticas();
}

/**
 * Función de pausa para controlar la velocidad de animación
 * @param {number} duracion - Duración de la pausa (opcional, usa velocidadAnimacion por defecto)
 */
async function pausarAnimacion(duracion = null) {
    const tiempoPausa = duracion || velocidadAnimacion;
    return new Promise(resolve => setTimeout(resolve, tiempoPausa));
}

/**
 * Marca una barra como ordenada con animación especial
 * @param {number} indice - Índice de la barra a marcar
 */
async function marcarComoOrdenada(indice) {
    const barra = document.getElementById('barra-' + indice);
    if (barra) {
        await quitarResaltado([indice]);
        barra.classList.add('sorted');
        
        // Pequeña animación de celebración
        await anime({
            targets: barra,
            scale: [1, 1.15, 1],
            duration: 400,
            easing: 'easeOutElastic(1, .8)'
        }).finished;
    }
}

/**
 * Algoritmo de Ordenamiento Burbuja (Bubble Sort)
 * Compara elementos adyacentes y los intercambia si están desordenados
 */
async function ordenamientoBurbuja() {
    const longitudConjunto = conjuntoDatos.length;
    
    for (let i = 0; i < longitudConjunto - 1 && !detenerProceso; i++) {
        let seRealizaronIntercambios = false;
        
        for (let j = 0; j < longitudConjunto - i - 1 && !detenerProceso; j++) {
            // Resaltar elementos que se están comparando
            await resaltarBarras([j, j + 1], 'comparing');
            contadorComparaciones++;
            actualizarEstadisticas();
            await pausarAnimacion();
            
            // Si están en orden incorrecto, intercambiarlos
            if (conjuntoDatos[j] > conjuntoDatos[j + 1]) {
                await intercambiarBarras(j, j + 1);
                seRealizaronIntercambios = true;
            }
            
            await quitarResaltado([j, j + 1]);
        }
        
        // Marcar el elemento como ordenado al final de cada pasada
        await marcarComoOrdenada(longitudConjunto - i - 1);
        
        // Optimización: si no hubo intercambios, el conjunto ya está ordenado
        if (!seRealizaronIntercambios) {
            for (let k = 0; k < longitudConjunto - i - 1; k++) {
                await marcarComoOrdenada(k);
                await pausarAnimacion(50);
            }
            break;
        }
    }
}

/**
 * Algoritmo de Ordenamiento por Selección (Selection Sort)
 * Encuentra el elemento mínimo y lo coloca en la posición correcta
 */
async function ordenamientoPorSeleccion() {
    const longitudConjunto = conjuntoDatos.length;
    
    for (let i = 0; i < longitudConjunto - 1 && !detenerProceso; i++) {
        let indiceMinimo = i;
        await resaltarBarras([i], 'comparing');
        
        // Buscar el elemento mínimo en el resto del conjunto
        for (let j = i + 1; j < longitudConjunto && !detenerProceso; j++) {
            await resaltarBarras([j], 'comparing');
            contadorComparaciones++;
            actualizarEstadisticas();
            await pausarAnimacion();
            
            if (conjuntoDatos[j] < conjuntoDatos[indiceMinimo]) {
                await quitarResaltado([indiceMinimo]);
                indiceMinimo = j;
                await resaltarBarras([indiceMinimo], 'comparing');
            } else {
                await quitarResaltado([j]);
            }
        }
        
        // Intercambiar si se encontró un elemento menor
        if (indiceMinimo !== i) {
            await intercambiarBarras(i, indiceMinimo);
        }
        
        await quitarResaltado([i, indiceMinimo]);
        await marcarComoOrdenada(i);
    }
    
    // Marcar el último elemento como ordenado
    if (!detenerProceso) {
        await marcarComoOrdenada(longitudConjunto - 1);
    }
}

/**
 * Algoritmo de Ordenamiento por Inserción (Insertion Sort)
 * Construye el conjunto ordenado insertando cada elemento en su posición correcta
 */
async function ordenamientoPorInsercion() {
    const longitudConjunto = conjuntoDatos.length;
    
    // Marcar el primer elemento como ordenado
    await marcarComoOrdenada(0);
    
    for (let i = 1; i < longitudConjunto && !detenerProceso; i++) {
        const valorClave = conjuntoDatos[i];
        let j = i - 1;
        
        await resaltarBarras([i], 'comparing');
        await pausarAnimacion();
        
        // Mover elementos mayores hacia la derecha
        while (j >= 0 && conjuntoDatos[j] > valorClave && !detenerProceso) {
            contadorComparaciones++;
            actualizarEstadisticas();
            await resaltarBarras([j], 'comparing');
            await pausarAnimacion();
            
            await intercambiarBarras(j, j + 1);
            await quitarResaltado([j]);
            j--;
        }
        
        if (j >= 0) {
            contadorComparaciones++;
            actualizarEstadisticas();
        }
        
        await quitarResaltado([i]);
        await marcarComoOrdenada(i);
    }
}

/**
 * Algoritmo de Ordenamiento Rápido (Quick Sort)
 * Utiliza la estrategia divide y vencerás con un elemento pivote
 * @param {number} indiceInferior - Índice inicial del segmento
 * @param {number} indiceSuperior - Índice final del segmento
 */
async function ordenamientoRapido(indiceInferior = 0, indiceSuperior = conjuntoDatos.length - 1) {
    if (indiceInferior < indiceSuperior && !detenerProceso) {
        const indicePivote = await particionarConjunto(indiceInferior, indiceSuperior);
        
        // Ordenar recursivamente las particiones
        await ordenamientoRapido(indiceInferior, indicePivote - 1);
        await ordenamientoRapido(indicePivote + 1, indiceSuperior);
    }
}

/**
 * Función de partición para Quick Sort
 * Organiza elementos menores a la izquierda y mayores a la derecha del pivote
 * @param {number} indiceInferior - Índice inicial
 * @param {number} indiceSuperior - Índice final
 * @returns {number} Posición final del pivote
 */
async function particionarConjunto(indiceInferior, indiceSuperior) {
    const valorPivote = conjuntoDatos[indiceSuperior];
    await resaltarBarras([indiceSuperior], 'pivot');
    let indiceMenor = indiceInferior - 1;

    for (let j = indiceInferior; j < indiceSuperior && !detenerProceso; j++) {
        await resaltarBarras([j], 'comparing');
        contadorComparaciones++;
        actualizarEstadisticas();
        await pausarAnimacion();

        if (conjuntoDatos[j] < valorPivote) {
            indiceMenor++;
            if (indiceMenor !== j) {
                await intercambiarBarras(indiceMenor, j);
            }
        }
        await quitarResaltado([j]);
    }

    // Colocar el pivote en su posición correcta
    if (indiceMenor + 1 !== indiceSuperior) {
        await intercambiarBarras(indiceMenor + 1, indiceSuperior);
    }
    
    await quitarResaltado([indiceSuperior]);
    await marcarComoOrdenada(indiceMenor + 1);
    
    return indiceMenor + 1;
}

/**
 * Función principal para iniciar el proceso de ordenamiento
 */
async function iniciarOrdenamiento() {
    if (procesoOrdenamiento) {
        mostrarNotificacion('Ya hay un proceso de ordenamiento en ejecución', 'warning');
        return;
    }
    
    if (conjuntoDatos.length === 0) {
        mostrarNotificacion('Primero debe generar un conjunto de datos', 'error');
        return;
    }
    
    procesoOrdenamiento = true;
    detenerProceso = false;
    
    // Actualizar estado de los botones
    botonOrdenar.disabled = true;
    botonDetener.disabled = false;
    botonGenerar.disabled = true;
    selectorAlgoritmo.disabled = true;
    inputTamano.disabled = true;
    selectorVelocidad.disabled = true;
    
    // Reiniciar estadísticas y comenzar cronómetro
    reiniciarEstadisticas();
    tiempoInicio = Date.now();
    
    const algoritmoSeleccionado = selectorAlgoritmo.value;
    
    try {
        mostrarNotificacion(`Iniciando ${informacionAlgoritmos[algoritmoSeleccionado].nombre}...`, 'info');
        
        // Ejecutar el algoritmo correspondiente
        switch (algoritmoSeleccionado) {
            case 'bubble':
                await ordenamientoBurbuja();
                break;
            case 'selection':
                await ordenamientoPorSeleccion();
                break;
            case 'insertion':
                await ordenamientoPorInsercion();
                break;
            case 'quick':
                await ordenamientoRapido();
                break;
        }
        
        // Animación final si el proceso se completó sin interrupciones
        if (!detenerProceso) {
            await animacionCompletado();
            mostrarNotificacion('¡Ordenamiento completado con éxito!', 'success');
        } else {
            mostrarNotificacion('Proceso de ordenamiento detenido por el usuario', 'warning');
        }
        
    } catch (error) {
        console.error('Error durante el ordenamiento:', error);
        mostrarNotificacion('Ocurrió un error durante el proceso de ordenamiento', 'error');
    } finally {
        // Restaurar estado de la interfaz
        finalizarProceso();
    }
}

/**
 * Detiene el proceso de ordenamiento en ejecución
 */
function detenerOrdenamiento() {
    if (procesoOrdenamiento) {
        detenerProceso = true;
        mostrarNotificacion('Deteniendo proceso de ordenamiento...', 'info');
    }
}

/**
 * Animación especial cuando se completa el ordenamiento
 */
async function animacionCompletado() {
    // Limpiar cualquier resaltado previo
    for (let i = 0; i < conjuntoDatos.length; i++) {
        await quitarResaltado([i]);
    }
    
    // Animación de onda de completado
    for (let i = 0; i < conjuntoDatos.length; i++) {
        await marcarComoOrdenada(i);
        await pausarAnimacion(80);
    }
    
    // Efecto de celebración final
    const todasLasBarras = Array.from({length: conjuntoDatos.length}, (_, i) => 
        document.getElementById('barra-' + i)
    ).filter(Boolean);
    
    await anime({
        targets: todasLasBarras,
        scale: [1, 1.1, 1],
        rotate: [0, 5, -5, 0],
        duration: 800,
        delay: anime.stagger(50),
        easing: 'easeOutElastic(1, .8)'
    }).finished;
}

/**
 * Finaliza el proceso y restaura el estado de la interfaz
 */
function finalizarProceso() {
    procesoOrdenamiento = false;
    detenerProceso = false;
    
    // Rehabilitar controles
    botonOrdenar.disabled = false;
    botonDetener.disabled = true;
    botonGenerar.disabled = false;
    selectorAlgoritmo.disabled = false;
    inputTamano.disabled = false;
    selectorVelocidad.disabled = false;
    
    // Actualizar estadísticas finales
    actualizarEstadisticas();
}

/**
 * Verifica si el conjunto está ordenado correctamente
 * @returns {boolean} True si está ordenado, false en caso contrario
 */
function verificarOrdenamiento() {
    for (let i = 0; i < conjuntoDatos.length - 1; i++) {
        if (conjuntoDatos[i] > conjuntoDatos[i + 1]) {
            return false;
        }
    }
    return true;
}

/**
 * Inicialización completa del sistema
 */
function inicializarSistema() {
    console.log('🚀 Inicializando Visualizador de Algoritmos de Ordenamiento...');
    
    // Configurar eventos
    inicializarEventos();
    
    // Generar conjunto inicial
    generarConjuntoDatos();
    
    // Mostrar información inicial
    actualizarInformacion();
    
    // Aplicar animaciones de entrada
    document.querySelector('.container').classList.add('fade-in');
    
    console.log('✅ Sistema inicializado correctamente');
    mostrarNotificacion('¡Bienvenido al Visualizador de Algoritmos de Ordenamiento!', 'success');
}

// Ejecutar cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', inicializarSistema);

// Manejar visibilidad de la página para pausar animaciones si es necesario
document.addEventListener('visibilitychange', () => {
    if (document.hidden && procesoOrdenamiento) {
        console.log('Página oculta - considerando pausa del proceso...');
    } else if (!document.hidden && procesoOrdenamiento) {
        console.log('Página visible - reanudando proceso...');
    }
>>>>>>> e49a88aef943b18257c4f44ddc7a80dbce8ae6e3
});