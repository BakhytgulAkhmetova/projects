const setPatientAge = (birthDate) => {
    const dataNow = new Date();

    /*Calculate age */
    let age = dataNow.getFullYear() - birthDate.getFullYear();

    /*Exact determination of age from month and day conditions */
    if (birthDate.getMonth() > dataNow.getMonth()) {
        age--;
    } else if (birthDate.getMonth() === dataNow.getMonth()) {
        if (birthDate.getDay() > dataNow.getDay()) {
            age--;
        }
    }
    return age;
};

module.exports = setPatientAge;
