import React, { useCallback, useEffect, useState } from 'react';
import { FileError, FileRejection, useDropzone } from 'react-dropzone';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Grid from '@material-ui/core/Grid/Grid';
import LinearProgress from '@material-ui/core/LinearProgress/LinearProgress';

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography/Typography';

import { theme } from 'theme';
import IconButton from '@material-ui/core/IconButton/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import { useDispatch } from 'react-redux';

import { setNewGalleryItems } from 'store/ducks/gallery/actions';
import { galleryApi } from 'services/api';
const useStyles = makeStyles({
    drop: {
        minWidth: 500,
        height: 250,
        display: 'flex',
        flexWrap: 'wrap',
    },
    drop_active: {
        backgroundColor: theme.palette.success.light,
        color: '#fff',
    },
    default_text: {
        width: '100%',
        height: '100%',
        border: '1px dashed #000',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
    },
    image_wrapper: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
    },
    image_thumb: {
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        height: 250,
    },

    upload_info: {
        paddingTop: 10,
    },
    btn_delete: {
        padding: 10,
    },
});

export interface UploadedFile {
    file: File;
    errors: FileError[];
}

export const DropLoaderMemo = React.memo(function DropLoader() {
    const classes = useStyles();
    const dispatch = useDispatch();

    const onDrop = useCallback(
        (acceptedFiles: File[], rejectedFile: FileRejection[]) => {
            const mappedAcc = acceptedFiles.map((file) => ({ file, errors: [] }));
            dispatch(setNewGalleryItems(mappedAcc));
            // setFiles();
        },
        [dispatch]
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    return (
        <>
            <div className={classes.drop} {...getRootProps()}>
                <input {...getInputProps()} />
                {isDragActive ? (
                    <Typography
                        variant="body2"
                        component="div"
                        className={`${classes.drop_active} ${classes.default_text}`}>
                        Перенесите файлы сюда
                    </Typography>
                ) : (
                    <Typography
                        variant="body2"
                        component="div"
                        className={classes.default_text}>
                        Перенесите файлы или кликните по области
                    </Typography>
                )}
            </div>
        </>
    );
});

interface SingleFileUploadWithProgressProps {
    file: File;
    handleDelete: (file: File) => void;
}
export const SingleFileUploadWithProgressMemo = React.memo(
    function SingleFileUploadWithProgress({
        file,
        handleDelete,
    }: SingleFileUploadWithProgressProps) {
        const classes = useStyles();
        const [uploadProgress, setUploadProgress] = useState<number>(0);
        useEffect(() => {
            const formData = new FormData();
            formData.append('files', file);

            const handleUploadProgress = (progressEvent: any) => {
                const { loaded, total } = progressEvent;
                let percentage = Math.floor((loaded * 100) / total);
                setUploadProgress(percentage);
            };
            galleryApi.addGalleryItem(formData, handleUploadProgress);
            // eslint-disable-next-line
        }, []);
        return (
            <Grid item xs={6}>
                <Box className={classes.image_wrapper}>
                    <div
                        className={classes.image_thumb}
                        style={{
                            backgroundImage: `url(${URL.createObjectURL(file)})`,
                        }}></div>
                    <Box pt={1}>
                        <Grid container direction="column">
                            <Grid item container justify="space-between">
                                <Grid item>
                                    <Typography variant="body2">{file.name}</Typography>
                                    <Typography variant="caption">
                                        {Math.round(file.size / 1024)}Kb
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    {' '}
                                    <IconButton
                                        onClick={() => {
                                            handleDelete(file);
                                        }}
                                        color="secondary"
                                        className={classes.btn_delete}>
                                        <DeleteIcon fontSize="small" />
                                    </IconButton>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <LinearProgress
                                    variant="determinate"
                                    value={uploadProgress}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Grid>
        );
    }
);
// function uploadFile(file: File, onprogress: (percentage: number) => void) {

//     const url = 'http://localhost:8080/api/gallery';
//     return new Promise((res, rej) => {
//         const xhr = new XMLHttpRequest();

//         xhr.open('POST', url);
//         xhr.setRequestHeader('Authorization', `${window.localStorage.getItem('token')}`);
//         xhr.onload = () => {
//             res('url from server');
//         };
//         xhr.onerror = (evt) => rej(evt);
//         xhr.upload.onprogress = (event) => {
//             if (event.lengthComputable) {
//                 const percentage = (event.loaded / event.total) * 100;
//                 onprogress(Math.round(percentage));
//             }
//         };
//         const formData = new FormData();
//         formData.append('files', file);
//         xhr.send(formData);
//     });
// }
