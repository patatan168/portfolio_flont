import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { visuallyHidden } from '@mui/utils';
import { BlogObj } from '@store/api/endpoints/BlogEndpoints';
import { useDeleteBlogMutation, useGetEditBlogQuery } from '@store/api/LoginApi';
import { createFormatedDate } from 'public/functions/createFormatedDate';
import { memo, useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof T, T>(
  order: Order,
  orderBy: Key
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

type HeadCell = {
  disablePadding: boolean;
  id: keyof BlogObj;
  label: string;
  numeric: boolean;
};

const headCells: readonly HeadCell[] = [
  {
    id: 'title',
    numeric: false,
    disablePadding: false,
    label: 'Title',
  },
  {
    id: 'post_time',
    numeric: false,
    disablePadding: false,
    label: 'Post Time',
  },
  {
    id: 'edit_time',
    numeric: false,
    disablePadding: false,
    label: 'Edit Time',
  },
];

type UserListProps = {
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof BlogObj) => void;
  order: Order;
  orderBy: string;
};

const UserListHead = memo(function _UserListHead({ order, orderBy, onRequestSort }: UserListProps) {
  const createSortHandler = useCallback(
    (property: keyof BlogObj) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    },
    [onRequestSort]
  );

  const sortLabel = order === 'desc' ? 'sorted descending' : 'sorted ascending';

  return (
    <TableHead>
      <TableRow>
        <TableCell align="center">Delete</TableCell>
        {headCells.map(({ id, disablePadding, label, numeric }) => {
          const isActive = orderBy === id;
          const align = numeric ? 'right' : 'left';
          const padding = disablePadding ? 'none' : 'normal';
          return (
            <UserListCell
              key={id}
              {...{
                align,
                id,
                isActive,
                disablePadding,
                label,
                order,
                padding,
                sortLabel,
                createSortHandler,
              }}
            />
          );
        })}
      </TableRow>
    </TableHead>
  );
});

interface UserListCellProps {
  align: 'right' | 'left';
  id: keyof BlogObj;
  isActive: boolean;
  label: string;
  order: Order;
  padding: 'none' | 'normal';
  sortLabel: string;
  createSortHandler: (property: keyof BlogObj) => (event: React.MouseEvent<unknown>) => void;
}

const UserListCell = memo(function _UserListCell({
  align,
  id,
  isActive,
  label,
  order,
  padding,
  sortLabel,
  createSortHandler,
}: UserListCellProps) {
  const direction = isActive ? order : 'asc';
  const sortDirection = isActive ? order : false;
  return (
    <TableCell sx={{ px: 1 }} align={align} padding={padding} sortDirection={sortDirection}>
      <TableSortLabel active={isActive} direction={direction} onClick={createSortHandler(id)}>
        {label}
        {isActive ? (
          <Box component="span" sx={visuallyHidden}>
            {sortLabel}
          </Box>
        ) : null}
      </TableSortLabel>
    </TableCell>
  );
});

const UserListToolbar = () => {
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
      }}
    >
      <Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle" component="div">
        Blog List
      </Typography>
    </Toolbar>
  );
};

const BlogEdit = () => {
  const [order, setOrder] = useState<Order>('desc');
  const [orderBy, setOrderBy] = useState<keyof BlogObj>('post_time');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { data, isSuccess } = useGetEditBlogQuery();
  const dataList = data === undefined ? [] : data;
  const [deleteBlog] = useDeleteBlogMutation();
  const navigate = useNavigate();

  const handleRequestSort = useCallback(
    (_event: React.MouseEvent<unknown>, property: keyof BlogObj) => {
      const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
    },
    [order, orderBy]
  );

  const handleChangePage = useCallback(
    (_event: unknown, newPage: number) => {
      setPage(newPage);
    },
    [page]
  );

  const handleChangeRowsPerPage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    },
    [rowsPerPage]
  );

  const handleDelete = (uuid: string) => {
    return (formEvent: React.FormEvent) => {
      const result = confirm('本当に削除しますか？');
      if (result) {
        deleteBlog(uuid);
      } else {
        /**
         * Formイベントを実施しない
         * NOTE: フォームイベントによりページの更新を抑制
         */
        formEvent.preventDefault();
      }
    };
  };

  const editLink = (path: string) => () => {
    navigate(`/login/blog/edit/${path}`);
  };

  const visibleRows = useMemo(
    () =>
      stableSort(dataList, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage, dataList]
  );

  return (
    <>
      <Paper sx={{ mb: 2 }}>
        <UserListToolbar />
        {isSuccess && (
          <>
            <TableContainer>
              <Table aria-labelledby="tableTitle" size={'medium'}>
                <UserListHead order={order} orderBy={orderBy} onRequestSort={handleRequestSort} />
                <TableBody>
                  {visibleRows.map(({ title, uuid, post_time, edit_time, path }, index) => {
                    const labelId = `enhanced-table-${index}`;
                    return (
                      <TableRow hover tabIndex={-1} key={uuid} sx={{ cursor: 'pointer' }}>
                        <TableCell align="center">
                          <form onSubmit={handleDelete(uuid)}>
                            <IconButton type="submit" aria-label="delete">
                              <DeleteIcon />
                            </IconButton>
                          </form>
                        </TableCell>
                        <TableCell
                          sx={{ px: 2 }}
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="none"
                          onClick={editLink(path)}
                        >
                          {title}
                        </TableCell>
                        <TableCell align="center" onClick={editLink(path)}>
                          {createFormatedDate(post_time)}
                        </TableCell>
                        <TableCell align="center" onClick={editLink(path)}>
                          {createFormatedDate(edit_time)}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={dataList.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </>
        )}
      </Paper>
    </>
  );
};

export default BlogEdit;
