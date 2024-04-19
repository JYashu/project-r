import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import MUIDataTable, { MUIDataTableColumn, MUIDataTableOptions } from 'mui-datatables';
import { ActiveNavigationItem, Todo } from '../../types';
import useSetGlobalHeader from '../../hooks/useSetGlobalHeader';
import { getTodos } from '../../utils/api';
import { ApiResponse, ApiSuccess } from '../../utils/apiUtils';
import scssObj from './_TodoPage.scss';
import useSetActiveSidebarItem from '../../hooks/useSetActiveNavigationItem';
import LoadingSpinner from '../../elements/loadingSpinner';
import Button from '../../elements/button';
import PermissionsManager from '../../elements/permissionsManager';
import { Pages } from '../../utils/consts';

type State = {
  fetchState: 'loading' | 'error' | 'success';
  todo: Todo[] | undefined;
};

const TodoTable = ({ data, count }: { data: Todo[]; count: number }) => {
  const [sortOnTitle, setSortOnTitle] = useState('DESC');
  const [sortOnId, setSortOnId] = useState('DESC');
  const [sortOnStatus, setSortOnStatus] = useState('DESC');
  const [sortedData, setSortedData] = useState([...data]);
  const [displayData, setDisplayData] = useState<Todo[]>([]);

  const sort = (columnName: 'title' | 'status' | 'id') => {
    let sData;
    if (columnName === 'title') {
      if (sortOnTitle === 'DESC') {
        sData = [...data];
        sData.sort((a, b) => (a.title > b.title ? 1 : -1));
        setSortOnTitle('ASC');
      } else {
        sData = [...data];
        sData.sort((a, b) => (a.title > b.title ? -1 : 1));
        setSortOnTitle('DESC');
      }
    } else if (columnName === 'id') {
      if (sortOnId === 'DESC') {
        sData = [...data];
        sData.sort((a, b) => (a.id > b.id ? 1 : -1));
        setSortOnId('ASC');
      } else {
        sData = [...data];
        sData.sort((a, b) => (a.id > b.id ? -1 : 1));
        setSortOnId('DESC');
      }
    } else if (sortOnStatus === 'DESC') {
      sData = [...data];
      sData.sort((a, b) => (a.completed ? 1 : -1));
      setSortOnStatus('ASC');
    } else {
      sData = [...data];
      sData.sort((a, b) => (a.completed ? -1 : 1));
      setSortOnStatus('DESC');
    }
    setSortedData(sData);
  };

  useEffect(() => {
    const dData = [...sortedData];
    dData.splice(count);
    setDisplayData(dData);
  }, [count, sortedData]);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th
              onClick={() => {
                sort('id');
              }}
            >
              ID
            </th>
            <th
              onClick={() => {
                sort('title');
              }}
            >
              Title
            </th>
            <th
              onClick={() => {
                sort('status');
              }}
            >
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {displayData.map((row) => {
            return (
              <tr>
                <td>{row.id}</td>
                <td>{row.title}</td>
                <td>{row.completed ? 'Completed' : 'Not Completed'}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const TodoMuiTable = (data: Todo[], count: number) => {
  const columns: MUIDataTableColumn[] = [
    {
      name: 'id',
      label: 'ID',
      options: {
        display: true,
        filter: false,
        sort: false,
        customHeadLabelRender: (value) => {
          return <div className={`${scssObj.baseClass}__label`}>{value.label}</div>;
        },
        customBodyRender: (value) => {
          return <div className={`${scssObj.baseClass}__value`}>{value}</div>;
        },
      },
    },
    {
      name: 'title',
      label: 'Title',
      options: {
        display: true,
        filter: false,
        sort: false,
        customHeadLabelRender: (value) => {
          return <div className={`${scssObj.baseClass}__label`}>{value.label}</div>;
        },
        customBodyRender: (value) => {
          return <div className={`${scssObj.baseClass}__value`}>{value}</div>;
        },
      },
    },
    {
      name: 'completed',
      label: 'Status',
      options: {
        display: true,
        filter: false,
        sort: false,
        customHeadLabelRender: (value) => {
          return <div className={`${scssObj.baseClass}__label`}>{value.label}</div>;
        },
        customBodyRender: (value) => {
          return (
            <div className={`${scssObj.baseClass}__value`}>
              {value ? 'Completed' : 'Not Completed'}
            </div>
          );
        },
      },
    },
  ];

  const options: MUIDataTableOptions = {
    pagination: true,
    filterType: 'multiselect',
    filter: true,
    responsive: 'standard',
    selectableRows: 'none',
    rowsPerPage: count,
    search: true,
    print: true,
    viewColumns: false,
    download: true,
    downloadOptions: {
      filename: 'tableDownload.csv',
      separator: ',',
    },
    selectToolbarPlacement: 'replace',
    customFooter: () => null,
  };

  return <MUIDataTable data={data} options={options} columns={columns} title="TODOS" />;
};

const TodoPage = () => {
  const [state, setState] = React.useState<State>({
    fetchState: 'loading',
    todo: undefined,
  });
  const [size, setSize] = useState(0);
  const [count, setCount] = useState(10);

  const getPageData = () =>
    getTodos().then((response) => {
      const result = response as ApiResponse<Todo[]> as ApiSuccess<Todo[]>;
      if (response.status === 200) {
        const totalElements = result?.data?.length;
        if (totalElements) setSize(totalElements);
        const data = result?.data;
        if (data) setState({ fetchState: result.type, todo: result?.data });
        else setState({ fetchState: result.type, todo: [] });
      } else setState({ fetchState: result.type, todo: [] });
    });

  React.useEffect(() => {
    getPageData();
  }, []);

  useSetGlobalHeader(Pages.TODO);
  useSetActiveSidebarItem(ActiveNavigationItem.Todo);

  if (state.fetchState === 'loading' || !state.todo)
    return (
      <div className={`${scssObj.baseClass}__spinner`}>
        <LoadingSpinner />
      </div>
    );
  if (state.fetchState === 'error') return <p>error!...</p>;

  return (
    <div className={`${scssObj.baseClass}`} data-testid="todo-test">
      <Helmet>
        <title>To Do</title>
      </Helmet>
      <TodoTable data={state.todo} count={count} />
      <div className={`${scssObj.baseClass}__action-buttons`}>
        <div className={`${scssObj.baseClass}__button`}>
          <Button iconSize="small" icon="zoom_in" onClick={() => setCount(count + 10)}>
            Show More Todos
          </Button>
        </div>
        <div className={`${scssObj.baseClass}__button`}>
          <Button
            iconSize="small"
            icon="zoom_out"
            onClick={() => setCount(count > 10 ? count - 10 : count)}
          >
            Show Less Todos
          </Button>
        </div>
      </div>
      <div className={`${scssObj.baseClass}__description`}>
        Showing {count} of {size} Todos
      </div>
    </div>
  );
};

const TodoPageWithPermissionsManager = () => {
  return (
    <PermissionsManager isBetaOnly>
      <TodoPage />
    </PermissionsManager>
  );
};

export default TodoPageWithPermissionsManager;
