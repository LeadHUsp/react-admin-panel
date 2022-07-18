import React from 'react';
//mui
import makeStyles from '@material-ui/core/styles/makeStyles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { SuccessCheckBox } from 'components/UI-parts/SuccessCheckBox';
import { GalleryItem } from 'store/ducks/gallery/contracts/state';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import IconButton from '@material-ui/core/IconButton/IconButton';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
    image_wrapper: {
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '200px',
        paddingTop: '15px',
    },
    list_item: {
        paddingTop: '0',
        paddingBottom: '0',
    },
    card_title: {
        lineHeight: '100%',
        padding: '0 10px',
        textAlign: 'center',
        fontSize: '1rem',
    },
    image: {
        display: 'block',
        maxHeight: '100%',
        maxWidth: '100%',
    },
    media: {
        height: 200,
    },
    action_bottom: {
        marginTop: 'auto',
        justifyContent: 'center',
    },
    action_top: {
        justifyContent: 'space-between',
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
});
interface MediaCardInterface {
    choosed?: boolean;
    item: GalleryItem;
    deleteButtonHandler: () => void;
    checkBoxActionHandler: (
        event: React.ChangeEvent<HTMLInputElement>,
        item: GalleryItem
    ) => void;
}

export default function MediaCard({
    // _id,
    // name,
    // alt,
    // title,
    // size,
    // width,
    // height,
    // createdAt,
    // updatedAt,
    choosed,
    item,
    deleteButtonHandler,
    checkBoxActionHandler,
}: MediaCardInterface) {
    const classes = useStyles();
    const { _id, name, alt, title } = item;
    function checkBoxButtonHandler(event: React.ChangeEvent<HTMLInputElement>) {
        checkBoxActionHandler(event, item);
    }
    return (
        <Card className={classes.card}>
            <CardActions className={classes.action_top}>
                <SuccessCheckBox onChange={checkBoxButtonHandler} choosed={choosed} />
                <IconButton
                    aria-label="delete"
                    color="secondary"
                    onClick={deleteButtonHandler}>
                    <DeleteIcon />
                </IconButton>
            </CardActions>
            <CardActionArea component={Link} to={`/gallery/edit/${_id}`}>
                <div className={classes.image_wrapper}>
                    <img
                        src={`${process.env.REACT_APP_SERVER_UPLOADS}${name}`}
                        alt={alt}
                        className={classes.image}
                    />
                </div>
                <CardContent>
                    <Typography className={classes.card_title}>{title}</Typography>
                </CardContent>
            </CardActionArea>
            <CardActions className={classes.action_bottom}>
                <Button
                    component={Link}
                    to={`/gallery/edit/${_id}`}
                    size="small"
                    variant="contained"
                    color="primary"
                    startIcon={<CreateIcon />}>
                    Редактировать
                </Button>
            </CardActions>
        </Card>
    );
}
