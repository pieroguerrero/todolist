const headerRenders = (function () {

    return {
        hamburguerMenuClicked: function () {

            const divMenuExpanded = document.querySelector(".div-menu-expanded");
            divMenuExpanded.classList.toggle("change");
        },
    }
})();

export { headerRenders };