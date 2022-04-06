import PubSub from 'pubsub-js'

const mainLandingAddTaskPoUp_Render = (function () {

    const divAddTask = document.querySelector(".div-add-todo-form");

    return {
        load: function () {
            this.show();
            //pubsub.notify(time to all the data from the modal popup:projects and dates)
            PubSub.publish("main-landing-addtask-load", { clientCurrentDate: new Date() });
        },
        hide: function () {

            if (!divAddTask.classList.contains("hidden")) {
                divAddTask.classList.add("hidden");
            }
        },
        show: function () {

            divAddTask.classList.remove("hidden");

        },
    }
})();

export { mainLandingAddTaskPoUp_Render };