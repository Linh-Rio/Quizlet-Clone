import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import styles from './SearchBarStyle.module.scss';

const cx = classNames.bind(styles);

function SearchBar() {
  return (
    <div className={cx('container')}>
      <div className={cx('icon')}>
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </div>
      <input
        type="text"
        className={cx('search-bar')}
        placeholder="Study sets, textbooks, questions"
      />
    </div>
  );
}

export default SearchBar;
