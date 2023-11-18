/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import classNames from 'classnames';
import React, { useState, useEffect } from 'react';
import { useSpring, animated as a } from 'react-spring';
import { useHistory } from 'react-router-dom';
import useActiveSidebarItem from '../../hooks/useActiveSidebarItem';
import useSetGlobalHeader from '../../hooks/useSetGlobalHeader';
import { ActiveSidebarItem, ClickActionType } from '../../types';
import { ErrorValues, TouchedValues } from '../../utils/typeHelpers';
import Button from '../../elements/button';
import Field from '../../elements/field';
import { MessageProps, Values } from './types';
import scssObj from './_Memory.scss';
import { CardTheme, IMAGES } from './const';
import useLongPress from '../../hooks/useLongPress';
import { CardThemeDropdown } from '../../elements/dropdown';
import LoadingSpinner from '../../elements/loadingSpinner';
import { ASSETS_BASE_URL } from '../../utils/assets';
import ToggleBar from '../../elements/toggleBar';
import { getUniqueId } from '../../utils/helpers';
import { Pages } from '../../utils/consts';

interface Props {
  isSubmitting?: boolean;
  isValid: boolean;
  values: Values;
  errors: ErrorValues<Values>;
  touched: TouchedValues<Values>;
  handleBlur: (e: React.FocusEvent) => void;
  handleChange: (e: React.ChangeEvent) => void;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
  setFieldTouched: (field: string, value?: boolean, shouldValidate?: boolean) => void;
  openMessage: ({ name, score, handleReplay, handleReset }: MessageProps) => void;
  openImage: (url: string) => void;
}

interface GameProps {
  name: string;
  options: number;
  setOptions: React.Dispatch<React.SetStateAction<number | null | undefined>>;
  theme: CardTheme | 'custom';
  highScore: number;
  setHighScore: React.Dispatch<React.SetStateAction<number>>;
  openMessage: ({ name, score, handleReplay, handleReset }: MessageProps) => void;
  openImage: (url: string) => void;
  restart: number;
}

interface CardProps {
  id: any;
  image: any;
  game: any;
  theme: CardTheme | 'custom';
  flippedCount: number;
  setFlippedCount: React.Dispatch<React.SetStateAction<number>>;
  flippedIndexes: any;
  setFlippedIndexes: any;
  openImage: (url: string) => void;
}

