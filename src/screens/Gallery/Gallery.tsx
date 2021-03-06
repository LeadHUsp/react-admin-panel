import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    deleteUploadGalleryItem,
    fetchGalleryItems,
    clearUploadItems,
    deleteSingleGalleryItemRequest,
    setChoosedItems,
    deleteChoosedItem,
    deleteChoosedItemsRequest,
    clearChoosedItems,
    setCurrentPage,
    setChoosedSingleItem,
} from 'store/ducks/gallery/actions';

import { GalleryItem } from '../../store/ducks/gallery/contracts/state';
import MediaCard from 'screens/Gallery/MediaCard';
import Grid from '@material-ui/core/Grid/Grid';
import Button from '@material-ui/core/Button/Button';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Dialog from '@material-ui/core/Dialog/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import makeStyles from '@material-ui/core/styles/makeStyles';
import {
    DropLoaderMemo,
    SingleFileUploadWithProgressMemo,
} from 'components/DropLoader/DropLoader';
import DeleteIcon from '@material-ui/icons/Delete';
import Pagination from '@material-ui/lab/Pagination';
import Box from '@material-ui/core/Box/Box';
import { Link, useParams, useLocation, useHistory } from 'react-router-dom';
import PaginationItem from '@material-ui/lab/PaginationItem';
import { useAppSelector } from 'hooks/redux';
import { Preloader } from 'components/Preloader/Preloader';
import { LoadingStatus } from 'store/types';
const useStyles = makeStyles({
    gridItem: {
        '@media screen and (max-width:400px)': {
            maxWidth: '100%',
            flexBasis: '100%',
        },
    },
});

const Gallery: React.FC<{ modal: boolean; singleChoosed: boolean }> = ({
    modal,
    singleChoosed,
}) => {
    const dispatch = useDispatch();
    const galleryItems = useAppSelector((state) => state.gallery.gallery_items);
    const ChoosedItems = useAppSelector((state) => state.gallery.choosed_items);
    const files = useAppSelector((state) => state.gallery.new_gallery_items);
    const totalPages = useAppSelector((state) => state.gallery.total_pages);
    const page = useAppSelector((state) => state.gallery.current_page);
    const loadingStatus = useAppSelector((state) => state.gallery.status);
    const history = useHistory();
    let location = useLocation();
    let params = useParams<{ page?: string }>();
    let pageFromRouter = params.page;
    const classes = useStyles();
    useEffect(() => {
        // dispatch(fetchGalleryItems(Number(page)));
        return () => {
            dispatch(clearChoosedItems());
        };
    }, [dispatch]);
    useEffect(() => {
        dispatch(setCurrentPage(Number(pageFromRouter)));
    }, [dispatch, location, pageFromRouter]);
    const [open, setOpen] = React.useState(false);

    const handleClickPaginationItem = (
        event: React.ChangeEvent<unknown>,
        value: number
    ): void => {
        dispatch(setCurrentPage(value));
    };
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        dispatch(clearUploadItems());
        dispatch(fetchGalleryItems(Number(page)));
    };

    const handleDelete = (file: File) => {
        dispatch(deleteUploadGalleryItem(file));
    };
    const handleSetChoosedItems = (
        event: React.ChangeEvent<HTMLInputElement>,
        item: GalleryItem
    ): void => {
        ChoosedItems.hasOwnProperty(item._id)
            ? dispatch(deleteChoosedItem(item))
            : dispatch(setChoosedItems(item));
    };
    const handleSetSingleChoosedItem = (
        event: React.ChangeEvent<HTMLInputElement>,
        item: GalleryItem
    ): void => {
        ChoosedItems.hasOwnProperty(item._id)
            ? dispatch(deleteChoosedItem(item))
            : dispatch(setChoosedSingleItem(item));
    };
    const handleDeleteChoosedItemsRequest = () => {
        dispatch(
            deleteChoosedItemsRequest({
                modal,
                history,
            })
        );
    };
    return (
        <Grid container spacing={2}>
            <Preloader open={loadingStatus === LoadingStatus.LOADING} />
            <Grid item container spacing={2}>
                <Grid item>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleOpen}
                        startIcon={<AddCircleOutlineIcon />}>
                        ???????????????? ??????????????????????
                    </Button>
                </Grid>
                {Object.keys(ChoosedItems).length > 0 ? (
                    <Grid item>
                        <Button
                            onClick={handleDeleteChoosedItemsRequest}
                            variant="contained"
                            color="secondary"
                            startIcon={<DeleteIcon />}>
                            ?????????????? ??????????????????
                        </Button>
                    </Grid>
                ) : (
                    ''
                )}
            </Grid>

            {galleryItems.map((item: GalleryItem) => {
                return (
                    <Grid
                        item
                        xs={6}
                        sm={4}
                        md={4}
                        lg={3}
                        key={item._id}
                        className={classes.gridItem}>
                        <MediaCard
                            item={item}
                            deleteButtonHandler={() => {
                                dispatch(
                                    deleteSingleGalleryItemRequest({
                                        item,
                                        history,
                                        modal,
                                    })
                                );
                            }}
                            choosed={ChoosedItems.hasOwnProperty(item._id)}
                            checkBoxActionHandler={
                                singleChoosed
                                    ? handleSetSingleChoosedItem
                                    : handleSetChoosedItems
                            }
                        />
                    </Grid>
                );
            })}
            {totalPages > 1 ? (
                <Grid container item xs={12} justifyContent="center">
                    {!modal ? (
                        <Pagination
                            count={totalPages}
                            page={page ? Number(page) : 1}
                            variant="outlined"
                            shape="rounded"
                            renderItem={(item) => (
                                <PaginationItem
                                    component={Link}
                                    to={`/gallery/${
                                        item.page === 1 ? '' : `page=${item.page}`
                                    }`}
                                    {...item}
                                />
                            )}
                        />
                    ) : (
                        <Pagination
                            count={totalPages}
                            page={page ? Number(page) : 1}
                            variant="outlined"
                            shape="rounded"
                            onChange={handleClickPaginationItem}
                        />
                    )}
                </Grid>
            ) : (
                ''
            )}

            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth
                maxWidth="md"
                scroll="paper">
                <DialogTitle id="form-dialog-title">???????????????? ??????????????????????</DialogTitle>
                <DialogContent dividers>
                    <DropLoaderMemo />
                    {files.length > 0 ? (
                        <Box pt={2}>
                            <Grid container spacing={2}>
                                {files.map((fileWrapper, idx) => (
                                    <SingleFileUploadWithProgressMemo
                                        key={idx}
                                        file={fileWrapper.file}
                                        handleDelete={handleDelete}
                                    />
                                ))}
                            </Grid>
                        </Box>
                    ) : (
                        ''
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        ??????????????
                    </Button>
                </DialogActions>
            </Dialog>
        </Grid>
    );
};
export default Gallery;
