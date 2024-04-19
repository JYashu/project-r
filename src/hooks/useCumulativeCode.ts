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

      const root = document.querySelector('#root');
      let reactElements = [];
      function renderReactElements() {
        _rctDOM.render(_rct.createElement('div', {}, reactElements), root);
      }

      var show = (value) => {
        if (typeof value === 'object') {
          if (value.$$typeof && value.props) {
            reactElements.push(value);
            reactElements.push(<br />);
          } else {
            reactElements.push(JSON.stringify(value));
            reactElements.push(<br />);
          }
        } else {
          reactElements.push(value);
          reactElements.push(<br />);
        }
        renderReactElements();
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
