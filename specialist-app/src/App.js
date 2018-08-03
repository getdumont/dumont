import React from "react";
import ReactDOM from "react-dom";

import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { TweetAnalyzePage, ProfilePage, HistoryPage, LoginPage } from 'pages';
import { DashboardContainer } from 'containers';

const DashboardPage = (props) => (
    <DashboardContainer>
        <Switch>
            <Route exact path='/' component={TweetAnalyzePage} />
            <Route path='/profile' component={ProfilePage} />
            <Route path='/history' component={HistoryPage} />
        </Switch>
    </DashboardContainer>
)

const App = () => (
    <BrowserRouter>
        <Switch>
            <Route path='/login' component={LoginPage} />
            <Route path='/' render={DashboardPage} />
        </Switch>
    </BrowserRouter>
)

ReactDOM.render(<App />, document.getElementById("dumont-specialist"));