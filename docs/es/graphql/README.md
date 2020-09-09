# SCHEMA DE GRAPHQL

## Diseñar el esquema

- esquema de GraphQL: centro de cualquier implementación servidor grpahQl; en esta se escriben
  la funcionalidad disponible para que los clientes se conecten a ella

- Esto es MUY IMPORTANTE ya que se esta escribiendo el contrato entre el cliente y el servidor; como
  el cliente puede acceder a esos datos
- esto esta escrito en SDL - utiliza la metodología first ; metodologia de diseño
- Puede esta ser la parte mas compleja.

## El schema de GraphQL esta definido y diseñado por:

- Los TIPOS y DIRECTIVAS que admite
- Los tipos de operación de raíz que admite:
  - Query: consulta.
  - Mutation: modifica los datos de la BBDD.
  - Subscription: escucha los cambios que se pueden dar en el servidor para obtener las actualizaciones en tiempo real

```ts
type Query{
    miPrimerQuery: <tipo_de_dato>
}
```

- tipo_de_dato = tipo scalar o de objeto

## Dentro del schema GrphQl

- Los tipos de operación raíz definidos en el esquema, van a determinar el lugar en el sistema de tipos donde comienzan esas operaciones; todo lo que entra a la API de graphQL va a pasar por estos tipos de raíz (query, mutation, subscripción).
- Se debe proporcionar una operacion raiz de consulta -minimo- y debe ser un tipo de objeto. dentro del objeto se puede añadir las definiciones, ej las definicones de las consultas.
- Mutation y Subscription son opcionales, pero si se utilizan también deben ser de tipos objetos (type mutation | type subscription).

## Reglas de validación internas del esquema

- Todos los tipos nombres únicos. -formato pascalCase-
- Todas las directivas nombres únicos. -formato pascalCase-
- Tipos y directivas no pueden empezar con dos guiones bajos.

## Conjunto general de convenciones

GraphQL es flexible y no impone reglas o pautas de nomenclaturas específicas.
Aún así es recomendable seguir convenciones, como:

- Campos en camelCase - empiezanEnMinusculaYsiSeAñadenMasPalabrasSeSeparaMedianteMayusculas-.
- Tipos en pascalCase - EmpiezanEnMayusculaYsiSeAñadenMasPalabrasSeSeparaMedianteMayusculas-.
- Enums - Nombre de tipo pascalCase / Valores en ALL_CAPS - NombreDelEnum / VALOR_DEL_ENUM -.

## Diseñar en base a las necesidades del cliente

Se recomienda construir el esquema en función como la API grphQL será utilizada por el front-end.

- No incluir campos o relaciones que el cliente no necesita.
- El esquema sera mejor definido cuando esta diseñado a las necesidades del cliente.

# Scalar Types - tipos escalares

Son datos primitivos que pueden almacenar un solo valor, en conjunto a los tipos de objetos y tipos raiz serán imprescindibles y se definen como la mayoria de las propiedades de las entidades.

- Int: números enteros.
- Float: números con decimales.
- String: cadenas de textos.
- Boolean: verdadero/falso.
- ID: identificador único, de tipo int o string

```ts
//sintaxis de un scalar
nombrePropiedad: tipoDeData;
//ejemplos
edadDeUsuario: Int;
verdaderoOFalso: Boolean;
nombreUsuario: String;
```

También GraphQL nos deja definir nuestros propios scalares personalizados.

## Scalar personalizado

- Se define dentro de schema.graphql.
- Se debe definir como: `scalar MyScalarPersonalizado`.
- Añadir en el resolver de tipos.
- Implementar con el GraphQLScalar Type.
- Definir las propiedades parseValue, serialize y parseLiteral.

# Object Types - tipos de objetos

Son las entidades entidades con las que vamos a modelar y estructurar nuestros servicios, son bastante importantes ya que son objetos personalizados que definen la forma en la que se va a ver la API. Se pueden definir tantos tipos como se deseen para cada parte de la API, cada tipo deben tener campos; se deben pasar campos y saltos que se deseen utilizar, y se define el tipo de datos que tendrán esos campos, pueden utilizando valores de los scalares o referencia a otro tipo de objeto que se halla definido.

