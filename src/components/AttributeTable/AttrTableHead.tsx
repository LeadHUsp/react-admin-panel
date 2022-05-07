import React, { useCallback } from 'react';
//mui
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';
import { useStyles } from './AttributeTable';
//other
import { useAppSelector } from 'hooks/redux';
import { useDispatch } from 'react-redux';
import { setChoosedItems } from 'store/ducks/attribute/actions';

export const AttrTableHead: React.FC = () => {
    const attrGoroupsIds = useAppSelector((state) => state.attribute.attr_group_ids);
    const attrGroupItems = useAppSelector((state) => state.attribute.attr_group);
    const choosedGroups = useAppSelector((state) => state.attribute.choosed_items);
    const classes = useStyles();
    const dispatch = useDispatch();
    const chooseAllItemsHandler = useCallback(() => {
        if (choosedGroups.length === 0) {
            dispatch(setChoosedItems(attrGoroupsIds));
        }
        if (choosedGroups.length > 0 && choosedGroups.length < attrGoroupsIds.length) {
            const arrayOfAllItemsIds = attrGroupItems.map((item) => item._id);
            dispatch(setChoosedItems(arrayOfAllItemsIds));
        }
        if (choosedGroups.length === attrGoroupsIds.length) {
            dispatch(setChoosedItems([]));
        }
    }, [attrGoroupsIds, choosedGroups.length, attrGroupItems, dispatch]);

    return (
        <TableHead className={classes.table_head}>
            <TableRow>
                <TableCell padding="checkbox" className={classes.cell}>
                    <Checkbox
                        indeterminate={
                            choosedGroups.length > 0 &&
                            choosedGroups.length < attrGoroupsIds.length
                        }
                        checked={
                            choosedGroups.length > 0 &&
                            choosedGroups.length === attrGoroupsIds.length
                        }
                        onChange={chooseAllItemsHandler}
                    />
                </TableCell>
                <TableCell className={classes.action_cell}>Действия</TableCell>
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
