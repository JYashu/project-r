import scssObj from './_Scape.scss';

const Scape = () => {
  const idx = sessionStorage.getItem('scapeKey') || '1';

  return (
    <div className={`${scssObj.baseClass}`}>
      <div className={`${scssObj.baseClass}__image-${idx}`} />
      <div className={`${scssObj.baseClass}__bg`} />
      <div className={`${scssObj.baseClass}__cloud`} />
      <div className={`${scssObj.baseClass}__cloud a`} />
      <div className={`${scssObj.baseClass}__cloud b`} />
      <div className={`${scssObj.baseClass}__cloud c`} />
    </div>
  );
};

export default Scape;
