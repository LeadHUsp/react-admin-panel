import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useStyles } from './AttributeTable';
import { Link } from 'react-router-dom';
//mui
import { TableBody, TableRow, TableCell, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
//store
import { RootState } from 'store/store';
import { setOpenAttributeEditPanel } from 'store/ducks/attribute/actions';

export const AttrTableBody: React.FC = () => {
    const attrGroup = useSelector((state: RootState) => state.attribute.attr_group);
    const classes = useStyles();
    const dispatch = useDispatch();
    const openEditPanel = () => {
        dispatch(setOpenAttributeEditPanel(true));
    };
    return (
        <TableBody>
            {attrGroup?.map((row) => (
                <TableRow hover key={row._id}>
                    <TableCell className={classes.cell} component="th" scope="row">
                        <div>
                            <IconButton
                                aria-label="change"
                                color="primary"
                                component={Link}
                                to={`attribute/edit-attribute/${row._id}`}>
                                <CreateIcon fontSize="small" />
                            </IconButton>
                            <IconButton
                                aria-label="delete"
                                color="secondary"
                                onClick={(event) => {
                                    event.stopPropagation();
                                }}>
                                <DeleteIcon fontSize="small" />
                            </IconButton>
                            {row.name_user}
                        </div>
                    </TableCell>
                    <TableCell className={classes.cell} align="right">
                        {row.name_admin}
                    </TableCell>
                    <TableCell className={classes.cell} align="right">
                        {row.attribute.map((item) => (
                            <p key={item.value}> {item.value}</p>
                        ))}
                        {/* <Button
                                        variant="contained"
                                        color="primary"
                                        size="small"
                                        className={classes.addbtn}
                                        startIcon={<AddCircleIcon />}>
                                        Добавить атрибут
                                    </Button> */}
                    </TableCell>
                    <TableCell className={classes.cell} align="right">
                        {row.show_in_filter ? 'Да' : 'Нет'}
                    </TableCell>
                    <TableCell className={classes.cell} align="right">
                        {row.unit_text ? row.unit_text : 'Не задано'}
                    </TableCell>
                    <TableCell className={classes.cell} align="right">
                        {row.category ? row.category.name : 'Не задано'}
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    );
};
