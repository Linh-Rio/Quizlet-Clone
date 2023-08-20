import React from 'react';
import Header from '../../components/Header/Header';
import classNames from 'classnames/bind';
import styles from './ProfileStyle.module.scss';
import { useSelector } from 'react-redux';
import noImage from '../../assets/images/noImage.jpg';

const cx = classNames.bind(styles);

const Profile = () => {
  const { userName, firstName, lastName, avatar } = useSelector(
    (state) => state.user,
  );

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleChangeUpload = () => {
    let fileName = document.getElementById('upload-file').value;
    console.log(fileName);
    let idxDot = fileName.lastIndexOf('.') + 1;
    let extFile = fileName
      .substr(idxDot, fileName.length)
      .toLowerCase();
    if (
      extFile === 'jpg' ||
      extFile === 'jpeg' ||
      extFile === 'png'
    ) {
      //TO DO
      console.log('change upload');
    } else {
      alert('Only jpg, jpeg and png files are allowed!');
    }
  };
  return (
    <div className={cx('container')}>
      <Header />
      <div>
        <div className={cx('user-infor')}>
          <img
            className={cx('avatar')}
            src={avatar ? avatar : noImage}
            alt="avatar"
          />
          <div>
            <input
              type="file"
              id="upload-file"
              style={{ display: 'none' }}
              multiple={false}
              accept="image/png, image/gif, image/jpeg"
              onChange={handleChangeUpload}
            />
            <label htmlFor="upload-file" className={cx('upload')}>
              Upload Picture
            </label>
          </div>
          <div className={cx('user-name')}>{userName}</div>
          <div
            className={cx('full-name')}
          >{`${firstName} ${lastName}`}</div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
