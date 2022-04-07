import format from "date-fns/format";

const popUpProject = (function () {

    const divPopUpProject = document.getElementById("div-popup-register-project");
    const limitEndDate = function (dtStartDate) {

        const inputEndDate = divPopUpProject.querySelector("#date-register-project-enddate");
        inputEndDate.setAttribute("min", format(dtStartDate, "yyyy/MM/dd"));
    }

    return {
        load: function () {

            divPopUpProject.classList.remove("hidden");
            const btnCancel = divPopUpProject.querySelector("#button-form-register-project-cancel");
            btnCancel.onclick = this.close.bind(btnCancel);
        },
        close: function () {

            if (!divPopUpProject.classList.contains("hidden")) {
                divPopUpProject.classList.add("hidden");
            }
        },
    }
})();

export { popUpProject };