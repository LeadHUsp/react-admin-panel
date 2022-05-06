import React, { useEffect, useState, useRef } from 'react';
import { useHistory, useParams, Link } from 'react-router-dom';
import { parse, stringify, exclude, pick } from 'query-string';
//mui
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';
import Tooltip from '@material-ui/core/Tooltip';
import LinearProgress from '@material-ui/core/LinearProgress';
import FilterListIcon from '@material-ui/icons/FilterList';
import { theme } from 'theme';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import SearchIcon from '@material-ui/icons/Search';
//store
import { LoadingStatus } from 'store/types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { FetchedCategoryInterface } from 'store/ducks/category/contracts/state';

//components
import { DepthSearchSelect } from 'components/UI-parts/DepthSearchSelect';
import { AttrTableHead } from './AttrTableHead';
import { AttrTablePagination } from './AttrTablePagination';
import { AttrTableBody } from './AttrTableBody';
import { fetchAttributeGroupData } from 'store/ducks/attribute/actions';
import { usePrevious } from 'helpers/hooks';
import { fetchCategoriesData } from 'store/ducks/category/actions';
import isEqual from 'lodash/isEqual';
import isArray from 'lodash/isArray';

interface ISearchFilterOptionsState {
    [x: string]: any;

    limit: number;
    category: FetchedCategoryInterface[];
    search: string | string[] | null;
}
export const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    cell: {
        borderRight: '1px solid #e3e3e3',
    },
    wrapper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    addbtn: {
        fontSize: 11,
        marginLeft: theme.spacing(1),
    },
    title: {
        flex: '1 1 100%',
    },
    edit_panel: {
        width: '500px',
    },
    input: {
        padding: theme.spacing(2),
    },
    edit_title: {
        textAlign: 'center',
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
});

