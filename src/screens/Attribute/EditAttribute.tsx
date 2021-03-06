import React, { useEffect, useState } from 'react';
//mui
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
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
//other
import { LoadingStatus } from 'store/types';
import { DepthSearchSelect } from 'components/UI-parts/DepthSearchSelect';
import { useAppSelector } from 'hooks/redux';
import { fetchCategoriesData } from 'store/ducks/category/actions';
import { setOpenNotification } from 'store/ducks/notification/actions';
import { setAttributeLoadingStatus } from 'store/ducks/attribute/actions';
import { AttributeGroup } from 'store/ducks/attribute/contracts/state';
import { Category } from 'store/ducks/category/contracts/state';
import { AttributeApi } from 'services/api';
import { Preloader } from 'components/Preloader/Preloader';
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
interface IFormEditAttrState {
    name_admin: string;
    name_user: string;
    slug: string;
    show_in_filter: boolean;
    unit_text: string;
    category: Category[];
    attribute: Array<{ slug: string; value: string; _id?: string }>;
}
const EditAttribute: React.FC = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const categories = useAppSelector((state) => state.categories.categories);
    const categoriesStatus = useAppSelector((state) => state.categories.status);
    const attributeStatus = useAppSelector((state) => state.attribute.status);
    const categoriesNames = useAppSelector((state) => state.categories.categoriesNames);

    const [savedData, setSavedData] = useState(false);

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
                            ({
                                value,
                                slug,
                                _id,
                            }: {
                                value: string;
                                slug: string;
                                _id: string;
                            }) => ({
                                value,
                                slug,
                                _id,
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
            dispatch(
                setOpenNotification({
                    message: '???????????? ?????? ???????????????? ???????????? ????????????????',
                    severity: 'error',
                })
            );
        }
    };
    useEffect(() => {
        if (categoriesStatus === LoadingStatus.NEVER) {
            dispatch(fetchCategoriesData());
        }
    }, [categoriesStatus, dispatch]);
    //???????????????? ???????????? ??????????????????, ???????? ?????????? id
    useEffect(() => {
        if (editAttrId) {
            fetchEditAttrData();
        }
        //eslint-disable-next-line
    }, []);
    //???????????????? slug ?????? ???????????????? ???? ??????????
    const handleCreateSlugFromName = (e: React.SyntheticEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const slug = slugify(getValues('name_admin'), { lower: true });
        setValue('slug', slug, { shouldValidate: true });
    };
    //???????????????? slug ?????? ???????????????? ???????????????? ???? ????????????????
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
    //???????????????? ???? ?????????????????????? ???? slug ???????????????? ????????????????
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

        return flag || 'slug ???????????? ???????? ????????????????????';
    };

    //???????????????????? ???????????????? ????????????
    const sendDataToServer = async (data: AttributeGroup) => {
        try {
            dispatch(setAttributeLoadingStatus(LoadingStatus.LOADING));
            // @ts-ignore
            const categoryId = data.category.length > 0 ? data.category[0]._id : null;
            const attributeData = {
                ...data,
                ...{
                    category: categoryId,
                },
            };
            editAttrId
                ? await AttributeApi.updateAttributeGroup(attributeData, editAttrId)
                : await AttributeApi.postSingleAttributeGroup(attributeData);

            setSavedData(true);
            editAttrId
                ? dispatch(
                      setOpenNotification({
                          message: '?????????????? ????????????????',
                          severity: 'success',
                      })
                  )
                : dispatch(
                      setOpenNotification({
                          message: '?????????????? ????????????',
                          severity: 'success',
                      })
                  );
        } catch (error: any) {
            console.log(error);
            if (error.response && Object.keys(error?.response?.data).length > 0) {
                for (const key in error.response.data) {
                    // @ts-ignore
                    setError(key, {
                        type: 'manual',
                        message: error.response.data[key],
                    });
                }
            }

            editAttrId
                ? dispatch(
                      setOpenNotification({
                          message: '???????????? ?????? ???????????????????? ????????????????',
                          severity: 'error',
                      })
                  )
                : dispatch(
                      setOpenNotification({
                          message: '???????????? ?????? ???????????????? ????????????????',
                          severity: 'error',
                      })
                  );
        } finally {
            dispatch(setAttributeLoadingStatus(LoadingStatus.LOADED));
        }
    };
    return (
        <Grid container>
            <Prompt
                when={isDirty && !savedData}
                message="???? ?????????????????????????? ???????????? ????????, ???????? ?????????????????? ???? ????????????????????"
            />

            <Preloader open={attributeStatus === LoadingStatus.LOADING} />

            <Grid item xs={12}>
                <Typography className={classes.title} variant="h4">
                    {editAttrId ? '???????????????????????????? ????????????????' : '?????????? ??????????????'}
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
                        ??????????????????
                    </Button>
                    <Grid container spacing={2}>
                        <Grid item lg={6}>
                            <Paper className={classes.wrapper}>
                                <Grid container spacing={2}>
                                    <Grid item lg={12}>
                                        <Box pb={2}>
                                            <Typography variant="body2">
                                                ?????? ?????????????????? ?????? ????????????????????????????, ?? ????????????
                                                ???????????? ?? ?????????? ????????????. ???????????????? ????????????
                                                ???????? ????????????????????.
                                            </Typography>
                                        </Box>

                                        <Controller
                                            control={control}
                                            name="name_admin"
                                            rules={{
                                                required: {
                                                    value: true,
                                                    message:
                                                        '???????? ?????????????????????? ?????? ????????????????????',
                                                },
                                                minLength: {
                                                    value: 3,
                                                    message:
                                                        '?????? ???????????? ???????? ???????????? 3-?? ????????????????',
                                                },
                                            }}
                                            render={({ field }) => (
                                                <TextField
                                                    error={!!errors.name_admin}
                                                    helperText={
                                                        errors.name_admin?.message
                                                    }
                                                    label="?????? ???????????????? ?? ?????????? ????????????"
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
                                                ???????????????? ???????????? ??????????????????, ?????????????? ??????????
                                                ?????????????????? ?? ???????????????????? ????????????????
                                            </Typography>
                                        </Box>

                                        <Controller
                                            control={control}
                                            name="name_user"
                                            rules={{
                                                required: {
                                                    value: true,
                                                    message:
                                                        '???????? ?????????????????????? ?????? ????????????????????',
                                                },
                                                minLength: {
                                                    value: 3,
                                                    message:
                                                        '?????? ???????????? ???????? ???????????? 3-?? ????????????????',
                                                },
                                            }}
                                            render={({ field }) => (
                                                <TextField
                                                    error={!!errors.name_user}
                                                    helperText={errors.name_user?.message}
                                                    label="?????? ???????????????? ?????? ??????????????"
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
                                                        '???????? ?????????????????????? ?????? ????????????????????',
                                                },
                                                minLength: {
                                                    value: 3,
                                                    message:
                                                        'Slug ???????????? ???????? ???????????? 3-?? ????????????????',
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
                                            ?????????????? slug ???? ?????????? ?? ?????????? ????????????
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Controller
                                            control={control}
                                            name="category"
                                            render={({ field }) => (
                                                <DepthSearchSelect
                                                    options={categories}
                                                    actionChipText="?????????????? ?????????????????? ????????????????"
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
                                                    label=" ???????????????????? ?????????????? ?? ???????????? ????????????????, ??
                                                   ???????????????? ????????????????"
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
                                <Typography variant="h5">???????????????? ????????????????</Typography>
                                <Box py={2}>
                                    <Typography variant="body2">
                                        ?????????????? ?????????????????? ???????????? ????????????????. ?????????????????????? ????
                                        ???????? ?????????????????????? ??????????????????
                                    </Typography>
                                </Box>

                                <Controller
                                    control={control}
                                    name="unit_text"
                                    render={({ field }) => (
                                        <TextField
                                            error={!!errors.unit_text}
                                            helperText={errors.unit_text?.message}
                                            label="?????????????? ??????????????????"
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
                                                                    '???????? ?????????????????????? ?????? ????????????????????',
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
                                                                label="????????????????"
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
                                                                    '???????? ?????????????????????? ?????? ????????????????????',
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
                                        ???????????????? ????????????????
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
export default EditAttribute;
