# BEM methodology.

When using a methodology for our development, we focus on reducing the CSS footprint, on organizing the cooperation among programmers and on maintaining big CSS code logics. When utilizing BEM, it can be noticed that it is a less confusing methodology than others, but it still provides a great architecture with a recognizable terminology.
One of the purposes of BEM is to make the names of CSS selectors be as informative and transparent as possible. This is accomplished by dividing and visualizing our components in Block, Element and Modifier.

- **Block**: standalone entity that is meaningful on its own.
    - examples: header, container, menu, checkbox, input.

- **Element**: a part of a block that has no standalone meaning and is semantically tied to its block.
    - examples: menu item, list item, checkbox caption, header title.

- **Modifier**: a flag on a block or element. Used to change appearance or behavior.
    - examples: disabled, highlighted, checked, fixed, size big, color yellow.

## Naming Conventions

It is a well-known fact that the correct style-guide can significantly increase the development’s speed, depuration and implementation of new characteristics in the inherited code. Unfortunately, the majority of CSS codebases are sometimes developed without any structure or naming convention, which eventually becomes untenable. The BEM methodology warrantees that everyone who participates in the development of a webpage will work with only one codebase and speak the same language. The use of an adequate name will prepare you for the changes in the webpage design. To achieve the main BEM objective, we use the following naming convention:
Block name is usually a single word like .header, but if you have longer block definition then it is divided with a single hyphen -, it can consist of letters and digits:
- Only the class name selector is used
- There is no name or identification of the tag. 
- There are no dependencies on other blocks/elements in a page.
```html
<div class="person">...</div>
<div class="per-son">...</div>
```
```css
.person{ }
.per-son{ }
```

**ELEMENT** name starts with double underscore __, it can consist of letters and digits:

- Only the class name selector is used.
- There is no name or identification of the tag.
- There are no dependencies on other blocks/elements in a page.
```html
<div class="person">
	...
	<span class="person__head"></span>
</div>
```
```css
/* CORRECT  */
.person__head{ }
.per-son__head{ }

/* INCORRECT – as it is using the selector 'div'*/
div.person__head{ }
/*INCORRECT – as there is dependency from another block, unless you apply MIX*/
.person .person__head{ }

```

**Modifier** name starts with a double hyphen --, it can consist of letters and digits:
```html
<!-- CORRECT – as it changes the appearance of the block-->
<div class="person person--small">
    ...
    <span class="person__head person__head--skin-brown"></span>
</div>
<div class="person person--skin-brown person--hair-long">
    ...
</div>

<!-- INCORRECT – as it must change the appearance of the block 'person' instead of replacing it -->
<div class="person--small">
    ...
</div>
```
```css
.person--small{ }
/* To alter elements based on a modifier from level of block */
.person--small .person__head{ }
/* Modification of elements */
.person__head--skin-brown{ }
```


It seems very simple, doesn’t it?

But when having more than one block or blocks inside block, it can be quite confusing… the following is an example of how to create and/or give style to a person.


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
/*example with SASS*/
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

## Should I create a block or an element?

A block must/should be created if a section of code might be reused and it does not depend on other page components being implemented.
An element must/should be created if a section of code cannot be used separately without the parent entity (the block). It must be remembered that in BEM methodology sub elements cannot exist.

## The Do’s and Don’ts

- You shouldn't use CSS tag or ID selectors when using BEM.
- An element is an optional block component.
- Not all blocks have elements.

### Block

The block name describes its purpose (What is it?), not its state (What does it look like?).
Example:

```html
<!-- Correct. The `error` block is semantically meaningful -->
<div class="error"></div>
<!-- Incorrect. It describes the appearance -->
<div class="red-text"></div>
```

A block can have a nested structure of elements in the DOM tree. However, this block structure is always represented as a flat list of elements in the BEM methodology. Examples:
```html
<!-- nested structure of elements -->
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
/* nested structure of elements */
.block {}
.block__elem1 {}
.block__elem2 {}
.block__elem3 {}
.block__elem4 {}
```

