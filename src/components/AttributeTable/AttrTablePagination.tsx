import React from 'react';
//mui
import { makeStyles } from '@material-ui/core/styles';
import { Select, MenuItem } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import PaginationItem from '@material-ui/lab/PaginationItem';
import { LoadingStatus } from 'store/types';
import { Link } from 'react-router-dom';
const useStyles = makeStyles({
    pagination: {
        padding: '20px 20px',
    },
    pagination__wrapper: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    pagination__text: {
        paddingRight: '10px',
    },
    pagination__select: {
        padding: '0 12px',
    },
    pagination__pages: {
        display: 'flex',
    },
    pagination__btn: {
        flexShrink: 0,
        width: '45px',
        height: '45px',
    },
    pagination__icon: {
        fontSize: '15px',
    },
});
interface AttrTablePaginationPropsInterface {
    loading: LoadingStatus;
    perPageChange: (event: React.ChangeEvent<{ name?: string; value: unknown }>) => void;
    perPage: number;
    perPageVariant: number[];
    currentPage: number;
    totalPages: number;
}
export const AttrTablePagination = React.memo<AttrTablePaginationPropsInterface>(
    ({ loading, perPageChange, perPage, perPageVariant, currentPage, totalPages }) => {
        const classes = useStyles();
        return (
            <div className={classes.pagination}>
                <div className={classes.pagination__wrapper}>
                    <div className={classes.pagination__text}>Кол-во на странице</div>
                    <div className={classes.pagination__select}>
                        <Select value={perPage || 1} onChange={perPageChange}>
                            {perPageVariant.map((item) => (
                                <MenuItem key={Math.random() * item} value={item}>
                                    {item}
                                </MenuItem>
                            ))}
                        </Select>
                    </div>

                    <div className={classes.pagination__pages}>
                        <Pagination
                            count={totalPages}
                            page={currentPage ? Number(currentPage) : 1}
                            color="secondary"
                            hideNextButton={currentPage === totalPages}
                            hidePrevButton={currentPage === 1}
                            disabled={loading === LoadingStatus.LOADING}
                            renderItem={(item) => (
                                <PaginationItem
                                    component={Link}
                                    to={(location: any) => ({
                                        ...location,
                                        pathname: `/attribute/page=${item.page}`,
                                    })}
                                    {...item}
                                />
                            )}
                        />
                    </div>
                </div>
            </div>
        );
    }
);
