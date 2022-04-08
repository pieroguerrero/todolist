import PubSub from 'pubsub-js';
import { createProjectDAO } from '../DataAccess/ProjectDAO';
import { createTodoDAO } from '../DataAccess/TodoDAO';
import { STATUS } from '../Model/Status';

const menuTray_Controller = (function () {

    let dblOWnerUserIdkeep;

    /**
     * 
     * @param {object} obj 
     */
    const getProjectsList = function (obj) {

        const arrProjects = createProjectDAO().dbSelectAll(obj.dblOWnerUserId);
        const objTodoDAO = createTodoDAO();

        const arrProjectsFiltered = arrProjects.map(
            objProject => ({
                dblId: objProject.getId(),
                strName: objProject.getTitle(),
                intCantOpenTasks: objTodoDAO.dbSelectAll(objProject.getToDosIdList()).reduce(
                    (prev, curr) =>
                        ((curr.getStatusId() !== STATUS.EMPTY.id && curr.getStatusId() !== STATUS.CLOSED.id) ? prev++ : prev),
                    0),
            })
        );

        PubSub.publish("MenuTray-LoadProjectsList-Render", arrProjectsFiltered);
    };

    return {
        subscribeEvents: function (dblOWnerUserId) {

            dblOWnerUserIdkeep = dblOWnerUserId;
            PubSub.subscribe("MenuTray-LoadProjectsList-Get", getProjectsList);
        },
    }
})();

export { menuTray_Controller };