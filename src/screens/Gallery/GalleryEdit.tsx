import Grid from '@material-ui/core/Grid/Grid';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Prompt } from 'react-router-dom';
import {
    fetchSingleGalleryItem,
    uploadChangeGalleryItem,
    setChangeNotSaved,
} from 'store/ducks/gallery/actions';
import { GalleryItem } from 'store/ducks/gallery/contracts/state';
import { RootState } from 'store/store';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography/Typography';
import TextField from '@material-ui/core/TextField/TextField';
import PhotoSizeSelectLargeIcon from '@material-ui/icons/PhotoSizeSelectLarge';
import MemoryIcon from '@material-ui/icons/Memory';
import PermMediaIcon from '@material-ui/icons/PermMedia';
import SaveIcon from '@material-ui/icons/Save';
import EventIcon from '@material-ui/icons/Event';
import Box from '@material-ui/core/Box/Box';
import {
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    ListSubheader,
} from '@material-ui/core';
import { Beforeunload } from 'react-beforeunload';
import Button from '@material-ui/core/Button/Button';
import defaulThumb from 'static/default-thumbnail.jpg';

const useStyles = makeStyles({
    img_thumb: {
        width: '100%',
        height: 'auto',
    },
    input: {
        width: '100%',
    },
    char_list: {
        columnCount: 2,
    },
});
interface InputStateInterface {
    [key: string]: string;
}

export default function GalleryEdit() {
    const classes = useStyles();

    const { id } = useParams<{ id: string }>();
    const saveChangeDialog = useSelector(
        (state: RootState) => state.gallery.change_not_saved
    );
    const editGalleryItem: GalleryItem = useSelector(
        (state: RootState) => state.gallery.edit_gallery_item
    );

    const {
        _id,
        name,
        alt,
        title,
        size,
        width,
        height,
        createdAt,
        updatedAt,
    }: GalleryItem = editGalleryItem;
    const dispatch = useDispatch();
    const [editParams, setEditParams] = React.useState<InputStateInterface>({
        title,
        alt,
    });

    const beforeUnloadHandler = (event: any) => {
        event.preventDefault();
        return 'Are you sure you want to exit?';
    };
    React.useEffect(() => {
        dispatch(fetchSingleGalleryItem(id));

        // eslint-disable-next-line
    }, []);
    React.useEffect(() => {
        setEditParams({ title, alt });
        console.log(alt);
        console.log(editParams.alt);
        return () => {
            if (title !== editParams.title || alt !== editParams.alt) {
                dispatch(setChangeNotSaved(true));
            } else {
                dispatch(setChangeNotSaved(false));
            }
        };
    }, [title, alt]);

    const handleChangeParams = (e: React.ChangeEvent): void => {
        const target = e.target as HTMLInputElement;
        const newParams = { ...editParams };
        newParams[target.name] = target.value;
        setEditParams(newParams);
    };
    const handleSaveButtonClickHandler = () => {
        dispatch(
            uploadChangeGalleryItem({
                id: _id,
                title: editParams.title,
                alt: editParams.alt,
            })
        );
    };
    return (
        <Grid container>
            {saveChangeDialog && (
                <Beforeunload onBeforeunload={(event) => beforeUnloadHandler(event)} />
            )}
            <Prompt
                when={saveChangeDialog}
                message="Вы действительно хотите уйти, ваши изменения не сохранятся"
            />
            <Grid item xs={6}>
                <img
                    className={classes.img_thumb}
                    src={
                        name
                            ? `${process.env.REACT_APP_SERVER_UPLOADS}${name}`
                            : defaulThumb
                    }
                    alt={alt}
                />
                <Button
                    onClick={handleSaveButtonClickHandler}
                    variant="contained"
                    color="primary"
                    size="medium"
                    startIcon={<SaveIcon />}>
                    Сохранить изменения
                </Button>
            </Grid>
            <Grid item xs={6}>
                <Box pb={2}>
                    <Typography align="center" variant="h5">
                        Редактирование информации об изображении
                    </Typography>
                </Box>
                <Box pl={2}>
                    <form action="">
                        <Grid container>
                            <Grid item lg={12}>
                                <Typography variant="caption">
                                    Title изображения
                                </Typography>
                                <Box pt={2} pb={3}>
                                    <TextField
                                        className={classes.input}
                                        label="Имя"
                                        type="text"
                                        name="title"
                                        variant="outlined"
                                        value={editParams.title}
                                        onChange={(e) => {
                                            handleChangeParams(e);
                                        }}
                                    />
                                </Box>
                            </Grid>
                            <Grid item lg={12}>
                                <Typography variant="caption">Alt атрибут</Typography>
                                <Box pt={2}>
                                    <TextField
                                        className={classes.input}
                                        label="alt текст"
                                        name="alt"
                                        type="text"
                                        variant="outlined"
                                        value={editParams.alt}
                                        onChange={(e) => {
                                            handleChangeParams(e);
                                        }}
                                    />
                                </Box>
                            </Grid>
                        </Grid>
                    </form>
                </Box>
                <Box pt={2}>
                    <List dense className={classes.char_list}>
                        <ListItem>
                            <ListItemIcon>
                                <PermMediaIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary="Название в файловой системе"
                                secondary={name}
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <MemoryIcon />
                            </ListItemIcon>
                            <ListItemText primary="Размер файла" secondary={size} />
                        </ListItem>
                        <ListSubheader>Размеры изображения</ListSubheader>
                        <ListItem>
                            <ListItemIcon>
                                <PhotoSizeSelectLargeIcon />
                            </ListItemIcon>
                            <ListItemText primary="Ширина" secondary={`${width}px`} />
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <PhotoSizeSelectLargeIcon />
                            </ListItemIcon>
                            <ListItemText primary="Высота" secondary={`${height}px`} />
                        </ListItem>
                        <ListSubheader>Дата создания и обновления</ListSubheader>
                        <ListItem>
                            <ListItemIcon>
                                <EventIcon />
                            </ListItemIcon>
                            <ListItemText primary="Дата создания" secondary={createdAt} />
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <EventIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary="Дата последнего обновления"
                                secondary={updatedAt}
                            />
                        </ListItem>
                    </List>
                </Box>
            </Grid>
        </Grid>
    );
}
