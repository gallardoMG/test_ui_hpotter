export const apiShowStaff = async () => {
    try {
        const data = await fetch('https://server-json-hp.herokuapp.com/staff');
        const parseData = await data.json();
        dispatch({ type: 'ADD__DATA', payload: parseData });
    } catch (e) {
        alert('Ocurrion un error, intentalo de nuevo')
        console.log(e)
    }
}

export const apiShowStudents = async () => {
    try {
        const data = await fetch('https://server-json-hp.herokuapp.com/students');
        const parseData = await data.json();
        dispatch({ type: 'ADD__DATA', payload: parseData });
    } catch (e) {
        alert('Ocurrion un error, intentalo de nuevo')
        console.log(e)
    }
}