# Programación Declarativa vs Imperativa

## Programación Declarativa

Es un paradigma de programación; que expresa la lógica de un cálculo sin describir su flujo de control.
Aquí nos enfocamos en "qué" estamos haciendo y no en el "como" se esta haciendo.

Ejemplo:

```js
const numbers = [1, 2, 3, 4, 6];
const multOfNumbers = numbers.map((numbers) => numbers * 2);
console.log(multOfNumbers);
//[2, 4, 6, 8, 12]
```

## Programación Imperativa

Es un paradigma de programación; que utiliza declaraciones que cambian el estado de un programa.
Aquí nos enfocamos en "como" lo estamos haciendo y no en el "qué" estamos haciendo.

Ejemplo:

```js
const numbers = [1, 2, 3, 4, 6];
let multOfNumbers = 0;

for (let i = 0; i < numbers.length; i++) {
  multOfNumbers.push(numbers[i] * 2);
}
console.log(multOfNumbers);
//[2, 4, 6, 8, 12]
```
