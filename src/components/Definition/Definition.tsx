import useSpeechSynthesis from '../../hooks/useSpeechSynthesis';
import { Definition, Meaning } from '../../types';
import Icon from '../Icon';
import scssObj from './_Definition.scss';

const DefinitionItem = ({ definition }: { definition: Definition }) => {
  if (!definition) {
    return null;
  }
  const { meanings, word, phonetics } = definition;
  const { text, audio } = phonetics;
  const sound = new Audio(audio);

  const Start = () => {
    if (audio !== '') sound.play();
    const phrase = audio === '' ? word : undefined;
    useSpeechSynthesis(phrase);
  };

  return (
    <div className={`${scssObj.baseClass}`}>
      <div>
        <div className={`${scssObj.baseClass}__word-wrapper`}>
          <div className={`${scssObj.baseClass}__word`}>{word}</div>
          <div className={`${scssObj.baseClass}__phonetics`}>
            {text}
            <>
              {' | '}
              <Icon icon="volume_up" size="small" onClickHandler={() => Start()} />
            </>
          </div>
        </div>
        {meanings.map(({ antonyms, synonyms, definitions, partOfSpeech }: Meaning) => {
          return (
            <div
              className={`${scssObj.baseClass}__block-wrapper${meanings.length === 1 ? '-a' : ''}`}
            >
              <div className={`${scssObj.baseClass}__block`}>
                <div>
                  <span className={`${scssObj.baseClass}__speech`}>({partOfSpeech}) ◦ </span>
                  {definitions[0].definition}
                </div>
              </div>
              {definitions[0].example && (
                <div className={`${scssObj.baseClass}__block`}>
                  <strong>Example</strong>
                  <div className={`${scssObj.baseClass}__example`}>{definitions[0].example}</div>
                </div>
              )}
              {synonyms.length > 0 && (
                <div className={`${scssObj.baseClass}__block`}>
                  <strong>Synonyms</strong>
                  <div>
                    {synonyms.map((syn) => {
                      return `${syn}, `;
                    })}
                  </div>
                </div>
              )}
              {antonyms.length > 0 && (
                <div className={`${scssObj.baseClass}__block`}>
                  <strong>Antonyms</strong>
                  <div>
                    {antonyms.map((ant) => {
                      return `${ant}, `;
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DefinitionItem;
