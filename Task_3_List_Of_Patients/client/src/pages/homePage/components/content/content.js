import React from 'react';

import { Button } from '../../../../components/button';
import { Grid } from '../../../../components/grid';
import { TableMover } from '../../../../components/tableMover';

import './content.scss';

export const Content = () => {
    return (
        <div className='content-home-page'>
            <Button
                className='btn-add'
                title='Add' />
            <Grid />
            <TableMover/>
        </div>
    );
};
