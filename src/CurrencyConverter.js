import React, {useState, useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Grid from "@material-ui/core/Grid";
import {availableCurrencies} from "./sample-data";
import axios from 'axios';
import TextField from "@material-ui/core/TextField/TextField";
import numeral from 'numeral';
import CurrencyChart from "./CurrencyChart";

const useStyles = makeStyles(theme => ({
    grid: {
        width: '1000px',
        margin: '0 auto'
    },
    formControl: {
        minWidth: 425,
    },

}));


const CurrencyConverter = () => {
    // props
    const classes = useStyles();

    const [selectedBaseCurrency, setSelectedBaseCurrency] = useState('EUR');
    const [currentBaseAmount, setCurrentBaseAmount] = useState(0);

    const [selectedCounterCurrency, setSelectedCounterCurrency] = useState('');
    const [currentCounterAmount, setCurrentCounterAmount] = useState(0);

    const [basedConversionRates, setBasedConversionRates] = useState([]);
    const [counterCurrencyNames, setCounterCurrencyNames] = useState([]);

    const updateBaseAmount = (value) => {

        setCurrentBaseAmount(value);
        const result = value * basedConversionRates[selectedCounterCurrency] || 0;
        setCurrentCounterAmount(result);
    };

    const updateCounterAmount = (value) => {
        setCurrentCounterAmount(value);
        setCurrentBaseAmount(value / basedConversionRates[selectedCounterCurrency]);
    };

    // Effects
    useEffect(() => {
        const getBasedCurrency = async () => {
            const url = `https://api.exchangeratesapi.io/latest?base=${selectedBaseCurrency}`;
            const result = await axios.get(url);
            setBasedConversionRates(result.data['rates']);
            setCounterCurrencyNames(Object.keys(result.data['rates']));
            setSelectedCounterCurrency (Object.keys(result.data['rates'])[0]);
        };
        getBasedCurrency(selectedBaseCurrency);
    }, [selectedBaseCurrency]);

    useEffect(() => {
        const result = currentBaseAmount * basedConversionRates[selectedCounterCurrency] || 0;
        setCurrentCounterAmount(result);
    }, [basedConversionRates, currentBaseAmount, selectedCounterCurrency]);


    return (
        <div id="container" className={classes.grid}>
            <Grid container
                  direction="row"
                  justify="center"
                  alignItems="center">
                <Grid item xs={6}>
                    <FormControl className={classes.formControl}>
                        <TextField
                            label="Base currency"
                            value={numeral(currentBaseAmount).format('0.00')}
                            onChange={event => {
                                updateBaseAmount(event.target.value);
                            }}
                            type="number"
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <FormControl className={classes.formControl}>
                        <InputLabel>Base amount</InputLabel>
                        <Select
                            value={selectedBaseCurrency}
                            onChange={(event) => {
                                setSelectedBaseCurrency(event.target.value);
                            }}>
                            {availableCurrencies.map(curr => (
                                <MenuItem value={curr} key={curr}>{curr}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>

            <Grid container
                  direction="row"
                  justify="center"
                  alignItems="center">
                <Grid item xs={6}>
                    <FormControl className={classes.formControl}>
                        <TextField
                            label="Counter currency"
                            value={numeral(currentCounterAmount).format('0.00')}
                            onChange={event => updateCounterAmount(event.target.value)}
                            type="number"/>
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <FormControl className={classes.formControl}>
                        <InputLabel>Counter amount</InputLabel>
                        <Select
                            value={selectedCounterCurrency}
                            onChange={(event) => setSelectedCounterCurrency(event.target.value)}>
                            {counterCurrencyNames.map(curr => (
                                <MenuItem value={curr} key={curr}>{curr}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>

            <CurrencyChart base={selectedBaseCurrency}
                           counter={selectedCounterCurrency}/>
        </div>
    );
};

export default CurrencyConverter;
