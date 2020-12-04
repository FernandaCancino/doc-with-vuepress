# BEM methodology.

Al utilizar una metodología para nuestro desarrollo, nos enfocamos en reducir la huella de CSS, organizar la cooperación entre los programadores y mantener grandes lógicas de código CSS. Al utilizar BEM, se puede apreciar que es una metodología menos confusa que otra(s), pero aún así proporciona una buena arquitectura con una terminología reconocible.

Unos de los propósitos de BEM es hacer que los nombres de los selectores de CSS sean tan informativos y transparentes como sea posible. Esto se logra al dividir o visualizar nuestros componentes en block, element y modifier.

- **Block**: entidad autónoma que es significativa por sí misma.
    - ejemplos: header, container, menu, checkbox, input.

- **Element**: una parte de un bloque que no tiene un significado autónomo y está semánticamente ligado a su bloque.
    - ejemplos: menu item, list item, checkbox caption, header title.

- **Modifier**: una bandera en un bloque o elemento. Se usan para cambiar la apariencia, el estado o el comportamiento.
    - ejemplos: disabled, highlighted, checked, fixed, size big, color yellow.


## Convención de nombres

Es un echo conocido que la guía de estilo correcta puede aumentar significativamente la velocidad de desarrollo, la depuración y la implementación de nuevas características en el código heredado. Lamentablemente, la mayoría de las bases de códigos CSS a veces se desarrollan 
sin ninguna estructura o convenciones de nomenclatura, esto con el tiempo se hace insostenible.
El enfoque BEM asegura que todos los que participan en el desarrollo de un sitio web trabajen con una sola base de código y hablen el mismo idioma. El uso de un nombre adecuado te preparará para los cambios en el diseño del sitio web.
Para lograr el objetivo principal de BEM utilizamos la siguiente convención de nombres:

El nombre de **BLOCK** suele ser una palabra única como .header, pero si tienes una definición de bloque más larga entonces se divide con un solo guión -, puede consistir en letras y dígitos:
- Se usa el selector de nombre de clase solamente.
- No hay nombre o identificación de la etiqueta.
- No hay dependencias de otros bloques/elementos en una página.
```html
<div class="person">...</div>
<div class="per-son">...</div>
```
```css
.person{ }
.per-son{ }
```


**ELEMENT** empieza con doble underscore __, puede consistir en letras y dígitos:
- Se usa el selector de nombre de clase solamente.
- No hay nombre o identificación de la etiqueta.
- No hay dependencias de otros bloques/elementos en una página.
```html
<div class="person">
	...
	<span class="person__head"></span>
</div>
```
```css
/* BIEN */
.person__head{ }
.per-son__head{ }

/* MAL */
.person .person__head{ }
div.person__head{ }
```


El nombre de **MODIFIER** empieza con dos guiones --, puede consistir en letras y dígitos:
```html
<!-- BIEN -->
<div class="person person--small">
    ...
    <span class="person__head person__head--skin-brown"></span>
</div>
<div class="person person--skin-brown person--hair-long">
    ...
</div>

<!-- MAL -->
<div class="person--small">
    ...
</div>
```
```css
.person--small{ }
/* Para alterar elementos basados en un modificador de nivel de bloque */
.person--small .person__head{ }
/* Modificación de elementos */
.person__head--skin-brown{ }
```


Parece todo muy sencillo, no?

pero al tener mas bloques, o bloques dentro de bloques la cosa se puede enredar un poco... acá dejo un ejemplo -que encontre en internet- de como crear y/o dar estilo a una perona.

```html
<div class="person">
    <div class="person__female">
        <div class="person__hand person__hand--side-left">
        </div>
        <div class="person__leg person__leg--side-left">
        </div>
    </div>
    <div class="person__male">
        <div class="person__hand person__hand--side-left">
        </div>
        <div class="person__leg person__leg--side-left">
        </div>
    </div>
</div>
```
```SCSS
/*ejemplo con SASS*/
.person{
    &__hand{ 
        &--side{
            &-left{ }
        }
    }
    &__leg{ 
        &--side{
            &-left{ }
        }
    }
    &__female{ }
    &__male{ }
}
```

## Debo crear un block o un elemento?

Se puede/debe crear un **block** si la sección de código puede ser reutilizada y no depende de la implementación de otros componentes de la página.

Se puede/debe crear un **element** si una sección del código no puede ser utilizada por separado sin su entidad matriz (el block). Cabe recordar que en la metodología BEM no pueden existir los subelementos.


## Que hacer y que No hacer

- No se debería usar la etiqueta CSS o los selectores de ID al usar BEM.
- Un elemento es un componente opcional del bloque.
- No todos los bloques tienen elementos.

### Block

El nombre del bloque describe su próposito (¿Qué es?), no su estado (¿Cómo es?). Ejemplo:
```html
<!-- BIEN - el bloque del "error" es semánticamente significativo-->
<div class="error"></div>

<!-- MAL - describe la apariencia -->
<div class="red-text"></div>
````

Un bloque puede tener una estructura anidada de elementos en el árbol DOM, Sin embargo, esta estructura de bloque siempre se representa como una lista plana de elementos en la metodología BEM. Ejemplos:
```html
<!-- estructura anidada de elementos -->
<div class="block">
    <div class="block__elem1">
        <div class="block__elem2">
            <div class="block__elem3"></div>
        </div>
        <div class="block__elem4">
        </div>
    </div>
