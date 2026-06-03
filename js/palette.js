/*
===========================================
DEBUGFORGE COMMAND PALETTE

Purpose:
- Open with Ctrl + K
- Quick navigation
- Command search
- Keyboard shortcuts

===========================================
*/


/*
===========================================
COMMAND LIST

Each command points to a route.
===========================================
*/

const COMMANDS = [

    {
        name: "Go to Dashboard",
        route: "dashboard"
    },

    {
        name: "Open Error Decoder",
        route: "decoder"
    },

    {
        name: "Browse Error Library",
        route: "library"
    },

    {
        name: "Open Debug Checklist",
        route: "checklist"
    },

    {
        name: "View Saved Solutions",
        route: "saved"
    },

    {
        name: "Open Settings",
        route: "settings"
    }

];



/*
===========================================
DOM REFERENCES
===========================================
*/

let palette;
let paletteSearch;
let paletteResults;



/*
===========================================
OPEN PALETTE
===========================================
*/

function openPalette() {

    if (!palette) return;

    palette.classList.remove(
        "hidden"
    );

    renderCommands(
        COMMANDS
    );

    setTimeout(() => {

        paletteSearch.focus();

    }, 50);

}



/*
===========================================
CLOSE PALETTE
===========================================
*/

function closePalette() {

    if (!palette) return;

    palette.classList.add(
        "hidden"
    );

    paletteSearch.value = "";

}



/*
===========================================
TOGGLE PALETTE
===========================================
*/

function togglePalette() {

    if (
        palette.classList.contains(
            "hidden"
        )
    ) {

        openPalette();

    }

    else {

        closePalette();

    }

}



/*
===========================================
RENDER COMMANDS
===========================================
*/

function renderCommands(commands) {

    if (!paletteResults) return;

    if (commands.length === 0) {

        paletteResults.innerHTML = `

        <div class="palette-item">

            No commands found

        </div>

        `;

        return;
    }

    paletteResults.innerHTML =

        commands.map(command => `

            <div
                class="palette-item"
                data-route="${command.route}"
            >

                ${command.name}

            </div>

        `).join("");



    attachCommandListeners();

}



/*
===========================================
ATTACH CLICK EVENTS
===========================================
*/

function attachCommandListeners() {

    const items =
        document.querySelectorAll(
            ".palette-item"
        );

    items.forEach(item => {

        item.addEventListener(
            "click",
            () => {

                const route =
                    item.dataset.route;

                if (route) {

                    navigate(route);

                }

                closePalette();

            }
        );

    });

}



/*
===========================================
FILTER COMMANDS
===========================================
*/

function filterCommands(searchText) {

    return COMMANDS.filter(command =>

        command.name
        .toLowerCase()
        .includes(
            searchText.toLowerCase()
        )

    );

}



/*
===========================================
SEARCH HANDLER
===========================================
*/

function setupPaletteSearch() {

    if (!paletteSearch) return;

    paletteSearch.addEventListener(
        "input",
        () => {

            const searchText =
                paletteSearch.value
                .trim();

            if (!searchText) {

                renderCommands(
                    COMMANDS
                );

                return;
            }

            renderCommands(

                filterCommands(
                    searchText
                )

            );

        }
    );

}



/*
===========================================
KEYBOARD SHORTCUTS

Ctrl + K → Open palette

Escape → Close palette
===========================================
*/

function setupKeyboardShortcuts() {

    document.addEventListener(
        "keydown",
        event => {

            /*
            Ctrl + K
            */

            if (
                event.ctrlKey &&
                event.key.toLowerCase() === "k"
            ) {

                event.preventDefault();

                togglePalette();

            }


            /*
            Escape
            */

            if (
                event.key === "Escape"
            ) {

                closePalette();

            }

        }
    );

}



/*
===========================================
OPEN BUTTON

Header button:
Ctrl + K
===========================================
*/

function setupOpenButton() {

    const button =
        document.getElementById(
            "openPaletteBtn"
        );

    if (!button) return;

    button.addEventListener(
        "click",
        openPalette
    );

}



/*
===========================================
CLICK OUTSIDE TO CLOSE
===========================================
*/

function setupOutsideClick() {

    palette.addEventListener(
        "click",
        event => {

            if (
                event.target === palette
            ) {

                closePalette();

            }

        }
    );

}



/*
===========================================
INITIALIZE
===========================================
*/

function initializePalette() {

    palette =
        document.getElementById(
            "commandPalette"
        );

    paletteSearch =
        document.getElementById(
            "paletteSearch"
        );

    paletteResults =
        document.getElementById(
            "paletteResults"
        );

    if (!palette) return;

    setupKeyboardShortcuts();

    setupPaletteSearch();

    setupOpenButton();

    setupOutsideClick();

    renderCommands(
        COMMANDS
    );

}



/*
===========================================
START
===========================================
*/

document.addEventListener(
    "DOMContentLoaded",
    initializePalette
);
