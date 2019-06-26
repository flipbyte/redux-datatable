import React from 'react';
import withData from '../../../hoc/withData';

const Image = ({
    colConfig: { name, imgWidth, imgHeight }
}) => (
    <img src={ value } width={ imgWidth } height={ imgHeight } />
);

export default withData(Image);
