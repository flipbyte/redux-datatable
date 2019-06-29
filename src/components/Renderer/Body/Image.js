import React from 'react';
import { withData } from '../../../hoc';

const Image = ({
    value,
    colConfig: { name, imgWidth, imgHeight }
}) => (
    <img src={ value } width={ imgWidth } height={ imgHeight } />
);

export default withData(Image);
