import React, {useCallback, useEffect, useState} from 'react';
import * as moment from 'moment';
import Chart from 'chart.js';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import {makeStyles} from "@material-ui/core";

const apiUrl = 'https://api.exchangeratesapi.io/history';

const buildUrl = (base, counter, start, end) => {
    return apiUrl + `?start_at=${end}&end_at=${start}&base=${base}&symbols=${counter}`;
};

const useStyles = makeStyles(() => ({
    filters: {
        textAlign: 'center'
    }

}));

const CurrencyChart = ({base, counter}) => {
    const classes = useStyles();

    const filters = ['5D', '15D', '1M'];

    const [selectedPeriod, setSelectedPeriod] = useState('5D');


    const clickAvatar = useCallback((filter) => {
        const displayLineChart = (data) => {
            const currencyChart = document.getElementById('currencyChart');
            new Chart(currencyChart, {
                type: 'line',
                data: {
                    labels: Object.keys(data),
                    datasets: [{
                        label: `Currency rates`,
                        data: Object.values(data).map(item => item[counter])
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: false
                            }
                        }]
                    }
                }
            });
        };

        let startDate = '', endDate = '';
        setSelectedPeriod(filter);

        switch (filter) {
            case '5D': {
                startDate = moment().format('YYYY-MM-DD');
                endDate = moment().subtract(5, 'days').format('YYYY-MM-DD');
                break;
            }
            case '15D': {
                startDate = moment().format('YYYY-MM-DD');
                endDate = moment().subtract(15, 'days').format('YYYY-MM-DD');
                break;
            }
            default: {
                startDate = moment().format('YYYY-MM-DD');
                endDate = moment().subtract(1, 'months').format('YYYY-MM-DD');
                break;
            }
        }
        axios.get(buildUrl(base, counter, startDate, endDate))
            .then((result) => displayLineChart(result.data['rates']));
    }, [base, counter]);


    useEffect(() => clickAvatar('5D'), [base, counter, clickAvatar]);

    return (
        <div>
            <div className={classes.filters}>
            {filters.map(filter =>
                <Button
                    onClick={() => clickAvatar(filter)}
                    disabled={selectedPeriod === filter}
                    key={filter}>
                    {filter}</Button>)}
            </div>
            <br/> {counter} relative to {base}
            <canvas id="currencyChart"/>
        </div>
    );
};

export default CurrencyChart;