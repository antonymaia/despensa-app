import create from 'zustand';

const apiStore = create((set) => ({
    baseUrlApi: 'https://despensaapi.herokuapp.com',
}));

export default apiStore;