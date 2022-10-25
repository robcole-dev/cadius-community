import styles from './App.module.css';
import NavBar from './components/NavBar';
import Container from 'react-bootstrap/Container';
import { Route, Switch } from 'react-router-dom';
import './api/axiosDefaults';
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from './pages/auth/SignInForm';
import ServerCreateForm from './pages/servers/ServerCreateForm';
import ServerPage from './pages/servers/ServerPage';
import ServersPage from './pages/servers/ServersPage';
import ServerEditPage from './pages/servers/ServerEditPage';
import ScreenshotCreateForm from './pages/screenshots/ScreenshotCreateForm';
import ScreenshotEditForm from './pages/screenshots/ScreenshotEditForm';
import ScreenshotPage from './pages/screenshots/ScreenshotPage';
import ScreenshotsPage from './pages/screenshots/ScreenShotsPage';

function App() {
  return (
    <div className={styles.App}>
      <NavBar />
      <Container>
        <Switch>
          <Route exact path='/' render={() => <h1>Home Page</h1>} />
          <Route exact path='/servers' render={() => <ServersPage />} />
          <Route exact path='/screenshots' render={() => <ScreenshotsPage />} />
          <Route exact path='/profile' render={() => <h1>Profile</h1>} />
          <Route exact path='/signin' render={() => <SignInForm />} />
          <Route exact path='/signup' render={() => <SignUpForm />} />
          <Route exact path='/servers/create' render={() => <ServerCreateForm />} />
          <Route exact path='/servers/:id' render={() => <ServerPage />} />
          <Route exact path='/servers/:id/edit' render={() => <ServerEditPage />} />
          <Route exact path='/screenshots/create' render={() => <ScreenshotCreateForm />} />
          <Route exact path='/screenshots/:id' render={() => <ScreenshotPage />} />
          <Route exact path='/screenshots/:id/edit' render={() => <ScreenshotEditForm />} />
          <Route render={() => <p>Page not found!</p>} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;
