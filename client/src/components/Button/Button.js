import classNames from 'classnames/bind';
import styles from './ButtonStyle.module.scss';

const cx = classNames.bind(styles);

const Button = ({ logo, text }) => {
  return (
    <button className={cx('Button')}>
      <span className={cx('logo')}>{logo}</span>
      <span className={cx('text')}>{text}</span>
    </button>
  );
};

export default Button;
