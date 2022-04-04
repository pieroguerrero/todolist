const headerRenders = (function () {

    return {
        hamburguerMenuClicked: function () {

            const divMenuExpanded = document.getElementById("div-menu-expanded");
            divMenuExpanded.classList.toggle("change");
        },
    }
})();

export { headerRenders };