# Acuario Pira Renda

Proyecto integrador para el curso **Front-End -  JS para TT Adultos - 1C 2026** — Talento Tech.

## Descripción

Sitio web de una tienda de acuarios llamada **Pira Renda** (nombre guaraní). El proyecto se encuentra **en desarrollo activo** y tiene como objetivo convertirse en un **e-commerce completo**. En su estado actual funciona como una vitrina virtual con catálogo, carrito de compras, atlas de peces interactivo y formulario de contacto. Las funcionalidades de autenticación de usuarios y pasarela de pagos están planificadas para las próximas etapas del proyecto.

## Páginas

| Página | Descripción |
|--------|-------------|
| `index.html` | Inicio con hero en video, destacados y accesos directos |
| `tienda.html` | Tienda con filtros por categoría, paginación y carrito |
| `carrito.html` | Resumen del carrito con cálculo de total |
| `atlas.html` | Atlas de peces con filtros y paginación (agua dulce, salada, tropical, caracoles, axolotes) |
| `guia.html` | Guía de cuidados para principiantes |
| `productos_info.html` | Hub de categorías de productos |
| `cat_acuarios.html` | Detalle de acuarios y peceras |
| `cat_bombas.html` | Detalle de bombas |
| `cat_filtros.html` | Detalle de filtros |
| `cat_skimmers.html` | Detalle de skimmers |
| `cat_aditivos.html` | Detalle de aditivos |
| `cat_decoracion.html` | Detalle de decoración |
| `acerca_de.html` | Historia y valores de la tienda |
| `contacto.html` | Información de contacto, formulario y mapa |
| `atencion_cliente.html` | Centro de atención al cliente |
| `faq.html` | Preguntas frecuentes |
| `envio.html` | Políticas de envío y devoluciones |

## Tecnologías utilizadas

- **HTML5** semántico (`header`, `nav`, `main`, `section`, `footer`)
- **CSS3** con archivos separados por página
- **Flexbox** y **CSS Grid** para layouts responsivos
- **Media Queries** para adaptación móvil
- **JavaScript** vanilla para interactividad
- **Font Awesome 6** para iconografía
- **Formspree** para el envío del formulario de contacto

## Funcionalidades destacadas

- Tienda con filtros por categoría, paginación (10 por página) y carrito persistente
- Atlas de peces con 5 categorías filtrables, paginación y modal con ficha técnica de cada especie
- Navegación con breadcrumb dinámico que rastrea la página de origen
- Formulario de contacto con validación de campos en tiempo real
- Widget de chat flotante
- Diseño responsivo en todas las páginas
- Hero en video en la página de inicio

## Formulario de contacto

El formulario incluye campos de **nombre**, **correo electrónico**, **teléfono** y **mensaje**, con validación JavaScript del lado del cliente. El envío está configurado con **Formspree** (`https://formspree.io`).

> Para activarlo debo reemplazar `YOUR_FORM_ID` en `contacto.html` con el ID del formulario creado en formspree.io.

## Estructura de archivos

```
/
├── index.html
├── tienda.html
├── carrito.html
├── atlas.html
├── guia.html
├── contacto.html
├── acerca_de.html
├── productos_info.html
├── cat_*.html (x6)
├── atencion_cliente.html
├── faq.html
├── envio.html
├── css/
│   ├── base.css
│   └── [página].css
├── js/
│   ├── script.js
│   ├── tienda.js
│   ├── atlas.js
│   ├── carrito.js
│   ├── contacto.js
│   └── ...
└── assets/
    └── img/
```

## Próximas funcionalidades

- Login y registro de usuarios (Firebase Authentication)
- Pasarela de pagos (MercadoPago u otro)
- Historial de pedidos por usuario
- Panel de administración de productos

## Curso

**Front-End JS — TT Adultos — 1C 2026**
Talento Tech — Pre-Entrega Clase 08 "Git y GitHub"

**Autora:** Delcy Villalba
