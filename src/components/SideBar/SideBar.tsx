import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AllInboxIcon from '@material-ui/icons/AllInbox';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import PermMediaOutlinedIcon from '@material-ui/icons/PermMediaOutlined';
import RateReviewOutlinedIcon from '@material-ui/icons/RateReviewOutlined';
import ListIcon from '@material-ui/icons/List';
import TuneIcon from '@material-ui/icons/Tune';
import Divider from '@material-ui/core/Divider';
import { NavLink } from 'react-router-dom';

export const SideBar: React.FC = (): React.ReactElement => {
    return (
        <>
            <List>
                {[
                    {
                        name: 'Категории',
                        link: '/categories',
                        component: <ListIcon />,
                    },
                    { name: 'Товары', link: '/products', component: <AllInboxIcon /> },
                    {
                        name: 'Атрибуты',
                        link: '/attribute',
                        component: <TuneIcon />,
                    },
                    {
                        name: 'Заказы',
                        link: '/orders',
                        component: <ShoppingBasketIcon />,
                    },
                    {
                        name: 'Отзывы',
                        link: '/reviews',
                        component: <RateReviewOutlinedIcon />,
                    },
                    {
                        name: 'Галерея',
                        link: '/gallery',
                        component: <PermMediaOutlinedIcon />,
                    },
                ].map((item) => (
                    <ListItem
                        key={item.name}
                        button
                        component={NavLink}
                        to={item.link}
                        color="primary">
                        <ListItemIcon>{item.component}</ListItemIcon>
                        <ListItemText primary={item.name} />
                    </ListItem>
                ))}
            </List>
            <Divider />
        </>
    );
};
