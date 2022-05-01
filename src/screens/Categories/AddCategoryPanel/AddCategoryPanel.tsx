import React, { useEffect, useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core';

import TextField from '@material-ui/core/TextField';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/store';

import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';

import {
    setNewCategoryImage,
    setNewCategoryThumb,
    setCategoriesLoadingStatus,
    fetchCategoriesData,
} from 'store/ducks/category/actions';

import Grid from '@material-ui/core/Grid/Grid';
import defaulThumb from 'static/default-thumbnail.jpg';

import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';

import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { setOpenGalleryModal } from 'store/ducks/gallery/actions';
import { GalleryInModal } from 'screens/Gallery/GalleryInModal/GalleryInModal';

import { Editor } from '@tinymce/tinymce-react';
import slugify from 'slugify';
import { categoriesApi } from 'services/api';
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress';
import { LoadingStatus } from 'store/types';
import { theme } from 'theme';
import Backdrop from '@material-ui/core/Backdrop/Backdrop';
import { useForm, Controller } from 'react-hook-form';
import { useParams, Prompt } from 'react-router-dom';
import { newCategory } from 'store/ducks/category/contracts/state';
import { Beforeunload } from 'react-beforeunload';
import { DepthSearchSelect } from 'components/UI-parts/DepthSearchSelect';
const useStyles = makeStyles({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    loader: {
        color: '#fff',
    },
    img: {
        maxWidth: '100%',
        maxHeight: '480px',
    },
    input: {
        width: '100%',
    },
    btn_save: {
        marginBottom: '15px',
    },
    heading: {
        marginBottom: '25px',
        textAlign: 'center',
    },

    inpit__description: {
        width: '100%',
    },
    textarea: {
        width: '100%',
        marginBottom: '15px',
    },
    add_filters: {
        paddingBottom: '15px',
        width: '100%',
    },
    thumbnail: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: '15px',
        marginBottom: '15px',
    },
    modal_categories: {
        background: '#fff',
        padding: '25px 35px',
    },
    parent_category: {
        marginTop: '15px',
        width: '100%',
    },
    save_button: {
        position: 'fixed',
        right: '20px',
        top: '70px',
    },
});

