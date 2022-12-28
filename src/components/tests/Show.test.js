import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Show from './../Show';
import userEvent from '@testing-library/user-event';

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

test('renders without errors', () => { 
    render(<Show show={exampleShow} selectedSeason={'none'}/>)
});

test('renders Loading component when prop show is null', () => { 
    render(<Show show={null} />);
    expect(screen.getByText(/fetching data.../i)).toBeInTheDocument()
});

test('renders same number of options seasons are passed in', () => { 
    render(<Show show={exampleShow} selectedSeason={'none'}/>)
    const seasonOptions = screen.queryAllByTestId('season-option');
    expect(seasonOptions).toHaveLength(2);
});

test('handleSelect is called when an season is selected', () => {
    const handleSelect =jest.fn(); 
    render(<Show show={exampleShow} selectedSeason={'none'} handleSelect={handleSelect}/>);
    const select = screen.getByLabelText(/Select A Season/i);
    userEvent.selectOptions(select, ['1']);
});

test('component renders when no seasons are selected and when rerenders with a season passed in', () => { 
    const { rerender } = render(<Show show={exampleShow} selectedSeason={'none'} />);
    let episodes = screen.queryByTestId('episodes-container');
    expect(episodes).not.toBeInTheDocument();

    rerender(<Show show={exampleShow} selectedSeason={1} />);
    episodes = screen.queryByTestId('episodes-container'); 
    expect(episodes).toBeInTheDocument();
});
