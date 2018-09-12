/* function for calculation average marks value of one student */

const getAverageValue = (marks) => {
    const marksCount = marks.length;

    if (marksCount) {
        return marks.reduce((valuePrevious, valueCurrent) => {
            return valuePrevious + valueCurrent;
        }) / marksCount;
    }
    return 0;
};

module.exports = getAverageValue;
