import classNames from 'classnames/bind';
import autosize from 'autosize';
import styles from './AddTermStyle.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { useEffect, useRef } from 'react';

const cx = classNames.bind(styles);

const AddTerm = ({
  number,
  term,
  definition,
  setTerm,
  setDefinition,
  clickDelete,
  placeholder1 = 'Enter term',
  label1 = 'Term',
  placeholder2 = 'Enter definition',
  label2 = 'Definition',
  flexDirection = 'row',
  backgroundColor = 'white',
  displayHeader = 'flex',
}) => {
  const termTextareaRef = useRef(null);
  const definitionTextareaRef = useRef(null);

  const handleTermChange = (event) => {
    const { value } = event.target;
    setTerm(value); // Call setTerm with the new term value
  };

  const handleDefinitionChange = (event) => {
    const { value } = event.target;
    setDefinition(value); // Call setDefinition with the new definition value
  };

  useEffect(() => {
    if (termTextareaRef.current) {
      autosize(termTextareaRef.current);
    }
  }, [term]);

  // Auto resize definition textarea
  useEffect(() => {
    if (definitionTextareaRef.current) {
      autosize(definitionTextareaRef.current);
    }
  }, [definition]);

  return (
    <>
      <div
        className={cx('header')}
        style={{ display: displayHeader }}
      >
        <span>{number}</span>
        <span className={cx('trash-icon')} onClick={clickDelete}>
          <FontAwesomeIcon icon={faTrashCan} />
        </span>
      </div>
      <div
        className={cx('container')}
        style={{ flexDirection, backgroundColor }}
      >
        <div className={cx('term')}>
          <textarea
            value={term}
            style={{
              resize: 'none',
              overflowY: 'hidden',
              display: 'block',
            }}
            ref={termTextareaRef}
            rows={1}
            onChange={handleTermChange}
            className={cx('term-input')}
            placeholder={placeholder1}
          />
          <label className={cx('term-lable')}>{label1}</label>
        </div>
        <div className={cx('definition')}>
          <textarea
            value={definition}
            style={{
              resize: 'none',
              overflowY: 'hidden',
              display: 'block',
            }}
            rows={1}
            ref={definitionTextareaRef}
            onChange={handleDefinitionChange}
            className={cx('term-input')}
            placeholder={placeholder2}
          />
          <label className={cx('term-lable')}>{label2}</label>
        </div>
      </div>
    </>
  );
};

export default AddTerm;
