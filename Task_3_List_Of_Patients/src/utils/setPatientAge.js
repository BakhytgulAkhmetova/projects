const setPatientAge = (birthDate) => {
    const dataNow = new Date();

    let age = dataNow.getFullYear() - birthDate.getFullYear();

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