export const AttributeTable: React.FC = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [filterOpen, setFilterOpen] = useState<boolean>(true);
    const categories = useSelector((state: RootState) => state.categories.categories);
    const flatCategoriesArray = useSelector(
        (state: RootState) => state.categories.flatCategoriesArray
    );
    const [searchTextValue, setSearchTextValue] = useState<string | string[] | null>('');
    const categoriesStatus = useSelector((state: RootState) => state.categories.status);
    const attributeLoadingStatus = useSelector(
        (state: RootState) => state.attribute.status
    );
    const totalPages = useSelector((state: RootState) => state.attribute.total_pages);
    const [searchFilterOptions, setSearchFilterOptions] =
        useState<ISearchFilterOptionsState>({
            limit: 20,
            category: [],
            search: '',
        });

    //pagination
    const history = useHistory();
    const { page } = useParams<{ page?: string }>();
    const prevSearchFilterOptions = usePrevious(searchFilterOptions);
    const firstRender = useRef(true);
    const firstRenderFilterSync = () => {
        if (
            categoriesStatus === LoadingStatus.SUCCESS &&
            flatCategoriesArray.length > 0
        ) {
            firstRender.current = false;
            if (history.location.search !== '') {
                const params = parse(exclude(history.location.search, ['search']), {
                    arrayFormat: 'comma',
                });
                const searchStr = parse(pick(history.location.search, ['search']));

                let arrOfCategory: Array<FetchedCategoryInterface> = [];
                if (params.category) {
                    if (isArray(params.category)) {
                        params.category.forEach((itemId) => {
                            flatCategoriesArray.forEach((item) => {
                                if (item._id === itemId) {
                                    arrOfCategory.push(item);
                                }
                            });
                        });
                    } else {
                        flatCategoriesArray.forEach((item) => {
                            if (item._id === params.category) {
                                arrOfCategory.push(item);
                            }
                        });
                    }
                }
                setSearchTextValue(searchStr.search);
                setSearchFilterOptions((prev) => ({
                    ...prev,
                    ...params,
                    ...searchStr,
                    category: arrOfCategory,
                }));
            } else {
                const paramsUrlToApiString = stringify(searchFilterOptions, {
                    arrayFormat: 'comma',
                    skipEmptyString: true,
                });
                dispatch(
                    fetchAttributeGroupData(paramsUrlToApiString, page ? Number(page) : 1)
                );
            }
        }
    };
    useEffect(() => {
        if (categoriesStatus === LoadingStatus.NEVER) {
            dispatch(fetchCategoriesData());
        }
    }, [categoriesStatus, dispatch]);
    // useEffect(() => {
    //     console.log(searchFilterOptions.category);
    // });

    useEffect(() => {
        //если компонент рендерится в первый раз, то синхронизируем урл с состоянием
        if (firstRender.current) {
            firstRenderFilterSync();
        } else {
            //логика работы фильтра при взаимодействии с пользователем

            const queryObj = {
                ...searchFilterOptions,
                category: searchFilterOptions.category.map((item: any) => item._id),
            };

            const paramsUrlToApiString = stringify(queryObj, {
                arrayFormat: 'comma',
                skipEmptyString: true,
            });

            if (isEqual(prevSearchFilterOptions, searchFilterOptions)) {
                dispatch(
                    fetchAttributeGroupData(paramsUrlToApiString, page ? Number(page) : 1)
                );
            } else {
                history.push({
                    pathname: '/attribute',
                    search: paramsUrlToApiString,
                });
                dispatch(fetchAttributeGroupData(paramsUrlToApiString, 1));
            }
        }
        //eslint-disable-next-line
    }, [searchFilterOptions, dispatch, history, page, flatCategoriesArray]);

    const handlePerPageChange = React.useCallback(
        (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
            setSearchFilterOptions((prev) => ({
                ...prev,
                limit: Number(event.target.value),
            }));
        },
        []
    );

    const handleTextSearchConfirm = React.useCallback(
        (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
            setSearchFilterOptions((prev) => ({
                ...prev,
                search: searchTextValue,
            }));
        },
        [searchTextValue]
    );
    const handleDeleteSingleItem = React.useCallback(
        (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
            setSearchFilterOptions((prev) => ({
                ...prev,
                search: searchTextValue,
            }));
        },
        [searchTextValue]
    );
    return (
        <>
            <Paper className={classes.wrapper}>
                <Toolbar>
                    <Typography
                        className={classes.title}
                        variant="h6"
                        id="tableTitle"
                        component="div">
                        Атрибуты
                        <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            component={Link}
                            to={`attribute/create-attribute`}
                            className={classes.addbtn}
                            startIcon={<AddCircleOutlineIcon />}>
                            {' '}
                            Добавить атрибут
                        </Button>
                    </Typography>
                    <Tooltip
                        title="Фильтр"
                        onClick={() => {
                            setFilterOpen((prev) => !prev);
                        }}>
                        <IconButton aria-label="Фильтр">
                            <FilterListIcon />
                        </IconButton>
                    </Tooltip>
                </Toolbar>
                <Box p={2}>
                    <Collapse in={filterOpen} timeout="auto" unmountOnExit>
                        <Grid
                            container
                            direction="row"
                            justifyContent="flex-start"
                            spacing={2}>
                            <Grid item xs={6} lg={3}>
                                <DepthSearchSelect
                                    value={searchFilterOptions.category}
                                    actionChipText="Фильтр по категориям"
                                    options={categories}
                                    multiSelect
                                    depthKey="children"
                                    getOptionLabel={(option) => option.name}
                                    getOptionValue={(option) => option._id}
                                    onChange={(newValue) => {
                                        setSearchFilterOptions((prev) => ({
                                            ...prev,
                                            category: newValue,
                                        }));
                                    }}
                                />
                            </Grid>

                            <Grid item xs={6} lg={3}>
                                <Box style={{ position: 'relative' }}>
                                    <FormControl
                                        variant="outlined"
                                        style={{ width: '100%' }}>
                                        <InputLabel htmlFor="search">
                                            Поиск по имени
                                        </InputLabel>
                                        <OutlinedInput
                                            id="search"
                                            label="Поиск"
                                            value={searchTextValue}
                                            onChange={(e) => {
                                                setSearchTextValue(e.target.value);
                                            }}
                                            endAdornment={
                                                <IconButton
                                                    onClick={handleTextSearchConfirm}
                                                    color="primary"
                                                    component="span"
                                                    edge="end">
                                                    <SearchIcon color="primary" />
                                                </IconButton>
                                            }
                                        />
                                    </FormControl>
                                </Box>
                            </Grid>
                        </Grid>
                    </Collapse>
                </Box>
                <Box style={{ padding: '5px 0', position: 'relative' }}>
                    {attributeLoadingStatus === LoadingStatus.LOADING && (
                        <LinearProgress
                            style={{ position: 'absolute', left: 0, right: 0, bottom: 0 }}
                        />
                    )}
                </Box>

                <TableContainer>
                    <Table className={classes.table} size="small">
                        <AttrTableHead />
                        <AttrTableBody />
                    </Table>
                </TableContainer>
                <AttrTablePagination
                    loading={attributeLoadingStatus}
                    perPageChange={handlePerPageChange}
                    perPage={searchFilterOptions.limit}
                    perPageVariant={[20, 30, 40]}
                    currentPage={Number(page)}
                    totalPages={totalPages}
                />
            </Paper>
        </>
    );
};
