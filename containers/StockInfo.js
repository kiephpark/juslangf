import React, { useState } from 'react';

import { makeStyles, useTheme, withStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Autocomplete from '@material-ui/lab/Autocomplete';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/icons/Menu';

import { LineChart, Line, XAxis, YAxis, Tooltip, Legend} from 'recharts';
import _ from "lodash";
import clsx from 'clsx';

// components
import TabPanel, { AntTab, AntTabs }  from 'components/TabPanel';
import Guage from 'components/Guage';
import Copyright from 'components/Copyright';

// api
import gamerank from 'api/gamerank';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
  menuHeight: {
    height: 80,
  },
  margin: {
    margin: theme.spacing(1), //버튼 앞에 여백 조절
  },
  text: { //AppBar 폰트 색상. react 스타일 색상 적용
    color: "#AED6F1",
    backgroundColor: "#282C35",
  },
}));

const useAppBarStyles = makeStyles({
  header: {
    backgroundColor: "#212F3C",
    color: "#AED6F1", //"#AED6F1",
    boxShadow: "5px 5px 5px 5px"
  }
});

export default function StockInfo() {
  const theme = useTheme();
  const classes = useStyles();
  const classes2 = useAppBarStyles(); //added for AppBar

  const [ stockInfo, setStockInfo] = useState(null);
  const [ fetchMe, setFetchMe] = useState(false);
  const [ naverDone, setNaverDone] = useState(false);
  const [ stockName, setStockName] = useState("");
  const [ reportValue, setReportValue] = useState([]);
  const [ comment, setComment] = useState('종목이름을 입력하고, 분석을 누르세요.');
  const [ value, setValue] = React.useState(0);
  const [ data, setData] = React.useState([]);

  let config = {
    headers: {
    }
  }
  const [ quarterR, setQuarterR] = useState([]);
  const [ yearR, setYearR] = useState([]);
  const [ quarterSales, setQuarterSales] = useState([]);
  const [ yearSales, setYearSales] = useState([]);
  const [ quarterP, setQuarterP] = useState([]);
  const [ yearP, setYearP] = useState([]);
  const [guageScore, setGuageScore] = useState(0);

  // if(loading && !data){
  //   return (
  //     <>
  //       <Backdrop className={classes.backdrop} open={loading}>
  //         <CircularProgress color="inherit" />
  //       </Backdrop>
  //     </>
  //   );
  // }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleStock = () => {
    gamerank.gevolution(data)
    .then(res => {
      if(res.status == 200){
        if(res.data['status'] === "OK"){
          setSearchList(res.data['data'])
          console.log("data:", searchList);
        }
      }
    })
    .catch(e=>{
      console.log(e)
    }
  )
  };

  const getStatus = (taskID, counter) => {

  }

  const handleNaver = () => {

  };

  return (
    <main className={classes.content}>
    <CssBaseline /> {/*applied Tmon font*/}
    <Container maxWidth="lg" className={classes.container}>
    {/*added for AppBar*/}
    <div>
        <AppBar position="sticky" className={classes2.header}>
          <Toolbar>
            <IconButton aria-label="app" color="inherit">
              <Menu />
            </IconButton>
              <Typography  variant="h4" className={classes.text}>주린이 자동 주식 평가 툴</Typography>
          </Toolbar>
        </AppBar>
    </div>

    <div className={classes.appBarSpacer} /> {/*appbar와 종목검색 창 사이 띄우기*/}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <Autocomplete
                inputValue={stockName}
                onInputChange={(event, newInputValue) => {
                  setStockName(newInputValue);
                }}
                id="stockname"
                options={data.corporation}
                getOptionLabel={(option) => option.stockName}
                style={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="종목명" size='medium' variant="outlined"/>}
              />
            </Grid>
            <Grid item>
              <Button onClick={handleStock} variant="contained" size='large'>
                종목 분석
              </Button>
            </Grid>
            <Grid item>
              <Button onClick={handleNaver} variant="contained" size='large'>
                네이버 애널 추천 종목 자동 분석
              </Button>
            </Grid>
          </Grid>
        </Grid>

        {!fetchMe &&
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Typography variant="h3" color="textSecondary" align="center">
                {comment}
              </Typography>
            </Paper>
          </Grid>
        }

        {naverDone &&
          <Grid item xs={12}>
            <Typography variant="h3" color="textSecondary" align="center">
              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>종목이름(종목코드)</TableCell>
                      <TableCell align="right">적정시총(억원)</TableCell>
                      <TableCell align="right">현재시총(억원)</TableCell>
                      <TableCell align="right">주슐랭평가</TableCell>
                      <TableCell align="right">비고</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {reportValue.map((row) => (
                      <TableRow key={row.stock_name.id}>
                        <TableCell component="th" scope="row">
                          {row.stock_name}({row.stock_code})
                        </TableCell>
                        <TableCell align="right">{row['적정시총']}</TableCell>
                        <TableCell align="right">{row['현재시총']}</TableCell>
                        <TableCell align="right">{row['message']}</TableCell>
                        <TableCell align="right">{}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Typography>
          </Grid>
        }
        {fetchMe &&
          <>
            <Grid item xs={8}>
              <Paper className={classes.paper}>
                <Typography variant="h6" color="textSecondary" align="left">
                  주식 코드: {stockInfo['stock_code']}
                </Typography>
                <Typography variant="h6" color="textSecondary" align="left">
                  적정시총: {stockInfo['적정시총'].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} 억원
                </Typography>
                <Typography variant="h6" color="textSecondary" align="left">
                  현재시총: {stockInfo['현재시총'].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} 억원
                </Typography>
                <Typography variant="h3" color="textSecondary" align="left">
                  평가: {stockInfo['message']}
                </Typography>
              </Paper>
            </Grid>
            <div>
              <Grid item xs={4}>
                  <Guage value={guageScore} />
              </Grid>
            </div>

            <Grid item xs={12}>
              <div className={classes.demo1}>
                <AntTabs value={value} onChange={handleChange} aria-label="ant example">
                  <AntTab label="매출" />
                  <AntTab label="영업이익" />
                  <AntTab label="순이익" />
                </AntTabs>
                <TabPanel value={value} index={0} dir={theme.direction}>
                  <Grid container>
                    <Grid item >
                      <h3>매출(QoQ)</h3>
                      <LineChart
                        width={400}
                        height={240}
                        data={quarterR}
                        margin={{
                          top: 5, right: 30, left: 20, bottom: 5,
                        }}
                      >
                        {/* <CartesianGrid strokeDasharray="5 5" /> */}
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="price" stroke="#1155d8" />
                      </LineChart>
                    </Grid>
                    <Grid item >
                      <h3>매출(YoY)</h3>
                      <LineChart
                        width={400}
                        height={240}
                        data={yearR}
                        margin={{
                          top: 5, right: 30, left: 20, bottom: 5,
                        }}
                      >
                        {/* <CartesianGrid strokeDasharray="3 3" /> */}
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="price" stroke="#1155d8" />
                      </LineChart>
                    </Grid>
                  </Grid>
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                  <Grid container>
                    <Grid item >
                      <h3>영업이익(QoQ)</h3>
                      <LineChart
                        width={400}
                        height={240}
                        data={quarterSales}
                        margin={{
                          top: 5, right: 30, left: 20, bottom: 5,
                        }}
                      >
                        {/* <CartesianGrid strokeDasharray="5 5" /> */}
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="price" stroke="#1155d8" />
                      </LineChart>
                    </Grid>
                    <Grid item >
                      <h3>영업이익(YoY)</h3>
                      <LineChart
                        width={400}
                        height={240}
                        data={yearSales}
                        margin={{
                          top: 5, right: 30, left: 20, bottom: 5,
                        }}
                      >
                        {/* <CartesianGrid strokeDasharray="3 3" /> */}
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="price" stroke="#1155d8" />
                      </LineChart>
                    </Grid>
                  </Grid>
                </TabPanel>
                <TabPanel value={value} index={2} dir={theme.direction}>
                  <Grid container>
                    <Grid item >
                      <h3>순이익(QoQ)</h3>
                      <LineChart
                        width={400}
                        height={240}
                        data={quarterP}
                        margin={{
                          top: 5, right: 30, left: 20, bottom: 5,
                        }}
                      >
                        {/* <CartesianGrid strokeDasharray="5 5" /> */}
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="price" stroke="#1155d8" />
                      </LineChart>
                    </Grid>
                    <Grid item >
                      <h3>순이익(YoY)</h3>
                      <LineChart
                        width={400}
                        height={240}
                        data={yearP}
                        margin={{
                          top: 5, right: 30, left: 20, bottom: 5,
                        }}
                      >
                        {/* <CartesianGrid strokeDasharray="3 3" /> */}
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="price" stroke="#1155d8" />
                      </LineChart>
                    </Grid>
                  </Grid>
                </TabPanel>
              </div>
            </Grid>
          </>
        }
      </Grid>

      <Box pt={4}>
        <Copyright />
      </Box>
    </Container>
  </main>
  );
}
