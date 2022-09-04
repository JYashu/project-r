import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import MUIDataTable, { MUIDataTableColumn, MUIDataTableOptions } from 'mui-datatables';
import { ActiveSidebarItem, Todo } from '../../types';
import useSetGlobalHeader from '../../hooks/useSetGlobalHeader';
import { getTodos } from '../../utils/api';
import { ApiResponse, ApiSuccess } from '../../utils/apiUtils';
import scssObj from './_TodoPage.scss';
import useActiveSidebarItem from '../../hooks/useActiveSidebarItem';
import Button from '../Button';
import LoadingSpinner from '../LoadingSpinner';

type State = {
  fetchState: 'loading' | 'error' | 'success';
  todo: Todo[] | undefined;
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
        customHeadLabelRender: value => {
          return <div className={`${scssObj.baseClass}__label`}>{value.label}</div>;
        },
        customBodyRender: value => {
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
        customHeadLabelRender: value => {
          return <div className={`${scssObj.baseClass}__label`}>{value.label}</div>;
        },
        customBodyRender: value => {
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
        customHeadLabelRender: value => {
          return <div className={`${scssObj.baseClass}__label`}>{value.label}</div>;
        },
        customBodyRender: value => {
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
    getTodos().then(response => {
      const result = (response as ApiResponse<Todo[]>) as ApiSuccess<Todo[]>;
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

  useSetGlobalHeader('Todo');
  useActiveSidebarItem(ActiveSidebarItem.Todo);

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
      {TodoMuiTable(state.todo, count)}
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

export default TodoPage;
