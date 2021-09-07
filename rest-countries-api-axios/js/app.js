
const printInfo = info => {
    const { name, population, capital } = info[0]
    const text = `El país ${name}, con capital ${capital}, tiene ${population} habitantes`

    document.querySelector('#result').innerHTML = text
}

const printError = name => {
    document.querySelector('#result').innerHTML = `<span style="color: red">El país ${name} no existe...</span>`
}

const getCountryInfo = name => {
    axios
        .get(`https://restcountries.eu/rest/v2/name/${name}`)
        .then(response => printInfo(response.data))
        .catch(err => printError(name))

}
document.querySelector('#countryName').onkeyup = () => {
    const countryValue = document.querySelector('#countryName').value
    getCountryInfo(countryValue)
}