import { GAME_WON_MESSAGES as messages } from '../../utils/consts';
import Button from '../Button';
import scssObj from './_GameWon.scss';

interface Props {
  name?: string;
  score?: number;
  handleReplay?: () => void;
  handleReset?: () => void;
  handleClose?: () => void;
}

const GameWon = ({ name, score, handleReplay, handleReset, handleClose }: Props) => {
  messages.sort(() => Math.random() - 0.5);
  const title = `${messages[0].title}${name ? `, ${name}!` : '!'}`;
  const displayScore = score ? `You scored ${score}` : '';
  return (
    <div className={`${scssObj.baseClass}`}>
      <div className={`${scssObj.baseClass}__message`}>
        <h2>{title}</h2>
        <p>{displayScore}</p>
        <p>{messages[0].message}</p>
      </div>
      <div className={`${scssObj.baseClass}__footer`}>
        {handleReplay && (
          <Button
            intent="primary"
            onClick={() => {
              handleReplay();
              if (handleClose) handleClose();
            }}
          >
            Go Again
          </Button>
        )}
        {handleReset && (
          <Button
            intent="primary"
            onClick={() => {
              handleReset();
              if (handleClose) handleClose();
            }}
          >
            Naah!
          </Button>
        )}
      </div>
    </div>
  );
};

export default GameWon;
