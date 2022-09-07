/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react-hooks/exhaustive-deps */
import classNames from 'classnames';
import React, { useState, useEffect, useRef } from 'react';
import { useSpring, animated as a } from 'react-spring';
import useActiveSidebarItem from '../../hooks/useActiveSidebarItem';
import useSetGlobalHeader from '../../hooks/useSetGlobalHeader';
import { ActiveSidebarItem } from '../../types';
import { ErrorValues, TouchedValues } from '../../utils/typeHelpers';
import Button from '../Button';
import Field from '../Field';
import { MessageProps, Values } from './types';
import scssObj from './_Memory.scss';

enum CardType {
  Solid = 'solid',
  OnePiece = 'one-piece',
}

const Card = ({
  id,
  color,
  image,
  game,
  type,
  flippedCount,
  setFlippedCount,
  flippedIndexes,
  setFlippedIndexes,
}: any) => {
  const [flipped, set] = useState(false);
  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateY(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  });

  useEffect(() => {
    if (flippedIndexes[2] === true && flippedIndexes.indexOf(id) > -1) {
      setTimeout(() => {
        set(state => !state);
        setFlippedCount(flippedCount + 1);
        setFlippedIndexes([]);
      }, 1000);
    } else if (flippedIndexes[2] === false && id === 0) {
      setFlippedCount(flippedCount + 1);
      setFlippedIndexes([]);
    }
  }, [flippedIndexes]);

  const onCardClick = () => {
    set(state => state);

    if (!game[id].flipped && flippedCount % 3 === 0) {
      set(state => !state);
      setFlippedCount(flippedCount + 1);
      const newIndexes = [...flippedIndexes];
      newIndexes.push(id);
      setFlippedIndexes(newIndexes);
    } else if (flippedCount % 3 === 1 && !game[id].flipped && flippedIndexes.indexOf(id) < 0) {
      set(state => !state);
      setFlippedCount(flippedCount + 1);
      const newIndexes = [...flippedIndexes];
      newIndexes.push(id);
      setFlippedIndexes(newIndexes);
    }
  };

  return (
    <div onClick={onCardClick}>
      <a.div
        className={classNames(`${scssObj.baseClass}__c`, `${scssObj.baseClass}__back-${type}`)}
        style={{
          opacity: opacity.interpolate(o => 1 - o),
          transform,
        }}
      />
      <a.div
        className={classNames(`${scssObj.baseClass}__c`, `${scssObj.baseClass}__front`)}
        style={{
          opacity,
          transform: transform.interpolate(t => `${t} rotateX(360deg)`),
          background:
            type === CardType.Solid
              ? color
              : `url(
            'https://public-assets-7588.s3.ap-south-1.amazonaws.com/one-piece/${image}.png'
          )`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center',
        }}
      />
    </div>
  );
};

