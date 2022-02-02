# Proyecto final JavaScript - Romero Macarena

## Introducción
El trabajo consiste en un sitio web para un petshop llamado Como Perro & Gato. En el mismo, la persona que ingresa puede registrarse como usuario, iniciar sesión, seleccionar los productos que quiera añadir a su carrito y simular una compra de los mismos.

## Inicio 
Para poder poner en funcionamiento la aplicación, hay que instalar los **módulos**, a través del comando **npm i**, ya que los estilos fueron creados con SASS. 

## GIT

## Endpoints

### Usuario
Se pueden crear nuevos usuarios y loguearse, a la vez, en el JSON de **usuarios** se encuentran algunos hardcodeados a modo de base de datos.

##### Creación de nuevo usuario
Se realiza la petición a través del endpoint http://localhost:4200/registro, al que se llega clickeando en el ícono de usuario, y en la opción **Registrate**.
Una vez que la petición es exitosa, el usuario recibirá un correo con una URL dinámica, a la que tendrá que acceder para poder confirmar su registro.
##### Login de un usuario
Una vez que el registro se confirmó, se tiene que realizar una petición a través del endpoint http://localhost:4200/login, al que se llega clickeando en el ícono de usuario, y en la opción **Iniciá sesión**.
Si la petición es exitosa, el servidor le permitirá el acceso a la aplicación.
##### Inscripciones a clases
Se realiza una petición a través del endpoint http://localhost:4200/horarios, clickeando en la opción **Horarios**. Allí se pueden ver las clases que hay disponibles, y al clickear en las mismas, se irán sumando al carrito de compras. Una vez que el usuario terminó la selección, deberá clickear en el carrito, redirigiéndose al endpoint http://localhost:4200/user-cart. Allí podrá ver una tabla con las clases seleccionadas y podrá elegir si quiere pagar por una frecuencia diaria (una sola clase), o por una frecuencia mensual (un pack de 4 clases). Una vez que elije la frecuencia, deberá clickear en el botón **Siguiente** para poder avanzar. Se le abrirá la posibilidad de clickear en el número **2** del proceso, allí tendrá una nueva vista de las clases seleccionadas y un falso botón de pago, que al momento solamente realizará cambios en la base de datos. Para poder concluir el proceso, deberá clickear en **Pagar**. Luego, se le da la opción de ver las clases en las que está inscripto, a través del endpoint http://localhost:4200/user-inscripciones, allí podrá ver una tabla con las mismas.
##### Perfil
Se realiza una petición a través del endpoint http://localhost:4200/user/:id, al que se llega clickeando en el nombre del usuario, y en la opción **Perfil**, allí podrá encontrar todos sus datos de perfil y tendrá un botón para acceder al endpoint http://localhost:4200/user-update/:id, donde podrá modificar sus datos.


### Administrador

##### Login de un administrador
Se realiza una petición a través del endpoint http://localhost:4200/login, al que se llega clickeando en el botón localizado en el footer, debajo de la información de contacto, llamado **Login administrador**. Si la petición es exitosa, el servidor le permitirá el acceso a la aplicación.
##### Clases
Se realiza una petición a través del endpoint http://localhost:4200/admin-clases, clickeando la opción **Clases**. Allí se puede ver una tabla con todas las clases disponibles, y al clickear en el botón del ícono del lápiz, se puede acceder a cada clase y editarla. Al clickear en el botón del ícono del cesto de basura, se elimina la clase. Al clickear en el botón de **Crear nueva clase**, se accede al endpoint creado para dicho uso. Allí se puede crear una clase con un rango horario ya creado, o bien, crear un nuevo rango horario y luego crear la clase.
##### Inscriptos
Se realiza una petición a través del endpoint http://localhost:4200/admin-inscripciones, clickeando la opción **Inscriptos** en el menú desplegable de la izquierda. Allí se puede ver una tabla con todas las clases disponibles y los usuarios que están inscriptos en cada una de las mismas.
##### Precios
Se realiza una petición a través del endpoint http://localhost:4200/admin-precios, clickeando la opción **Precios** en el menú desplegable de la izquierda. Allí se puede ver una tabla con todos los precios disponibles, y al clickear en el botón del ícono del lápiz, se puede acceder a cada precio y editarlo. Al clickear en el botón del ícono del cesto de basura, se elimina dicho precio. Al clickear en el botón de **Crear nuevo precio**, se accede al endpoint creado para dicho uso. Allí se puede crear un precio definiendo la modalidad de la clase y la frecuencia también.
##### Perfil
Se realiza una petición a través del endpoint http://localhost:4200/admin-profile, al que se llega clickeando en el nombre del administrador, y en la opción **Perfil**, allí podrá encontrar todos sus datos de perfil y tendrá un botón para poder modificarlos.


### Invitado
Corresponde a todo usuario que ingrese a la aplicación sin necesidad de loguearse.

##### Horarios
Se realiza una petición a través del endpoint http://localhost:4200/horarios, clickeando la opción **Horarios** en el menú desplegable de la izquierda. Allí se puede ver una tabla con todas las clases disponibles.
##### Precios
Se realiza una petición a través del endpoint http://localhost:4200/precios, clickeando la opción **Precios** en el menú desplegable de la izquierda. Allí se puede ver una tabla con todos precios disponibles de acuerdo a la modalidad de la clase.

### Autoría ⚙
Macarena Romero para la Diplomatura de Programación Web Full Stack de la UTN.
