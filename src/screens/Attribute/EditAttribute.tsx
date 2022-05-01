import React, { useEffect, useState, useCallback } from 'react';
//mui
import {
    Box,
    Button,
    Grid,
    makeStyles,
    Paper,
    TextField,
    Typography,
    FormControlLabel,
    Checkbox,
} from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import AddIcon from '@material-ui/icons/Add';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import IconButton from '@material-ui/core/IconButton';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import Backdrop from '@material-ui/core/Backdrop/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress';
import { theme } from 'theme';

//libs
import { useDispatch } from 'react-redux';
import slugify from 'slugify';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { useParams, Prompt } from 'react-router-dom';
//components
import { LoadingStatus } from 'store/types';
import { DepthSearchSelect } from 'components/UI-parts/DepthSearchSelect';
import { useAppSelector } from 'hooks/redux';
import { fetchCategoriesData } from 'store/ducks/category/actions';
import { setAttributeLoadingStatus } from 'store/ducks/attribute/actions';
import { AttributeGroup } from 'store/ducks/attribute/contracts/state';
import { Category } from 'store/ducks/category/contracts/state';
import { AttributeApi } from 'services/api';
import { SnackBarMessage } from 'components/UI-parts/SnackBarMessage';
const useStyles = makeStyles({
    title: {
        paddingBottom: '15px',
    },
    wrapper: {
        padding: '45px 26px',
        height: '100%',
    },
    save_btn: {
        position: 'fixed',
        right: '20px',
        top: '70px',
    },
    input: {
        width: '100%',
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
});
interface IFormEditAttrState {
    name_admin: string;
    name_user: string;
    slug: string;
    show_in_filter: boolean;
    unit_text: string;
    category: Category[];
    attribute: Array<{ slug: string; value: string }>;
}
export const EditAttribute: React.FC = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const categories = useAppSelector((state) => state.categories.categories);
    const categoriesStatus = useAppSelector((state) => state.categories.status);
    const attributeStatus = useAppSelector((state) => state.attribute.status);
    const categoriesNames = useAppSelector((state) => state.categories.categoriesNames);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackBarMessage, setSnackBarMessage] = useState('');
    const { editAttrId } = useParams<{ editAttrId: string | undefined }>();
    const {
        handleSubmit,
        setError,
        setValue,
        getValues,
        control,
        formState: { errors, isDirty },
    } = useForm<IFormEditAttrState>({
        defaultValues: {
            name_admin: '',
            name_user: '',
            slug: '',
            show_in_filter: false,
            unit_text: '',
            category: [],
            attribute: [],
        },
    });
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'attribute',
    });
    const fetchEditAttrData = async () => {
        try {
            const { data } = await AttributeApi.getSingleAttrData(editAttrId);
            for (const key in data) {
                if (Object.prototype.hasOwnProperty.call(data, key)) {
                    const value = data[key];
                    if (key === 'category') {
                        setValue(
                            key,
                            //@ts-ignore
                            categoriesNames && value ? [categoriesNames[value]] : []
                        );
                    }
                    if (key === 'attribute') {
                        const attr = value.map(
                            ({ value, slug }: { value: string; slug: string }) => ({
                                value,
                                slug,
                            })
                        );
                        setValue(key, attr);
                    }
                    if (
                        key !== '_id' &&
                        key !== 'attribute' &&
                        key !== 'category' &&
                        key !== 'children' &&
                        key !== 'createdAt' &&
                        key !== 'updatedAt'
                    )
                        //@ts-ignore
                        setValue(key, value);
                }
            }
        } catch (error) {
            setSnackbarOpen(true);
            setSnackBarMessage('Ошибка при загрузке данных атрибута');
        }
    };
    useEffect(() => {
        if (categoriesStatus === LoadingStatus.NEVER) {
            dispatch(fetchCategoriesData());
        }
    }, [categoriesStatus, dispatch]);
    //получить данные категории, если задан id
    useEffect(() => {
        if (editAttrId) {
            fetchEditAttrData();
        }
        //eslint-disable-next-line
    }, []);
    //создание slug для атрибута из имени
    const handleCreateSlugFromName = (e: React.SyntheticEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const slug = slugify(getValues('name_admin'), { lower: true });
        setValue('slug', slug, { shouldValidate: true });
    };
    //создание slug для значения атрибута из значения
    const handleCreateSlugFromValue = (
        e: React.SyntheticEvent<HTMLButtonElement>,
        index: number
    ) => {
        e.preventDefault();
        const attributeArr = getValues('attribute');
        const slug = slugify(attributeArr[index].value, { lower: true });
        attributeArr[index].slug = slug;
        setValue('attribute', attributeArr, { shouldValidate: true });
    };
    //проверка не повторяется ли slug значения атрибута
    const validateAsUniqSlugInAttribute = (value: string, index: number) => {
        let flag = true;
        const currentValues = getValues('attribute');
        currentValues.forEach((item, iterationCount) => {
            if (
                item.slug.toLocaleLowerCase() === value.toLocaleLowerCase() &&
                iterationCount !== index
            ) {
                flag = false;
            }
        });

        return flag || 'slug должен быть уникальным';
    };
    //обработчик кнопки закрытия окна с сообщением
    const closeSnackBar = useCallback(() => {
        setSnackbarOpen(false);
    }, []);

    //обработчик отправки данных
    const sendDataToServer = async (data: AttributeGroup) => {
        try {
            dispatch(setAttributeLoadingStatus(LoadingStatus.LOADING));
            // @ts-ignore
            const categoryId = data.category[0]._id;
            const attributeData = {
                ...data,
                ...{
                    category: categoryId,
                },
            };
            await AttributeApi.postSingleAttributeGroup(attributeData);
            setSnackbarOpen(true);
            setSnackBarMessage('Атрибут создан');
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
            setSnackbarOpen(true);
            setSnackBarMessage('Ошибка при создании атрибута');
        } finally {
            dispatch(setAttributeLoadingStatus(LoadingStatus.LOADED));
        }
    };
    return (
        <Grid container>
            <SnackBarMessage open={snackbarOpen} handleClose={closeSnackBar}>
                {snackBarMessage}
            </SnackBarMessage>
            <Backdrop
                className={classes.backdrop}
                open={attributeStatus === LoadingStatus.LOADING}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <Grid item xs={12}>
                <Typography className={classes.title} variant="h4">
                    {editAttrId ? 'Редактирование атрибута' : 'Новый атрибут'}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <form onSubmit={handleSubmit(sendDataToServer)}>
                    <Button
                        type="submit"
                        className={classes.save_btn}
                        variant="contained"
                        color="primary"
                        size="large"
                        startIcon={<SaveIcon />}>
                        Сохранить
                    </Button>
                    <Grid container spacing={2}>
                        <Grid item lg={6}>
                            <Paper className={classes.wrapper}>
                                <Grid container spacing={2}>
                                    <Grid item lg={12}>
                                        <Box pb={2}>
                                            <Typography variant="body2">
                                                Имя создается для администратора, и видимо
                                                только в админ панели. Значение должно
                                                быть уникальным.
                                            </Typography>
                                        </Box>

                                        <Controller
                                            control={control}
                                            name="name_admin"
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
                                                    error={!!errors.name_admin}
                                                    helperText={
                                                        errors.name_admin?.message
                                                    }
                                                    label="Имя атрибута в админ панели"
                                                    variant="outlined"
                                                    className={classes.input}
                                                    onChange={(e) => field.onChange(e)}
                                                    value={field.value}
                                                />
                                            )}
                                        />
                                    </Grid>
                                    <Grid item lg={12}>
                                        <Box pb={2}>
                                            <Typography variant="body2">
                                                Название группы атрибутов, которые будет
                                                выводится в заголовках фильтров
                                            </Typography>
                                        </Box>

                                        <Controller
                                            control={control}
                                            name="name_user"
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
                                                    error={!!errors.name_user}
                                                    helperText={errors.name_user?.message}
                                                    label="Имя атрибута для клиента"
                                                    variant="outlined"
                                                    className={classes.input}
                                                    onChange={(e) => field.onChange(e)}
                                                    value={field.value}
                                                />
                                            )}
                                        />
                                    </Grid>
                                    <Grid item lg={6}>
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
                                    <Grid item lg={6}>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={handleCreateSlugFromName}>
                                            Создать slug из имени в админ панели
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Controller
                                            control={control}
                                            name="category"
                                            render={({ field }) => (
                                                <DepthSearchSelect
                                                    options={categories}
                                                    actionChipText="Выбрать категорию атрибута"
                                                    depthKey="children"
                                                    getOptionLabel={(option) =>
                                                        option?.name
                                                    }
                                                    getOptionValue={(option) =>
                                                        option?._id
                                                    }
                                                    onChange={(newValue) => {
                                                        field.onChange(newValue);
                                                    }}
                                                    value={field.value}
                                                />
                                            )}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Controller
                                            control={control}
                                            name="show_in_filter"
                                            render={({ field }) => (
                                                <FormControlLabel
                                                    value={field.value}
                                                    onChange={(e) => field.onChange(e)}
                                                    control={
                                                        <Checkbox
                                                            color="primary"
                                                            checked={field.value}
                                                        />
                                                    }
                                                    label=" Показывать атрибут в панели фильтров, в
                                                   каталоге магазина"
                                                    labelPlacement="end"
                                                />
                                            )}
                                        />
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                        <Grid item lg={6}>
                            <Paper className={classes.wrapper}>
                                <Typography variant="h5">Значения атрибута</Typography>
                                <Box py={2}>
                                    <Typography variant="body2">
                                        Единица измерения одного атрибута. Применяется ко
                                        всем добавленным атрибутам
                                    </Typography>
                                </Box>

                                <Controller
                                    control={control}
                                    name="unit_text"
                                    render={({ field }) => (
                                        <TextField
                                            error={!!errors.unit_text}
                                            helperText={errors.unit_text?.message}
                                            label="Еденица измерения"
                                            variant="outlined"
                                            className={classes.input}
                                            onChange={(e) => field.onChange(e)}
                                            value={field.value}
                                        />
                                    )}
                                />
                                <Box py={2}>
                                    {fields.map((item, index) => {
                                        return (
                                            <Grid
                                                container
                                                spacing={2}
                                                key={item.id}
                                                style={{ paddingTop: 10 }}>
                                                <Grid item xs={5}>
                                                    <Controller
                                                        control={control}
                                                        name={
                                                            `attribute.${index}.value` as const
                                                        }
                                                        rules={{
                                                            required: {
                                                                value: true,
                                                                message:
                                                                    'Поле обязательно для заполнения',
                                                            },
                                                        }}
                                                        render={({
                                                            field,
                                                            fieldState,
                                                        }) => (
                                                            <TextField
                                                                error={
                                                                    !!errors?.attribute?.[
                                                                        index
                                                                    ]?.value
                                                                }
                                                                helperText={
                                                                    fieldState.error
                                                                        ?.message
                                                                }
                                                                className={classes.input}
                                                                label="Значение"
                                                                variant="outlined"
                                                                onChange={(e) =>
                                                                    field.onChange(e)
                                                                }
                                                                value={field.value}
                                                            />
                                                        )}
                                                    />
                                                </Grid>
                                                <Grid item xs={5}>
                                                    <Controller
                                                        control={control}
                                                        name={
                                                            `attribute.${index}.slug` as const
                                                        }
                                                        rules={{
                                                            required: {
                                                                value: true,
                                                                message:
                                                                    'Поле обязательно для заполнения',
                                                            },
                                                            validate: (value) => {
                                                                return validateAsUniqSlugInAttribute(
                                                                    value,
                                                                    index
                                                                );
                                                            },
                                                        }}
                                                        render={({
                                                            field,
                                                            fieldState,
                                                        }) => (
                                                            <TextField
                                                                error={
                                                                    !!errors?.attribute?.[
                                                                        index
                                                                    ]?.slug
                                                                }
                                                                helperText={
                                                                    fieldState.error
                                                                        ?.message
                                                                }
                                                                className={classes.input}
                                                                label="Slug"
                                                                variant="outlined"
                                                                onChange={(e) =>
                                                                    field.onChange(e)
                                                                }
                                                                value={field.value}
                                                            />
                                                        )}
                                                    />
                                                </Grid>
                                                <Grid item xs={1}>
                                                    <IconButton
                                                        onClick={(e: any) => {
                                                            handleCreateSlugFromValue(
                                                                e,
                                                                index
                                                            );
                                                        }}
                                                        color="primary"
                                                        component="span">
                                                        <AutorenewIcon />
                                                    </IconButton>
                                                </Grid>
                                                <Grid item xs={1}>
                                                    <IconButton
                                                        onClick={(e: any) => {
                                                            e.preventDefault();
                                                            remove(index);
                                                        }}
                                                        color="secondary"
                                                        component="span">
                                                        <RemoveCircleOutlineIcon />
                                                    </IconButton>
                                                </Grid>
                                            </Grid>
                                        );
                                    })}
                                </Box>
                                <Box>
                                    <Button
                                        onClick={() =>
                                            append({
                                                value: '',
                                                slug: '',
                                            })
                                        }
                                        variant="contained"
                                        color="primary"
                                        size="large"
                                        startIcon={<AddIcon />}>
                                        Добавить значение
                                    </Button>
                                </Box>
                            </Paper>
                        </Grid>
                    </Grid>
                </form>
            </Grid>
        </Grid>
    );
};
