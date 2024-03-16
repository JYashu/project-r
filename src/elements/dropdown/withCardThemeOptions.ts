import { connect } from 'react-redux';
import { IMAGES } from '../../components/memory/const';
import { Option } from './Dropdown';

const getCardTypeLabel = (card: string) => {
  if (card === 'spy-x-family') return 'Spy x Family';
  return card
    .split('-')
    .join(' ')
    .replace(/(^\w|\s\w)/g, (m) => m.toUpperCase());
};

const mapCardTypesToOptions = () => {
  const cardTypes = Object.keys(IMAGES).filter((card) => card !== 'solid' && card !== 'custom');
  return cardTypes.map((card) => {
    return {
      label: getCardTypeLabel(card),
      value: card,
      isFixed: card === 'random',
    };
  });
};

const mapState = () => {
  const options = mapCardTypesToOptions();

  return {
    noOptionsMessage: 'No card types',
    options,
    placeholder: 'Select Card Type',
  };
};

export default connect(mapState);
