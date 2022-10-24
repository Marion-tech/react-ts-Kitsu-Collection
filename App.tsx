import * as React from 'react';
import { Collection } from './Collection';
import { Title } from './Title';

import './style.scss';

export default function App() {
  let showCollection = true;
  return (
    <div>
      {showCollection ? (
        <div>
          <Title title="Je suis un titre" subtitle="subtitle" />
          <Collection />{' '}
        </div>
      ) : (
        'Aucune collection'
      )}
    </div>
  );
}
