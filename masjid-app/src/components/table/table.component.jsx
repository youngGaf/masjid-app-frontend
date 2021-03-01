import React, { useState, useEffect, useContext }from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { DetailsContext } from '../../store/store'
import './table.styles.scss';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    
  },
});


export default function BasicTable() {
    const [data, setData] = useState([]);
    const [details] = useContext(DetailsContext);

    const url = process.env.REACT_APP_URL ? 
        `${process.env.REACT_APP_URL}` : 'http://localhost:8080'


    useEffect(() => {
        const requestParameters = {
            method: 'get',
            headers: {
                'x-auth-token': details.token
            }
        }

        fetch(`${url}/api/v1/admin/all-users`, requestParameters)
        .then((response) => response.json())
        .then(obj => {
            if(obj.data.length !== data.length) {
                setData(obj.data);
            }
        })
        .catch(err => {
            console.log(err);
        })
    }, [data, details.token, url])

    
    const classes = useStyles();

    return (
        <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
        <TableHead>
        <TableRow className='table-row'>
            <TableCell> Full&nbsp; Name</TableCell>
            <TableCell align="left">Email</TableCell>
            <TableCell align="left">id</TableCell>
        </TableRow>
        </TableHead>
        <TableBody>
        {data.map((data) => (
            <TableRow key={data.email}>
                <TableCell component="th" scope="row">
                    {data.fullName}
                </TableCell>
                <TableCell align="left">{data.email}</TableCell>
                <TableCell align="left">{data._id}</TableCell>
            </TableRow>
        ))}
        </TableBody>
        </Table>
        </TableContainer>
  );
}