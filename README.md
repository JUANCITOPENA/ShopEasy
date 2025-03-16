# 📱 **ShopEasy: Plataforma de Compras en Línea** 🛒

## **Descripción General**

ShopEasy es una aplicación web de comercio electrónico moderna y responsiva que simula una experiencia de compra en línea. Construida con HTML, CSS y JavaScript, este proyecto muestra un flujo completo de compra, desde la navegación por productos hasta el pago con generación de facturas.

## **Características**

- 🔍 **Búsqueda de Productos**: Filtra productos por nombre o categoría
- 🛍️ **Carrito de Compras**: Añade, elimina y gestiona cantidades de productos
- 💳 **Proceso de Pago**: Formulario de pago completo con validación
- 📄 **Generación de Facturas**: Creación automática de facturas PDF usando jsPDF
- 📱 **Diseño Responsivo**: Funciona perfectamente en dispositivos móviles y de escritorio

## **Tecnologías Utilizadas**

- **HTML5**: Estructura y marcado semántico
- **CSS3**: Estilización y diseño responsivo
- **JavaScript**: Funcionalidad interactiva e integración de API
- **Bootstrap 5**: Sistema de rejilla responsiva y componentes UI
- **Font Awesome**: Biblioteca de iconos para mejorar la interfaz
- **jsPDF**: Biblioteca para generación de facturas en PDF
- **FakeStore API**: API externa para datos de productos

API Utilizada
Este proyecto utiliza la FakeStore API para obtener datos de productos:

🔌 Endpoint principal: https://fakestoreapi.com/products
📦 Tipo de datos: Productos con información de título, precio, descripción, categoría e imagen
🔄 Método de integración: Fetch API con async/await para solicitudes asíncronas
🛠️ Funcionalidades: Obtención de lista completa de productos sin necesidad de autenticación

La FakeStore API es un servicio gratuito que proporciona datos simulados de e-commerce para desarrollo y pruebas. Ofrece múltiples endpoints para diferentes recursos como productos, carritos, usuarios y categorías.
Créditos

👨‍💻 Desarrollador del proyecto: [Tu Nombre]
🌐 FakeStore API: Desarrollada por Mohammed Kemal
📚 Bootstrap: Desarrollado por el Equipo de Bootstrap
📄 jsPDF: Desarrollado por Parallax
🔍 Font Awesome: Desarrollado por Fonticons, Inc.

Un agradecimiento especial a todos los creadores de estas herramientas de código abierto que hacen posible el desarrollo web moderno.

## **Estructura del Proyecto**

- `index.html`: Documento HTML principal con estructura de la página
- `script.js`: Código JavaScript para la lógica de la aplicación
- `styles.css`: CSS personalizado para estilización más allá de Bootstrap
- `README.md`: Documentación e instrucciones del proyecto

## **Oportunidades de Aprendizaje**

Al trabajar con este proyecto, ganarás experiencia en:

- ⚡ **Integración de API**: Obtención y procesamiento de datos de APIs externas
- 🔄 **JavaScript Asíncrono**: Uso de `async/await` para operaciones no bloqueantes
- 🛒 **Gestión de Carrito**: Implementación de funcionalidades de carrito de compras
- 🎨 **Diseño UI Moderno**: Creación de una interfaz de usuario intuitiva y responsiva
- 📊 **Manipulación del DOM**: Actualización dinámica de la UI basada en acciones del usuario
- 🔧 **Modales en JavaScript**: Uso de componentes modales de Bootstrap para interacciones
- 📄 **Generación de PDF**: Creación de facturas descargables con jsPDF

## **Instalación y Configuración**

1. Clona el repositorio o descarga los archivos de código
2. Abre `index.html` en un navegador web
   - No requiere proceso de compilación ni instalación de dependencias
   - Todas las bibliotecas externas se cargan desde CDNs

## **Uso**

1. Navega por el catálogo de productos en la página principal
2. Utiliza la barra de búsqueda para filtrar productos
3. Haz clic en "Añadir al carrito" en los artículos deseados
4. Ajusta las cantidades en el modal emergente
5. Visualiza tu carrito haciendo clic en el icono del carrito
6. Procede al pago y completa los detalles de pago
7. Completa la compra para generar una factura en PDF

## **Mejoras Futuras**

- 🌐 **Autenticación de Usuario**: Añadir funcionalidad de inicio de sesión/registro
- ⭐ **Calificaciones de Productos**: Implementar un sistema de calificación y reseñas
- 🔔 **Notificaciones de Pedidos**: Añadir notificaciones por correo electrónico para actualizaciones de pedidos
- 🌙 **Modo Oscuro**: Implementar capacidades de cambio de tema
- 💾 **Almacenamiento Local**: Guardar elementos del carrito entre sesiones

## **Contribución**

¡Las contribuciones son bienvenidas! Siéntete libre de hacer fork al repositorio y enviar pull requests para cualquier mejora o corrección de errores.

## **Licencia**

Este proyecto está disponible bajo la Licencia MIT.

---

🛍️ **¡Felices Compras con ShopEasy!** 🛒
