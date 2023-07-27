import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import classNames from 'classnames/bind';

import styles from './AuthFormStyles.module.scss';
import {
  handleLogin,
  handleSignup,
} from '../../services/userService';
import InputPass from '../../components/InputPass';
import { loginSuccess } from '../../redux/slices/user';

const cx = classNames.bind(styles);

const AuthForm = () => {
  const [activePanel, setActivePanel] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [birthday, setBirthday] = useState('');

  const [errMessage, setErrMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');

    signUpButton.addEventListener('click', () => {
      setErrMessage('');
      setEmail('');
      setPassword('');
      setConfirmPass('');
      setActivePanel('right-panel-active');
    });

    signInButton.addEventListener('click', () => {
      setActivePanel('');
    });

    setErrMessage('');
    setShowPassword(false);
  }, [activePanel]);

  //sign up
  const handleOnSignUp = async () => {
    setErrMessage('');
    if (password === confirmPass) {
      try {
        let data = await handleSignup(
          firstName,
          lastName,
          userName,
          email,
          password,
          birthday,
        );
        if (data && data.errCode !== 0) {
          setErrMessage(data.message);
        }
        if (data && data.errCode === 0) {
          const payload = {
            id: data.user.id,
            firstName: data.user.firstName,
            lastName: data.user.lastName,
            userName: data.user.userName,
            email: data.user.email,
            birthday: data.user.birthday,
            avatar: data.user.avatar,
            token: data.token,
          };
          dispatch(loginSuccess(payload));
          navigate('/');
        }
      } catch (error) {
        console.log(error);
        if (error.response) {
          if (error.response.data) {
            setErrMessage(error.response.data.message);
          }
        }
      }
    } else {
      setErrMessage('your password does not match');
    }
  };

  //sign in
  const handleClickSignin = async () => {
    setErrMessage('');
    try {
      let data = await handleLogin(email, password);
      if (data && data.errCode !== 0) {
        setErrMessage(data.message);
      }
      if (data && data.errCode === 0) {
        //todo after login
        console.log(data.user);
        const payload = {
          id: data.user.id,
          firstName: data.user.firstName,
          lastName: data.user.lastName,
          userName: data.user.userName,
          email: data.user.email,
          birthday: data.user.birthday,
          avatar: data.user.avatar,
          token: data.token,
        };
        dispatch(loginSuccess(payload));
        navigate('/');
      }
    } catch (error) {
      console.log(error);
      if (error.response) {
        if (error.response.data) {
          setErrMessage(error.response.data.message);
        }
      }
    }
  };

  return (
    <div className={cx('Auth-container')}>
      <div className={cx('container', activePanel)} id="container">
        <div className={cx('form-container', 'sign-up-container')}>
          <form className={cx('form')}>
            <h1 className={cx('h1')}>Create Account</h1>
            {/* <div className={cx('social-container')}>
              <a className={cx('social')}>
                <i className={cx('fab', 'fa-facebook-f')}></i>
              </a>
              <a className={cx('social')}>
                <i className={cx('fab', 'fa-google-plus-g')}></i>
              </a>
              <a className={cx('social')}>
                <i className={cx('fab', 'fa-linkedin-in')}></i>
              </a>
            </div>
            <span>or use your email for registration</span> */}
            <div className={cx('fullname')}>
              <input
                type="text"
                placeholder="First name"
                className={cx('first-name')}
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              />
              <input
                type="text"
                placeholder="Last name"
                className={cx('last-name')}
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
              />
            </div>
            <input
              type="text"
              placeholder="User name"
              value={userName}
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <InputPass
              password={password}
              setPassword={setPassword}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              placeholder={'Password'}
            />

            <InputPass
              password={confirmPass}
              setPassword={setConfirmPass}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              placeholder={'Confirm password'}
              showEye={false}
            />

            <input
              type="text"
              onFocus={(e) => (e.target.type = 'date')}
              onBlur={(e) => (e.target.type = 'text')}
              placeholder="Your Birthday"
              value={birthday}
              onChange={(e) => {
                setBirthday(e.target.value);
              }}
            />
            <span
              className={cx('span')}
              style={{ color: 'red', paddingBottom: '7px' }}
            >
              {errMessage}
            </span>
            <button
              className={cx('button')}
              type="button"
              onClick={handleOnSignUp}
            >
              Sign Up
            </button>
          </form>
        </div>

        <div className={cx('form-container', 'sign-in-container')}>
          <form action="#" className={cx('form')}>
            <h1 className={cx('h1')}>Sign in</h1>
            {/* <div className={cx('social-container')}>
              <a href="#" className={cx('social')}>
                <i className={cx('fab', 'fa-facebook-f')}></i>
              </a>
              <a href="#" className={cx('social')}>
                <i className={cx('fab', 'fa-google-plus-g')}></i>
              </a>
              <a href="#" className={cx('social')}>
                <i className={cx('fab', 'fa-linkedin-in')}></i>
              </a>
            </div>
            <span>or use your account</span> */}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <InputPass
              password={password}
              setPassword={setPassword}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              placeholder={'Password'}
            />

            <span
              className={cx('span')}
              style={{ color: 'red', paddingBottom: '7px' }}
            >
              {errMessage}
            </span>
            <button
              className={cx('button')}
              onClick={handleClickSignin}
            >
              Sign In
            </button>
            <a className={cx('a')} href="/reset-password">
              Forgot your password?
            </a>
          </form>
        </div>

        <div className={cx('overlay-container')}>
          <div className={cx('overlay')}>
            <div className={cx('overlay-panel', 'overlay-left')}>
              <h1 className={cx('h1')}>Welcome Back!</h1>
              <p className={cx('p')}>
                To keep connected with us please login with your
                personal info
              </p>
              <button className={cx('button', 'ghost')} id="signIn">
                Sign In
              </button>
            </div>
            <div className={cx('overlay-panel', 'overlay-right')}>
              <h1 className={cx('h1')}>Hello, Friend!</h1>
              <p className={cx('p')}>
                Enter your personal details and start journey with us
              </p>
              <button className={cx('button', 'ghost')} id="signUp">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
