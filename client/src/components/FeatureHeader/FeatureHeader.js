import React from 'react';
import { Link } from 'react-router-dom';
import Tippy from '@tippyjs/react/headless';
import {
  faAngleDown,
  faCircleNodes,
  faFileLines,
  faGraduationCap,
  faNoteSticky,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import styles from './FeatureHeaderStyle.module.scss';

const cx = classNames.bind(styles);

const FeatureHeader = ({
  setId,
  studySet,
  pageFeature = 'FlashCards',
}) => {
  const funtionButtons = [
    {
      logo: <FontAwesomeIcon icon={faNoteSticky} />,
      text: 'FlashCards',
    },
    {
      logo: <FontAwesomeIcon icon={faGraduationCap} />,
      text: 'Learn',
    },
    {
      logo: <FontAwesomeIcon icon={faFileLines} />,
      text: 'Test',
    },
    {
      logo: <FontAwesomeIcon icon={faCircleNodes} />,
      text: 'Match',
    },
  ];

  const mainFeature = (featureName) => {
    switch (featureName) {
      case 'FlashCards':
        return 0;
      case 'Learn':
        return 1;
      case 'Test':
        return 2;
      case 'Match':
        return 3;
      default:
        return 0;
    }
  };

  return (
    <div className={cx('header-container')}>
      <Tippy
        placement="bottom-start"
        interactive
        appendTo={document.body}
        offset={[0, -10]}
        trigger="click"
        // visible={true}
        render={(attrs) => (
          <div className={cx('tippy-box')} tabIndex="-1" {...attrs}>
            <div className={cx('feature-container')}>
              {funtionButtons
                .filter((button) => button.text !== pageFeature)
                .map((button, index) => {
                  return (
                    <Link
                      to={`/${setId}/${button.text.toLowerCase()}`}
                      key={index}
                    >
                      <div className={cx('feature')}>
                        <span className={cx('logo')}>
                          {button.logo}
                        </span>
                        <span className={cx('text')}>
                          {button.text}
                        </span>
                      </div>
                    </Link>
                  );
                })}
            </div>

            <div className={cx('nav')}>
              <Link
                className={cx('nav-home')}
                exact={'true'}
                to={'/'}
              >
                Home
              </Link>
            </div>
          </div>
        )}
      >
        <div className={cx('feature', 'main-feature')}>
          <span className={cx('logo')}>
            {funtionButtons[mainFeature(pageFeature)].logo}
          </span>
          <span className={cx('text')}>
            {funtionButtons[mainFeature(pageFeature)].text}
            <span>
              <FontAwesomeIcon icon={faAngleDown} />
            </span>
          </span>
        </div>
      </Tippy>
      <div className={cx('title')}>
        <Link to={`/${setId}/${studySet?.title}`}>
          {studySet?.title}
        </Link>
      </div>

      <Link exact={'true'} to={'/'} className={cx('cancel-icon')}>
        <FontAwesomeIcon icon={faXmark} />
      </Link>
    </div>
  );
};

export default FeatureHeader;
