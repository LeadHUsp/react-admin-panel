import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { fetchCategoriesData } from '../../store/ducks/category/actions';
import { RootState } from '../../store/store';

import Button from '@material-ui/core/Button';

import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { theme } from '../../theme';

import { DisplayCategories } from './DisplayCategories/DisplayCategories';
import { LoadingStatus } from '../../store/types';
const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    add_category_btn: {
        paddingBottom: theme.spacing(4),
    },
});

export function Categories() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const categoriesStatus = useSelector((state: RootState) => state.categories.status);

    useEffect(() => {
        if (categoriesStatus === LoadingStatus.NEVER) {
            dispatch(fetchCategoriesData());
        }
    }, [categoriesStatus, dispatch]);

    return (
        <>
            <div className={classes.add_category_btn}>
                {' '}
                <Button
                    variant="contained"
                    color="primary"
                    component={NavLink}
                    to={'categories/add-new-category'}
                    startIcon={<AddCircleOutlineIcon />}>
                    Добавить категорию
                </Button>
            </div>

            <DisplayCategories />
        </>
    );
}
