import { useEffect, useState, useContext } from 'react'
import { Switch, Route } from 'react-router-dom';
import AdminPage from '../src/pages/admin-page/admin-page.component';
import BookingPage from '../src/pages/booking-page/booking-page.component'
import Header from '../src/components/header/header.component';
import Footer from '../src/components/footer/footer.component';
import Loading from '../src/components/loading/loading.component';
import { DetailsContext } from './store/store';
import Unauthorized from '../src/components/unauthorized/unauthorized.component';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


function App() {
  const [data, setData] = useState([{}]);
  const [details] = useContext(DetailsContext);

  const url = process.env.REACT_APP_URL ? 
  `${process.env.REACT_APP_URL}` : 'http://localhost:8080'

  useEffect(()=> {
    const requestParameters = {
      method: 'get'
    }
  fetch(`${url}/api/v1/index`, requestParameters)
  .then(res => res.json())
  .then(data => {
      // console.log(data);
      setData(data.data);
  }).catch(error => {
      console.log(error.message)
  });
  },[url]);

  const { solat, bookingCount } = data;
  return (
    <div className="App">
      <Header />
      {solat ? 
      <Switch>
        <Route exact path='/' 
          render={ (props) => (<BookingPage {...props} 
            bookingCount={bookingCount} 
            prayer={solat.prayer} 
            batch={solat.batch}
            batches={solat.batches}
            time={solat.time}
          />)}
        />
        {details.authenticated ?
          <Route exact path='/admin' component={AdminPage} /> 
          :
          solat && <Unauthorized />
        }
      </Switch> 
      : 
      <div className='container flex'>
        <div className='loader'>
          <Loading solat={solat}/>
        </div>
      </div>
      }
      <Footer />
    </div>
  );
}

export default App;
