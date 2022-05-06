import React from 'react';
import { useDispatch } from 'react-redux';
import { useParams, Prompt } from 'react-router-dom';
import {
    fetchSingleGalleryItem,
    uploadChangeGalleryItem,
    setChangeNotSaved,
} from 'store/ducks/gallery/actions';
import { GalleryItem } from 'store/ducks/gallery/contracts/state';
import { useAppSelector } from 'hooks/redux';
import { LoadingStatus } from 'store/types';
import { Preloader } from 'components/Preloader/Preloader';

//mui
import Grid from '@material-ui/core/Grid/Grid';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography/Typography';
import TextField from '@material-ui/core/TextField/TextField';
import PhotoSizeSelectLargeIcon from '@material-ui/icons/PhotoSizeSelectLarge';
import MemoryIcon from '@material-ui/icons/Memory';
import PermMediaIcon from '@material-ui/icons/PermMedia';
import SaveIcon from '@material-ui/icons/Save';
import EventIcon from '@material-ui/icons/Event';
import Box from '@material-ui/core/Box/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Button from '@material-ui/core/Button/Button';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { theme } from 'theme';
import { Beforeunload } from 'react-beforeunload';
import defaulThumb from 'static/default-thumbnail.jpg';
//helpers
import formatDate from 'helpers/dateFormating';
const useStyles = makeStyles({
    img_thumb: {
        maxWidth: '100%',
        height: 'auto',
        margin: '0 auto',
        display: 'block',
    },
    input: {
        width: '100%',
    },
    char_list: {
        // columnCount: 2,
    },
    btn_save: {
        paddingTop: '20px',
        display: 'flex',
        justifyContent: 'center',
    },
    char_text: {
        wordWrap: 'break-word',
    },
    round: {
        color: '#fff',
        backgroundColor: theme.palette.success.light,
    },
});
interface InputStateInterface {
    [key: string]: string;
}

export default function GalleryEdit() {
    const classes = useStyles();

    const { id } = useParams<{ id: string }>();
    const saveChangeDialog = useAppSelector((state) => state.gallery.change_not_saved);
    const editGalleryItem: GalleryItem = useAppSelector(
        (state) => state.gallery.edit_gallery_item
    );
    const loadingStatus = useAppSelector((state) => state.gallery.status);
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
        <Box pt={3}>
            <Preloader open={loadingStatus === LoadingStatus.LOADING} />
            <Grid container spacing={6}>
                {saveChangeDialog && (
                    <Beforeunload
                        onBeforeunload={(event) => beforeUnloadHandler(event)}
                    />
                )}
                <Prompt
                    when={saveChangeDialog}
                    message="Вы действительно хотите уйти, ваши изменения не сохранятся"
                />
                <Grid item xs={3}>
                    <img
                        className={classes.img_thumb}
                        src={
                            name
                                ? `${process.env.REACT_APP_SERVER_UPLOADS}${name}`
                                : defaulThumb
                        }
                        alt={alt}
                    />
                </Grid>
                <Grid item xs={9}>
                    <Box pb={2}>
                        <Typography align="center" variant="h5">
                            Редактирование информации об изображении
                        </Typography>
                    </Box>
                    <Grid container spacing={4}>
                        <Grid item lg={5}>
                            <Box>
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
                                                    disabled={
                                                        loadingStatus ===
                                                        LoadingStatus.LOADING
                                                    }
                                                    value={editParams.title}
                                                    onChange={(e) => {
                                                        handleChangeParams(e);
                                                    }}
                                                />
                                            </Box>
                                        </Grid>
                                        <Grid item lg={12}>
                                            <Typography variant="caption">
                                                Alt атрибут
                                            </Typography>
                                            <Box pt={2}>
                                                <TextField
                                                    className={classes.input}
                                                    label="alt текст"
                                                    name="alt"
                                                    type="text"
                                                    variant="outlined"
                                                    disabled={
                                                        loadingStatus ===
                                                        LoadingStatus.LOADING
                                                    }
                                                    value={editParams.alt}
                                                    onChange={(e) => {
                                                        handleChangeParams(e);
                                                    }}
                                                />
                                            </Box>
                                        </Grid>
                                        <Grid item lg={12}>
                                            <div className={classes.btn_save}>
                                                <Button
                                                    onClick={handleSaveButtonClickHandler}
                                                    variant="contained"
                                                    color="primary"
                                                    size="medium"
                                                    startIcon={<SaveIcon />}>
                                                    Сохранить изменения
                                                </Button>
                                            </div>
                                        </Grid>
                                    </Grid>
                                </form>
                            </Box>
                        </Grid>
                        <Grid item lg={7}>
                            <Box pt={2}>
                                <List dense className={classes.char_list}>
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar className={classes.round}>
                                                <PermMediaIcon />
                                            </Avatar>
                                        </ListItemAvatar>

                                        <ListItemText
                                            className={classes.char_text}
                                            primary="Название в файловой системе"
                                            secondary={name}
                                        />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar className={classes.round}>
                                                <MemoryIcon />
                                            </Avatar>
                                        </ListItemAvatar>

                                        <ListItemText
                                            className={classes.char_text}
                                            primary="Размер файла"
                                            secondary={size}
                                        />
                                    </ListItem>
                                    <ListSubheader>Размеры изображения</ListSubheader>
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar className={classes.round}>
                                                <PhotoSizeSelectLargeIcon />
                                            </Avatar>
                                        </ListItemAvatar>

                                        <ListItemText
                                            primary="Ширина"
                                            secondary={`${width}px`}
                                        />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar className={classes.round}>
                                                <PhotoSizeSelectLargeIcon />
                                            </Avatar>
                                        </ListItemAvatar>

                                        <ListItemText
                                            primary="Высота"
                                            secondary={`${height}px`}
                                        />
                                    </ListItem>
                                    <ListSubheader>
                                        Дата создания и обновления
                                    </ListSubheader>
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar className={classes.round}>
                                                <EventIcon />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary="Дата создания"
                                            secondary={formatDate(createdAt)}
                                        />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar className={classes.round}>
                                                <EventIcon />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary="Дата последнего обновления"
                                            secondary={formatDate(updatedAt)}
                                        />
                                    </ListItem>
                                </List>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
}
