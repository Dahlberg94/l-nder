export const fetchAllCountries = async () => {
    const response = await fetch('https://restcountries.com/v3.1/all');
    if (!response.ok) throw new Error ('Failed to find countries');
    return await response.json();
}

export const fetchCountryByName = async (name) => {
    const response = await fetch (`https://restcountries.com/v3.1/name/${name}`);
    if (!response.ok) throw new Error(`Failed to find : ${name}`);
    return await response.json();
};