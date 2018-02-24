import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/common/Layout';
import Home from './components/home/HomePage';
import FetchData from './components/demo/FetchData';
import Counter from './components/demo/Counter';
import BookList from './components/book/BookList';

export const routes = <Layout>
    <Route exact path='/' component={Home} />
    <Route path='/counter' component={Counter} />
    <Route path='/fetchdata/:startDateIndex?' component={FetchData} />
    <Route path='/books' component={BookList} />
</Layout>;
