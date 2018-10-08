/* Definition function for calculation common count of buttons */
export const setButtonsCount = (patientsCount, limitCount) => {
    return Math.ceil(patientsCount / limitCount);
};
