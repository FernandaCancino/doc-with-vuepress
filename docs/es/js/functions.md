# Funciones 

## Callbacks
Es una funcion que se ejecuta al final de otra función. Entonces función x recibe como argumento a otra función y esta se ejecutara.


``` js
function sumar (num1, num2, cb){
    const res = num1 + num2;
    cb(res);
}
```  
En este ejemplo podemos ver que la funcion sumar recibe como argumentos numero1, numero2 y cb -funcion callback-. Sumar guarda en la constante res el resultado de num1 mas num2 y luego lo pasa como argumento a la función callback donde se ejecuta esta.

``` js
function callback(result){
    console.log('resultado ', result);
}
```
La funcion callback muestra en la consola el resultado de suma.


``` js
sumar(2, 3, callback);
```
Ejecutamos la(s) funcion(es).

::: tip
Los Callbacks se pueden utilizar para 'avisar' cuando una función termina de hacer algo.

Se pueden escribir como una función anonima.

Son relacionados con la programación funcional, ya que estos pueden ayudar a no repetir código y a su mantenimiento, a conseguir funciones mas especificas y, en ciertos casos, a mejorar el nivel de abstracción y la lectura de código.

Al utilizar callbacks de forma asíncrona son muy útiles para realizar testing de elementos asíncronos.
    <!-- ::: right -->
    [Fuente:](https://medium.com/@anamartinezaguilar/callbacks-en-javascript-8deeca9824b4)
    <!-- ::: -->
:::

Un ejemplo mas comun de callback es como 'función escuchadora' de un evento.
``` js
function showAlert(){
   alert('Alerta');
}
button.addEventListener('click', showAlert);
```

### Ejecución asincrona con callbacks

Los callbacks en sí son síncronos, pero se pueden manejar de manera asíncrona.
``` js
function foo(val, callback){
    if(val == 1){
        callback(true);
    }
    else{
        callback(false);
    }
}
```
En el ejemplo, la función contenedora elige cuando y si es que se ejecuta el callback.

### Callback para eliminar el conocimiento en las dependencias

Una manera de elminar las dependencias es la utilizacion de callbacks, pudiendonos ayudar en determinados casos.

En general en un código es usual que funciones dependan de otras funciones. Al generarse esto provoca la dependencia esto puede afectar a nuestro código sin que nos demos cuenta, o en un futuro realizar un pequeño cambio se puede volver complejo y laborioso. Mientras menos dependencia mejor.


Podemos invertir la dependencia a nivel de conocimiento y hacer que la otra funcion no tenga conocimiento de la otra función que se ejecuta.

``` js
var seg = 10;

function cuentaRegresiva(){
    setInterval(function(){
        seg--;
        mostrar();
    }, 1000);
}

function mostrar(){
    console.log(seg);
}
cuentaRegresiva();
``` 
En el ejemplo la función cuentaRegresiva depende de la función mostrar cada segundo. Para minimizar esta dependencia podemos hacer que la función cuentaRegresiva no tenga conocimiento sobre la funcion mostrar, pasandole un callback.
``` js
var seg = 10;

function cuentaRegresiva(mostrarSegundos){
    setInterval(function(){
        seg--;
        mostrarSegundos();
    }, 1000);
}

function mostrar(){
    console.log(seg);
}
cuentaRegresiva(mostrar);
```

## Fat Arrow Functions

### map
### filter
### reduce
### foreach

## Funciones anonimas

## Funciones como valores