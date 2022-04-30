import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';

import { FilterParam } from '../../store/ducks/category/contracts/state';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        filter_group: {
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            marginTop: '15px',
        },
        filter_group__item: {
            marginRight: '15px',
        },
        add_param_btn: {
            background: theme.palette.success.main,
            color: '#fff',
            '&:hover': {
                background: theme.palette.success.dark,
            },
        },
        margin: {
            margin: theme.spacing(1),
        },
        withoutLabel: {
            marginTop: theme.spacing(3),
        },
        textField: {
            width: '25ch',
        },
        btn_wrapper: {
            paddingTop: '15px',
            width: '100%',
        },
    })
);
interface AddFilterParamsProps {
    filters: Array<any> | null;
    handleFilterParamsChange: (event: React.ChangeEvent, index: number) => void;
    handleAddFilterParams: () => void;
    handleRemoveFilterParam: (index: number) => void;
    handleFilterValuesBlur: (event: React.ChangeEvent, index: number) => void;
}
export const AddFilterParams = (props: AddFilterParamsProps) => {
    const classes = useStyles();
    // const handleFilterParamsChange = (event: any, index: number) => {
    //     const newCategoryInput: NewCategory = { ...newCategory };
    //     newCategoryInput.filters[index][event.target.name] = event.target.value;
    //     setNewCategory(newCategoryInput);
    // };
    // const handleFilterValuesBlur = (event: any, index: number) => {
    //     const newCategoryInput: NewCategory = { ...newCategory };
    //     let value = event.target.value.split(',');
    //     newCategoryInput.filters[index][event.target.name] = value;
    //     setNewCategory(newCategoryInput);
    // };
    // const handleAddFilterParams = () => {
    //     const newCategoryInput: NewCategory = { ...newCategory };
    //     newCategoryInput.filters.push({
    //         name: '',
    //         values: '',
    //     });
    //     setNewCategory(newCategoryInput);
    // };
    // const handleRemoveFilterParam = (index: number) => {
    //     const newCategoryInput: NewCategory = { ...newCategory };
    //     newCategoryInput.filters.splice(index, 1);
    //     setNewCategory(newCategoryInput);
    // };

    /* const handleBlurParams = (index: number, event: any) => {
        const paramsInput: any = [...params];
        paramsInput[index][event.target.name] = paramsInput[index][
            event.target.name
        ].split(',');
        setParams(paramsInput);
    }; */

    return (
        <>
            <div className={classes.filter_group}>
                {props.filters &&
                    props.filters.map((param: FilterParam, index: number) => (
                        <div className={classes.filter_group} key={index}>
                            <TextField
                                label="Значение"
                                name="value"
                                value={param.name}
                                variant="outlined"
                                onChange={(event) => {
                                    props.handleFilterParamsChange(event, index);
                                }}
                                className={classes.filter_group__item}
                            />
                            <TextField
                                label="Slug"
                                name="slug"
                                value={param.values}
                                variant="outlined"
                                onBlur={(event) => {
                                    props.handleFilterValuesBlur(event, index);
                                }}
                                onChange={(event) => {
                                    props.handleFilterParamsChange(event, index);
                                }}
                                className={classes.filter_group__item}
                            />
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={() => props.handleRemoveFilterParam(index)}
                                startIcon={<DeleteIcon />}>
                                Удалить
                            </Button>
                        </div>
                    ))}

                <div className={classes.btn_wrapper}>
                    <Button
                        variant="contained"
                        className={classes.add_param_btn}
                        onClick={props.handleAddFilterParams}
                        startIcon={<AddCircleOutlineIcon />}>
                        Добавить параметр
                    </Button>
                </div>
            </div>
            {/* <div className={classes.modal}>
                <div className={classes.add_filters}>
                    <Typography className={classes.heading} variant="h6">
                        Параметры фильтрации
                    </Typography>
                    <AddFilterParams
                        handleFilterValuesBlur={handleFilterValuesBlur}
                        handleRemoveFilterParam={handleRemoveFilterParam}
                        handleAddFilterParams={handleAddFilterParams}
                        handleFilterParamsChange={handleFilterParamsChange}
                        filters={newCategory.filters}
                    />
                </div>
            </div> */}
        </>
    );
};
