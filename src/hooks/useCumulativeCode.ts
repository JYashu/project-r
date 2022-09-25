/* eslint-disable no-restricted-syntax */
import { useSelector } from 'react-redux';
import { selectCBookState } from '../redux/cbook';

export const useCumulativeCode = (cellId: string) => {
  const state = useSelector(selectCBookState);

  const { data, order } = state;

  const orderedcells = order.map((id: string) => data[id]);

  const showFunction = `
      import _rct from 'react';
      import _rctDOM from 'react-dom';
      var show = (value) => {
        const root = document.querySelector('#root')
        if (typeof value === 'object') {
          if (value.$$typeof && value.props) {
            _rctDOM.render(value, root);
          } else {
            root.innerHTML = JSON.stringify(value);
          }
        } else {
          root.innerHTML = value;
        }
      }
    `;

  const showFunctionNoop = 'var show = () => {}';

  const cumulativeCode: any[] = [];

  orderedcells.forEach((cell: any) => {
    if (cell.type === 'code') {
      if (cell.id === cellId) {
        cumulativeCode.push(showFunction);
      } else cumulativeCode.push(showFunctionNoop);
      cumulativeCode.push(cell.content);
    }
  });

  return cumulativeCode.join('\n');
};
