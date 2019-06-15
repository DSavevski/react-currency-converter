import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Grid from "@material-ui/core/Grid";

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
}));

function CurrencyConverter() {
    const classes = useStyles();
    const [values, setValues] = React.useState({
        age: '',
        name: 'hai',
    });

    function handleChange(event) {
        setValues(oldValues => {
            return ({
                ...oldValues,
                [event.target.name]: event.target.value,
            });
        });
    }

    return (
        <div id="container" className={classes.grid}>
            <Grid container
                  direction="row"
                  justify="center"
                  alignItems="center">
                <Grid item xs={6}>
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="base-amount">Base amount</InputLabel>
                        <Select
                            value={values.age}
                            onChange={handleChange}
                            inputProps={{
                                name: 'age',
                                id: 'base-amount',
                            }}
                        >
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="age-simple">Age</InputLabel>
                        <Select
                            value={values.age}
                            onChange={handleChange}
                            inputProps={{
                                name: 'age',
                                id: 'age-simple',
                            }}
                        >
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
        </div>
    );
}

export default CurrencyConverter;
