import React, { useEffect } from 'react';
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
//libs
import { useDispatch } from 'react-redux';
import slugify from 'slugify';
import { useForm, Controller } from 'react-hook-form';
import { useParams, Prompt } from 'react-router-dom';
//components
import { LoadingStatus } from 'store/types';
import { DepthSearchSelect } from 'components/UI-parts/DepthSearchSelect';
import { useAppSelector } from 'hooks/redux';
import { fetchCategoriesData } from 'store/ducks/category/actions';
const useStyles = makeStyles({
    wrapper: {
        marginTop: '35px',
        padding: '45px 26px',
    },
    save_btn: {
        position: 'fixed',
        right: '20px',
        top: '70px',
    },
    input: {
        width: '100%',
    },
    btn_slug: {
        height: '100%',
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
            attribute: [],
        },
    });
    useEffect(() => {
        if (categoriesStatus === LoadingStatus.NEVER) {
            dispatch(fetchCategoriesData());
        }
    }, [categoriesStatus, dispatch]);
    //создание slug из имени
    const handleCreateSlugFromName = (e: React.SyntheticEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const slug = slugify(getValues('name_admin'), { lower: true });
        setValue('slug', slug, { shouldValidate: true });
    };
    // const handleSubmit = () => {};
    return (
        <Grid container>
            <Grid item xs={12}>
                <Typography variant="h4"> Новый атрибут</Typography>
            </Grid>
            <Grid item xs={12}>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        console.log('submit');
                    }}>
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
                        <Grid item lg={7}>
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
                                            className={classes.btn_slug}
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
                        <Grid item lg={5}>
                            <Paper className={classes.wrapper}>
                                <Typography variant="h5">Значения атрибута</Typography>
                                <Box py={2}>
                                    <Typography variant="body2">
                                        Единица измерения одного атрибута
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
                                            onChange={(e) => field.onChange(e)}
                                            value={field.value}
                                        />
                                    )}
                                />
                                <Box py={2}>
                                    <Box>
                                        <Controller
                                            control={control}
                                            name="unit_text"
                                            render={({ field }) => (
                                                <TextField
                                                    error={!!errors.unit_text}
                                                    helperText={errors.unit_text?.message}
                                                    label="Еденица измерения"
                                                    variant="outlined"
                                                    onChange={(e) => field.onChange(e)}
                                                    value={field.value}
                                                />
                                            )}
                                        />
                                    </Box>
                                </Box>
                            </Paper>
                        </Grid>
                    </Grid>
                </form>
            </Grid>
        </Grid>
    );
};
