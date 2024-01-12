# Proyecto base basado en Angular para nuevos proyectos

Versión angular CLI version 7.3.7.

## Ambientes de desarrollo

Existen dos ambientes para el desarrollo con la estructura propuesta. Ambiente local (con el uso de parámetros de pruebas) y ambiente de producctión (con el uso de parámetros del real), esto con el fin de poder depurar antes del compilado.
Para ejecutar el ambiente local, digitar `npm run start` en la consola y `npm run start-prod` para usar el ambiente de producción.
Cada ambiente ejecutado vía consola, se deberá abrir la dirección `http://localhost:4200/` en el navegador web de preferencia.
Los ambientes se configuran entro del directorio `environments/`, el cual allí se deberá poner cada parámetro configurado para el ambiente ha ejecutar.

## Compilación del proyecto

Basado en los dos ambientes descritos anteriormente, para compilar el ambiente de pruebas se debe ejecutar `npm run build` y para el ambiente de producción `npm run build-prod`.
Se debe tener encuenta que antes de compilar el proyecto, se debe configurar el nombre de la carpeta el cual quedará alojado en el servidor. Ello se podrá encontrar dentro del archivo `package.json` con los parámetros `deploy-url` y `base-href`.
El parámetro `deploy-url` se refiere al nombre de la carpeta y `base-href` se refiere a la dirección ha visualizar en el navegador (Ej: `http://app.madecentro.co/base_href` - `http://192.168.1.43/base_href`).
