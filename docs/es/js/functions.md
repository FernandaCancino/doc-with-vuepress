# Funciones 

Para empezar, que es una función en javascript?

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
Son una de las caracteristicas mas populares de ES6.
Arrows o flechas son abreviaciones de funciones utilizando el operador =>, no se necesita la palabra clave function, return y/o los corchetes '{}'. Estas son funciones anónimas las cuales se pueden registrar en una variable -preferentemente en una constante-.

Las funciones al ser registradas en una variable son asociadas en forma de puntero de memoria y no directamente en la memoria. Normalmente cuando definimos una función estas son alojadas en un espacio de memoria y estarán ahí esperando a ser utilizadas, mientras no se utilicen o si nunca se llaman es un desperdicio de memoria.

Función declarada con ES5.
``` js
function saludar(nombre){
    console.log('Hola ', nombre,'!');
}
saludar('Venus');
```
Función declarada con ES6.
``` js
const saludo = nombre => console.log('Hola ', nombre,'!');
saludo('Venus');
```

::: tip
Las funciones se declaran de manera distinta si abarcan mas de una línea de código.
:::
``` js
const sumar = (num1, num2) => num1 + num2;
sumar(1, 1);
```
Solo se puede omitir return y corchetes '{}', cuando la función solo utiliza una línea.
``` js
const sumar = (num1, num2) =>{
    return num1 + num2;
}
sumar(1, 1);
```


También puede ir variando la forma en que se escriba la función según los argumentos que esta reciba...

Si recibe cero -0- argumento:
``` js
const saludo = () => window.alert('Hola!');
//si recibe ningún argumento debe utilizar entreparentesis '()', en la sección de los argumentos.
```
Si recibe un -1- argumento:
``` js
const saludoConNombre = nombre => console.log('Hola', nombre, '!');
//si recibe solo un argumento se puede declarar sin neceidad de estar entre paréntesis.

```
Si recibe dos -2- o más argumentos:
``` js
const saludoConNombreyApellido = (nombre, apellido) => console.log('Hola', nombre, apellido, '!');
//al recibir dos o más argumentos estos deben estar declarados entre paréntesis '()'.
```


### map

El método map(), crea un nuevo array con los resultados de la llamada a la función indicada aplicado a cada uno de sus elementos. [fuente](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Array/map)
puede recibir 3 argumentos; currentValue, index, array.
- currentValue: *requerido* elemento actual del array que se esta procesando. 
- index: *opcional* índice del elemento actual que se esta procesando.
- array: *opcional* array sobre el que se llama map.

``` js 
const personas = [
    {
        'nombre': 'Venus',
        'edad': 1
    },
   {
       'nombre': 'Pia',
       'edad': 15
   }, 
    {
        'nombre': 'Daniela',
        'edad': 30
    }
]

const nombres = personas.map((persona) => 
    console.log(persona.nombre));

```

En terminos simples -NO ESTOY SEGURA- el método map(), nos sirve para recorrer un arreglo, realizar las acciones que queramos dentro de la función y nos guarda el resultado en una nueva.

``` js
const nums = [1, 3, 9, 12];
const mult = nums.map((nums) => nums*2)
mult
```

### filter


### reduce


### foreach

El método foreach() ejecuta una función proporcionada una vez por cada elementro del array.

## Funciones anónimas

Son las funciones que no tienen nombre, no ocupan espacio en memoria y por lo general se utilizan cuando no se volvera a utilizar la función.

## Funciones como valores