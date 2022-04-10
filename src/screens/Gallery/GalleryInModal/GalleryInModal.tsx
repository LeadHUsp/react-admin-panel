import React from 'react';

import Button from '@material-ui/core/Button/Button';
import Dialog from '@material-ui/core/Dialog/Dialog';
import DialogActions from '@material-ui/core/DialogActions/DialogActions';
import DialogContent from '@material-ui/core/DialogContent/DialogContent';

import { useDispatch, useSelector } from 'react-redux';
import { setOpenGalleryModal } from 'store/ducks/gallery/actions';
import { RootState } from 'store/store';
import { Gallery } from '../Gallery';

interface GalleryInModalInterface {
    singleChoosed: boolean;
    handlerConfirmButton?: () => void;
}

export function GalleryInModal({
    singleChoosed,
    handlerConfirmButton,
}: GalleryInModalInterface) {
    const dispatch = useDispatch();
    const isOpenModal = useSelector(
        (state: RootState) => state.gallery.open_gallery_modal
    );

    const handleCloseModal = () => {
        dispatch(setOpenGalleryModal(false));
    };

    return (
        <Dialog
            open={isOpenModal}
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            maxWidth="lg"
            onClose={handleCloseModal}
            // onClose={handleClose}
            // BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}>
            <DialogContent>
                <Gallery modal singleChoosed={singleChoosed} />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseModal} color="primary">
                    Закрыть
                </Button>
                <Button color="primary" autoFocus onClick={handlerConfirmButton}>
                    Подтвердить
                </Button>
            </DialogActions>
        </Dialog>
    );
}
