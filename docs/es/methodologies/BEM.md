# BEM methodology.

Al utilizar una metodología para nuestro desarrollo, nos enfocamos en reducir la huella de CSS, organizar la cooperación entre los programadores y mantener grandes lógicas de código CSS. Al utilizar BEM, se puede apreciar que es una metodología menos confusa que otra(s), pero aún así proporciona una buena arquitectura con una terminología reconocible.

Unos de los propósitos de BEM es hacer que los nombres de los selectores de CSS sean tan informativos y transparentes como sea posible. Esto se logra al dividir o visualizar nuestros componentes en block, element y modifier.

- **Block** (bloque): entidad autónoma que es significativa por sí misma.
    - ejemplos: header, container, menu, checkbox, input.

- **Element** (elemento): una parte de un block que no tiene un significado autónomo y está semánticamente ligado a su block.
    - ejemplos: menu item, list item, checkbox caption, header title.

- **Modifier** (modificador): una bandera en un block o element. Se usan para cambiar la apariencia, el estado o el comportamiento.
    - ejemplos: disabled, highlighted, checked, fixed, size big, color yellow.


## Convención de nombres

Es un echo conocido que la guía de estilo correcta puede aumentar significativamente la velocidad de desarrollo, la depuración y la implementación de nuevas características en el código heredado. Lamentablemente, la mayoría de las bases de códigos CSS a veces se desarrollan 
sin ninguna estructura o convenciones de nomenclatura, esto con el tiempo se hace insostenible.
El enfoque BEM asegura que todos los que participan en el desarrollo de un sitio web trabajen con una sola base de código y hablen el mismo idioma. El uso de un nombre adecuado te preparará para los cambios en el diseño del sitio web.
Para lograr el objetivo principal de BEM utilizamos la siguiente convención de nombres:

El nombre de **BLOCK** suele ser una palabra única como .header, pero si tienes una definición de block más larga entonces se divide con un solo guión -, puede consistir en letras y dígitos:
- Se usa el selector de nombre de clase solamente.
- No hay nombre o identificación de la etiqueta.
- No hay dependencias de otros blocks/elements en una página.
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
- No hay dependencias de otros blocks/elements en una página.
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

/* MAL - ya que esta utilizando el selector 'div'*/
div.person__head{ }
/*MAL - ya que existe dependencia de otro block a menos que se aplique MIX*/
.person .person__head{ }

```


El nombre de **MODIFIER** empieza con dos guiones --, puede consistir en letras y dígitos:
```html
<!-- BIEN - ya que cambia la apariencia del block-->
<div class="person person--small">
    ...
    <span class="person__head person__head--skin-brown"></span>
</div>
<div class="person person--skin-brown person--hair-long">
    ...
</div>

<!-- MAL - ya que debe cambiar la apariencia del block 'person' no reemplazarla-->
<div class="person--small">
    ...
</div>
```
```css
.person--small{ }
/* Para alterar elements basados en un modifier de nivel de block */
.person--small .person__head{ }
/* Modificación de elements */
.person__head--skin-brown{ }
```


Parece todo muy sencillo, no?

pero al tener mas de un block, o blocks dentro de block la cosa se puede enredar un poco... acá dejo un ejemplo de como crear y/o dar estilo a una perona.

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

## Debo crear un block o un element?

Se puede/debe crear un **block** si la sección de código puede ser reutilizada y no depende de la implementación de otros componentes de la página.

Se puede/debe crear un **element** si una sección del código no puede ser utilizada por separado sin su entidad matriz (el block). Cabe recordar que en la metodología BEM no pueden existir los subelements.


## Que hacer y que No hacer

- No se debería usar la etiqueta CSS o los selectores de ID al usar BEM.
- Un element es un componente opcional del block.
- No todos los blocks tienen elements.

### Block

El nombre del block describe su próposito (¿Qué es?), no su estado (¿Cómo es?). Ejemplo:
```html
<!-- BIEN - el block "error" es semánticamente significativo-->
<div class="error"></div>

<!-- MAL - describe la apariencia -->
<div class="red-text"></div>
````

Un block puede tener una estructura anidada de elements en el árbol DOM, Sin embargo, esta estructura de block siempre se representa como una lista plana de elements en la metodología BEM. Ejemplos:
```html
<!-- estructura anidada de elements -->
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
/* estructura anidada de elements */
.block {}
.block__elem1 {}
.block__elem2 {}
.block__elem3 {}
.block__elem4 {}
```

