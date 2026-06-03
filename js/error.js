/*
===========================================
DEBUGFORGE ERROR DATABASE

This file contains common developer errors.

Each error object includes:
- title
- meaning
- causes
- solutions

Other files will import/use this data.
===========================================
*/

const ERROR_DATABASE = [

    {
        id: 1,

        title: "Cannot read properties of null",

        category: "JavaScript",

        meaning:
            "JavaScript is trying to access a property or method on a null value.",

        causes: [
            "querySelector() returned null",
            "Element does not exist",
            "Wrong ID or class name",
            "Script executed before DOM loaded"
        ],

        solutions: [
            "Check element selector",
            "Verify element exists",
            "Use DOMContentLoaded",
            "Use null checks before accessing properties"
        ]
    },

    {
        id: 2,

        title: "Cannot read properties of undefined",

        category: "JavaScript",

        meaning:
            "A variable or object is undefined before being used.",

        causes: [
            "Variable not initialized",
            "Function returned undefined",
            "Wrong object property"
        ],

        solutions: [
            "Check variable values",
            "Use console.log()",
            "Validate object structure"
        ]
    },

    {
        id: 3,

        title: "ReferenceError",

        category: "JavaScript",

        meaning:
            "JavaScript cannot find a variable or function.",

        causes: [
            "Misspelled variable",
            "Variable not declared",
            "Wrong scope"
        ],

        solutions: [
            "Check spelling",
            "Declare variable before use",
            "Verify scope"
        ]
    },

    {
        id: 4,

        title: "SyntaxError",

        category: "JavaScript",

        meaning:
            "JavaScript encountered invalid syntax.",

        causes: [
            "Missing bracket",
            "Missing parenthesis",
            "Missing comma",
            "Unexpected character"
        ],

        solutions: [
            "Check console line number",
            "Review brackets",
            "Format code properly"
        ]
    },

    {
        id: 5,

        title: "Unexpected token",

        category: "JavaScript",

        meaning:
            "JavaScript found a character where it wasn't expected.",

        causes: [
            "Missing bracket",
            "Wrong punctuation",
            "Typing mistake"
        ],

        solutions: [
            "Check nearby code",
            "Review syntax",
            "Use formatter"
        ]
    },

    {
        id: 6,

        title: "404 Not Found",

        category: "Network",

        meaning:
            "Requested file or resource cannot be found.",

        causes: [
            "Wrong URL",
            "Incorrect file path",
            "Deleted file"
        ],

        solutions: [
            "Verify path",
            "Check spelling",
            "Confirm file exists"
        ]
    },

    {
        id: 7,

        title: "500 Internal Server Error",

        category: "Backend",

        meaning:
            "Server encountered an unexpected problem.",

        causes: [
            "Application crash",
            "Database failure",
            "Server code bug"
        ],

        solutions: [
            "Check server logs",
            "Debug backend code",
            "Verify database connection"
        ]
    },

    {
        id: 8,

        title: "CORS Error",

        category: "API",

        meaning:
            "Browser blocked a request due to cross-origin restrictions.",

        causes: [
            "Missing CORS headers",
            "Different domain",
            "API restrictions"
        ],

        solutions: [
            "Enable CORS on server",
            "Use proxy",
            "Check API configuration"
        ]
    },

    {
        id: 9,

        title: "Module Not Found",

        category: "Node.js",

        meaning:
            "A required package or file cannot be found.",

        causes: [
            "Package not installed",
            "Wrong import path",
            "Typo in filename"
        ],

        solutions: [
            "Run npm install",
            "Check file paths",
            "Verify imports"
        ]
    },

    {
        id: 10,

        title: "Failed to Fetch",

        category: "API",

        meaning:
            "A fetch request could not complete.",

        causes: [
            "Network issue",
            "Wrong endpoint",
            "Server unavailable"
        ],

        solutions: [
            "Check internet connection",
            "Verify API URL",
            "Inspect network tab"
        ]
    }

];


/*
===========================================
UTILITY FUNCTIONS

These functions help the rest
of the application work with
the error database.
===========================================
*/

const ERROR_DATABASE = [ ... ];

// 👇 ADD THIS LINE
window.ERROR_DATABASE = ERROR_DATABASE;
function getAllErrors() {
    return ERROR_DATABASE;
}


function findError(searchText) {

    return ERROR_DATABASE.find(error =>
        error.title
        .toLowerCase()
        .includes(searchText.toLowerCase())
    );

}


function filterErrors(searchText) {

    return ERROR_DATABASE.filter(error =>
        error.title
        .toLowerCase()
        .includes(searchText.toLowerCase())
    );

}
function getAllErrors() {
    return ERROR_DATABASE;
}

window.getAllErrors = getAllErrors;

/*
===========================================
DEBUGGING HELP

You can test in console:

console.log(getAllErrors())

console.log(
    findError("cors")
)

===========================================
*/
window.getAllErrors = getAllErrors;
window.findError = findError;
window.filterErrors = filterErrors;
