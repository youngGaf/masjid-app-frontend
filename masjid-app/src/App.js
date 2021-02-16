import { useEffect, useState } from 'react'
import { Switch, Route } from 'react-router-dom';
import AdminPage from '../src/pages/admin-page/admin-page.component';
import BookingPage from '../src/pages/booking-page/booking-page.component'
import Header from '../src/components/header/header.component';
import Footer from '../src/components/footer/footer.component';
import './App.css';

function App() {
  const [data, setData] = useState([{}]);

  useEffect(()=> {
    const requestParameters = {
      method: 'get'
    }
  fetch('http://localhost:8080/api/v1/index', requestParameters)
  .then(res => res.json())
  .then(data => {
      console.log(data);
      setData(data.data);
  }).catch(error => {
      console.log(error.message)
  });
  },[]);

  const { solat, bookingCount } = data;
  return (
    <div className="App">
      <Header />
      <Switch>
       {solat && 
        <Route exact path='/' 
          render={ (props) => (<BookingPage {...props} 
            bookingCount={bookingCount} 
            prayer={solat.prayer} 
            batch={solat.batch}
            batches={solat.batches}
            time={solat.time}
          />)}
        />}
        <Route exact path='/admin' component={AdminPage} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
