import { render, screen } from '@testing-library/react';
import Overview from 'pages/index';
import '@testing-library/jest-dom';

describe('Overview', () => {
    it('renders an overview', () => {
        render(<Overview />)

        expect(screen.getByText('Overview')).toBeInTheDocument()
    })
});