export const AddCategoryPanel: React.FC = (props: any) => {
    const classes = useStyles();
    const categories = useSelector((state: RootState) => state.categories.categories);
    const categoriesNames = useSelector(
        (state: RootState) => state.categories.categoriesNames
    );
    const categoriesStatus = useSelector((state: RootState) => state.categories.status);
    const choosedGalleryItems = useSelector(
        (state: RootState) => state.gallery.choosed_items
    );
    const newCategoryGlobalState = useSelector((state: RootState) => state.categories);
    const dispatch = useDispatch();

    const [choosedGalleryThumb, setChoosedGalleryThumb] = useState<string | null>(null);
    const [createGalleryForEditor, setCreateGalleryForEditor] = useState(false);

    const { editCategoryId } = useParams<{ editCategoryId: string | undefined }>();
    const {
        handleSubmit,
        setError,
        setValue,
        getValues,
        control,
        formState: { errors, isDirty },
    } = useForm<newCategory>({
        defaultValues: {
            name: '',
            slug: '',
            parent_id: [],
            category_image: null,
            seo_title: '',
            seo_description: '',
            seo_keywords: '',
            long_description: 'Описание',
        },
    });

    // Логика редактирования уже существующей категории
    const fetchEditCategoryData = async () => {
        try {
            const { data } = await categoriesApi.getSingleCategory(editCategoryId);
            for (const key in data) {
                if (Object.prototype.hasOwnProperty.call(data, key)) {
                    const value = data[key];
                    // console.log(key);
                    if (key === 'parent_id') {
                        // console.log(categoriesNames && [categoriesNames[value]]);
                        setValue(
                            key,
                            categoriesNames && value ? [categoriesNames[value]] : []
                        );
                    }
                    if (
                        key !== '_id' &&
                        key !== 'parent_id' &&
                        key !== 'children' &&
                        key !== 'createdAt' &&
                        key !== 'updatedAt' &&
                        key !== '__v'
                    )
                        //@ts-ignore
                        setValue(key, value);
                }
            }

            dispatch(setNewCategoryThumb(data.category_image));
            setChoosedGalleryThumb(data.category_image);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        if (editCategoryId) {
            fetchEditCategoryData();
        }
        //eslint-disable-next-line
    }, []);

    //---
    useEffect(() => {
        if (categoriesStatus === LoadingStatus.NEVER) {
            dispatch(fetchCategoriesData());
        }
    }, [categoriesStatus, dispatch]);

    // открыть модалку с выбором картинки
    const handleOpenGalleryModal = () => {
        dispatch(setOpenGalleryModal(true));
    };
    //подтерждение выбора картинки для категории
    const handleCategoryImageSet = () => {
        if (Object.keys(choosedGalleryItems).length > 0) {
            setChoosedGalleryThumb(Object.keys(choosedGalleryItems)[0]);
            dispatch(setNewCategoryThumb(Object.values(choosedGalleryItems)[0]));
            dispatch(setOpenGalleryModal(false));
        }
    };
    //убрать выбранное изображение
    const handleRemoveCategoryImage = () => {
        dispatch(setNewCategoryImage(''));
        dispatch(setNewCategoryThumb(null));
    };
    //создание slug из имени
    const handleCreateSlugFromName = () => {
        const slug = slugify(getValues('name'), { lower: true });
        setValue('slug', slug, { shouldValidate: true });
    };

    useEffect(() => {
        return () => {
            dispatch(setNewCategoryThumb(null));
        };
    }, [dispatch]);

    //Ссылка на объект TinyMCE
    const editorRef = useRef<any>(null);
    const handleSetEditorImage = () => {
        editorRef.current.insertContent(
            `<img src="${process.env.REACT_APP_SERVER_UPLOADS}${
                Object.values(choosedGalleryItems)[0].name
            }"/>`
        );
        dispatch(setOpenGalleryModal(false));
        setCreateGalleryForEditor(false);
    };

    //обработчик отправки данных
    const postCategoryDataToServer = async (data: newCategory) => {
        try {
            dispatch(setCategoriesLoadingStatus(LoadingStatus.LOADING));
            const categoryData = Object.assign(data, {
                category_image: choosedGalleryThumb,
                parent_id:
                    data.parent_id && data.parent_id.length > 0
                        ? data.parent_id[0]._id
                        : null,
            });

            editCategoryId
                ? await categoriesApi.updateCategory(categoryData, editCategoryId)
                : await categoriesApi.addCategories(categoryData);
            dispatch(fetchCategoriesData());

            // console.log(res);
        } catch (error: any) {
            if (Object.keys(error.response.data).length > 0) {
                for (const key in error.response.data) {
                    // @ts-ignore
                    setError(key, {
                        type: 'manual',
                        message: error.response.data[key],
                    });
                }
            }
        } finally {
            dispatch(setCategoriesLoadingStatus(LoadingStatus.LOADED));
        }
    };
    //обработчик закрытия окна
    const beforeUnloadHandler = (event: any) => {
        event.preventDefault();
        return 'Are you sure you want to exit?';
    };

    return (
        <React.Fragment>
            {isDirty && (
                <Beforeunload onBeforeunload={(event) => beforeUnloadHandler(event)} />
            )}
            <Prompt
                when={isDirty}
                message="Вы действительно хотите уйти, ваши изменения не сохранятся"
            />
            <Typography className={classes.heading} variant="h4">
                {editCategoryId ? 'Редактирование категории' : ' Добавить категорию'}
            </Typography>
            <form onSubmit={handleSubmit(postCategoryDataToServer)}>
                <Grid container spacing={2}>
                    <Grid item xs={8}>
                        <Grid container spacing={1}>
                            <Grid item container spacing={2} xs={4}>
                                <Grid item xs={12}>
                                    <Typography variant="h6">Название</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Controller
                                        control={control}
                                        name="name"
                                        rules={{
                                            required: {
                                                value: true,
                                                message:
                                                    'Поле обязательно для заполнения',
                                            },
                                            minLength: {
                                                value: 3,
                                                message:
                                                    'Имя должно быть длинее 3-х символов',
                                            },
                                        }}
                                        render={({ field }) => (
                                            <TextField
                                                error={!!errors.name}
                                                helperText={errors.name?.message}
                                                label="Название категории"
                                                variant="outlined"
                                                className={classes.input}
                                                onChange={(e) => field.onChange(e)}
                                                value={field.value}
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleCreateSlugFromName}>
                                        Создать slug из названия
                                    </Button>
                                </Grid>
                                <Grid item xs={12}>
                                    <Controller
                                        control={control}
                                        name="slug"
                                        rules={{
                                            required: {
                                                value: true,
                                                message:
                                                    'Поле обязательно для заполнения',
                                            },
                                            minLength: {
                                                value: 3,
                                                message:
                                                    'Slug должен быть длинее 3-х символов',
                                            },
                                        }}
                                        render={({ field }) => (
                                            <TextField
                                                error={!!errors.slug}
                                                helperText={errors.slug?.message}
                                                label="Slug"
                                                variant="outlined"
                                                className={classes.input}
                                                onChange={(e) => field.onChange(e)}
                                                value={field.value}
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Controller
                                        control={control}
                                        name="parent_id"
                                        render={({ field }) => (
                                            <DepthSearchSelect
                                                options={categories}
                                                actionChipText="Выбрать родительскую категорию"
                                                depthKey="children"
                                                getOptionLabel={(option) => option?.name}
                                                getOptionValue={(option) => option?._id}
                                                className={classes.parent_category}
                                                onChange={(newValue) => {
                                                    field.onChange(newValue);
                                                }}
                                                value={field.value}
                                            />
                                        )}
                                    />
                                </Grid>
                            </Grid>
                            <Grid item xs={8}>
                                <Grid container alignItems="flex-start" spacing={2}>
                                    <Grid item xs={12}>
                                        <Typography variant="h6">SEO</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Controller
                                            control={control}
                                            name="seo_title"
                                            render={({ field }) => (
                                                <TextField
                                                    label="SEO title"
                                                    variant="outlined"
                                                    className={clsx(classes.input)}
                                                    onChange={(e) => field.onChange(e)}
                                                    value={field.value}
                                                />
                                            )}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Controller
                                            control={control}
                                            name="seo_keywords"
                                            render={({ field }) => (
                                                <TextField
                                                    label="SEO keywords"
                                                    variant="outlined"
                                                    className={clsx(classes.input)}
                                                    onChange={(e) => field.onChange(e)}
                                                    value={field.value}
                                                />
                                            )}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Controller
                                            control={control}
                                            name="seo_description"
                                            render={({ field }) => (
                                                <TextField
                                                    label="SEO description"
                                                    variant="outlined"
                                                    rows={4}
                                                    multiline
                                                    className={clsx(classes.input)}
                                                    onChange={(e) => field.onChange(e)}
                                                    value={field.value}
                                                />
                                            )}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid item xs={12}>
                                <div className={classes.textarea}>
                                    <Controller
                                        control={control}
                                        name="long_description"
                                        render={({ field: { value, onChange } }) => (
                                            <Editor
                                                onEditorChange={(newValue, editor) => {
                                                    onChange(newValue);
                                                }}
                                                value={value}
                                                apiKey={process.env.REACT_APP_TINYMCE_KEY}
                                                onInit={(evt, editor) =>
                                                    (editorRef.current = editor)
                                                }
                                                init={{
                                                    height: 450,
                                                    menubar: true,
                                                    plugins:
                                                        'autolink lists table code image imagetools ',
                                                    toolbar:
                                                        'undo image redo | bold italic underline strikethrough | insertMediaFromGallery | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist checklist | forecolor backcolor casechange permanentpen formatpainter removeformat | pagebreak  fullscreen  preview save | insertfile media pageembed template link anchor codesample | a11ycheck ltr rtl | showcomments addcomment code ',
                                                    setup: function (editor) {
                                                        editor.ui.registry.addButton(
                                                            'insertMediaFromGallery',
                                                            {
                                                                text: 'gallery',
                                                                icon: 'image',
                                                                onAction: function (_) {
                                                                    setCreateGalleryForEditor(
                                                                        true
                                                                    );
                                                                    handleOpenGalleryModal();
                                                                },
                                                            }
                                                        );
                                                    },
                                                }}
                                            />
                                        )}
                                    />
                                </div>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={4}>
                        <Grid container justifyContent="space-between">
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleOpenGalleryModal}
                                // className={classes.button}
                                startIcon={<AddPhotoAlternateIcon />}>
                                Добавить изображение
                            </Button>
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={handleRemoveCategoryImage}
                                // className={classes.button}
                                startIcon={<HighlightOffIcon />}>
                                Убрать изображение
                            </Button>
                        </Grid>
                        {createGalleryForEditor ? (
                            <GalleryInModal
                                singleChoosed
                                handlerConfirmButton={handleSetEditorImage}
                            />
                        ) : (
                            <GalleryInModal
                                singleChoosed
                                handlerConfirmButton={handleCategoryImageSet}
                            />
                        )}

                        <div className={classes.thumbnail}>
                            {' '}
                            <img
                                className={classes.img}
                                src={
                                    newCategoryGlobalState.newCategoryThumb
                                        ? `${process.env.REACT_APP_SERVER_UPLOADS}${newCategoryGlobalState.newCategoryThumb.name}`
                                        : defaulThumb
                                }
                                alt=""
                            />{' '}
                        </div>
                    </Grid>
                </Grid>

                <Button
                    type="submit"
                    className={classes.save_button}
                    variant="contained"
                    color="primary"
                    size="large"
                    startIcon={<SaveIcon />}>
                    Сохранить
                </Button>
            </form>

            <Backdrop
                className={classes.backdrop}
                open={categoriesStatus === LoadingStatus.LOADING}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </React.Fragment>
    );
};
