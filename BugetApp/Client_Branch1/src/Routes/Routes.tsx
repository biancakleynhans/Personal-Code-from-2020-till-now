import React from 'react'
import Home from '../Components/Pages/000_Home';
import PfdConverter from '../Components/Pages/002_PdfReader';
import CsvReader from '../Components/Pages/001_CsvReader';
import ViewTransactionsTable from '../Components/Pages/005_ViewTransactionsTable';
import ViewTransactionsBreakDown from '../Components/Pages/006_ViewTransactionsBreakDown';


export const routes = 
{
  //Shared Routes
  home:{
    path: '/',
    exact: true,
    component: Home,
    name: "Home"
  },
  PdfReader:{
    path: '/pdfReader',
    exact: true,
    component: PfdConverter,
    name: "Pdf Reader"
  },
  CsvReader:{
    path: '/csvReader',
    exact: true,
    component: CsvReader,
    name: "Csv Reader"
  },

  ViewTable:{
    path: '/viewTable',
    exact: true,
    component: ViewTransactionsTable,
    name: "View Transactions Table"
  },

  ViewBreakdown:{
    path: '/viewBreakdown',
    exact: true,
    component: ViewTransactionsBreakDown,
    name: "View Transactions BreakDown"
  },
  
  //Not defined show this
  NoRouteDefined: {
    NotFound: <div>Page NotFound</div>
  }
  
  }
export const NotFound = () => routes.NoRouteDefined.NotFound
  