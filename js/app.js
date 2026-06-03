
/*
===========================================
DEBUGFORGE MAIN APP

Purpose:
- Theme Management
- Startup Checks
- Dashboard Enhancements
- App Initialization

This file is the final glue that
connects all DebugForge systems.

===========================================
*/



/*
===========================================
APP CONFIG
===========================================
*/

const APP_CONFIG = {

    themeStorageKey:
        "debugforge_theme",

    version:
        "1.0.0"

};



/*
===========================================
THEME SYSTEM

Supported:

dark
light

===========================================
*/

function applyTheme(theme) {

    const root =
        document.documentElement;

    /*
    ---------------------------------------
    LIGHT THEME
    ---------------------------------------
    */

    if (theme === "light") {

        root.style.setProperty(
            "--bg",
            "#f8fafc"
        );

        root.style.setProperty(
            "--sidebar",
            "#ffffff"
        );

        root.style.setProperty(
            "--card",
            "#e2e8f0"
        );

        root.style.setProperty(
            "--text",
            "#0f172a"
        );

        root.style.setProperty(
            "--muted",
            "#475569"
        );

        root.style.setProperty(
            "--border",
            "#cbd5e1"
        );
    }

    /*
    ---------------------------------------
    DARK THEME
    ---------------------------------------
    */

    else {

        root.style.setProperty(
            "--bg",
            "#0f172a"
        );

        root.style.setProperty(
            "--sidebar",
            "#111827"
        );

        root.style.setProperty(
            "--card",
            "#1e293b"
        );

        root.style.setProperty(
            "--text",
            "#f8fafc"
        );

        root.style.setProperty(
            "--muted",
            "#94a3b8"
        );

        root.style.setProperty(
            "--border",
            "#334155"
        );
    }

    localStorage.setItem(
        APP_CONFIG.themeStorageKey,
        theme
    );

    updateThemeButton(theme);

}



/*
===========================================
LOAD SAVED THEME
===========================================
*/

function loadTheme() {

    const savedTheme =

        localStorage.getItem(
            APP_CONFIG.themeStorageKey
        )

        ||

        "dark";

    applyTheme(
        savedTheme
    );

}



/*
===========================================
TOGGLE THEME
===========================================
*/

function toggleTheme() {

    const currentTheme =

        localStorage.getItem(
            APP_CONFIG.themeStorageKey
        )

        ||

        "dark";

    const nextTheme =

        currentTheme === "dark"

        ? "light"

        : "dark";

    applyTheme(
        nextTheme
    );

}



/*
===========================================
UPDATE BUTTON ICONS
===========================================
*/

function updateThemeButton(theme) {

    const button1 =
        document.getElementById(
            "themeToggle"
        );

    const button2 =
        document.getElementById(
            "themeSwitcher"
        );

    const icon =

        theme === "dark"

        ? "🌙"

        : "☀️";

    if (button1) {

        button1.textContent =
            icon;

    }

    if (button2) {

        button2.textContent =

            theme === "dark"

            ? "Switch To Light Theme"

            : "Switch To Dark Theme";

    }

}



/*
===========================================
THEME BUTTONS
===========================================
*/

function setupThemeButtons() {

    const headerButton =
        document.getElementById(
            "themeToggle"
        );

    const settingsButton =
        document.getElementById(
            "themeSwitcher"
        );

    if (headerButton) {

        headerButton.addEventListener(
            "click",
            toggleTheme
        );

    }

    if (settingsButton) {

        settingsButton.addEventListener(
            "click",
            toggleTheme
        );

    }

}



/*
===========================================
WELCOME MESSAGE

Console message for
developers inspecting app.
===========================================
*/

function showDeveloperMessage() {

    console.log(
        `
===========================================
DEBUGFORGE

Version: ${APP_CONFIG.version}

Understand Errors Faster 🚀

Built with:
HTML
CSS
JavaScript

===========================================
        `
    );

}



/*
===========================================
RECENT SEARCH PREVIEW

Shows latest searches
on dashboard.

Optional enhancement.
===========================================
*/

function renderRecentSearches() {

    const dashboard =
        document.getElementById(
            "dashboard"
        );

    if (!dashboard) return;

    const searches =

        JSON.parse(
            localStorage.getItem(
                "recentSearches"
            )
        )

        || [];

    const existing =
        document.getElementById(
            "recentSearchBox"
        );

    if (existing) {

        existing.remove();

    }

    const container =
        document.createElement(
            "div"
        );

    container.id =
        "recentSearchBox";

    container.className =
        "stat-card";

    container.innerHTML = `

        <h3>
            Recent Searches
        </h3>

        <ul>

            ${
                searches.length

                ?

                searches
                .slice(0,5)
                .map(search =>

                    `<li>${search}</li>`

                )
                .join("")

                :

                "<li>No searches yet</li>"
            }

        </ul>

    `;

    dashboard.appendChild(
        container
    );

}



/*
===========================================
STARTUP HEALTH CHECK

Verifies required systems.
===========================================
*/

function runStartupChecks() {

    if (
        typeof ERROR_DATABASE
        === "undefined"
    ) {

        console.error(
            "ERROR_DATABASE missing."
        );

    }

    if (
        typeof navigate
        === "undefined"
    ) {

        console.error(
            "Router not loaded."
        );

    }

}



/*
===========================================
APP INITIALIZATION
===========================================
*/

function initializeApp() {

    loadTheme();

    setupThemeButtons();

    showDeveloperMessage();

    renderRecentSearches();

    runStartupChecks();

}



/*
===========================================
AUTO START
===========================================
*/

document.addEventListener(
    "DOMContentLoaded",
    initializeApp
);
