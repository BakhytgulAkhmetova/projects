/* Definition class for checking object fields */
export class Validator {
    constructor({ types, config }) {
        this.types = types;
        this.config = config;
        this.messages = [];
        this.listErrors = [];
    }

    validate = (data) => {
        for (const i in data) {
            if (data.hasOwnProperty(i)) {
                this.messages = [];
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
                    const success = checker.validate(data[i].value);

                    if (!success) {
                        debugger;
                        const msg = `Invalid value. ${checker.instructions}`;

                        this.messages.push(msg);
                    }
                }
            }
            this.listErrors.push({
                prop: i,
                msgs: this.messages
            });
        }
        return this.hasErrors();
    }

    hasErrors = () => {
        return this.listErrors.length !== 0;
    }

    cleanListErrors = () => {
        this.listErrors = [];
    }
}