const MemoryGame = ({
  name,
  options,
  setOptions,
  type,
  highScore,
  setHighScore,
  openMessage,
}: any) => {
  const [game, setGame] = useState<any>([]);
  const [flippedCount, setFlippedCount] = useState(0);
  const [flippedIndexes, setFlippedIndexes] = useState([]);

  const colors = [
    '#ecdb54',
    '#e34132',
    '#6ca0dc',
    '#944743',
    '#dbb2d1',
    '#ec9787',
    '#00a68c',
    '#645394',
    '#6c4f3d',
    '#ebe1df',
    '#bc6ca7',
    '#bfd833',
  ].sort(() => Math.random() - 0.5);

  const images = [
    'Luffy',
    'Zorro',
    'Nami',
    'Usopp',
    'Sanji',
    'Robin-Chibi',
    'Chopper',
    'Franky',
    'Sunny',
    'Brooks',
    'Carrot',
    'Jimbei',
  ].sort(() => Math.random() - 0.5);

  useEffect(() => {
    const newGame = [];
    for (let i = 0; i < options / 2; i += 1) {
      const firstOption = {
        id: 2 * i,
        matchId: i,
        color: colors[i],
        image: images[i],
        flipped: false,
      };
      const secondOption = {
        id: 2 * i + 1,
        matchId: i,
        color: colors[i],
        image: images[i],
        flipped: false,
      };

      newGame.push(firstOption);
      newGame.push(secondOption);
    }

    const shuffledGame = newGame.sort(() => Math.random() - 0.5);
    setGame(shuffledGame);
  }, []);

  useEffect(() => {
    const finished = !game.some((card: any) => !card.flipped);
    if (finished && game.length > 0) {
      setTimeout(() => {
        const bestPossible = game.length;
        let multiplier;

        if (options === 12) {
          multiplier = 5;
        } else if (options === 18) {
          multiplier = 2.5;
        } else if (options === 24) {
          multiplier = 1;
        }

        const pointsLost = multiplier ? multiplier * (0.66 * flippedCount - bestPossible) : 0;

        let score;
        if (pointsLost < 100) {
          score = 100 - pointsLost;
        } else {
          score = 0;
        }

        if (score > highScore) {
          setHighScore(score);
          const json = JSON.stringify(score);
          localStorage.setItem('memorygamehighscore', json);
        }

        openMessage({
          name,
          score,
          handleReplay: () => {
            const gameLength = game.length;
            setOptions(null);
            setTimeout(() => {
              setOptions(gameLength);
            }, 5);
          },
          handleReset: () => setOptions(null),
        });
      }, 500);
    }
  }, [game]);

  if (flippedIndexes.length === 2) {
    const match = game[flippedIndexes[0]].matchId === game[flippedIndexes[1]].matchId;

    if (match) {
      const newGame = [...game];
      newGame[flippedIndexes[0]].flipped = true;
      newGame[flippedIndexes[1]].flipped = true;
      setGame(newGame);

      const newIndexes: any = [...flippedIndexes];
      newIndexes.push(false);
      setFlippedIndexes(newIndexes);
    } else {
      const newIndexes: any = [...flippedIndexes];
      newIndexes.push(true);
      setFlippedIndexes(newIndexes);
    }
  }

  if (game.length === 0) return <div>loading...</div>;

  return (
    <div className={`${scssObj.baseClass}__cards`}>
      {game.map((card: any, index: any) => (
        <div className={`${scssObj.baseClass}__card`} key={index}>
          <Card
            id={index}
            color={card.color}
            image={card.image}
            game={game}
            type={type}
            flippedCount={flippedCount}
            setFlippedCount={setFlippedCount}
            flippedIndexes={flippedIndexes}
            setFlippedIndexes={setFlippedIndexes}
          />
        </div>
      ))}
    </div>
  );
};

interface Props {
  isSubmitting?: boolean;
  isValid: boolean;
  values: Values;
  errors: ErrorValues<Values>;
  touched: TouchedValues<Values>;
  handleBlur: (e: React.FocusEvent) => void;
  handleChange: (e: React.ChangeEvent) => void;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
  openMessage: ({ name, score, handleReplay, handleReset }: MessageProps) => void;
}

