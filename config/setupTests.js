import '@testing-library/jest-dom/extend-expect';
import 'jest-canvas-mock';
import React from 'react';

React.useLayoutEffect = React.useEffect;

global.React = React;
