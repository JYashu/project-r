/* eslint-disable no-restricted-syntax */
import { useSelector } from 'react-redux';
import { selectCBookState } from '../redux/cbook';

export const useCumulativeCode = (cellId: string) => {
  const state = useSelector(selectCBookState);
  const { data, order } = state;

  const orderedCells = order.map((id: string) => data[id]);

  const showFunction = (id: string) => `
    import _rct from 'react';
    import _rctDOM from 'react-dom';

    const root = document.querySelector('#root-cell-${id}');
    let reactElements = [];

    function renderReactElements() {
      _rctDOM.render(_rct.createElement('div', {}, reactElements), root);
    }

    var show = (value) => {
      if (!root) return;
      reactElements = []; // reset per call

      if (typeof value === 'object') {
        if (value.$$typeof && value.props) {
          reactElements.push(value, _rct.createElement('br'));
        } else {
          reactElements.push(JSON.stringify(value), _rct.createElement('br'));
        }
      } else {
        reactElements.push(value, _rct.createElement('br'));
      }
      renderReactElements();
    }
  `;

  const showFunctionNoop = 'var show = () => {}';

  const cumulativeCode: any[] = [];

  orderedCells.forEach((cell: any) => {
    if (cell.type === 'code') {
      if (cell.id === cellId) {
        cumulativeCode.push(showFunction(cellId));
      } else {
        cumulativeCode.push(showFunctionNoop);
      }
      cumulativeCode.push(cell.content);
    }
  });

  return cumulativeCode.join('\n');
};
