import React, { useEffect, useState } from 'react'
import { adminApi } from '../../api/ApiConfig';
import MetricCard from './MetricCard'
import axios from 'axios';

const AdminMain = () => {
    const [metrics, setMetrics] = useState([]);



    const getMetrics = () => {
        axios.get(adminApi + "metrics")
            .then(res => {
                setMetrics(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        getMetrics();
    }, [])



    return (
        <div className="flex flex-wrap">
            {
                metrics?.map(metric => {
                    return <MetricCard name={metric.name} value={metric.value} key={metric.name + metric.value} />
                })
            }
        </div>
    )
}

export default AdminMain
