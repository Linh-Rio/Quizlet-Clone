import classnames from 'classnames/bind';
import { Link } from 'react-router-dom';
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
import { useState } from 'react';

import { useSelector } from 'react-redux';

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
  const user = useSelector((state) => state.user.user);
  const [isLogin, setIsLogin] = useState(user ? true : false);

  return (
    <div className={cx('container')}>
      <div className={cx('navigation')}>
        <div className={cx('logo')}></div>
        <Link to="/" className={cx('homepage')}>
          Home
        </Link>
        <div className={cx('library')}>
          {isLogin ? 'Your library' : 'Subject areas'}
        </div>
      </div>
      <div className={cx('search-bar')}>
        <SearchBar />
      </div>
      <div className={cx('icon-container')}>
        <Link to="/create-set" className={cx('create')}>
          <FontAwesomeIcon icon={faCirclePlus} />
        </Link>
        {isLogin ? (
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
                        <Link
                          to={`${item.name}`}
                          className={cx('name')}
                        >
                          {item.name}
                        </Link>
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
