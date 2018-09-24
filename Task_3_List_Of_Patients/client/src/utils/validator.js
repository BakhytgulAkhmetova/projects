export class Validator {
    constructor({ types, config }) {
        this.types = types;
        this.config = config;
    }

    validate = (data) => {
        this.messages = [];
        for (const i in data) {
            if (data.hasOwnProperty(i)) {
                const typesForOne = this.config[i];

                for (let j = 0; j < typesForOne.length; j++) {
                    const checker = this.types[typesForOne[j]];

                    if (!typesForOne[j]) {
                        continue;
                    }
                    if (!checker) {
                        const e = new Error(`No handler to validate type${checker}`);

                        e.name = 'ValidationError';
                        throw e;
                    }

                    const success = checker.validate(data[i]);

                    if (!success) {
                        const msg = `Invalid value for${i}${checker.instructions}`;

                        this.messages.push(msg);
                    }
                }
            }
        }
        return this.hasErrors();
    }

    hasErrors = () => {
        return this.messages.length !== 0;
    }
}
