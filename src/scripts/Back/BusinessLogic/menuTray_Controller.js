import { createProjectDAO } from '../DataAccess/ProjectDAO';
import { createTodoDAO } from '../DataAccess/TodoDAO';
import { STATUS } from '../Model/Status';

const menuTray_Controller = (function () {

    let dblOWnerUserIdkeep;

    return {
        subscribeEvents: function (dblOWnerUserId) {

            dblOWnerUserIdkeep = dblOWnerUserId;
        },
        getProjectsList: function (dblOWnerUserId) {

            const arrProjects = createProjectDAO().dbSelectAll(dblOWnerUserId);
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

            return arrProjectsFiltered;
        },
        /**
         * 
         * @param {number} dblProjectId 
         * @param {Date} dtStartDate 
         * @param {Date} dtEndDate 
         * @param {number} dblCurrentUserId 
         * @returns 
         */
        calculateQttyOfTasks: function (dblProjectId, dtStartDate, dtEndDate, dblCurrentUserId) {

            const dblQtty = createTodoDAO().dbSelectByDate(dtStartDate, dtEndDate, dblCurrentUserId).length;

            return dblQtty;
        },
    }
})();

export { menuTray_Controller };