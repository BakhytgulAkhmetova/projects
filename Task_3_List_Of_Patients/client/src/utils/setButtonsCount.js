export const setButtonsCount = (patientsCount, limitCount) => {
    return Math.ceil(patientsCount / limitCount);
};
