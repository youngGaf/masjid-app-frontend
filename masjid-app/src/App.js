import { Switch, Route } from 'react-router-dom';
import AdminPage from '../src/pages/admin-page/admin-page.component';
import BookingPage from '../src/pages/booking-page/booking-page.component'
import Header from '../src/components/header/header.component';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path='/' component={BookingPage} />
        <Route exact path='/admin' component={AdminPage} />
      </Switch>
    </div>
  );
}

export default App;
