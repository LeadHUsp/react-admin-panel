import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSignIn } from '../../store/ducks/auth/actions';
import { RootState } from '../../store/store';
import { Redirect } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        form: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
        },
        form__wrapper: {
            width: '320px',
            padding: theme.spacing(2),
        },
        form__input: {
            marginTop: theme.spacing(2),
            width: '100%',
        },
        form__btn: {
            marginTop: theme.spacing(3),
            width: '100%',
        },
    })
);

export default function SignIn() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [email, setEmail] = useState<string | null>('test@email.ru');
    const [pas, setPas] = useState<string | null>('123456');
    const isAuth = useSelector((state: RootState) => state.auth.isAuth);
    const handleSubmit = (event: any): any => {
        event.preventDefault();

        dispatch(
            fetchSignIn({
                email: email,
                password: pas,
            })
        );
    };
    if (isAuth) {
        return (
            <Redirect
                to={{
                    pathname: '/',
                }}
            />
        );
    } else {
        return (
            <div className={classes.form}>
                <Paper className={classes.form__wrapper}>
                    <Typography align="center" variant="h5" paragraph>
                        Sign In
                    </Typography>
                    <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                        <div>
                            <TextField
                                className={classes.form__input}
                                id="standard-basic"
                                label="Email"
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                            />
                        </div>
                        <div>
                            <TextField
                                className={classes.form__input}
                                id="standard-basic"
                                label="Password"
                                onChange={(e) => {
                                    setPas(e.target.value);
                                }}
                            />
                        </div>
                        <Button
                            className={classes.form__btn}
                            type="submit"
                            variant="contained"
                            color="primary">
                            sign in
                        </Button>
                    </form>
                </Paper>
            </div>
        );
    }
}
