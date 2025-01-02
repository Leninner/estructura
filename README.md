# Proyecto final - Estructura de Datos

Implemente una aplicación que implemente el juego del ahorcado.

- [x] La aplicación tendrá un conjunto de palabras previamente cargadas.
- [x] La aplicación ha de permitir llevar a cabo un torneo.
  - [x] Indicar el número de rondas que se jugará 
  - [x] Registrar múltiples participantes en el juego.
- [x] Si la cantidad de palabras previamente cargadas no alcanzará, se ha de indicar y permitir que nuevas palabras sean añadidas.
- [x] Una vez que se hayan registrado los jugadores, uno de los jugadores dará la orden de comenzar a jugar.
- [x] La aplicación indicará, en todo momento, a quién le corresponde jugar 
- [x] Mostrará la cantidad de caracteres que tiene la palabra a adivinar.
- [x] La palabra por adivinar será seleccionada al azar por la aplicación garantizando no repetirse (cada palabra será descartada toda vez que se utilice en el juego).
- [x] En la medida en que el usuario ingrese letras válidas, se irá completando la palabra a adivinar, mostrando por pantalla el
  carácter ‘\*’ en las posiciones donde hay caracteres aún no adivinados.
- [ ] Si el usuario se repite en letras ya mostradas, se le notificará con un mensaje de error que no se penalizará.
- [x] Cada vez que el usuario ingrese una letra que no forma parte de la palabra, se irá decrementando el “nivel de vida” de dicho usuario
- [x] Se le notificará al respecto (en todo momento, el usuario podrá ver cuántas oportunidades le quedan).
- [x] Por cada participación, el usuario tendrá un resultado.
- [x] Ganará quien logre una mejor puntuación total al completar la cantidad de rondas que decidan jugar los usuarios.
- [x] Al terminar el juego, el sistema deberá generar un reporte con el lugar alcanzado por cada jugador (en orden decreciente de la cantidad
  de éxitos).
