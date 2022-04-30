import React, { ReactEventHandler, useEffect } from 'react';
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
});

export const EditAttribute: React.FC = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const categories = useAppSelector((state) => state.categories.categories);
    const categoriesStatus = useAppSelector((state) => state.categories.status);
    const {
        handleSubmit,
        setError,
        setValue,
        getValues,
        control,
        formState: { errors, isDirty },
    } = useForm({
        defaultValues: {
            name_admin: '',
            name_user: '',
            slug: '',
            show_in_filter: false,
            unit_text: '',
            category: [],
            attribute: [{ value: '', slug: '' }],
        },
    });
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'attribute',
    });
    useEffect(() => {
        if (categoriesStatus === LoadingStatus.NEVER) {
            dispatch(fetchCategoriesData());
        }
    }, [categoriesStatus, dispatch]);
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
    //обработчик отправки данных
    const sendDataToServer = async (data) => {
        try {
        } catch (error) {}
    };
    // const handleSubmit = () => {};
    const onSubmit = (data: any) => console.log(data);
    return (
        <Grid container>
            <Grid item xs={12}>
                <Typography className={classes.title} variant="h4">
                    Новый атрибут
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <form onSubmit={handleSubmit(onSubmit)}>
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
                                                    control={<Checkbox color="primary" />}
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
                                            <Grid container spacing={2} key={item.id}>
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