- Los block pueden anidarse entre sí.
- Se puede tener cualquier número de niveles de anidación.

 ```html
<!-- ejemplo -->
<header class="header">
    <div class="logo"></div>
    <form class="search-form"></form>
</header>
 ```


### Element

El nombre del element describe su propósito ("¿Qué es esto?" - element, texto, etc.), no su estado ("¿Qué tipo, o qué aspecto tiene?" - rojo, grande, etc.).

Un **ELEMENT** siempre es parte de un **BLOCK**, no de otro element. Esto significa que los nombres de los elements no pueden definir una jerarquía como block__element1__element2, ejemplo:

```html
<!-- BIEN - solo existen elements de block y no element de elements-->
<div class="search-form">
    <div class="search-form__content">
        <input class="search-form__input">
        <button class="search-form__button"></button>
    </div>
</div>

<!-- MAL - ya que existen elements de elements -->
<div class="search-form">
    <div class="search-form__content">
        <input class="search-form__content__input">
        <button class="search-form__content__button"></button>
    </div>
</div>
```

¿Por qué no se puede crear un element de otro element?

Al crear elements de elements dificulta la capacidad de cambiar la estructura interna del block. Los elements no pueden ser intercambiados, eliminados o añadidos sin modificar el código existente.


### Modifier

El nombre del modifier describe su apariencia (¿Que tamaño?, ¿Que tema?), su estado (¿En que se diferencia de los demas?; desactivado, enfocado, etc.) y su comportamiento (¿Como se comporta?, ¿Como responde al usuario?).

Existen diversos tipos de modifiers:
#### Boolean

Se utilizan cuándo la presencia o ausencia de un modifier es importante, y su valor es irrevelante. Ejemplo: si un modifier booleano esta presente, su valor sería verdadero.

```html
<!-- Se 'da' foco al block search-form-->
<form class="search-form search-form--focused">
    <input class="search-form__input">

    <!-- El element button esta deshabilitado -->
    <button class="search-form__button search-form__button--disabled">Buscar</button>
</form>
```

#### Key-value

Se utilizan cuando el valor del modifier es importante. Ejemplo: un menú con el tema 'orange'.
```html
<!-- El block form tiene el modifier 'theme-orange'-->
<form class="form search-form--theme-orange">
    <input class="search-form__input">

    <!-- El element button tiene el modifier 'size-m'-->
    <button class="search-form__button search-form__button--size-m">Search</button>
</form>
````

- No se pueden usar dos modifieres idénticos con diferentes valores simultáneamente.
```html
<!-- MAL - ya que utilizan el modifier 'size-s' y 'size-m' al mismo tiempo-->
<button class="search-form__button
                search-form__button--size-s
                search-form__button--size-m">
    Search
</button>
```

Bajo la metodología BEM un modifier nunca puede ser utilizado solo, un modifier debe cambiar la apariencia, el comportamiento o el estado del block/element no reemplazarla.

```html
<!-- BIEN - ya que el modifier esta cambiando la apariencia del block 'search-form'-->
<form class="search-form search-form--theme-islands">
    <input class="search-form__input">
    <button class="search-form__button">Search</button>
</form>

<!-- MAL - ya que modifier estaría reemplazando la apariencia del block 'search-form' -->
<form class="search-form--theme-islands">
    <input class="search-form__input">
    <button class="search-form__button">Search</button>
</form>
```

¿Por qué incluir el nombre del block en los nombres de los modifiers y/o elements?

Esto proporciona un espacio de nombres, así ayuda a reducir el impacto de los elements y modifiers de un block en la implementación de otro. También hace mas fácil la búsqueda de código ya que se utilizan nombres únicos. 

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
En este ejemplo, la geometría externa y la posición del block de botones se establecen a través del element header_button. El block de botones no especifica ningún margen, por lo que puede ser fácilmente reutilizado en cualquier lugar.




Links de interés: [Documentation BEM](http://getbem.com/introduction/), [Introduction BEM](https://www.toptal.com/css/introduction-to-bem-methodology), [quick start](https://en.bem.info/methodology/quick-start/), [preguntas](https://en.bem.info/methodology/faq/#why-bem). []()
