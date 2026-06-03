/*
===========================================
DEBUGFORGE ROUTER

Purpose:
- Handle SPA navigation
- Show selected page
- Hide other pages
- Update active sidebar item
- Update page title
- Support URL hash routes

Example:

#dashboard
#decoder
#library

===========================================
*/


/*
===========================================
PAGE CONFIGURATION

Maps route names to titles.
===========================================
*/

const ROUTES = {

    dashboard: "Dashboard",

    decoder: "Error Decoder",

    library: "Error Library",

    checklist: "Debug Checklist",

    saved: "Saved Solutions",

    settings: "Settings"

};



/*
===========================================
SHOW PAGE

1. Hide all pages
2. Show selected page
3. Update sidebar state
4. Update page title
===========================================
*/

function navigate(routeName) {

    /*
    ---------------------------------------
    Prevent invalid routes
    ---------------------------------------
    */

    if (!ROUTES[routeName]) {
        routeName = "dashboard";
    }


    /*
    ---------------------------------------
    Hide every page
    ---------------------------------------
    */

    document
        .querySelectorAll(".page")
        .forEach(page => {

            page.classList.remove(
                "active-page"
            );

        });


    /*
    ---------------------------------------
    Show target page
    ---------------------------------------
    */

    const targetPage =
        document.getElementById(routeName);

    if (targetPage) {

        targetPage.classList.add(
            "active-page"
        );

    }


    /*
    ---------------------------------------
    Update sidebar links
    ---------------------------------------
    */

    document
        .querySelectorAll(".nav-link")
        .forEach(link => {

            link.classList.remove(
                "active"
            );

        });


    const activeLink =
        document.querySelector(
            `[data-route="${routeName}"]`
        );

    if (activeLink) {

        activeLink.classList.add(
            "active"
        );

    }


    /*
    ---------------------------------------
    Update page title
    ---------------------------------------
    */

    const pageTitle =
        document.getElementById(
            "pageTitle"
        );

    if (pageTitle) {

        pageTitle.textContent =
            ROUTES[routeName];

    }


    /*
    ---------------------------------------
    Update browser URL hash

    Example:

    index.html#decoder
    ---------------------------------------
    */

    window.location.hash =
        routeName;

}



/*
===========================================
HASH ROUTING

Allows user to visit:

#dashboard

#decoder

#library

directly.
===========================================
*/

function handleHashRoute() {

    const hash =
        window.location.hash
        .replace("#", "");

    if (hash) {

        navigate(hash);

    } else {

        navigate("dashboard");

    }

}



/*
===========================================
SIDEBAR NAVIGATION

Adds click listeners
to sidebar items.
===========================================
*/

function setupSidebarNavigation() {

    const links =
        document.querySelectorAll(
            ".nav-link"
        );

    links.forEach(link => {

        link.addEventListener(
            "click",
            () => {

                const route =
                    link.dataset.route;

                navigate(route);

            }
        );

    });

}



/*
===========================================
QUICK ACTION BUTTONS

Dashboard buttons can
navigate too.
===========================================
*/

function setupQuickActions() {

    const buttons =
        document.querySelectorAll(
            ".action-btn"
        );

    buttons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const route =
                    button.dataset.route;

                navigate(route);

            }
        );

    });

}



/*
===========================================
BROWSER BACK/FORWARD

When user changes hash:

#dashboard
→ #library

This keeps UI synced.
===========================================
*/

window.addEventListener(
    "hashchange",
    handleHashRoute
);



/*
===========================================
INITIALIZE ROUTER
===========================================
*/

function initializeRouter() {

    setupSidebarNavigation();

    setupQuickActions();

    handleHashRoute();

}



/*
===========================================
AUTO START

Wait until DOM is loaded.
===========================================
*/

document.addEventListener(
    "DOMContentLoaded",
    initializeRouter
);
