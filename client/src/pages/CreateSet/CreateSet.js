import classNames from 'classnames/bind';
import { useState, useMemo } from 'react';

import styles from './CreateSetStyle.module.scss';
import AddTerm from '../../components/AddTerm/AddTerm';
import { handleCreateSet } from '../../services/studySetService';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

const CreateSet = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

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
    user_id: user?.id,
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

  const handleOnCreateset = async () => {
    let termTransfer = terms.filter((term) => {
      return term.term.length > 0 && term.definition.length > 0;
    });
    let data = await handleCreateSet(
      JSON.stringify(studySet),
      JSON.stringify(termTransfer),
    );
    navigate('/');
    console.log(data);
    console.log(data.message);
  };

  return (
    <div className={cx('container')}>
      <div className={cx('header')}>
        <span>Create a new study set</span>
        <button className={cx('Button')} onClick={handleOnCreateset}>
          Create
        </button>
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
  );
};

export default CreateSet;
