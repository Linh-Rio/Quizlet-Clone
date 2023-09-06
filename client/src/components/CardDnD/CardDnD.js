import classNames from 'classnames/bind';
import React, { useEffect, useRef, useState } from 'react';
import styles from './CardDnDStyle.module.scss';

const cx = classNames.bind(styles);

const CardDnD = ({ text, matchText, onEndGame }) => {
  const [startPosition, setStartPosition] = useState({
    x: 0,
    y: 0,
  });
  const [absoluteCodition, setAbsoluteCodition] = useState({
    x: 0,
    y: 0,
  });

  const [isDragging, setIsDragging] = useState(false);

  const cardRef = useRef(null);
  // make positon is random
  useEffect(() => {
    const containerRect =
      cardRef.current.parentElement.getBoundingClientRect();
    const cardRect = cardRef.current.getBoundingClientRect();

    const randomTop =
      Math.random() * (containerRect.height - cardRect.height);
    const randomLeft =
      Math.random() * (containerRect.width - cardRect.width);

    cardRef.current.style.top = randomTop + 'px';
    cardRef.current.style.left = randomLeft + 'px';
  }, []); // This effect runs only once after the component mounts

  const handleDragStart = (e) => {
    setAbsoluteCodition({
      x: parseFloat(cardRef.current.style.left),
      y: parseFloat(cardRef.current.style.top),
    });

    setStartPosition({
      x: parseFloat(e.clientX),
      y: parseFloat(e.clientY),
    });

    setIsDragging(true);
  };
  const handleDrag = (e) => {
    if (isDragging && e.clientX && e.clientY) {
      const newTop = e.clientY - startPosition.y;
      const newLeft = e.clientX - startPosition.x;

      const containerRect =
        cardRef.current.parentElement.getBoundingClientRect();
      const cardRect = cardRef.current.getBoundingClientRect();

      const maxTop = containerRect.height - cardRect.height;
      const maxLeft = containerRect.width - cardRect.width;

      const newTopPosition = Math.min(
        Math.max(0, absoluteCodition.y + newTop),
        maxTop,
      );
      const newLeftPosition = Math.min(
        Math.max(0, absoluteCodition.x + newLeft),
        maxLeft,
      );

      cardRef.current.style.top = newTopPosition + 'px';
      cardRef.current.style.left = newLeftPosition + 'px';
    }
  };
  const handleDragEnd = () => {
    const overlappingCard = isOverlapping();
    if (overlappingCard) {
      const overlappingCardContent =
        overlappingCard.querySelector('p').innerText;

      if (matchText === overlappingCardContent) {
        cardRef.current.remove(); // xóa thẻ khi chồng chất với cùng một flashcard
        overlappingCard.remove();
      }
    }

    setIsDragging(false);
  };
  const isOverlapping = () => {
    const cardRect = cardRef.current.getBoundingClientRect();
    const allCards = Array.from(
      cardRef.current.parentElement.children,
    );

    for (const otherCard of allCards) {
      if (otherCard !== cardRef.current) {
        const otherCardRect = otherCard.getBoundingClientRect();

        if (
          cardRect.left < otherCardRect.right &&
          cardRect.right > otherCardRect.left &&
          cardRect.top < otherCardRect.bottom &&
          cardRect.bottom > otherCardRect.top
        ) {
          return otherCard;
        }
      }
    }

    return null;
  };

  return (
    <div
      ref={cardRef}
      draggable={true}
      onDragStart={(e) => handleDragStart(e)}
      onDrag={(e) => handleDrag(e)}
      onDragEnd={() => handleDragEnd()}
      className={cx('card')}
    >
      <p>{text}</p>
    </div>
  );
};

export default CardDnD;
