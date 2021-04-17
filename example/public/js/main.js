//------------------------
// 0 - CONFIGURATION
//------------------------
const rating = {
    lowercase: {
        condition: /([a-z])/,
        id: 1,
        value: 1,
    },
    number: {
        condition: /([0-9])/,
        id: 2,
        value: 1,
    },
    uppercase: {
        condition: /([A-Z])/,
        id: 3,
        value: 2,
    },
    special: {
        condition: /([~,!,@,#,$,%,^,&,*,-,_,+,=,?,>,<])/,
        id: 4,
        value: 3,
    },
};
const requirements = {
    capital: {
        test: /([A-Z])/,
        description: "One uppercase",
        verified: false,
    },
    number: {
        test: /([0-9])/,
        description: "One number",
        verified: false,
    },
    special: {
        test: /([~,!,@,#,$,%,^,&,*,-,_,+,=,?,>,<])/,
        description: "One special character",
        verified: false,
    },
};
const points = {
    unsecured: {
        score: 5,
        output: "&#128545; Unsecured",
        class: "unsecured"
    },
    weak: {
        score: 10,
        output: "&#128543; Weak",
        class: "weak"
    },
    basic: {
        score: 15,
        output: "&#128530; Basic",
        class: "basic"
    },
    strong: {
        score: 20,
        output: "&#128512; Strong",
        class: "strong"
    },
    veryStrong: {
        score: 25,
        output: "&#129296; Very strong",
        class: "strong"
    },
};

// IDs as for selectors (to prepend with #)
const passwordId = '#password';
const retypePasswordId = '#rePassword'
const buttonId = '#submitButton';
const requirementsListId = '#requirementsList';
const passwordRateId = '#passwordRate';

// Classes for visual effects (no prefix)
const retypeSuccessClass = 'match'
const retypeFailClass = 'noMatch'


//------------------------
// 1 - CORE VARIABLES
//------------------------

let passwordRate = 0;
let passwordRateOutput = '';
let passwordRateClass = '';
let testResult = [];


$(function () {
    //------------------------
    // 2 - EVENTS HANDLERS
    //------------------------

    // 2.1 - FIRST PASSWORD INPUT

    $(passwordId).keyup(function (e) {
        let input = $(passwordId).val();
        e.preventDefault()
        // Logical tests
        wordValue(input);
        upRequirements(input);
        updateTestResult();
        
        // Update document
        requirementsInHtml();
        rateOutputInHtml();

        upBackPass()
    });
    $(passwordId).focus(function (p) {
        p.preventDefault();
        requirementsInHtml();
    });
    $(passwordId).focusout(function (p) {
        p.preventDefault();
        $(requirementsListId).empty()
        $(passwordRateId).empty()
        upBack(normal);
    })

    // 2.2 - SECOND PASSWORD INPUT

    $(retypePasswordId).keyup(function () {
        let input = $(retypePasswordId).val();
        let ref = $(passwordId).val();

        if (ref == input && checkRequirements()) {
            $(buttonId).prop('disabled', false);
            $(retypePasswordId).removeClass(retypeFailClass);
            $(retypePasswordId).addClass(retypeSuccessClass);
            upBack(success);// Specific to this example
        } else {
            $(buttonId).prop('disabled', true);
            $(retypePasswordId).removeClass(retypeSuccessClass);
            $(retypePasswordId).addClass(retypeFailClass);
            upBack(danger);// Specific to this example
        }
    })
    $(retypePasswordId).focusout(function (p) {
        p.preventDefault();
        $(retypePasswordId).removeClass(retypeFailClass);
        $(retypePasswordId).removeClass(retypeSuccessClass);
        upBack(normal);
    })

    //-------------------------
    // 3 - GRAPHICAL FUNCTIONS LIBRARY
    //-------------------------

    function requirementsInHtml() {
        $(requirementsListId).empty()
        Object.keys(requirements).forEach(e => {
            $(`<li class='${requirements[e].verified}'>${requirements[e].description}</li>`).appendTo(requirementsListId);
        })
    }

    function rateOutputInHtml() {
        valueToOutput();
        $(passwordRateId).empty();
        $(`<p class=${passwordRateClass}>${passwordRateOutput}</p>`).appendTo(passwordRateId);
    }

    function checkRequirements() {
        if (testResult.includes(false)) {
            $(buttonId).prop('disabled', true);
            return false
        } else {
            return true
        }
    }

    //-------------------------
    //  4 - LOGICAL FUNCTIONS LIBRARY
    //-------------------------

    // 4.1 - REQUIREMENTS VERIFICATIONS

    function upRequirements(word) {
        Object.keys(requirements).forEach(check => {
            requirements[check].verified = false;
            if (word.match(requirements[check].test)) {
                requirements[check].verified = true;
            }
        });
    }
    function updateTestResult() {
        testResult = [];
        Object.keys(requirements).forEach(result => {
            testResult.push(requirements[result].verified);
        })
    }
    

    // 4.2 - WORD VALUE CALCULATION

    function wordValue(word) {
        passwordRate = 0;
        for (let i = 0; i < word.length; i++) {
            Object.keys(rating).forEach(rate => {
                letterValue(word[i], rate);
            });
        }
    }
    function letterValue(letter, test) {
        if (letter.match(rating[test].condition)) {
            passwordRate = passwordRate + rating[test].value;
        }
    }
    function valueToOutput() {
        Object.keys(points).reverse().forEach(point => {
            if (passwordRate < points[point].score) {
                passwordRateOutput = points[point].output;
                passwordRateClass = points[point].class;
            }
        })
    }
    // 5 - FUNCTIONS DEDICATED TO THE FORM EXAMPLE

    const root = document.documentElement;

    const normal = ["#456990","#028090"];
    const success = ["#74D447","#099528"];
    const warning = ["#D49747","#CC6709"];
    const danger = ["#D44747", "#950909"];

    const upBack = (color) => {
        root.style.setProperty("--constrast", color[0])
        root.style.setProperty("--secondary", color[1])  
    }

    const upBackPass = () => {
        if (passwordRateClass == "unsecured"){
            upBack(danger);
        } else if (passwordRateClass == "weak"){
            upBack(warning);
        } else if (passwordRateClass == "strong"){
            upBack(success);
        }  
    }

    $('#password').focus(function (e) {
        e.preventDefault();
        $("#passwordHelp").show();
    });
    $('#password').focusout(function (e) { 
        e.preventDefault();
        $("#passwordHelp").hide();
    });
});