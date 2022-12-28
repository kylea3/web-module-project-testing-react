import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event'
import Display from './../Display';
import mockFetchShow from './../../api/fetchShow'
jest.mock('./../../api/fetchShow');

const exampleShow = {
    name: 'Suits',
    summary: "On the run from a drug deal gone bad, brilliant college dropout Mike Ross finds himself working with Harvey Specter, one of New York City's best lawyers.",
    seasons: [
    {
        id: 1,
        name: 'Season 1',
        episodes: []
    },
    {
        id: 2,
        name: 'Season 2',
        episodes: []
    }]
}

test('renders without errors with no props', async () => { 
    render(<Display />)
});

test('renders Show component when the button is clicked ', async () => {
    mockFetchShow.mockResolvedValueOnce(exampleShow)

    render(<Display />);
    const button = screen.getByRole('button');
    userEvent.click(button);

    const show = await screen.findByTestId('show-container');
    expect(show).toBeInTheDocument();

});

test('renders show season options matching your data when the button is clicked', async () => { 
    mockFetchShow.mockResolvedValueOnce(exampleShow);

    render(<Display />);
    const button = screen.getByRole('button');
    userEvent.click(button);
    
    await waitFor(() => {
        const seasonOptions = screen.queryAllByTestId('season-option');
        expect(seasonOptions).toHaveLength(2);
    });
});

test('displayFunc is called when fetch button is pressed', async ()=> {
    mockFetchShow.mockResolvedValueOnce(exampleShow);
    const displayFunc = jest.fn();

    render(<Display displayFunc={displayFunc} />);
    const button = screen.getByRole('button');
    userEvent.click(button);

    await waitFor(() => {
        expect(displayFunc).toHaveBeenCalled();
    })
})



