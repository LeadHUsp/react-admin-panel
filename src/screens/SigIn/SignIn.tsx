import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSignIn } from '../../store/ducks/auth/actions';
import { RootState } from '../../store/store';
import { Redirect } from 'react-router-dom';
import wall from 'static/logindesk.jpg';
import { url } from 'inspector';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        login: {
            height: '100%',
        },
        login__wallpaper: {
            width: '100%',
            height: '100%',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center right',
            display: 'none',
            '@media screen and (min-width:600px)': {
                display: 'block',
            },
        },
        login__form: {
            background: '#fff',
            borderLeft: '1px solid #ecf0f1',
        },
        form: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '10px',
            height: '100%',
            '@media screen and (min-width:420px)': {
                padding: '25px',
            },
        },
        form__wrapper: {
            maxWidth: '350px',
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
            <Grid container className={classes.login}>
                <Grid item xl={3} md={4} sm={7} xs={12} className={classes.login__form}>
                    <div className={classes.form}>
                        <Typography align="center" variant="h5">
                            Gadget-Shop
                        </Typography>
                        <Typography align="center" variant="subtitle1" paragraph>
                            панель администратора
                        </Typography>
                        <div className={classes.form__wrapper}>
                            <Typography align="left" variant="subtitle1" paragraph>
                                Добро пожаловать! Пожалуйста введите email и пароль для
                                входа чтобы продолжить.
                            </Typography>
                            <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                                <div>
                                    <TextField
                                        className={classes.form__input}
                                        label="Email"
                                        value={email}
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                        }}
                                    />
                                </div>
                                <div>
                                    <TextField
                                        className={classes.form__input}
                                        value={pas}
                                        type="password"
                                        label="Пароль"
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
                                    Войти
                                </Button>
                            </form>
                        </div>
                    </div>
                </Grid>
                <Grid item xl={9} md={8} sm={5}>
                    <div
                        style={{ backgroundImage: `url(${wall})` }}
                        className={classes.login__wallpaper}></div>
                </Grid>
            </Grid>
        );
    }
}