- Blocks can be nested in each other.
- You can have any number of nesting levels.

 ```html
<!-- example -->
<header class="header">
   <div class="logo"></div>
   <form class="search-form"></form>
</header>
 ```


### Element

The element name describes its purpose ("What is this?" — item, text, etc.), not its state ("What type, or what does it look like?" — red, big, etc.).
An **ELEMENT** is always part of a **BLOCK**, not another element. This means that element names can't define a hierarchy such as block__element1__element2.

```html
<!-- CORRECT – there are only elements from block and not elements from elements -->
<div class="search-form">
    <div class="search-form__content">
        <input class="search-form__input">
        <button class="search-form__button"></button>
    </div>
</div>

<!-- INCORRECT – as there are elements from elements -->
<div class="search-form">
    <div class="search-form__content">
        <input class="search-form__content__input">
        <button class="search-form__content__button"></button>
    </div>
</div>
```

Why can’t an element be created from another element?

Creating elements from elements hinders the capacity to change the internal block structure. Elements cannot be exchanged, deleted or added without modifying the existing code.

### Modifier

The modifier name describes its appearance (What size? Which theme?), its state (How is it different from the others? - disabled, focused, etc.) and its behavior (How does it behave? How does it respond to the user?).
There are two types of modifiers:

#### Boolean

Used when only the presence or absence of the modifier is important, and its value is irrelevant. For example, if a Boolean modifier is present, its value is assumed to be true.

```html
<!-- The focus is 'given' on the block search-form-->
<form class="search-form search-form--focused">
    <input class="search-form__input">

    <!-- The button element has been disabled -->
    <button class="search-form__button search-form__button--disabled">Search</button>
</form>
```

#### Key-value

Used when the modifier value is important. Example: a menu with 'orange' theme.

```html
<!-- The block form has the modifier 'theme-orange'-->
<form class="form search-form--theme-orange">
    <input class="search-form__input">

    <!-- The element button has the modifier 'size-m'-->
    <button class="search-form__button search-form__button--size-m">Search</button>
</form>
```

- Two identical modifiers with different values cannot be used at the same time.
```html
<!-- INCORRECT – as the modifier 'size-s' and 'size-m' are used at the same time -->
<button class="search-form__button
                search-form__button--size-s
                search-form__button--size-m">
    Search
</button>
```

From the BEM perspective, a modifier can't be used in isolation from the modified block or element. A modifier should change the appearance, behavior, or state of the entity, not replace it.

```html
<!-- CORRECT – as the modifier is changing the appearance of the block 'search-form'-->
<form class="search-form search-form--theme-islands">
    <input class="search-form__input">
    <button class="search-form__button">Search</button>
</form>

<!-- INCORRECT – as the modifier would be replacing the appearance of the block 'search-form' -->
<form class="search-form--theme-islands">
    <input class="search-form__input">
    <button class="search-form__button">Search</button>
</form>
```

Why include the block name in modifier and element names?

This provides a namespace, which helps to reduce the impact of elements and modifiers of one block on the implementation of another.
In addition, this makes searching in the code easier, as unique names are utilized.

```html
<!--Examples-->
<div class="button button--size-m">...</div>
<div class="select select--size-m">...</div>
<div class="button dropdown button--size-m">...</div>
```

## MIX

What is MIX?

It is a technique for using different BEM entities on a single DOM node. Mixes allow to combine the behavior and styles of multiple entities without duplicating code and at the same time, they allow to create semantically new components based on existing ones.

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

In this example, the external geometry and the position of the button block are established though the element header_button. The button block does not specify any margin, which is why it can be easily reused anywhere.




Links of interest: [Documentation BEM](http://getbem.com/introduction/), [Introduction BEM](https://www.toptal.com/css/introduction-to-bem-methodology), [Quick start](https://en.bem.info/methodology/quick-start/), [Questions](https://en.bem.info/methodology/faq/#why-bem).
