const popUpEditTask = (function () {

    const divPopUpEditTask = document.getElementById("div-popup-edit-task");


    const onClickToggle = function (event) {


    };

    const loadTabs = function () {

        let tabsContainer = divPopUpEditTask.querySelector("#ul-popup-edit-task-tabs");
        let tabTogglers = tabsContainer.querySelectorAll("a");

        tabTogglers.forEach((toggler) => toggler.addEventListener("click", function (e) {

            e.preventDefault();

            let tabName = this.getAttribute("href");
            let tabContents = document.querySelector("#div-popup-edi-task-contents");

            for (let i = 0; i < tabContents.children.length; i++) {

                tabTogglers[i].parentElement.classList.remove("border-t", "border-r", "border-l", "-mb-px", "bg-white"); tabContents.children[i].classList.remove("hidden");
                if ("#" + tabContents.children[i].id === tabName) {
                    continue;
                }
                tabContents.children[i].classList.add("hidden");

            }

            e.target.parentElement.classList.add("border-t", "border-r", "border-l", "-mb-px", "bg-white");
        }));

    };

    return {

        load: function () {

            loadTabs();
        },
    }
})();

export { popUpEditTask };