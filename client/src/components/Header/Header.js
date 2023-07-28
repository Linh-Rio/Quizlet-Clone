import classnames from 'classnames/bind';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRightFromBracket,
  faBell,
  faCirclePlus,
  faGear,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react/headless';

import styles from './HeaderStyle.module.scss';
import SearchBar from '../SearchBar/SearchBar';
import { useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';
import jwtDecode from 'jwt-decode';
import { loginSuccess, logoutSuccess } from '../../redux/slices/user';

const cx = classnames.bind(styles);

const avartarMenu = [
  { name: 'Profile', icon: <FontAwesomeIcon icon={faUser} /> },
  { name: 'Setting', icon: <FontAwesomeIcon icon={faGear} /> },
  {
    name: 'Logout',
    icon: <FontAwesomeIcon icon={faArrowRightFromBracket} />,
  },
];

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('profile')),
  );

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    const oldUser = JSON.parse(localStorage.getItem('profile'));
    setUser(oldUser);

    const payload = {
      id: oldUser?.id,
      firstName: oldUser.firstName,
      lastName: oldUser.lastName,
      userName: oldUser.userName,
      email: oldUser.email,
      birthday: oldUser.birthday,
      avatar: oldUser.avatar,
      token: oldUser.token,
    };
    dispatch(loginSuccess(payload));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  const logout = () => {
    dispatch(logoutSuccess());
    navigate('/authform'); // redirect to login page
    setUser(null);
  };

  return (
    <div className={cx('container')}>
      <div className={cx('navigation')}>
        <Link to="/" className={cx('logo')}></Link>
        <Link to="/" className={cx('homepage')}>
          Home
        </Link>
        <div className={cx('library')}>
          {user ? 'Your library' : 'Subject areas'}
        </div>
      </div>
      <div className={cx('search-bar')}>
        <SearchBar />
      </div>
      <div className={cx('icon-container')}>
        <Link to="/create-set" className={cx('create')}>
          <FontAwesomeIcon icon={faCirclePlus} />
        </Link>
        {user ? (
          <div className={cx('login-container')}>
            <div className={cx('notice')}>
              <FontAwesomeIcon icon={faBell} />
            </div>

            <Tippy
              placement="bottom-end"
              // visible={true}
              offset={[0, 5]}
              interactive
              delay={[0, 500]}
              appendTo={document.body}
              render={(attrs) => (
                <div
                  className={cx('avatar-container')}
                  tabIndex="-1"
                  {...attrs}
                >
                  <div className={cx('profile-tag')}>
                    <img
                      src={require('../../assets/images/avartar.jpg')}
                      alt="avatar"
                      className={cx('profile-avatar')}
                    />
                    <div className={cx('username')}>VanLinh256</div>
                    <div className={cx('profile-email')}>
                      vanlinhnguyenvp123...
                    </div>
                  </div>
                  {avartarMenu.map((item, index) => {
                    return (
                      <button className={cx('btn')} key={index}>
                        <span className={cx('icon')}>
                          {item.icon}
                        </span>
                        {item.name === 'Logout' ? (
                          <div
                            className={cx('name')}
                            onClick={logout}
                          >
                            {item.name}
                          </div>
                        ) : (
                          <Link
                            to={`/${item.name.toLowerCase()}`}
                            className={cx('name')}
                          >
                            {item.name}
                          </Link>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            >
              <img
                className={cx('avatar')}
                src={require('../../assets/images/avartar.jpg')}
                alt="avartar"
              />
            </Tippy>
          </div>
        ) : (
          <div className={cx('login-container')}>
            <Link to="/authform" className={cx('Button')}>
              Log in
            </Link>
            <Link to="/authform" className={cx('Button', 'yellow')}>
              Sign up
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
