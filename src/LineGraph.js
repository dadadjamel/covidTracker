import React, { Component, useEffect, useState } from 'react';
import { Line } from "react-chartjs-2"
import numeral from 'numeral'

const options = {
    legend: { display: false },
    elements: { point: { radius: 0 } },
    maintainAspectRatio: false,
    tooltips: {
        mode: "index",
        intersect: false,
        callbacks: {
            label: function (tooltipItem, data) {
                return numeral(tooltipItem.value).format("+0,0")
            },
        },
    },
    scales: {
        xAxes: [
            {
                type: "time",
                time: {
                    format: "MM/DD/YY",
                    tooltipFormat: 'll'
                },
            },
        ],
        yAxes: [
            {
                gridLines: {
                    display: false
                },
                ticks: {

                    callback: function (value, index, values) {
                        return numeral(value).format("0a")
                    },

                }
            }
        ]
    }
}


const buildChartData = (data, casestype='cases') => {

    const chartData = []
    let lastDataPoint;

    for (let date in data.cases) {
        if (lastDataPoint) {
            const newDataPoint = {
                x: date,
                y: data[casestype][date] - lastDataPoint
            }
            chartData.push(newDataPoint)
        }
        lastDataPoint = data[casestype][date]
    };

    return chartData
}



const LineGraph = ({casesType='cases'}) => {
    // https://disease.sh/v3/covid-19/historical/all?lastdays=120
    const [data, setdata] = useState([])

    
    useEffect(() => {
        const fetchdata = async () => {
            await fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=120')
                .then(response => response.json())
                .then(data => {
                    const chartdata = buildChartData(data, casesType)
                    setdata(chartdata)
                    console.log(chartdata)
                })
        }

        fetchdata()

    }, [casesType])



    return (
        <div>
            {data?.length > 0 && (
                <Line options={options} data={{
                    datasets: [{ borderColor: '#cc1034', backgroundColor: 'rgba(204,16,52,0.5)', data: data }]
                }} />
            )}

        </div>
    );
}

export default LineGraph;