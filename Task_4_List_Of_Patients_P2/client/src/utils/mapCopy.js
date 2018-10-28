export const mapCopy = (object, callback) => {
    return Object.keys(object).reduce((prop, key) => {
        const output = prop;

        output[key] = callback(object[key]);
        return output;
    }, {});
};
