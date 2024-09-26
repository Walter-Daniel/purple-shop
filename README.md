# 🛒 **Purple Shop**

Purple Shop es un e-commerce para la venta de productos digitales con integración de pagos, utilizando **Next.js** y **Prisma**.

## 📑 Descripción

Este proyecto está diseñado para facilitar la compra y venta de productos, incluyendo características como autenticación, gestión de usuarios y pagos integrados con **PayPal**.

## 🚀 Cómo correr en desarrollo

1. **Clonar el repositorio:**

   ```bash
   git clone https://github.com/walter-daniel/purple-shop.git
2. **Crear y configurar variables de entorno:**
   
   - Crear una copia del archivo .env.template y renombrarlo a .env.
   - Cambiar las variables de entorno según la configuración de tu entorno local.

     
   ```
   #Base de datos
    PGHOST=
    DB_NAME=
    DB_USER=
    DB_PASSWORD=
    
    #Prisma
    DATABASE_URL=
    
    #Autenticación
    AUTH_SECRET=
    
    #PayPal
    NEXT_PUBLIC_PAYPAL_CLIENT_ID=
    PAYPAL_SECRET=
    PAYPAL_OAUTH_URL=  # POST
    PAYPAL_ORDERS_URL=  # GET
    
    #Cloudinary
    CLOUDINARY_URL=
   ```

3. **Instalar dependencias:**
      ```bash
      npm install

4. **Correr migraciones en Prisma:**
      ```bash
      npx prisma migrate dev
      
6. **Ejecutar seed para popular la base de datos:**
      ```bash
      npm run seed

8. **Iniciar el entorno de desarrollo:**
      ```bash
      npm run dev

## 🛠 Dependencias principales
- Next.js - Framework de React para aplicaciones web.
- Prisma - ORM para interactuar con la base de datos.
- React Hook Form - Librería para gestionar formularios.
- PayPal SDK - Integración de pagos.
- Zustand - Librería para manejo de estado.

## 👾Dependencias de desarrollo
- TypeScript - Superset de JavaScript.
- ESLint - Analizador de estilo y errores.
- Tailwind CSS - Framework de utilidades CSS.

## 📚 Recursos Adicionales

A continuación, se listan algunos recursos que pueden ser útiles para profundizar en el uso de las tecnologías utilizadas en este proyecto:

### Documentación oficial
- [**Next.js Documentation**](https://nextjs.org/docs) - Aprende cómo construir aplicaciones con Next.js.
- [**Prisma Documentation**](https://www.prisma.io/docs) - Guía para interactuar con la base de datos usando Prisma.
- [**React Hook Form Documentation**](https://react-hook-form.com/get-started) - Aprende a gestionar formularios de manera eficiente.

### Recursos de pago e integración
- [**PayPal Developer Documentation**](https://developer.paypal.com/docs/) - Información sobre cómo integrar y configurar pagos en línea.

### Guías y tutoriales útiles
- [**Tailwind CSS Guide**](https://tailwindcss.com/docs) - Aprende a crear diseños responsivos y estilos con Tailwind.
- [**Zustand State Management Guide**](https://docs.pmnd.rs/zustand/getting-started/introduction) - Guía de manejo de estado con Zustand.
- [**React Icons Documentation**](https://react-icons.github.io/react-icons/) - Aprende a utilizar íconos en React con facilidad.

### Buenas prácticas y herramientas de desarrollo
- [**ESLint Docs**](https://eslint.org/docs/latest/user-guide/getting-started) - Guía para escribir un código más limpio y libre de errores.
- [**TypeScript Handbook**](https://www.typescriptlang.org/docs/handbook/intro.html) - Referencia completa para mejorar la tipificación en tu proyecto.

### 🌐 Deploy del Proyecto

Puedes ver el proyecto desplegado en Vercel aquí: [**Purple Shop**](https://purple-shop-theta.vercel.app/)