</div>
```
```css
/* estructura anidada de elementos */
.block {}
.block__elem1 {}
.block__elem2 {}
.block__elem3 {}
.block__elem4 {}
```

- Los bloques pueden anidarse entre sí.
- Se puede tener cualquier número de niveles de anidación.

 ```html
<!-- ejemplo -->
<header class="header">
    <div class="logo"></div>
    <form class="search-form"></form>
</header>
 ```


### Element

El nombre del elemento describe su propósito ("¿Qué es esto?" - elemento, texto, etc.), no su estado ("¿Qué tipo, o qué aspecto tiene?" - rojo, grande, etc.).

Un **ELEMENT** siempre es parte de un **BLOCK**, no de otro elemento. Esto significa que los nombres de los elementos no pueden definir una jerarquía como bloque__elemento1__elemento2, ejemplo:

```html
<!-- BIEN -->
<div class="search-form">
    <div class="search-form__content">
        <input class="search-form__input">
        <button class="search-form__button"></button>
    </div>
</div>

<!-- MAL -->
<div class="search-form">
    <div class="search-form__content">
        <input class="search-form__content__input">
        <button class="search-form__content__button"></button>
    </div>
</div>
```

¿Por qué no se puede crear un elemento de otro elemento?

Al crear elementos de elementos dificulta la capacidad de cambiar la estructura interna del bloque. Los elementos no pueden ser intercambiados, eliminados o añadidos sin modificar el código existente.


### Modifier

El nombre del modificador describe su apariencia (¿Que tamaño?, ¿Que tema?), su estado (¿En que se diferencia de los demas?; desactivado, enfocado, etc.) y su comportamiento (¿Como se comporta?, ¿Como responde al usuario?).

Existen diversos tipos de modificadores:
#### Boolean

Se utilizan cuándo la presencia o ausencia de un modificador es importante, y su valor es irrevelante. Ejemplo: si un modificador booleano esta presente, su valor sería verdadero.

```html
<!-- Se 'da' foco al block search-form-->
<form class="search-form search-form--focused">
    <input class="search-form__input">

    <!-- El elemento button esta deshabilitado -->
    <button class="search-form__button search-form__button--disabled">Buscar</button>
</form>
```

#### Key-value

Se utilizan cuando el valor del modificador es importante. Ejemplo: un menú con el tema 'orange'.
```html
<!-- El bloque form tiene el modificador 'theme-orange'-->
<form class="form search-form--theme-orange">
    <input class="search-form__input">

    <!-- El elemento button tiene el modificador 'size-m'-->
    <button class="search-form__button search-form__button--size-m">Search</button>
</form>
````

- No se pueden usar dos modificadores idénticos con diferentes valores simultáneamente.
```html
<button class="search-form__button
                search-form__button--size-s
                search-form__button--size-m">
    Search
</button>
```

Bajo la metodología BEM un modificador nunca puede ser utilizado solo, un modificador debe cambiar la apariencia, el comportamiento o el estado del bloque/elemento no reemplazarla.

```html
<!-- BIEN -->
<form class="search-form search-form--theme-islands">
    <input class="search-form__input">
    <button class="search-form__button">Search</button>
</form>

<!-- MAL -->
<form class="search-form--theme-islands">
    <input class="search-form__input">
    <button class="search-form__button">Search</button>
</form>
```

¿Por qué incluir el nombre del bloque en los nombres de los modificadores y/o elementos?

Esto proporciona un espacio de nombres, así ayuda a reducir el impacto de los elementos y modificadores de un bloque en la implementación de otro. También hace mas fácil la búsqueda de código ya que se utilizan nombres únicos. 

```html
<!--Ejemplos-->
<div class="button button--size-m">...</div>
<div class="select select--size-m">...</div>
<div class="button dropdown button--size-m">...</div>
```

## MIX

¿Qué es el mix?

Es una técnica para utilizar diferentes entidades BEM en un solo (o el mismo) nodo DOM.
Esto permite combinar el comportamiento de múltiples entidades sin duplicar el código y al mismo tiempo se estan creando componentes semánticamente nuevos basados en los existentes.

```html
<header class="header">
      <button class="button header__button">...</button>
</header>
```
```css
.button {
    font-family: Arial, sans-serif;
    text-align: center;
    border: 1px solid black;
}
.header__button {
    margin: 30px;
    position: relative;
}
```
En este ejemplo, la geometría externa y la posición del bloque de botones se establecen a través del elemento header_button. El bloque de botones no especifica ningún margen, por lo que puede ser fácilmente reutilizado en cualquier lugar.




Links de interés: [Documentation BEM](http://getbem.com/introduction/), [Introduction BEM](https://www.toptal.com/css/introduction-to-bem-methodology), [quick start](https://en.bem.info/methodology/quick-start/), [preguntas](https://en.bem.info/methodology/faq/#why-bem). []()
