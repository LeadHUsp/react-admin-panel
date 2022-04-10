import React, { useState } from 'react';
import { RootState } from 'store/store';
import { useSelector, useDispatch } from 'react-redux';
//MUI
import {
    Drawer,
    TextField,
    Checkbox,
    FormControlLabel,
    FormGroup,
    Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { theme } from 'theme';
//store
import { setOpenAttributeEditPanel } from 'store/ducks/attribute/actions';

const useStyles = makeStyles({
    addbtn: {
        fontSize: 11,
    },

    edit_panel: {
        width: '500px',
    },
    input: {
        padding: theme.spacing(2),
    },
    edit_title: {
        textAlign: 'center',
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
});

export const EditAttributePanel: React.FC = () => {
    const dispatch = useDispatch();
    const classes = useStyles();

    const editPanelOpenStatus = useSelector(
        (state: RootState) => state.attribute.open_edit_panel
    );
    const closeEditPanel = () => {
        dispatch(setOpenAttributeEditPanel(false));
    };

    return (
        <Drawer anchor="right" open={editPanelOpenStatus} onClose={closeEditPanel}>
            <div className={classes.edit_panel}>
                <form>
                    <Typography
                        className={classes.edit_title}
                        variant="h6"
                        id="tableTitle"
                        component="div">
                        Редактирование
                    </Typography>

                    <FormGroup aria-label="position" className={classes.input}>
                        <TextField
                            id="outlined-disabled"
                            label="Имя атрибута (на клиенте)"
                            variant="outlined"
                        />
                    </FormGroup>

                    <FormGroup aria-label="position" className={classes.input}>
                        <TextField
                            id="outlined-disabled"
                            label="Имя атрибута (в админ панели)"
                            variant="outlined"
                        />
                    </FormGroup>

                    <FormGroup className={classes.input}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    inputProps={{
                                        'aria-label': 'uncontrolled-checkbox',
                                    }}
                                />
                            }
                            label="Показывать как фильтр"
                        />
                    </FormGroup>

                    <FormGroup aria-label="position" className={classes.input}>
                        <TextField
                            id="outlined-disabled"
                            label="Единица измерения"
                            variant="outlined"
                        />
                    </FormGroup>
                    <FormGroup
                        aria-label="position"
                        className={classes.input}></FormGroup>

                    <FormGroup aria-label="position" className={classes.input}>
                        <TextField
                            disabled
                            label="Единица измерения"
                            variant="outlined"
                        />
                    </FormGroup>
                </form>
            </div>
        </Drawer>
    );
};
