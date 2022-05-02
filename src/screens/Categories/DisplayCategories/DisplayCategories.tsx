import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
//mui
import { theme } from 'theme';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ClearOutlinedIcon from '@material-ui/icons/ClearOutlined';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
//store
import { FetchedCategoryInterface } from 'store/ducks/category/contracts/state';
import { RootState } from 'store/store';
import {
    deleteSingleCategoryRequest,
    fetchCategoriesData,
} from 'store/ducks/category/actions';
import { LoadingStatus } from 'store/types';

const useStyles = makeStyles({
    accordion__text: {
        display: 'flex',
        alignItems: 'center',
    },
    accordion__body: {
        width: '100%',
        '& > div': {
            width: '100%',
        },
    },
    'search-panel': {
        display: 'flex',
        justifyContent: 'flex-end',
        marginBottom: theme.spacing(1),
    },
    'search-panel__search-btn': {
        margin: `0 ${theme.spacing(1)}px`,
        color: '#fff',
        backgroundColor: theme.palette.success.main,
        '&:hover': {
            backgroundColor: theme.palette.success.dark,
        },
    },
    'search-panel__input': {
        width: '300px',
    },
    'accordion__btn-delete': {
        color: theme.palette.warning.main,
    },
});

export const DisplayCategories: React.FC = () => {
    const classes = useStyles();
    const categories = useSelector((state: RootState) => state.categories.categories);
    const categoriesStatus = useSelector((state: RootState) => state.categories.status);
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryState, setCategoryState] = useState<FetchedCategoryInterface[]>([]);

    const filteringArray = (
        array: FetchedCategoryInterface[],
        searchParam: string,
        filteredArray: FetchedCategoryInterface[]
    ) => {
        let searchQuery = searchParam.toLocaleLowerCase();
        array.forEach((item: FetchedCategoryInterface) => {
            if (item.name.toLowerCase().includes(searchQuery)) {
                filteredArray.push(item);
            }
            if (item.children && item.children.length > 0) {
                filteringArray(item.children, searchQuery, filteredArray);
            }
        });
    };
    const mutateCategories = () => {
        let filteredArray: FetchedCategoryInterface[] = [];
        if (searchTerm !== '') {
            filteringArray(categories, searchTerm, filteredArray);
            setCategoryState(filteredArray);
        } else {
            setCategoryState(categories);
        }
    };

    let location = useLocation();

    const renderCategory = (categories: Array<FetchedCategoryInterface>) => {
        return (
            <>
                {categories.map((category: FetchedCategoryInterface) => {
                    return category.children && category.children.length > 0 ? (
                        <Accordion key={category._id}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <IconButton
                                    aria-label="change"
                                    color="primary"
                                    component={Link}
                                    to={location.pathname + '/' + category._id}>
                                    <CreateIcon />
                                </IconButton>
                                <IconButton
                                    aria-label="delete"
                                    onClick={(event) => {
                                        event.stopPropagation();
                                        dispatch(
                                            deleteSingleCategoryRequest(category._id)
                                        );
                                    }}
                                    className={classes['accordion__btn-delete']}>
                                    <DeleteIcon />
                                </IconButton>
                                <Typography className={classes.accordion__text}>
                                    {category.name}
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails className={classes.accordion__body}>
                                {renderCategory(category.children)}
                            </AccordionDetails>
                        </Accordion>
                    ) : (
                        <Paper key={category._id}>
                            <AccordionSummary className={classes.accordion__body}>
                                <IconButton
                                    aria-label="change"
                                    color="primary"
                                    component={Link}
                                    to={location.pathname + '/' + category._id}>
                                    <CreateIcon />
                                </IconButton>
                                <IconButton
                                    aria-label="delete"
                                    onClick={(event) => {
                                        event.stopPropagation();
                                        dispatch(
                                            deleteSingleCategoryRequest(category._id)
                                        );
                                    }}
                                    className={classes['accordion__btn-delete']}>
                                    <DeleteIcon />
                                </IconButton>
                                <Typography className={classes.accordion__text}>
                                    {category.name}
                                </Typography>
                            </AccordionSummary>
                        </Paper>
                    );
                })}
            </>
        );
    };
    useEffect(() => {
        if (categoriesStatus === LoadingStatus.NEVER) {
            dispatch(fetchCategoriesData());
        }
    }, [categoriesStatus, dispatch]);
    useEffect(() => {
        setCategoryState(categories);
    }, [categories]);
    return (
        <>
            <div className={classes['search-panel']}>
                <TextField
                    id="standard-basic"
                    label="Поиск"
                    variant="outlined"
                    className={classes['search-panel__input']}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                    }}
                    onKeyUp={(e) => {
                        if (e.key === 'Enter') {
                            mutateCategories();
                        }
                    }}
                    value={searchTerm}
                />
                <Button
                    className={classes['search-panel__search-btn']}
                    variant="contained"
                    startIcon={<SearchOutlinedIcon />}
                    onClick={mutateCategories}>
                    Найти категорию
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<ClearOutlinedIcon />}
                    onClick={() => {
                        setCategoryState(categories);
                        setSearchTerm('');
                    }}>
                    Очистить
                </Button>
            </div>
            <div>{renderCategory(categoryState)}</div>
        </>
    );
};
