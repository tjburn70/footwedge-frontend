import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import CreateIcon from '@material-ui/icons/Create';

const MenuOptionsData = [
    {
        title: 'Home',
        path: '/',
        icon: <HomeIcon />,
        className: 'menu-item-text' 
    },
    {
        title: 'Player Profile',
        path: '/player-profile',
        icon: <PersonIcon />,
        className: 'menu-item-text' 
    },
    {
        title: 'Enter Round',
        path: '/enter-round',
        icon: <CreateIcon />,
        className: 'menu-item-text' 
    },
];

export { MenuOptionsData };
