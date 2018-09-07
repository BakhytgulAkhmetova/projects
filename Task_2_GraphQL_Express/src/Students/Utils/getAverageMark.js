const getAverageMark = (marks) => {
    let result = 0;
    const marksCount = marks.length;

    for (let i = 0; i < marksCount; i++) {
        result += marks[i];
    }

    return result / marksCount;
};

module.exports = getAverageMark;
