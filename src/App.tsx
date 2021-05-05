import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import moment from 'moment';
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper } from '@material-ui/core';
import './App.css';


interface IOwner {
  display_name: string,
};
interface IItem {
  name: string,
  owner: IOwner,
  title: string,
  creation_date: number,
};
interface IData {
  has_more: boolean;
  items: Array<IItem>;
}

function App() {
  const [page, setPage] = useState<number>(1);
  const [data, setData] = useState<IData>({ has_more: true, items: [] })


  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(`https://api.stackexchange.com/2.2/questions?page=${page}&pagesize=25&site=stackoverflow`);
        const resData = await res.json();
        const newData = { ...resData, items: [...data.items, ...resData.items] };
        setData(newData);
      } catch (e) {
        console.log(e);
      }
    }
    getData();
    // eslint-disable-next-line
  }, [page])

  return (
    <div className="App">
      <div className="title">Stack Overflow Questions</div>
      <div className="table-div">
      <TableContainer className="table-container" id="scrollable-div" component={Paper}>
          <InfiniteScroll
            dataLength={data.items.length}
            next={() => setPage(page + 1)}
            hasMore={data.has_more}
            loader={<h4>Loading...</h4>}
            scrollableTarget="scrollable-div"
            endMessage={
              <p style={{ textAlign: 'center' }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            <Table className="table" aria-label="simple table">
              <TableHead className="table-head">
                <TableRow>
                  <TableCell className="fs-4">Author</TableCell>
                  <TableCell className="fs-4" align="center">Title</TableCell>
                  <TableCell className="fs-4" align="right">Creation Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody className="table-body">
                {data.items && data.items.map((row, idx) => (
                  <TableRow key={`${row.title}-${idx}`} className="tablerow">
                    <TableCell component="th" scope="row" className="fs-5">
                      {row.owner.display_name}
                    </TableCell>
                    <TableCell align="center" className="fs-5">{row.title}</TableCell>
                    <TableCell align="right" className="fs-5">{moment(row.creation_date * 1000).format('DD MM YYYY')}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </InfiniteScroll>
        </TableContainer>
      </div>
    </div>
  );
}

export default App;
