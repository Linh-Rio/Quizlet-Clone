import {
  faEye,
  faEyeSlash,
} from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import styles from './InputPassStyle.module.scss';

const cx = classNames.bind(styles);

const InputPass = ({
  showPassword,
  setShowPassword,
  password,
  setPassword,
  placeholder,
  showEye = true,
}) => {
  return (
    <div className={cx('container')}>
      <input
        className={cx('input')}
        type={showPassword ? 'text' : 'password'}
        placeholder={placeholder}
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      {showEye && (
        <span
          className={cx('show-btn')}
          onClick={() => {
            setShowPassword(!showPassword);
          }}
        >
          {showPassword ? (
            <FontAwesomeIcon icon={faEye} />
          ) : (
            <FontAwesomeIcon icon={faEyeSlash} />
          )}
        </span>
      )}
    </div>
  );
};

export default InputPass;
