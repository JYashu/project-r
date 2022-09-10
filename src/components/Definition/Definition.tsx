import scssObj from './_Definition.scss';

const Definition = ({ definition }: { definition: any }) => {
  return (
    <div className={scssObj.className}>
      <div>
        <p>{definition.phonetics.text}</p>
        <p>{definition.partOfSpeech}</p>
        <p>{definition.meaning.definition}</p>
      </div>
    </div>
  );
};

export default Definition;
