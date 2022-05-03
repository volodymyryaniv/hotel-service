import React, { useEffect, useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { useUser } from 'reactfire';
import AuthenticatedLayout from '../AuthenticatedLayout';
import GuestLayout from '../GuestLayout';
import HomeScreen from '../HomeScreen';
import NotFoundScreen from '../NotFoundScreen';
import SignInScreen from '../../Auth/SignInScreen';
import SignUpScreen from '../../Auth/SingUpScreen';
import FlatList from '../FlatList';

const Root: React.FC = () => {
  const {
    data: user,
    // hasEmitted,
    firstValuePromise,
  } = useUser();
  const [isUserLoaded, setIsUserLoaded] = useState(false);
  const isLogged = !!user;
  useEffect(() => {
    firstValuePromise.then(() => setIsUserLoaded(true));
  }, [firstValuePromise, setIsUserLoaded]);

  if (!isUserLoaded) {
    return null;
  }

  if (isLogged) {
    return (
      <AuthenticatedLayout>
        <Switch>
          <Route exact path="/" component={HomeScreen} />
          <Route exact path="/login" component={() => <Redirect to="/" />} />
          <Route exact path="/register" component={() => <Redirect to="/" />} />
          <Route path="/flats" component={FlatList} />
          <Route path="*" component={NotFoundScreen} />
        </Switch>
      </AuthenticatedLayout>
    );
  }

  return (
    <GuestLayout>
      <Switch>
        <Route exact path="/" component={() => <Redirect to="/login" />} />
        <Route exact path="/login" component={SignInScreen} />
        <Route exact path="/register" component={SignUpScreen} />
        <Route exact path="/flats" component={() => <Redirect to="/" />} />
        <Route path="*" component={NotFoundScreen} />
      </Switch>
    </GuestLayout>
  );
};

export default Root;
