import React from 'react';
//mui
import { makeStyles } from '@material-ui/core/styles';
import { TableHead, TableRow, TableCell } from '@material-ui/core';

const useStyles = makeStyles({
    table_head: {
        borderTop: '1px solid #e3e3e3',
    },
    cell: {
        borderRight: '1px solid #e3e3e3',
    },
});
export const AttrTableHead: React.FC = () => {
    const classes = useStyles();

    return (
        <TableHead className={classes.table_head}>
            <TableRow>
                <TableCell className={classes.cell}>Имя атрибута (на клиенте)</TableCell>
                <TableCell className={classes.cell} align="right">
                    Имя атрибута (в админ панели)
                </TableCell>
                <TableCell className={classes.cell} align="right">
                    Значения
                </TableCell>
                <TableCell className={classes.cell} align="right">
                    Показывать как фильтр
                </TableCell>
                <TableCell className={classes.cell} align="right">
                    Единица измерения
                </TableCell>
                <TableCell className={classes.cell} align="right">
                    Категория
                </TableCell>
            </TableRow>
        </TableHead>
    );
};
