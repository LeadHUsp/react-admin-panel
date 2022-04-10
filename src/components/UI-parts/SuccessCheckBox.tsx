import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import { theme } from '../../theme';
import { CheckboxProps } from '@material-ui/core/Checkbox/Checkbox';
import { withStyles } from '@material-ui/core/styles';

interface SuccessCheckBoxPropsInterface extends CheckboxProps {
    choosed?: boolean;
}

export const SuccessCheckBox = withStyles({
    root: {
        color: theme.palette.success.main,
        '&$checked': {
            color: theme.palette.success.dark,
        },
    },
    checked: {},
})(({ choosed, ...other }: SuccessCheckBoxPropsInterface) => (
    <Checkbox checked={choosed} color="default" {...other} />
));
