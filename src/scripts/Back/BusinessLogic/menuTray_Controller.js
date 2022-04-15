import { createProjectDAO } from '../DataAccess/ProjectDAO';
import { createTodoDAO } from '../DataAccess/TodoDAO';
import { STATUS } from '../Model/Status';

const menuTray_Controller = (function () {

    let dblOWnerUserIdkeep;

    /**
     * 
     * @param {number[]} arrTodoIds 
     * @returns
     */
    const calculateOpenTasksByProject = function (arrTodoIds) {

        const arrTodos = createTodoDAO().dbSelectAll(arrTodoIds);
        const arrTodosReduced = arrTodos.reduce(
            (prev, curr) => {

                if ((curr.getStatusId() !== STATUS.EMPTY.id) && (curr.getStatusId() !== STATUS.COMPLETED.id) && (curr.getStatusId() !== STATUS.CLOSED.id)) {
                    prev++;
                }

                return prev;
            },
            0)

        return arrTodosReduced;
    }

    return {
        subscribeEvents: function (dblOWnerUserId) {

            dblOWnerUserIdkeep = dblOWnerUserId;
        },
        getProjectsList: function (dblOWnerUserId) {

            const arrProjects = createProjectDAO().dbSelectAll(dblOWnerUserId);
            //const objTodoDAO = createTodoDAO();

            const arrProjectsFiltered = arrProjects.map(
                objProject => ({
                    dblId: objProject.getId(),
                    strName: objProject.getTitle(),
                    dtStartDate: objProject.getStartDate(),
                    dtEndDate: objProject.getEndDate(),
                    intCantOpenTasks: calculateOpenTasksByProject(objProject.getToDosIdList()),
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