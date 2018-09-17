import React from 'react';

import { FormFilling } from '../formFilling';

import './modalGenerator.scss';

export const ModalGenerator = () => {
    return (
        <div className='modal'>
            <FormFilling nameAction='Add patient'/>
        </div>
    );
};
