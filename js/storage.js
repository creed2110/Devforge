/*
===========================================
DEBUGFORGE STORAGE SYSTEM

Purpose:
- Save solutions
- Remove solutions
- Load saved solutions
- Update dashboard stats
- Manage LocalStorage

===========================================
*/


/*
===========================================
LOCAL STORAGE KEYS

Keeping keys in one place
makes maintenance easier.
===========================================
*/

const STORAGE_KEYS = {

    savedErrors: "debugforge_saved_errors",

    recentSearches: "recentSearches"

};



/*
===========================================
GET SAVED ERRORS

Returns:
[]

or

[error,error,error]
===========================================
*/

function getSavedErrors() {

    try {

        return JSON.parse(

            localStorage.getItem(
                STORAGE_KEYS.savedErrors
            )

        ) || [];

    }

    catch {

        return [];

    }

}



/*
===========================================
SAVE ENTIRE ARRAY

Used internally.
===========================================
*/

function saveErrorsToStorage(errors) {

    localStorage.setItem(

        STORAGE_KEYS.savedErrors,

        JSON.stringify(errors)

    );

}



/*
===========================================
CHECK IF ERROR IS SAVED

Returns true/false
===========================================
*/

function isErrorSaved(errorId) {

    const savedErrors =
        getSavedErrors();

    return savedErrors.some(
        error => error.id === errorId
    );

}



/*
===========================================
SAVE ERROR

Adds error to LocalStorage
if not already saved.
===========================================
*/

function saveError(errorId) {

    const savedErrors =
        getSavedErrors();

    const errorToSave =
        ERROR_DATABASE.find(
            error => error.id === errorId
        );

    if (!errorToSave) {

        console.warn(
            "Error not found."
        );

        return;
    }

    if (isErrorSaved(errorId)) {

        alert(
            "This solution is already saved."
        );

        return;
    }

    savedErrors.push(
        errorToSave
    );

    saveErrorsToStorage(
        savedErrors
    );

    renderSavedSolutions();

    updateDashboardStats();

}



/*
===========================================
REMOVE ERROR

Deletes from LocalStorage.
===========================================
*/

function removeSavedError(errorId) {

    const updatedErrors =
        getSavedErrors()
        .filter(
            error =>
                error.id !== errorId
        );

    saveErrorsToStorage(
        updatedErrors
    );

    renderSavedSolutions();

    updateDashboardStats();

}



/*
===========================================
CREATE SAVED CARD

Generates HTML.
===========================================
*/

function createSavedCard(error) {

    return `

    <div class="saved-card">

        <h3>${error.title}</h3>

        <p>
            ${error.meaning}
        </p>

        <br>

        <button
            class="delete-saved-btn"
            data-id="${error.id}"
        >
            Remove
        </button>

    </div>

    `;

}



/*
===========================================
RENDER SAVED SOLUTIONS
===========================================
*/

function renderSavedSolutions() {

    const container =
        document.getElementById(
            "savedSolutions"
        );

    if (!container) return;

    const savedErrors =
        getSavedErrors();

    if (savedErrors.length === 0) {

        container.innerHTML = `

        <div class="saved-card">

            <h3>
                No Saved Solutions
            </h3>

            <p>
                Save solutions from the
                Error Library or Decoder.
            </p>

        </div>

        `;

        return;
    }

    container.innerHTML =
        savedErrors
        .map(createSavedCard)
        .join("");

}



/*
===========================================
ATTACH SAVE BUTTONS

Used after rendering
Error Library.
===========================================
*/

function attachSaveButtons() {

    const buttons =
        document.querySelectorAll(
            ".save-error-btn"
        );

    buttons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const errorId =
                    Number(
                        button.dataset.errorId
                    );

                saveError(
                    errorId
                );

            }
        );

    });

}



/*
===========================================
ATTACH DELETE BUTTONS
===========================================
*/

function attachDeleteButtons() {

    const buttons =
        document.querySelectorAll(
            ".delete-saved-btn"
        );

    buttons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const errorId =
                    Number(
                        button.dataset.id
                    );

                removeSavedError(
                    errorId
                );

            }
        );

    });

}



/*
===========================================
DASHBOARD STATS

Updates:

Total Errors
Saved Solutions
Recent Searches
===========================================
*/

function updateDashboardStats() {

    const errorCount =
        document.getElementById(
            "errorCount"
        );

    const savedCount =
        document.getElementById(
            "savedCount"
        );

    const searchCount =
        document.getElementById(
            "searchCount"
        );

    if (errorCount) {

        errorCount.textContent =
            ERROR_DATABASE.length;

    }

    if (savedCount) {

        savedCount.textContent =
            getSavedErrors().length;

    }

    if (searchCount) {

        const searches =
            JSON.parse(
                localStorage.getItem(
                    STORAGE_KEYS.recentSearches
                )
            ) || [];

        searchCount.textContent =
            searches.length;

    }

}



/*
===========================================
CLEAR ALL DATA

Settings page feature.
===========================================
*/

function clearAllData() {

    const confirmed =
        confirm(
            "Delete all saved data?"
        );

    if (!confirmed) return;

    localStorage.removeItem(
        STORAGE_KEYS.savedErrors
    );

    localStorage.removeItem(
        STORAGE_KEYS.recentSearches
    );

    renderSavedSolutions();

    updateDashboardStats();

}



/*
===========================================
SETTINGS BUTTON
===========================================
*/

function setupClearStorageButton() {

    const button =
        document.getElementById(
            "clearStorage"
        );

    if (!button) return;

    button.addEventListener(
        "click",
        clearAllData
    );

}



/*
===========================================
MUTATION OBSERVER

Because error cards are
rendered dynamically,
save buttons need
event listeners after
every render.
===========================================
*/

function watchErrorLibrary() {

    const container =
        document.getElementById(
            "errorList"
        );

    if (!container) return;

    const observer =
        new MutationObserver(
            () => {

                attachSaveButtons();

            }
        );

    observer.observe(
        container,
        {
            childList: true,
            subtree: true
        }
    );

}



/*
===========================================
WATCH SAVED PAGE

Attach remove buttons
after rendering.
===========================================
*/

function watchSavedSolutions() {

    const container =
        document.getElementById(
            "savedSolutions"
        );

    if (!container) return;

    const observer =
        new MutationObserver(
            () => {

                attachDeleteButtons();

            }
        );

    observer.observe(
        container,
        {
            childList: true,
            subtree: true
        }
    );

}



/*
===========================================
INITIALIZE STORAGE
===========================================
*/

function initializeStorage() {

    renderSavedSolutions();

    updateDashboardStats();

    setupClearStorageButton();

    watchErrorLibrary();

    watchSavedSolutions();

}



/*
===========================================
START STORAGE SYSTEM
===========================================
*/

document.addEventListener(
    "DOMContentLoaded",
    initializeStorage
);
