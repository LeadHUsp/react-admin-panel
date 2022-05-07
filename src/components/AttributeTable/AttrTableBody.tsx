import React, { useCallback } from 'react';
import { useStyles } from './AttributeTable';
import { Link } from 'react-router-dom';
//mui
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import Checkbox from '@material-ui/core/Checkbox';

//other
import { useAppSelector } from 'hooks/redux';
import { useDispatch } from 'react-redux';
import { setChoosedItems, confirmDeleteSingleItem } from 'store/ducks/attribute/actions';

export const AttrTableBody: React.FC = () => {
    const attrGroup = useAppSelector((state) => state.attribute.attr_group);
    const choosedGroups = useAppSelector((state) => state.attribute.choosed_items);

    const classes = useStyles();
    const dispatch = useDispatch();
    //обработчик выбора текущего элемента
    const choseItemHandler = useCallback(
        (id: string) => () => {
            if (choosedGroups.includes(id)) {
                const arrayOfIdsWithoutId = choosedGroups.filter((item) => item !== id);
                dispatch(setChoosedItems(arrayOfIdsWithoutId));
            } else {
                const arrayOfIdsWithId = [...choosedGroups, id];
                dispatch(setChoosedItems(arrayOfIdsWithId));
            }
        },
        [choosedGroups, dispatch]
    );
    //обработчик инициализации операции удаления еденичного элемента
    const btnDeleteClickHandler = useCallback(
        (id: string) => (event: React.ChangeEvent<EventTarget>) => {
            event.stopPropagation();
            dispatch(confirmDeleteSingleItem(id));
        },
        [dispatch]
    );
    return (
        <TableBody>
            {attrGroup?.map((row) => (
                <TableRow hover key={row._id}>
                    <TableCell padding="checkbox" className={classes.cell}>
                        <Checkbox
                            checked={choosedGroups.includes(row._id)}
                            onChange={choseItemHandler(row._id)}
                        />
                    </TableCell>
                    <TableCell className={classes.action_cell}>
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
                            onClick={btnDeleteClickHandler(row._id)}>
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                    </TableCell>
                    <TableCell className={classes.cell} component="th" scope="row">
                        <div>{row.name_user}</div>
                    </TableCell>
                    <TableCell className={classes.cell} align="right">
                        {row.name_admin}
                    </TableCell>
                    <TableCell className={classes.cell} align="right">
                        {row.attribute.map((item) => (
                            <p key={item.value}> {item.value}</p>
                        ))}
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
