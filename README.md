# 🎯 Visualizador de Algoritmos de Ordenamiento

Una herramienta interactiva y educativa para visualizar y comprender algoritmos de ordenamiento con animaciones en tiempo real, diseñada con tecnologías web modernas.

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)](https://developer.mozilla.org/es/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)](https://developer.mozilla.org/es/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)](https://developer.mozilla.org/es/docs/Web/JavaScript)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Algoritmos Implementados](#-algoritmos-implementados)
- [Tecnologías Utilizadas](#️-tecnologías-utilizadas)
- [Instalación y Uso](#-instalación-y-uso)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Funcionalidades](#️-funcionalidades)
- [Capturas de Pantalla](#-capturas-de-pantalla)
- [Contribución](#-contribución)
- [Licencia](#-licencia)

## ✨ Características

- 🎨 **Interfaz Moderna**: Diseño responsive con Tailwind CSS y efectos de glassmorphism
- 🔄 **Animaciones Fluidas**: Visualización suave con Anime.js para mejor comprensión
- 📊 **Estadísticas en Tiempo Real**: Seguimiento de comparaciones, intercambios y tiempo
- 🎛️ **Controles Interactivos**: Generación personalizada de conjuntos de datos
- ⚡ **Velocidad Ajustable**: Tres niveles de velocidad de animación
- 📱 **Totalmente Responsive**: Funciona perfectamente en dispositivos móviles
- 🛑 **Control de Proceso**: Capacidad de detener y reiniciar el ordenamiento
- 📚 **Información Educativa**: Detalles completos de cada algoritmo y su complejidad
- 🇪🇸 **Completamente en Español**: Interfaz y documentación en español

## 🔄 Algoritmos Implementados

### 1. Ordenamiento Burbuja (Bubble Sort)
- **Complejidad**: O(n²)
- **Tipo**: Intercambio directo
- **Estabilidad**: Estable
- **Descripción**: Compara elementos adyacentes e intercambia los que están desordenados

### 2. Ordenamiento por Selección (Selection Sort)
- **Complejidad**: O(n²)
- **Tipo**: Selección
- **Estabilidad**: No estable
- **Descripción**: Encuentra el elemento mínimo y lo coloca en la posición correcta

### 3. Ordenamiento por Inserción (Insertion Sort)
- **Complejidad**: O(n²) - O(n) en el mejor caso
- **Tipo**: Inserción
- **Estabilidad**: Estable
- **Descripción**: Construye el conjunto ordenado insertando elementos uno por uno

### 4. Ordenamiento Rápido (Quick Sort)
- **Complejidad**: O(n log n) promedio - O(n²) peor caso
- **Tipo**: Divide y vencerás
- **Estabilidad**: No estable
- **Descripción**: Usa un pivote para particionar y ordenar recursivamente

## 🛠️ Tecnologías Utilizadas

- **Frontend**:
  - HTML5 semántico
  - CSS3 con Flexbox y Grid
  - JavaScript ES6+ (async/await, modules)
  - Tailwind CSS para estilos responsivos

- **Librerías**:
  - [Anime.js](https://animejs.com/) - Animaciones suaves
  - [Tailwind CSS](https://tailwindcss.com/) - Framework de estilos

- **Características del Código**:
  - Arquitectura modular y escalable
  - Comentarios JSDoc completos
  - Manejo de errores robusto
  - Optimizaciones de rendimiento

## 🚀 Instalación y Uso

### Requisitos Previos
- Navegador web moderno (Chrome 80+, Firefox 75+, Safari 13+, Edge 80+)
- Conexión a internet (para cargar Tailwind CSS y Anime.js desde CDN)

### Pasos de Instalación

1. **Clonar o descargar el proyecto**
   ```bash
   git clone https://github.com/tu-usuario/visualizador-algoritmos.git
   cd visualizador-algoritmos
   ```

2. **Abrir el archivo principal**
   - Abrir `visualizar.html` en cualquier navegador web moderno
   - También funciona con servidores locales como Live Server

3. **¡Listo para usar!**
   - No requiere instalación de dependencias adicionales
   - Funciona completamente del lado del cliente

### Uso Básico

1. **Seleccionar Algoritmo**: Elige uno de los 4 algoritmos disponibles
2. **Configurar Tamaño**: Ajusta el tamaño del conjunto (5-25 elementos)
3. **Establecer Velocidad**: Selecciona la velocidad de animación deseada
4. **Generar Datos**: Crea un nuevo conjunto aleatorio
5. **Iniciar Ordenamiento**: Observa la visualización en tiempo real
6. **Analizar Resultados**: Revisa las estadísticas y la información del algoritmo

## 📁 Estructura del Proyecto

```
Visualizador de Algoritmos/
│
├── 📄 visualizar.html          # Archivo principal HTML
├── 🎨 styles.css               # Estilos personalizados
├── ⚙️ script.js                # Lógica principal JavaScript
├── 📖 README.md                # Documentación del proyecto
│
└── 📊 Componentes:
    ├── Panel de Control        # Selección de algoritmos y configuración
    ├── Área de Visualización   # Animación de barras en tiempo real
    ├── Panel de Estadísticas   # Métricas de rendimiento
    └── Panel de Información    # Detalles educativos del algoritmo
```

## ⚙️ Funcionalidades

### 🎛️ Panel de Control
- **Selector de Algoritmo**: Cambio dinámico entre diferentes algoritmos
- **Control de Tamaño**: Ajuste del número de elementos (5-25)
- **Control de Velocidad**: Tres niveles de velocidad de animación
- **Generación de Datos**: Creación de conjuntos aleatorios únicos
- **Controles de Proceso**: Iniciar, detener y reiniciar ordenamiento

### 📊 Visualización
- **Barras Animadas**: Representación visual clara de los datos
- **Códigos de Color**:
  - 🔵 Azul/Morado: Estado normal
  - 🟡 Amarillo/Naranja: Elementos en comparación
  - 🟢 Verde: Elementos ordenados
  - 🔴 Rojo: Elemento pivote (Quick Sort)
- **Animaciones Fluidas**: Transiciones suaves con efectos de escala y movimiento
- **Responsive Design**: Adaptación automática a diferentes tamaños de pantalla

### 📈 Estadísticas en Tiempo Real
- **Comparaciones**: Número total de comparaciones realizadas
- **Intercambios**: Cantidad de intercambios de elementos
- **Tiempo**: Duración del proceso en milisegundos
- **Complejidad**: Notación Big O del algoritmo seleccionado

### 📚 Información Educativa
- **Descripción Detallada**: Explicación clara de cada algoritmo
- **Análisis de Complejidad**: Mejor caso, caso promedio y peor caso
- **Características**: Propiedades específicas de cada algoritmo
- **Etiquetas Informativas**: Estabilidad, uso de memoria y aplicaciones

### 🔧 Características Técnicas
- **Notificaciones del Sistema**: Feedback visual para acciones del usuario
- **Validación de Entrada**: Verificación automática de parámetros
- **Manejo de Errores**: Gestión robusta de situaciones excepcionales
- **Optimizaciones**: Detección temprana de conjuntos ya ordenados

## 🎯 Casos de Uso

### 👨‍🎓 Educativo
- **Estudiantes**: Comprensión visual de algoritmos de ordenamiento
- **Profesores**: Herramienta de enseñanza interactiva
- **Autodidactas**: Aprendizaje autónomo de conceptos de algoritmos

### 👨‍💻 Profesional
- **Desarrolladores**: Revisión rápida de algoritmos
- **Entrevistas**: Preparación para preguntas técnicas
- **Análisis**: Comparación de rendimiento entre algoritmos

## 🔮 Futuras Mejoras

- [ ] **Más Algoritmos**: Heap Sort, Merge Sort, Radix Sort
- [ ] **Modo Comparativo**: Ejecutar múltiples algoritmos simultáneamente
- [ ] **Exportar Datos**: Guardar estadísticas y resultados
- [ ] **Temas Personalizables**: Diferentes esquemas de colores
- [ ] **Sonido**: Efectos de audio para mejor experiencia
- [ ] **Tutorial Interactivo**: Guía paso a paso para nuevos usuarios
- [ ] **Análisis Avanzado**: Gráficos de rendimiento y complejidad
- [ ] **Modo Sin Conexión**: Funcionalidad completa offline

## 🤝 Contribución

¡Las contribuciones son bienvenidas! Si deseas mejorar el proyecto:

1. **Fork el repositorio**
2. **Crea una rama** para tu funcionalidad (`git checkout -b feature/nueva-funcionalidad`)
3. **Commit tus cambios** (`git commit -am 'Agregar nueva funcionalidad'`)
4. **Push a la rama** (`git push origin feature/nueva-funcionalidad`)
5. **Crea un Pull Request**

### Áreas de Contribución
- 🐛 Corrección de bugs
- ✨ Nuevas funcionalidades
- 📖 Mejoras en documentación
- 🎨 Mejoras en el diseño
- 🔧 Optimizaciones de rendimiento
- 🌐 Traducciones a otros idiomas

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.

## 👨‍💻 Autor

**ING** **Gerson Batun**

**Desarrollado con ❤️ para la educación en algoritmos**

- 📧 Email: [tu-email@ejemplo.com](mailto:tu-email@ejemplo.com)
- 🌐 GitHub: [@tu-usuario](https://github.com/tu-usuario)
- 💼 LinkedIn: [Tu Perfil](https://linkedin.com/in/tu-perfil)

## 🙏 Agradecimientos

- **Anime.js** - Por las animaciones fluidas y profesionales
- **Tailwind CSS** - Por el sistema de estilos moderno y responsive  
- **MDN Web Docs** - Por la documentación técnica de referencia
- **Comunidad de Desarrolladores** - Por la inspiración y feedback continuo

---

<div align="center">

**⭐ Si este proyecto te ha sido útil, no olvides darle una estrella ⭐**

**🔄 Compartir es aprender - Ayuda a otros a descubrir esta herramienta**

</div>

---

*Última actualización: Noviembre 2025*