```ts
//sintaxis de un object type
type TipoPascalCase{
    propiedadCamelCaseUno: DataTypePascal
    propiedadCamelCaseDos: DataTypePascal
    ...
    propiedadCamelCaseN: DataTypePascal
    //DataTypePascal = tipo de dato que puede ser un scalar ó un object type
}
//ejemplos
//schema.graphql
type Profesor{
    nombre: String
    apellidos: String
    experiencia: Int
}type Asignatura{
    id: ID
    nombre: String
    horasLectivas: Int
    profesor: Profesor
}
```

# Enum Types - tipos de enum

Son similares a los tipos scalares, son utiles en una situación en la que el valor para un campo debe provenir de una lista de opciones/valores prescrita o predefinida, para crear una enum dentro de el schema se debe usar enum en vez de type.

```ts
//SIN valor por defecto
type Profesor{
    nombre: String
    apellidos: String
    experiencia: Int
    curso: Cursos
}enum Cursos{
    GRAPHQL_DE_CERO
    NPM_LIBRERIAS
    COMPODOC
}
//CON valor por defecto
type Profesor{
    nombre: String
    apellidos: String
    experiencia: Int
    curso: Cursos=NPM
}enum Cursos{
    GRAPHQL_DE_CERO
    NPM
    COMPODOC
}
```

# Modificadores de Tipo

## Tipos de modificadores

Sirven para modificar el comportamiento cuando trabajamos asignando el scalar o el objeto, en la propiedad que estamos asignando dentro del tipo objeto o definición que estamos haciendo dentro de las diferentes definiciones de tipo raiz.

- Existen 2 tipos:
  - ! = indica valor obligatorio
  - [] = lista de valores con un elemento o mas

### Valor requerido o obligatorio

- Permite que el valor sea obligatorio.
- El valor no puede ser nulo(null).
- Si el campo no tiene !; no obligatorio = no error.

```ts
type Profesor{
    nombre: String!
}
```

### [] Lista de valores

- Contendrán uno o mas valores.
- Funcionara como las listas o arrays de cualquier lenguaje de programación.

```ts
type Profesor{
    nombre: String!
    cursos: [String]
}
```

### []! - Lista con valor requerido / obligatorio

- Lista no nula pero los valores si pueden ser nulos.
- Valor de la lista si puede ser nulo.

```ts
type Profesor{
    nombre: String!
    cursos: [String]!
}
//ejemplos
const resultado = [null, "1", "hola", null]
const resultado2 = null

resultado => No error en la validación
resultado2 => Error en la validación
```

### [!] - Valores lista requerido / obligatorio

- Lista puede ser nula pero valores no pueden serlo.

```ts
type Profesor{
    nombre: String!
    cursos: [String!]
}
//ejemplos
const resultado = [null, "1", "hola", null]
const resultado2 = null

resultado => Error en la validación
resultado2 => No error en la validación
```

### [!]! - Lista y Valores lista requerido / obligatorio

- La lista y el contenido no puede ser nulo.

```ts
type Profesor{
    nombre: String!
    cursos: [String!]!
}
//ejemplos
const resultado = [null, "1", "hola", null]
const resultado2 = null
const resultado3 = ["hola", "name"]
const resultado3 = "bla"

resultado => Error en la validación
resultado2 => Error en la validación
resultado3 => No error en la validación
resultado4 => No error en la validación
```

# Interfaces

Son definiciones abstractas de atributos comunes para 'obligar' a cumplir estructuras. Son útiles para devolver objetos de diferentes tipos que cumplen la misma interfaz.
Es una estructura que impone ciertas propiedades en la clase u objeto que implementa la interfaz correspondiente.
Las interfaces son necesarias cuando se busca acceder a cierto grupo de objetos que deben cumplir con las propiedades definidas. También podemos abstraer grupos de tipos y razonar sobre ellos como una entidad.

```ts
//ejemplo de una interface
interface Perfil {
  nombre: String!
  email: String!
  edad: Int!
}

type Alumno implements Perfil{
    nombre: String!
    email: String!
    edad: Int!
    curso: String
}
```

# Root Types - tipos de raiz

