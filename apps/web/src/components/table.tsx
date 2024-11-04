import {
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

const columns = [
  { header: 'Name', accessor: 'name' },
  { header: 'Type', accessor: 'type' },
  { header: 'Actions', accessor: 'action' },
];

function createData(name: string, type: string, actions: Array<string>) {
  return { name, type, actions };
}

const rows = [
  createData('Machine 1', 'Pump', ['Edit', 'Delete']),
  createData('Machine 2', 'Fan', ['Edit', 'Delete']),
];

const Table = () => {
  return (
    <TableContainer>
      <TableHead>
        <TableRow>
          {columns.map((col) => (
            <TableCell key={col.accessor}>
              <h3 className="font-semibold">{col.header}</h3>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row) => (
          <TableRow
            key={row.name}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {row.name}
            </TableCell>
            <TableCell align="right">{row.type}</TableCell>
            <TableCell align="right">{row.actions}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </TableContainer>
  );
};

export default Table;
