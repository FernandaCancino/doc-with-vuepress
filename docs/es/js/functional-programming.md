# Programacion Funcional

Es un paradigma de programación declarativa basado en el uso de verdaderas funciones matemáticas. Al desarrollar con este paradigma, trabajaremos principalmente con funciones, funciones de orden superior, al mismo tiempo evitando las mutaciones -datos mutables-, y el compartir estados entre funciones, también se podrán tratar como ciudadanos de primera clase.

- Paradigma de programación: una forma de resolver diferentes problematicas.

- Ciudadanos de primera clase: las funciones podrán ser asignadas a variables, adémas podrán ser utilizadas como entrada y salida de otras funciones.

- Función de orden superior: son las funciones que puedan tomar funciones como parámetros y devolver funciones como resultado.

```js
//función de orden superio ES5
function suma(a) {
  return function(b) {
    return a + b;
  };
}

//función de orden superio ES6
const suma = (a, b) => a + b;
```

## Side Effects

## Pure Functions

Son aquellas, las cuales, dando el mismo input -entrada-, siempre retornan el mismo output -salida- ademas de no tener efectos secundarios -colaterales- observables. También conocido como transparencia referencial; lo que significa, si das los mismos datos como input o argumento, la función siempre debe devolver el mismo valor de retorno.

- Efecto colateral: modifica x variable de entorno o global.

Las funciones al ser puras se hace mas fácil de predecir y/o razonar con menos contexto, aislar, reusar y de testear.

Ejemplos de función pura

```js
const mult = (a, b) => a * b;
mult(10, 2); // = 30
```

```js
const suma = (a, b) => a + b;
suma(10, 20); // = 30
```

Si se tuviera que realizar un test para la función vista recientemente, esta al ser una función pura se podría comprobar los valores esperados y garantizar que la función se comporte como se espere.

Ejemplo de un test con jest.

```js
const suma = require("./suma");

describe("suma()", () => {
  it("should return 30 when arg a is 10 and arg b is 20", () => {
    expect(suma(10, 20)).toBe(30);
  });

  it("should return 10 when arg a is 1 and arg b is 0", () => {
    expect(suma(10, 0)).toBe(10);
  });
});
```

::: danger
Se debe tener en cuenta que no todas las funciones -por mas que se quiera- podrán ser por naturaleza puras.
:::

Las funciones impuras se caracterizan por:

- No tener argumentos de entrada.
- No devuelve ningún valor.
- Usa 'this'.
- Usa variables globales.

Ejemplos:

```js
// Impura: Devuelve void y modifica el entorno.
console.log("Hola Mundo");

// Impura: No tiene argumento de entrada y su resultado es no determinista.
Math.random();

// Impura: Modifica el array como efecto colateral.
array.splice(1, 2);
```

## Shared States

## Mutations

## Cloning Objects

## Reduce

## Map

## Filter

## Decorador Unario

Este decorador convierte cualquier función en una función unaria; osea una función que solo tiene un parámetro de entrada.

Llevando esto a un ejemplo práctico:

- se requiere convertir un array de strings a un array de enteros; para esto lo realizaremos con map y parseInt

```ts
const result = ["1", "2", "3"].map((item) => parseInt(item));
console.log(result); // [1, 2, 3]
```

Esto funcionaría correctamente, pero, si solo se tiene un parámetro de entrada para la función parseInt -item-, ¿Cómo se podría acortar la codificación de la función? En otras palabras, ¿Cómo podríamos usar map sin la expresión lamda - (item)=> -para convertir el array de string a un array de enteros?

Si lo probamos de la siguiente forma:

```ts
const result = ["1", "2", "3"].map(parseInt);
console.log(result); // => [1, NaN, NaN]
// parseInt( number = currentValue, base = index)
// parseInt(1, 0) => 1
// parseInt(2, 1) => NaN
// parseInt(3, 2) => NaN
```

El resultado es [1, NaN, NaN]. Esto ocurre porque la función map está definida para recibir una función con la firma function(currentValue, index, array) y parseInt de JavaScript (que normalmente lo usamos con un único parámetro), tiene otro segundo parámetro que es la base parseInt(number, base).

Al implementar el decorador unario

```ts
const unary = (fn) => {
  return (...args) => fn(args[0]);
};
```

Se puede resolver el ejercicio de la siguiente manera:

```ts
["1", "2", "3"].map(unary(parseInt)); //=> [1, 2, 3]
```

::: danger
BUSCAR MAS INFORMACIÓN SOBRE ESTO.
:::

[fuente: ](https://lemoncode.net/lemoncode-blog/2017/9/5/introduccion-programacion-funcional-javascript)

## Currying (currificación)

Se hace uso de currying cuándo una función de múltiples variables en una secuencia de funciones unarias.

Si una función tiene n elementos de entrada, nunca se ejecutará si no le proporcionamos todos los elementos de entrada que pide, al contrario de lo que sucede en por defecto en JavaScript.
La currificación nos permite reutilizar una función en diferentes sitios con diferentes configuraciones.

En un ejemplo práctico currying sería lo siguiente:

```js
//se tiene una función que recibe x elementos de entrada.
f(a, b, c);
//al aplicar currying sería
f(a) => f(b) => f(c)
```

Ejemplo: se requiere calcular la suma de dos números...

```ts
const suma = (a, b) => a + b;
suma(1, 1); //2
```

Al aplicar Currying quedaría

```ts
const suma = (a) => (b) => a + b;
suma(1)(1); //2
```

Los ejemplos anteriormente vistos se han realizado bajo la sintaxis de ES6, con la sintaxis de ES5 sería lo siguiente:

```ts
function suma(a) {
  return function(b) {
    return a + b;
  };
}
```

También para complementar esto, se puede buscar información sobre las librerias Ramda y/o lodash/fp, las cuales nos permite realizar currying en funciones normales.

[fuente: ](https://lemoncode.net/lemoncode-blog/2017/9/5/introduccion-programacion-funcional-javascript)

## Compose
