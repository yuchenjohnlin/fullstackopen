import { useState , useEffect} from 'react'
import countryAPI from './services/countries.js'

const CountryDisplay = ({countries, details, input}) => {
    console.log(countries)
    if(!countries){return null}

    if(countries.length > 10){
        return <div>Too many matches, specify another filter</div>
    }
    if(countries.length === 1){
        if(details){

            console.log(details)
            return (
                <div>
                <h1>{details.name.common}</h1>
                <p>Capital: {details.capital.join(", ")}</p>
                <h2>Languages</h2>
                <ul>
                    {Object.values(details.languages).map(lang => <li key={lang}>{lang}</li>)}
                </ul>
                <img src={details.flags.png} alt={`Flag of ${details.name.common}`} width="300"/>            
                </div>
            )
        }
    }
    return (
        <div>
            {countries.map(c => <div key={c}>{c}</div>)}
        </div>
    )
}

const InputCountry = ({input, inputFunction}) => {

    return (
        <div>
            find countries <input value={input} onChange={inputFunction}/>
        </div>
    )
}

const App = () => {
    const [input, setInput] = useState('')
    const [countries, setCountries] = useState([])
    const [details, setDetails] = useState(null)

    useEffect(() => {
        countryAPI
            .getAll()
            .then(response => {
                const names = response.data.map(country => country.name.common)
                console.log(names)
                setCountries(names)
            })
    }, [])

    const filtered = countries.filter(c =>
        c.toLowerCase().includes(input.toLowerCase())
    )

    console.log(input)
    console.log("filtered", filtered)

    useEffect(() => {
        if (input === '') {
            setDetails(null)
            return
        }

        if (filtered.length === 1 && filtered[0].toLowerCase() === input.toLowerCase()) {
            countryAPI.getCountry(filtered[0]).then(res => {
                console.log(Object.keys(res.data))
                setDetails(res.data)  // store full details
            })
        } else {
            setDetails(null)
        }
    }, [input])


    // not sure if useEffect is needed 
    const handleInput = event => {
        setInput(event.target.value)
    }

    return (
        <>
            <InputCountry inputFunction={handleInput} input={input}/>
            <CountryDisplay countries={filtered} details={details} input={input}/>
        </>
    )
}

export default App