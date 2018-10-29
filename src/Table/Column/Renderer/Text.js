import React from 'react';
import get from 'lodash/get';

const Text = ({ index, data, colConfig: { textAlign } }) =>
    <td className={ textAlign ? textAlign : '' }> { get(data, index, '') } </td>

export default Text;
