import React from 'react';
import PfdConverter from './pdf';
import CsvReader from './CsvReader';

export default function App () {
  return (
    <main>
      <h1>Budget App</h1>

      <h2>PDF Converter</h2>
      <PfdConverter />

      <h2>CSV Reader</h2>
      <CsvReader/>

    </main>
  )
}