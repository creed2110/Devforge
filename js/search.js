/*
===========================================
DEBUGFORGE SEARCH ENGINE

Purpose:
- Search error database
- Decode errors
- Render error cards
- Connect UI to ERROR_DATABASE

Requires:
errors.js

===========================================
*/


/*
===========================================
CREATE ERROR CARD

Converts an error object into HTML.
===========================================
*/

function createErrorCard(error) {

    return `
    
    <div class="error-card">

        <h3>${error.title}</h3>

        <p>
            <strong>Category:</strong>
            ${error.category}
        </p>

        <br>

        <p>
            <strong>Meaning:</strong>
            ${error.meaning}
        </p>

        <br>

        <p>
            <strong>Common Causes:</strong>
        </p>

        <ul>
            ${error.causes
                .map(cause => `<li>${cause}</li>`)
                .join("")}
        </ul>

        <br>

        <p>
            <strong>Solutions:</strong>
        </p>

        <ul>
            ${error.solutions
                .map(solution => `<li>${solution}</li>`)
                .join("")}
        </ul>

        <br>

        <button
            class="save-error-btn"
            data-error-id="${error.id}"
        >
            Save Solution
        </button>

    </div>

    `;
}



/*
===========================================
RENDER ERROR LIBRARY

Displays all errors.
===========================================
*/

function renderErrorLibrary(errors) {

    const container =
        document.getElementById(
            "errorList"
        );

    if (!container) return;

    if (errors.length === 0) {

        container.innerHTML = `
        
        <div class="error-card">

            <h3>No Results Found</h3>

            <p>
                Try another search term.
            </p>

        </div>
        
        `;

        return;
    }

    container.innerHTML =
        errors
            .map(createErrorCard)
            .join("");

}



/*
===========================================
SEARCH LIBRARY

Triggered when user types.
===========================================
*/

function handleLibrarySearch() {

    const input =
        document.getElementById(
            "librarySearch"
        );

    if (!input) return;

    input.addEventListener(
        "input",
        () => {

            const searchText =
                input.value.trim();

            if (!searchText) {

                renderErrorLibrary(
                    getAllErrors()
                );

                return;
            }

            const results =
                filterErrors(
                    searchText
                );

            renderErrorLibrary(
                results
            );

        }
    );

}



/*
===========================================
DECODE ERROR

User pastes error message.

Example:

"Cannot read properties of null"

Find best match.
===========================================
*/

function decodeError() {

    const input =
        document.getElementById(
            "errorInput"
        );

    const resultBox =
        document.getElementById(
            "decoderResult"
        );

    if (!input || !resultBox) return;

    const text =
        input.value.trim();

    if (!text) {

        resultBox.innerHTML = `
        
        <h3>No Error Entered</h3>

        <p>
            Paste an error message first.
        </p>
        
        `;

        return;
    }

    const match =
        findError(text);

    if (!match) {

        resultBox.innerHTML = `
        
        <h3>Error Not Found</h3>

        <p>
            DebugForge doesn't know this error yet.
        </p>
        
        `;

        return;
    }

    resultBox.innerHTML =
        createErrorCard(match);
}



/*
===========================================
SETUP DECODER BUTTON
===========================================
*/

function setupDecoderButton() {

    const button =
        document.getElementById(
            "decodeBtn"
        );

    if (!button) return;

    button.addEventListener(
        "click",
        decodeError
    );

}



/*
===========================================
SAVE SEARCH HISTORY

Stores recent searches.

Future dashboard stats
can use this.
===========================================
*/

function saveSearch(searchTerm) {

    let searches =
        JSON.parse(
            localStorage.getItem(
                "recentSearches"
            )
        ) || [];

    searches.unshift(
        searchTerm
    );

    searches =
        searches.slice(0, 10);

    localStorage.setItem(
        "recentSearches",
        JSON.stringify(searches)
    );

}



/*
===========================================
SMART DECODER

Matches partial text.

Example:

Input:
"null"

Finds:
Cannot read properties of null
===========================================
*/

function smartFindError(text) {

    const search =
        text.toLowerCase();

    return ERROR_DATABASE.find(
        error =>

            error.title
                .toLowerCase()
                .includes(search)

            ||

            error.meaning
                .toLowerCase()
                .includes(search)
    );

}



/*
===========================================
UPGRADE DECODER

Replace normal decoder
with smarter search.
===========================================
*/

function advancedDecodeError() {

    const input =
        document.getElementById(
            "errorInput"
        );

    const resultBox =
        document.getElementById(
            "decoderResult"
        );

    if (!input || !resultBox) return;

    const text =
        input.value.trim();

    if (!text) return;

    saveSearch(text);

    const match =
        smartFindError(text);

    if (!match) {

        resultBox.innerHTML = `
        
        <div class="error-card">

            <h3>No Match Found</h3>

            <p>
                This error is not currently
                in the DebugForge database.
            </p>

        </div>
        
        `;

        return;
    }

    resultBox.innerHTML =
        createErrorCard(match);
}



/*
===========================================
OVERRIDE BUTTON TO USE
ADVANCED DECODER
===========================================
*/

function setupAdvancedDecoder() {

    const button =
        document.getElementById(
            "decodeBtn"
        );

    if (!button) return;

    button.addEventListener(
        "click",
        advancedDecodeError
    );

}



/*
===========================================
INITIALIZE SEARCH SYSTEM
===========================================
*/

function initializeSearch() {

    renderErrorLibrary(
        getAllErrors()
    );

    handleLibrarySearch();

    setupAdvancedDecoder();

}



/*
===========================================
START SEARCH ENGINE
===========================================
*/

document.addEventListener(
    "DOMContentLoaded",
    initializeSearch
);
