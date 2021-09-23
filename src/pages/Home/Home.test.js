import { screen, render, cleanup, fireEvent } from "@testing-library/react";
import { store } from '../../stateManagement/store';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import App from "./index";
import userEvent from "@testing-library/user-event";

beforeAll(() => {
    const { getComputedStyle } = window;
    window.getComputedStyle = (elt) => getComputedStyle(elt); //para evitar que me salga unos errores extraños de getComputedStyle, elimo el segundo parametro 
    //Mock de fetch   
    global.fetch = () =>
        Promise.resolve({
            json: () => Promise.resolve([{
                "name": "Cho Chang",
                "species": "human",
                "gender": "female",
                "house": "Ravenclaw",
                "dateOfBirth": "",
                "yearOfBirth": "",
                "ancestry": "",
                "eyeColour": "brown",
                "hairColour": "black",
                "wand": {
                    "wood": "",
                    "core": "",
                    "length": ""
                },
                "patronus": "swan",
                "hogwartsStudent": true,
                "hogwartsStaff": false,
                "actor": "Katie Leung",
                "alive": true,
                "image": "http://hp-api.herokuapp.com/images/cho.jpg"
            }]),
        })
})
//limpoiamos el fetch del mocck al finalizar los tests
const unmockedFetch = global.fetch
afterAll(() => {
    global.fetch = unmockedFetch
})

beforeEach(async () => {
    render(<Provider store={store}>
        <App />
    </Provider>)
    userEvent.click(await screen.findByRole('button', { name: /estudiantes/i }));
})
describe('Render Card with filter', () => {
    it('press the filter staff', async () => {
        const characters = await screen.findByText('Cho Chang');
        expect(characters).toBeInTheDocument();
        userEvent.click(screen.getByRole('button', { name: /estudiantes/i }));
    })
    it('press the filter students', async () => {
        const characters = await screen.findByText('Cho Chang');
        expect(characters).toBeInTheDocument();
        userEvent.click(screen.getByRole('button', { name: /estudiantes/i }));
    })
})
describe('save and discard the card in favorites', () => {
    it('save card in favorites', async () => {
        const btnSave = await screen.findByRole('img', { name: 'save card' })
        userEvent.click(btnSave);
        const btnDeleteFavorite = await screen.findByRole('img', { name: /delete favorite/i })
        expect(btnDeleteFavorite).toBeInTheDocument()
        userEvent.click(btnDeleteFavorite);
        userEvent.click(screen.getByRole('button', { name: /estudiantes/i }));
    })
})