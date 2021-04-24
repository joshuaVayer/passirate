# Pasirate is password strenght calculator
> Joshua Vayer

Rate the password entered by the user and check the minimum requirements along the user types.

- [Getting started](#getting-started)
    - Requirements
    - Instalation
    - Customize
- [Rating](#rating)
- [Example](#example)

## Getting started

### Requirements
[JQuery](https://jquery.com/) is required here.

CDN :
`<script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>`

### Instalation

 - Once you have JQuery installed link the main.js file to your HTML form.
 - Update your selectors with your customs IDs concidering the features you need. Always prepend your id with # as for JQuery to work.

    ```js
    const passwordId = '#...'; // The password input
    const retypePasswordId = '#...' // The second input where password is reentered
    const buttonId = '#...'; // Your submit button
    const requirementsListId = '#...'; // The div/ul ID where your requirements will be printed.
    const passwordRateId = '#...'; // Your div where the test result (Weak, Strong,...) will be displayed
    ```
- Set up your minimum requirements in the `requirements` object as per the following template :

    ``` js
    name: { // Name should be unique
        test: ...., // Regex like /([A-Z])/
        description: "Output displayed in HTML, printed in #requirementsListId",
        verified: false, // leave false by default
    },
    ```
- Set up your ratings conditions for each characters typed in the `rating` object, considering the following template :

    ```js
    name: { // Name should be unique
        condition: ....., // Regex like /([A-Z])/
        value: 1, // The value character will weight if condition is fulfilled
    },
    ```
- Set up your security levels related to the password's rate in the `points` object. The template is the following : 

    ```js
    name: { // Name should be unique
        score: 5, // Score until this level is true (interger)
        output: "Unsecured", // HTML output for this level
        class: "unsecured" // The class name that you want to display on this level
    },
    ```
    Levels muste be ordered, starting from the lowest.

- By implementing those const you can update your class once second password match or have "no matching" class: 

    ```js
    const retypeSuccessClass = 'sucess' // Class displayed on matching password
    const retypeFailClass = 'fail' // Class displayed until password does not matched first input
    ```
    Consider adding the :focus pseudo class in your CSS file

- Implement the CSS sheet with all the classes you've defined in you main.js file. Every level of strenght using the classes in the `points` object. Don't forget the two classes triggered on the keyup from the second input.


## Rating

Consider the following when defining your levels:

 - The strenght of the password is highly related to his lenght.
 - Using different types of the characters will make your password stronger.
 - The strenght of the password is relative to the current technologie (check up on the lastest recomendations).
 - Prevent your users from using comon passwords like birthdate, immediate relatives names or informations, pet names...

## Example

Cheke the demo [here](#https://joshuavayer.github.io/passirate/)

You can download and run the example directory.

