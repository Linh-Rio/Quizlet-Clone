import classNames from 'classnames/bind';
import styles from './FeatureButtonStyle.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const FeatureButton = ({ logo, text, setId }) => {
  return (
    <Link
      to={`/${setId}/${text.toLowerCase()}`}
      className={cx('Button')}
    >
      <span className={cx('logo')}>{logo}</span>
      <span className={cx('text')}>{text}</span>
    </Link>
  );
};

export default FeatureButton;
