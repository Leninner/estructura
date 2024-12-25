# Proyecto final - Estructura de Datos

Implemente una aplicación que implemente el juego del ahorcado.

- La aplicación tendrá un conjunto de palabras previamente cargadas.
- La aplicación ha de permitir llevar a cabo un torneo.
  - Lo primero que la aplicación permitirá será que se indique el número de rondas que se jugará y se registren múltiples participantes en el juego.
- Si la cantidad de palabras previamente cargadas no alcanzará, se ha de indicar y permitir que nuevas palabras sean añadidas.
- Una vez que se hayan registrado los jugadores, uno de los jugadores dará la orden de comenzar a jugar.
- La aplicación indicará, en todo momento, a quién le corresponde jugar y mostrará la cantidad de caracteres que tiene
  la palabra a adivinar.
- La palabra por adivinar será seleccionada al azar por la aplicación garantizando no repetirse (cada palabra será descartada toda vez que se utilice en el juego).
- En la medida en que el usuario ingrese letras válidas, se irá completando la palabra a adivinar, mostrando por pantalla el
  carácter ‘\*’ en las posiciones donde hay caracteres aún no adivinados.
- Si el usuario se repite en letras ya mostradas, se le notificará con un mensaje de error que no se penalizará.
- Cada vez que el usuario ingrese una letra que no forma parte de la palabra, se irá decrementando el “nivel de vida” de dicho usuario
  - Se le notificará al respecto (en todo momento, el usuario podrá ver cuántas oportunidades le quedan).
- Por cada participación, el usuario tendrá un resultado.
- Ganará quien logre una mejor puntuación total al completar la cantidad de rondas que decidan jugar los usuarios.
- Al terminar el juego, el sistema deberá generar un reporte con el lugar alcanzado por cada jugador (en orden decreciente de la cantidad
  de éxitos).
