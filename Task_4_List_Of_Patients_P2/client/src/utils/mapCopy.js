export const mapCopy = (object, callback, params) => {
    return Object.keys(object).reduce((prop, key) => {
        const output = prop;

        output[key] = callback(object[key], params);
        return output;
    }, {});
};
