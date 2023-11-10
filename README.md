# TecTestNewshore
Prueba técnica para la empresa FLYR realizada por Miguel Mateo Grajales Sánchez.

## Consideraciones
Para la prueba técnica, utilicé la API https://recruiting-api.newshore.es/api/flights/1 - Rutas múltiples. También se podrían utilizar cualquiera de las otras dos APIs sin problema en el archivo environment.ts.

## Uso
Se ingresa en el campo origen uno de los códigos permitidos por la API (3 caracteres) y también en destino. Se elige un número máximo de escalas permitidas para el viaje y se selecciona la moneda en la que se desea ver el precio de los viajes.

La moneda de los viajes generados se puede cambiar en cualquier momento a elección del usuario.

Los campos tienen varias validaciones para evitar cualquier error en la aplicación:
     Solo se permiten 3 caracteres
     No puede ser igual el origen y el destino
     No se pueden ingresar letras al campo de max escalas
     No pueden estar los campos vacíos

La página informa con un alert cualquier error anterior y también se genera una alerta si no se encuentran viajes para ese origen y destino.

## Instalación 
Debe tener instalado el CLI de Angular antes de la instalación: `npm install -g @angular/cli`
1. Clona el repositorio: `git clone https://github.com/Terlius/TEC_TEST_NEWSHORE.git`
2. Ingresa al directorio: `cd TEC_TEST_NEWSHORE`
3. Instala las dependencias: `npm install` 

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