const App = ({
  isSubmitting,
  isValid,
  values,
  errors,
  touched,
  handleBlur,
  handleChange,
  setFieldValue,
  openMessage,
}: Props) => {
  const [options, setOptions] = useState<number | null>();
  const [type, setType] = useState(CardType.Solid);
  const [highScore, setHighScore] = useState(0);
  const [name, setName] = useState('');
  const [initialOption, setInitialOption] = useState(values.options);

  const [scaleX, setScaleX] = useState(0.9);
  const [scaleY, setScaleY] = useState(0.9);

  const [x, setX] = useState(80);
  const [y, setY] = useState(10);

  useSetGlobalHeader('Memory Game');
  useActiveSidebarItem(ActiveSidebarItem.Memory);

  const moveFocus = (tx: number, focusType: string) => {
    if (focusType === 'option') {
      setX(tx);
      if (values.options > 0 && initialOption > 5) {
        setScaleX(0.7);
        setTimeout(() => setScaleX(0.9), 250);
      } else setInitialOption(6);
    } else if (focusType === 'type') {
      setY(tx);
      setScaleY(0.7);
      setTimeout(() => setScaleY(0.9), 250);
    }
  };

  return (
    <div className={`${scssObj.baseClass}`}>
      <div className={`${scssObj.baseClass}__container`}>
        {options && (
          <div className={`${scssObj.baseClass}__action-buttons`}>
            <Button
              buttonStyle="game"
              handWriting
              onClick={() => {
                const prevOptions = options;
                setOptions(null);
                setTimeout(() => {
                  setOptions(prevOptions);
                }, 5);
              }}
            >
              Start Over
            </Button>
            <Button buttonStyle="game" handWriting onClick={() => setOptions(null)}>
              Main Menu
            </Button>
          </div>
        )}
      </div>

      {options ? (
        <MemoryGame
          name={name}
          options={options}
          setOptions={setOptions}
          highScore={highScore}
          setHighScore={setHighScore}
          type={type}
          openMessage={openMessage}
        />
      ) : (
        <>
          <div className={`${scssObj.baseClass}__wrapper`}>
            <div className={`${scssObj.baseClass}__menu`}>Menu</div>
            <div className={`${scssObj.baseClass}__login`}>
              <form>
                <div className={`${scssObj.baseClass}__form-group`}>
                  <div>Choose a difficulty to begin!</div>
                  <div className={`${scssObj.baseClass}__btns`}>
                    <div
                      className={`${scssObj.baseClass}__focus`}
                      style={{
                        opacity: `${values.options < 12 ? 0 : 1}`,
                        left: x,
                        transform: `scale(${scaleX})`,
                      }}
                    />
                    <div
                      className={`${scssObj.baseClass}__btn`}
                      onClick={() => {
                        moveFocus(0, 'option');
                        setFieldValue('options', 12);
                      }}
                    >
                      Easy
                    </div>
                    <div
                      className={`${scssObj.baseClass}__btn`}
                      onClick={() => {
                        moveFocus(80, 'option');
                        setFieldValue('options', 18);
                      }}
                    >
                      Medium
                    </div>
                    <div
                      className={`${scssObj.baseClass}__btn`}
                      onClick={() => {
                        moveFocus(160, 'option');
                        setFieldValue('options', 24);
                      }}
                    >
                      Hard
                    </div>
                  </div>
                  <div>Choose card type!</div>
                  <div className={`${scssObj.baseClass}__btns`}>
                    <div
                      className={`${scssObj.baseClass}__focus`}
                      style={{
                        opacity: 1,
                        left: y,
                        transform: `scale(${scaleY})`,
                        width: '100px',
                      }}
                    />
                    <div
                      className={`${scssObj.baseClass}__btn`}
                      onClick={() => {
                        setType(CardType.Solid);
                        moveFocus(10, 'type');
                      }}
                    >
                      Solid
                    </div>
                    <div
                      className={`${scssObj.baseClass}__btn`}
                      onClick={() => {
                        setType(CardType.OnePiece);
                        moveFocus(130, 'type');
                      }}
                    >
                      One Piece
                    </div>
                  </div>
                  <div>What should we call you?!</div>
                  <Field
                    name="name"
                    label="Name"
                    placeholder="Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.name}
                    errorMessage={errors.name}
                    touched={touched.name}
                  />
                  {/* <small className="form-text text-muted">
                    This is a memory game
                  </small> */}
                </div>

                <Button
                  disabled={isSubmitting || !isValid}
                  loading={isSubmitting}
                  buttonStyle="game"
                  onClick={() => {
                    setName(values.name);
                    setOptions(values.options);
                  }}
                  handWriting
                >
                  Submit
                </Button>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
