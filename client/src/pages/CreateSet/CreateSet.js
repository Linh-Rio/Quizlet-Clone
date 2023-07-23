import classNames from 'classnames/bind';
import { useState, useMemo } from 'react';

import styles from './CreateSetStyle.module.scss';
import Header from '../../components/Header';
import AddTerm from '../../components/AddTerm/AddTerm';

const cx = classNames.bind(styles);

const CreateSet = () => {
  const [terms, setTerms] = useState([
    {
      term: '',
      definition: '',
    },
    {
      term: '',
      definition: '',
    },
    {
      term: '',
      definition: '',
    },
    {
      term: '',
      definition: '',
    },
    {
      term: '',
      definition: '',
    },
  ]);

  const [studySet, setStudySet] = useState({
    title: '',
    description: '',
  });

  const setTitle = (title) => {
    setStudySet((prevState) => ({
      ...prevState,
      title,
    }));
  };
  const setDescription = (description) => {
    setStudySet((prevState) => ({
      ...prevState,
      description,
    }));
  };

  const setTerm = (index, childTerm) => {
    setTerms((prevState) => {
      const updatedTerms = [...prevState];
      updatedTerms[index].term = childTerm;
      return updatedTerms;
    });
  };

  const setDefinition = (index, childDefinition) => {
    setTerms((prevState) => {
      const updatedTerms = [...prevState];
      updatedTerms[index].definition = childDefinition;
      return updatedTerms;
    });
  };

  const deleteTerm = (index) => {
    setTerms((prevState) => {
      let updatedTerms = prevState;
      if (prevState.length > 2) {
        updatedTerms = prevState.filter((_, i) => i !== index);
      }
      return updatedTerms;
    });
  };

  const generateTerm = useMemo(() => {
    return terms.map((item, index) => {
      return (
        <AddTerm
          key={index}
          number={index + 1}
          term={item.term}
          setTerm={(childTerm) => setTerm(index, childTerm)}
          definition={item.definition}
          setDefinition={(ChildDefinition) =>
            setDefinition(index, ChildDefinition)
          }
          clickDelete={() => deleteTerm(index)}
        />
      );
    });
  }, [terms]);

  const handleAddCard = () => {
    setTerms([
      {
        term: '',
        definition: '',
      },
      ...terms,
    ]);
  };

  return (
    <>
      <Header />
      <div className={cx('container')}>
        <div className={cx('header')}>
          <span>Create a new study set</span>
          <button className={cx('Button')}>Create</button>
        </div>

        <div className={cx('study-set-container')}>
          <AddTerm
            term={studySet.title}
            definition={studySet.description}
            setTerm={setTitle}
            setDefinition={setDescription}
            placeholder1='Enter a title, like "Biology - Chapter 22 Evolution"'
            label1="Title"
            placeholder2="Add a description"
            label2="Description"
            flexDirection="column"
            backgroundColor="none"
            displayHeader="none"
          />
          {generateTerm}
          <div className={cx('add-card')}>
            <span onClick={handleAddCard}>+ ADD CARD</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateSet;
