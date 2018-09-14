import React from 'react';

import { Button } from '../button';

import './tableMover.scss';

export const TableMover = () => {
    return (
        <div className='table-mover'>
            <Button
                className='table-mover__btn'
                title='«' />
            <Button
                className='table-mover__btn'
                title='1' />
            <Button
                className='table-mover__btn'
                title='2' />
            <Button
                className='table-mover__btn'
                title='3' />
            <Button
                className='table-mover__btn'
                title='4' />
            <Button
                className='table-mover__btn'
                title='5' />
            <Button
                className='table-mover__btn'
                title='»' />
        </div>
    );
};
