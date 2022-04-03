
/**
 * 
 * @param {number} dblProjectId 
 * @param {number} intStatusId 
 * @param {string} strTitle 
 * @param {string} strDescription 
 * @param {Date} dtDueDate 
 * @param {number} intPriority 
 * @param {string} strTag 
 * @param {number} intUserOwnerId 
 * @param {number} intUserCreatorId 
 * @param {boolean} booIsClosed 
 * @returns {number}
 */
function dbInsert(dblProjectId, intStatusId, strTitle, strDescription, dtDueDate, intPriority, strTag, intUserOwnerId, intUserCreatorId, booIsClosed) {

    const objTodoData = {
        dblId: Number(Date.now() + ((Math.random() * 100000).toFixed())),
        dblProjectId: dblProjectId,
        intStatusId: intStatusId,
        strTitle: strTitle,
        strDescription: strDescription,
        dtDueDate: dtDueDate,
        intPriority: intPriority,
        strTag: strTag,
        intUserOwnerId: intUserOwnerId,
        intUserCreatorId: intUserCreatorId,
        dtCreatedOn: new Date(),
        booIsClosed: booIsClosed
    }

    localStorage.setItem("todo-" + objTodoData.dblId, JSON.stringify(objTodoData));

    return objTodoData.dblId;
}