Son puntos de entrada predefinidos donde vamos a definir las operaciones que se van a realizar en nuestra API, existe tres:

- Query: obtiene los datos de una consulta. -Este siempre sera requerido como minimo-.
- Mutation: altera la informacion; añadiendo, modificando o borrando los datos.
- Subscription: escuchara los cambios que se puedan dar en tiempo real.

Donde el cliente se conectara con el servidor a traves de esos puntos de entrada y los personalizara segun sus necesidades.

```ts
//ejemplos
type Query{
    lista[string]
}
type Mutation{
    insertar(elemento: Int): [Int]
}
type Subscription{
    infoInsertada: [Int]
}
```

En el ejemplo anterior se puede apreciar que ningún tipo de raiz tiene un modificador de tipo obligatorio (!), por lo que no será problema enviar null.
Siempre es obligatorio añadir como minimo el type Query.
Siempre al añadir un tipo de raiz debe llevar una definición (= a modificador de tipo lista).

## Query

Es un tipo de consulta de GraphQL para solicitar/recuperar datos; este tipo de consulta es tan simple como una solicitud enviada desde una app a un servidor graphQL, esta escrita en lenguaje SDL (Schema Definition Language).

# IMPORTAR IMAGEN

```ts
type Query{
    listaDeElementos: [String]
    elemento(id: ID!): String
}
```

En el ejemplo anterior se puede apreciar que se definen y utilizan:

- Tipo de raiz.
- Deficiones (con y sin parametros).
- Tipo de dato que devuelve (Scalar y Objeto).

## Mutation

Es una operación que se envía al servidor, la cual puede crear, actualizar o eliminar datos; es similar a una función ya que resivira parametros, realizara un cambio y devolverá una respuesta. Con el tipo de raiz mutation será la única forma de modificar datos en GraphQL.

# IMPORTAR IMAGEN

```ts
type Mutation{
    insertarElemento(nombre: String): String
    borrarElemento(id: ID!): [String]
    borrarTodo: [String]
}
```

En el ejemplo anterior se puede apreciar que se definen y utilizan:

- Tipo de raiz: tipo de operación.
- Deficiones (con y sin parametros).
- Tipo de dato que devuelve (Scalar y Objeto).

## Subscription

Es o son puntos de entradas para obtener información en tiempo real, estas operaciones se realizaran agregando un manejador que notifica a quien se haya suscripto a nuestro servidor mediante web sockets. En resumen podemos decir que es una suscripción a cambios que van a ocurrir en el servidor par aobtener información en tiempo real.

# IMPORTAR IMAGEN

```ts
type Subscription{
   nuevoElemento: String
}
```

En el ejemplo anterior se puede apreciar que se definen y utilizan:

- Tipo de raiz: tipo de operación.
- Deficiones (con y sin parametros).
- Tipo de dato que devuelve (Scalar y Objeto).

# Input Type - tipos de entrada

Son aquellos que nos permiten pasar valores a las consultas y/o mutaciones (querys y/mutations), se pueden pasar desde valores simples como escalares, objetos o ya valores mas complejos. Son los argumentos a cualquier comportamiento dinamico que queramos realizar.

# AÑADIR IMAGEN

```ts
input TagInput{         //INPUT TYPE
    label: String!
    description: String
}
type Tag{               //OBJECT TYPE
    id: ID!
    label: String!
    description: String
}
mutation {              //ROOT TYPE:MUTATION
    nuevoTag(tag: TagInput!): Tag
}
```

# DOCUMENTACION Y/O COMENTARIOS

Al crear una API en GraphQL se pueden añadir comentarios en el schema, esto facilitara el trabajo de los que consumiran la API. GraphQL permite markdown dentro del schema para realizar comentarios (facilita la generación de SDL), existen dos tipos:

- Una línea:

```ts
"Description for the type";
```

- Mas de una línea:

```ts
"""Description for the field
Supports... [API](http://bla.com)
"""
```

Ejemplo:

```ts
"""
Definiciones que muta nombres de personajes
"""
type Mutation{
    "Acción que añade nombre de un personaje"
    addName(
        "Identificador del personaje que se añadira un nombre"
        character: ID!): ResultOperation!
}
```
