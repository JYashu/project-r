import { useDispatch } from 'react-redux';
import { copyText } from '../../redux/me';
import Field from './Field';

interface Props {
  className?: string;
  value: string;
  name: string;
}

const CopyField = ({ className, value, name }: Props) => {
  const dispatch = useDispatch();
  const onClick = () => {
    dispatch(copyText.request({ text: value }));
  };
  return (
    <>
      <Field
        name={name}
        className={className}
        readOnly
        value={value}
        icon="copy"
        iconPosition="RIGHT"
        onIconClick={onClick}
        fieldSize="small"
      />
    </>
  );
};

export default CopyField;
