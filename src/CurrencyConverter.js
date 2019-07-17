import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Grid from "@material-ui/core/Grid";
import {availableCurrencies} from "./sample-data";
import {axios} from 'axios';
import TextField from "@material-ui/core/TextField/TextField";

const useStyles = makeStyles(theme => ({
    grid: {
        width: '1000px',
        margin: '0 auto'
    },
    formControl: {
        minWidth: 425,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    }
}));


const CurrencyConverter = () => {
    const classes = useStyles();

    const [selectedBaseCurrency, setSelectedBaseCurrency] = useState('EUR');
    const [selectedCounterCurrency, setSelectedCounterCurrency] = useState('USD');

    const [currentBaseAmount, setCurrentBaseAmount] = useState(0);
    const [currentCounterAmount, setCurrentCounterAmount] = useState(0);

    const [basedConversionRates, setBasedConversionRates] = useState([]);

    const [counterCurrencyNames, setCounterCurrencyNames] = useState([]);

    const getBasedCurrency = async (base) => {
        const url = `https://api.exchangeratesapi.io/latest?base=${base}`;
        try {
            const result = await axios.get(url);
            setBasedConversionRates(result.data['rates']);
            setCounterCurrencyNames(Object.keys(result.data['rates']));
            updateBaseAmount(currentBaseAmount);
        } catch (e) {
            throw new Error('Could not retrieve rates');
        }
    };

    const updateBaseAmount = (value) => {
        setCurrentBaseAmount(value);
        setCurrentCounterAmount(currentBaseAmount * basedConversionRates[selectedCounterCurrency]);
    };

    const updateCounterAmount = (value) => {
        setCurrentCounterAmount(value);
        setCurrentBaseAmount(currentCounterAmount / basedConversionRates[selectedCounterCurrency]);
    };

    return (
        <div id="container" className={classes.grid}>
            <Grid container
                  direction="row"
                  justify="center"
                  alignItems="center">
                <Grid item xs={6}>
                    <FormControl className={classes.formControl}>
                        <TextField
                            id="base-currency"
                            label="Base currency"
                            value={currentBaseAmount}
                            onChange={event => setCurrentBaseAmount(event.target.value)}
                            type="number"
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            margin="normal"
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="base-currency">Base amount</InputLabel>
                        <Select
                            value={selectedBaseCurrency}
                            onChange={(event) => {
                                setSelectedBaseCurrency(event.target.value);
                                getBasedCurrency(event.target.value);
                            }}
                            inputProps={{name: 'baseCurrency', id: 'base-currency'}}>
                            {availableCurrencies.map(curr => (
                                <MenuItem value={curr}>{curr}</MenuItem>
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
                            id="base-currency"
                            label="Base currency"
                            value={currentBaseAmount}
                            onChange={event => setCurrentBaseAmount(event.target.value)}
                            type="number"
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            margin="normal"
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="base-currency">Base amount</InputLabel>
                        <Select
                            value={selectedBaseCurrency}
                            onChange={(event) => {
                                setSelectedBaseCurrency(event.target.value);
                                getBasedCurrency(event.target.value);
                            }}
                            inputProps={{name: 'baseCurrency', id: 'base-currency'}}>
                            {availableCurrencies.map(curr => (
                                <MenuItem value={curr}>{curr}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
        </div>
    );
};

export default CurrencyConverter;