const Card = ({
  id,
  image,
  game,
  theme,
  flippedCount,
  setFlippedCount,
  flippedIndexes,
  setFlippedIndexes,
  openImage,
}: CardProps) => {
  const [flipped, set] = useState(false);
  const url = `${ASSETS_BASE_URL}/memory/${theme}/${image}`;
  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateY(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  });

  useEffect(() => {
    if (flippedIndexes[2] === true && flippedIndexes.indexOf(id) > -1) {
      setTimeout(() => {
        set((state) => !state);
        setFlippedCount(flippedCount + 1);
        setFlippedIndexes([]);
      }, 1000);
    } else if (flippedIndexes[2] === false && id === 0) {
      setFlippedCount(flippedCount + 1);
      setFlippedIndexes([]);
    }
  }, [flippedIndexes]);

  const { action, userAction, handlers } = useLongPress();

  const handleCardFlipAction = () => {
    set((state) => state);

    if (!game[id].flipped && flippedCount % 3 === 0) {
      set((state) => !state);
      setFlippedCount(flippedCount + 1);
      const newIndexes = [...flippedIndexes];
      newIndexes.push(id);
      setFlippedIndexes(newIndexes);
    } else if (flippedCount % 3 === 1 && !game[id].flipped && flippedIndexes.indexOf(id) < 0) {
      set((state) => !state);
      setFlippedCount(flippedCount + 1);
      const newIndexes = [...flippedIndexes];
      newIndexes.push(id);
      setFlippedIndexes(newIndexes);
    }
  };

  const handleOpenImageAction = () => {
    if (flipped && theme !== CardTheme.Solid) openImage(url);
  };

  useEffect(() => {
    if (userAction === ClickActionType.CLICK) {
      handleCardFlipAction();
    }
    if (userAction === ClickActionType.LONG_PRESS) {
      handleOpenImageAction();
    }
  }, [action]);

  return (
    <div>
      <div {...handlers}>
        <a.div
          className={classNames(`${scssObj.baseClass}__c`, `${scssObj.baseClass}__back-${theme}`)}
          style={{
            opacity: opacity.interpolate((o) => 1 - o),
            transform,
            background: `url(https://project-r-assets.s3.us-east-2.amazonaws.com/memory/${theme}/${theme}.png)`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center',
          }}
        />
        <a.div
          className={classNames(`${scssObj.baseClass}__c`, `${scssObj.baseClass}__front`)}
          style={{
            opacity,
            transform: transform.interpolate((t) => `${t} rotateY(180deg)`),
            background: theme === CardTheme.Solid ? image : `url(${url})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center',
          }}
        />
      </div>
    </div>
  );
};

const MemoryGame = ({
  name,
  options,
  setOptions,
  theme,
  highScore,
  setHighScore,
  openMessage,
  openImage,
  restart,
}: GameProps) => {
  const [game, setGame] = useState<any>([]);
  const [flippedCount, setFlippedCount] = useState(0);
  const [flippedIndexes, setFlippedIndexes] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const images = IMAGES[theme].sort(() => Math.random() - 0.5);

  useEffect(() => {
    setLoading(true);
    setFlippedIndexes([]);
    setFlippedCount(0);
    const newGame = [];
    for (let i = 0; i < options / 2; i += 1) {
      const firstOption = {
        id: 2 * i,
        matchId: i,
        image: images[i],
        flipped: false,
      };
      const secondOption = {
        id: 2 * i + 1,
        matchId: i,
        image: images[i],
        flipped: false,
      };

      newGame.push(firstOption);
      newGame.push(secondOption);
    }

    const shuffledGame = newGame.sort(() => Math.random() - 0.5);
    setGame(shuffledGame);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [restart]);

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
          localStorage.setItem('memoryGameHighScore', json);
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

  if (game.length === 0 || isLoading)
    return (
      <div className={`${scssObj.baseClass}__spinner`}>
        <LoadingSpinner />
      </div>
    );

  return (
    <div className={`${scssObj.baseClass}__cards`}>
      {game.map((card: any, index: any) => (
        <div className={`${scssObj.baseClass}__card`} key={index}>
          <Card
            id={index}
            image={card.image}
            game={game}
            theme={theme}
            flippedCount={flippedCount}
            setFlippedCount={setFlippedCount}
            flippedIndexes={flippedIndexes}
            setFlippedIndexes={setFlippedIndexes}
            openImage={openImage}
          />
        </div>
      ))}
    </div>
  );
};

const App = ({
  isSubmitting,
  isValid,
  values,
  errors,
  touched,
  handleBlur,
  handleChange,
  setFieldValue,
  setFieldTouched,
  openMessage,
  openImage,
}: Props) => {
  const [options, setOptions] = useState<number | null>();
  const [highScore, setHighScore] = useState(0);
  const [name, setName] = useState('');
  const [customCard, setCustomCard] = useState(false);
  const [chosenTheme, setChosenTheme] = useState(values.theme);
  const [restart, setRestart] = useState(0);

  useSetGlobalHeader(Pages.MEMORY);
  useActiveSidebarItem(ActiveSidebarItem.Memory);

  const history = useHistory();

  useEffect(() => {
    const handlePopstate = (e: any) => {
      if (e.type === 'popstate') {
        if (options) {
          setOptions(null);
        }
      }
    };

    window.addEventListener('popstate', handlePopstate);

    return () => {
      window.removeEventListener('popstate', handlePopstate);
    };
  }, [options]);

  const updateChosenTheme = () => {
    const cardTypes = Object.keys(IMAGES).filter((card) => card !== 'random' && card !== 'custom');

    const theme =
      values.theme === CardTheme.Random || values.theme === 'custom'
        ? (cardTypes[Math.floor(Math.random() * cardTypes.length)] as CardTheme)
        : values.theme;

    setChosenTheme(theme);
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
                updateChosenTheme();
                setRestart((prevValue) => prevValue + 1);
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
          theme={chosenTheme}
          openMessage={openMessage}
          openImage={openImage}
          restart={restart}
        />
      ) : (
        <>
          <div className={`${scssObj.baseClass}__wrapper`}>
            <div className={`${scssObj.baseClass}__menu`}>Menu</div>
            <div className={`${scssObj.baseClass}__login`}>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setFieldTouched('theme', true);
                  if (isValid) {
                    updateChosenTheme();
                    setName(values.name);
                    setOptions(values.options);
                    history.push('/memory');
                  }
                }}
              >
                <div className={`${scssObj.baseClass}__form-group`}>
                  <div>Choose a difficulty to begin!</div>
                  <ToggleBar
                    className={`${scssObj.baseClass}__memory-toggle`}
                    setFieldValue={(value: number) => setFieldValue('options', value)}
                    options={[
                      { label: 'Easy', value: 12, id: getUniqueId() },
                      { label: 'Medium', value: 18, id: getUniqueId() },
                      { label: 'Hard', value: 24, id: getUniqueId() },
                    ]}
                    value={values.options}
                    focusValues={[0, 80, 160]}
                    noFocusCondition={values.options < 12}
                    font="cali"
                  />
                  <div>Choose card theme!</div>
                  <ToggleBar
                    className={`${scssObj.baseClass}__memory-toggle`}
                    setFieldValue={(value: CardTheme) => {
                      setFieldValue('theme', value);
                      if (value === CardTheme.Solid) {
                        setCustomCard(false);
                      } else setCustomCard(true);
                      setFieldTouched('theme', false);
                    }}
                    options={[
                      { label: 'Solid', value: CardTheme.Solid, id: getUniqueId() },
                      { label: 'Custom', value: 'custom', id: getUniqueId() },
                    ]}
                    focusValues={[10, 130]}
                    focusWidth="100px"
                    value={values.theme === CardTheme.Solid ? CardTheme.Solid : 'custom'}
                    font="cali"
                  />
                  <div
                    style={{
                      opacity: `${customCard ? '1' : '0'}`,
                      transform: `translateY(${customCard ? '0' : '-50px'})`,
                      transition: 'transform 250ms, opacity 125ms ease',
                      zIndex: `${customCard ? '10' : '-1'}`,
                      position: 'relative',
                    }}
                  >
                    <Field
                      className={`${scssObj.baseClass}__dropdown`}
                      errorMessage={errors.theme}
                      name="theme"
                      touched={touched.theme}
                      value={values.theme}
                      isTransparent
                    >
                      {(fieldName) => (
                        <CardThemeDropdown
                          className={`${scssObj.baseClass}__dropdown`}
                          name={fieldName}
                          handleBlur={handleBlur}
                          handleChange={(option) => {
                            setFieldValue(fieldName, option?.value);
                          }}
                          value={values.theme}
                          isTransparent
                        />
                      )}
                    </Field>
                  </div>
                  <div
                    style={{
                      transform: `translateY(${customCard ? '-10px' : '-70px'})`,
                      transition: 'all 250ms ease',
                    }}
                  >
                    <div className={`${scssObj.baseClass}__name-field-title`}>
                      What should we call you?!
                    </div>
                    <Field
                      className={`${scssObj.baseClass}__name-field`}
                      name="name"
                      label="Name"
                      placeholder="Name"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.name}
                      errorMessage={errors.name}
                      touched={touched.name}
                      isTransparent
                    />
                  </div>
                </div>

                <div
                  style={{
                    transform: `translateY(${customCard ? '-10px' : '-70px'})`,
                    transition: 'all 250ms ease',
                  }}
                >
                  <Button
                    disabled={isSubmitting}
                    loading={isSubmitting}
                    buttonStyle="game"
                    type="submit"
                    handWriting
                  >
                    Submit
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
