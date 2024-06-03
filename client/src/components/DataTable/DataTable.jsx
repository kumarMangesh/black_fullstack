import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function DataTable({ data }) {
  return (
    <TableContainer component={Paper} sx={{maxHeight: 800}}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell align="right">Topic</TableCell>
            <TableCell align="right">Added</TableCell>

            <TableCell align="right">Intensity</TableCell>
            <TableCell align="right">Region</TableCell>
            <TableCell align="right">Pestle</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="right">{row.title}</TableCell>
              <TableCell align="right">{row.topic}</TableCell>
              <TableCell align="right">{row.added}</TableCell>
              <TableCell align="right">{row.intensity}</TableCell>
              <TableCell align="right">{row.region}</TableCell>
              <TableCell align="right">{row.pestle}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
