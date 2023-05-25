import React, {useEffect, useState} from 'react';
import Table from "react-bootstrap/Table";
import {LINES_API} from "../../config";
import "./style.css";
import mp3audio from './zvonok.mp3';

const ClientPage = ({el}) => {
    const [line, setLine] = useState({})
    const [firstDate, setFirstDate] = useState("")
    const [secondDate, setSecondDate] = useState("")
    const [thirdDate, setThirdDate] = useState("")
    const getLine = (id) => {
        let headers = new Headers();

        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');

        fetch(LINES_API + "/" + id, {
            method: 'GET',
            headers: headers
        })
            .then(response => response.json())
            .then(json => {
                console.log('getline work')
                setLine(json)
                uniqArray(json.reportPerHour)
            })
            .catch(error => console.log('Authorization failed: ' + error.message));
    }

    const getDaySum = (date) => {
        if (line.reportPerHour) {
            const array = line.reportPerHour.filter(el => el.date === date)
            let sum = 0
            if (array.length > 0) {
                array.map(el => sum = sum + el.quantity)
            }
            return sum
        }
    }

    const getTodayDate = () => {
        const d = new Date()
        return (`${Math.floor(d.getDate() / 10)}${d.getDate() % 10}.${Math.floor((d.getMonth() + 1) / 10)}${(d.getMonth() + 1) % 10}.${d.getFullYear()}`)
    }

    const getHourReport = (line, date, hours) => {
        return line.reportPerHour && line.reportPerHour.filter(el => el.date === date && el.hours === hours)
    }

    const uniqArray = (array) => {
        const filteredArray = [];
        array.filter((item) => {
            if (!filteredArray.some((element) => element === item.date)) {
                filteredArray.push(item.date);
            }
        });
        if (filteredArray.length === 3 && getTodayDate() !== filteredArray[filteredArray.length - 1]) {
            setThirdDate(getTodayDate())
            setSecondDate(filteredArray[2])
            setFirstDate(filteredArray[1])
        } else if (filteredArray.length === 3) {
            setThirdDate(filteredArray[2])
            setSecondDate(filteredArray[1])
            setFirstDate(filteredArray[0])
        } else if (filteredArray.length === 2 && getTodayDate() !== filteredArray[filteredArray.length - 1]) {
            setThirdDate(getTodayDate())
            setSecondDate(filteredArray[1])
            setFirstDate(filteredArray[0])
        } else if (filteredArray.length === 2) {
            setSecondDate(filteredArray[1])
            setFirstDate(filteredArray[0])
        } else if (filteredArray.length === 1 && getTodayDate() !== filteredArray[filteredArray.length - 1]) {
            setSecondDate(getTodayDate())
            setFirstDate(filteredArray[0])
        } else if (filteredArray.length === 1 || filteredArray.length === 0) {
            setFirstDate(getTodayDate())
        } else if (filteredArray.length > 3 && getTodayDate() !== filteredArray[filteredArray.length - 1]) {
            setThirdDate(getTodayDate())
            setSecondDate(filteredArray[filteredArray.length - 1])
            setFirstDate(filteredArray[filteredArray.length - 2])
        } else if (filteredArray.length > 3) {
            setThirdDate(filteredArray[filteredArray.length - 1])
            setSecondDate(filteredArray[filteredArray.length - 2])
            setFirstDate(filteredArray[filteredArray.length - 3])
        }
    }
    useEffect(() => {
        getDaySum(getTodayDate())
    }, [line]);

    useEffect(() => {
        const interval = setInterval(() => {
            getLine(el)
            const d = new Date();
            let min = d.getMinutes();
            console.log(min)
            if (min === 0) {

            }
        }, 1000);
        return () => clearInterval(interval);
    }, []);
    return (
        <div className={"client__page"}>
            <h6>{line.model}</h6>
            <Table bordered hover>
                <thead>
                <tr>
                    <th className={"table__header"} rowSpan={2}>Часы</th>
                    <th className={"table__header"} colSpan={3}>Дата</th>
                </tr>
                <tr>
                    <th>{firstDate}</th>
                    <th>{secondDate}</th>
                    <th>{thirdDate}</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td className={"table__hours-cell"}>08:00-09:00</td>
                    <td>{getHourReport(line, firstDate, "08:00-09:00") !== undefined && getHourReport(line, firstDate, "08:00-09:00").length > 0 ? getHourReport(line, firstDate, "08:00-09:00")[0].quantity : null}</td>
                    <td>{getHourReport(line, secondDate, "08:00-09:00") !== undefined && getHourReport(line, secondDate, "08:00-09:00").length > 0 ? getHourReport(line, secondDate, "08:00-09:00")[0].quantity : null}</td>
                    <td>{getHourReport(line, thirdDate, "08:00-09:00") !== undefined && getHourReport(line, thirdDate, "08:00-09:00").length > 0 ? getHourReport(line, thirdDate, "08:00-09:00")[0].quantity : null}</td>
                </tr>
                <tr>
                    <td className={"table__hours-cell"}>09:00-10:00</td>
                    <td>{getHourReport(line, firstDate, "09:00-10:00") !== undefined && getHourReport(line, firstDate, "09:00-10:00").length > 0 ? getHourReport(line, firstDate, "09:00-10:00")[0].quantity : null}</td>
                    <td>{getHourReport(line, secondDate, "09:00-10:00") !== undefined && getHourReport(line, secondDate, "09:00-10:00").length > 0 ? getHourReport(line, secondDate, "09:00-10:00")[0].quantity : null}</td>
                    <td>{getHourReport(line, thirdDate, "09:00-10:00") !== undefined && getHourReport(line, thirdDate, "09:00-10:00").length > 0 ? getHourReport(line, thirdDate, "09:00-10:00")[0].quantity : null}</td>
                </tr>
                <tr>
                    <td className={"table__hours-cell"}>10:00-11:00</td>
                    <td>{getHourReport(line, firstDate, "10:00-11:00") !== undefined && getHourReport(line, firstDate, "10:00-11:00").length > 0 ? getHourReport(line, firstDate, "10:00-11:00")[0].quantity : null}</td>
                    <td>{getHourReport(line, secondDate, "10:00-11:00") !== undefined && getHourReport(line, secondDate, "10:00-11:00").length > 0 ? getHourReport(line, secondDate, "10:00-11:00")[0].quantity : null}</td>
                    <td>{getHourReport(line, thirdDate, "10:00-11:00") !== undefined && getHourReport(line, thirdDate, "10:00-11:00").length > 0 ? getHourReport(line, thirdDate, "10:00-11:00")[0].quantity : null}</td>
                </tr>
                <tr>
                    <td className={"table__hours-cell"}>11:00-12:00</td>
                    <td>{getHourReport(line, firstDate, "11:00-12:00") !== undefined && getHourReport(line, firstDate, "11:00-12:00").length > 0 ? getHourReport(line, firstDate, "11:00-12:00")[0].quantity : null}</td>
                    <td>{getHourReport(line, secondDate, "11:00-12:00") !== undefined && getHourReport(line, secondDate, "11:00-12:00").length > 0 ? getHourReport(line, secondDate, "11:00-12:00")[0].quantity : null}</td>
                    <td>{getHourReport(line, thirdDate, "11:00-12:00") !== undefined && getHourReport(line, thirdDate, "11:00-12:00").length > 0 ? getHourReport(line, thirdDate, "11:00-12:00")[0].quantity : null}</td>
                </tr>
                <tr>
                    <td className={"table__hours-cell"}>12:00-13:00</td>
                    <td>{getHourReport(line, firstDate, "12:00-13:00") !== undefined && getHourReport(line, firstDate, "12:00-13:00").length > 0 ? getHourReport(line, firstDate, "12:00-13:00")[0].quantity : null}</td>
                    <td>{getHourReport(line, secondDate, "12:00-13:00") !== undefined && getHourReport(line, secondDate, "12:00-13:00").length > 0 ? getHourReport(line, secondDate, "12:00-13:00")[0].quantity : null}</td>
                    <td>{getHourReport(line, thirdDate, "12:00-13:00") !== undefined && getHourReport(line, thirdDate, "12:00-13:00").length > 0 ? getHourReport(line, thirdDate, "12:00-13:00")[0].quantity : null}</td>
                </tr>
                <tr>
                    <td className={"table__hours-cell"}>13:00-14:00</td>
                    <td>{getHourReport(line, firstDate, "13:00-14:00") !== undefined && getHourReport(line, firstDate, "13:00-14:00").length > 0 ? getHourReport(line, firstDate, "13:00-14:00")[0].quantity : null}</td>
                    <td>{getHourReport(line, secondDate, "13:00-14:00") !== undefined && getHourReport(line, secondDate, "13:00-14:00").length > 0 ? getHourReport(line, secondDate, "13:00-14:00")[0].quantity : null}</td>
                    <td>{getHourReport(line, thirdDate, "13:00-14:00") !== undefined && getHourReport(line, thirdDate, "13:00-14:00").length > 0 ? getHourReport(line, thirdDate, "13:00-14:00")[0].quantity : null}</td>
                </tr>
                <tr>
                    <td className={"table__hours-cell"}>14:00-15:00</td>
                    <td>{getHourReport(line, firstDate, "14:00-15:00") !== undefined && getHourReport(line, firstDate, "14:00-15:00").length > 0 ? getHourReport(line, firstDate, "14:00-15:00")[0].quantity : null}</td>
                    <td>{getHourReport(line, secondDate, "14:00-15:00") !== undefined && getHourReport(line, secondDate, "14:00-15:00").length > 0 ? getHourReport(line, secondDate, "14:00-15:00")[0].quantity : null}</td>
                    <td>{getHourReport(line, thirdDate, "14:00-15:00") !== undefined && getHourReport(line, thirdDate, "14:00-15:00").length > 0 ? getHourReport(line, thirdDate, "14:00-15:00")[0].quantity : null}</td>
                </tr>
                <tr>
                    <td className={"table__hours-cell"}>15:00-16:00</td>
                    <td>{getHourReport(line, firstDate, "15:00-16:00") !== undefined && getHourReport(line, firstDate, "15:00-16:00").length > 0 ? getHourReport(line, firstDate, "15:00-16:00")[0].quantity : null}</td>
                    <td>{getHourReport(line, secondDate, "15:00-16:00") !== undefined && getHourReport(line, secondDate, "15:00-16:00").length > 0 ? getHourReport(line, secondDate, "15:00-16:00")[0].quantity : null}</td>
                    <td>{getHourReport(line, thirdDate, "15:00-16:00") !== undefined && getHourReport(line, thirdDate, "15:00-16:00").length > 0 ? getHourReport(line, thirdDate, "15:00-16:00")[0].quantity : null}</td>
                </tr>
                <tr>
                    <td className={"table__hours-cell"}>16:00-17:00</td>
                    <td>{getHourReport(line, firstDate, "16:00-17:00") !== undefined && getHourReport(line, firstDate, "16:00-17:00").length > 0 ? getHourReport(line, firstDate, "16:00-17:00")[0].quantity : null}</td>
                    <td>{getHourReport(line, secondDate, "16:00-17:00") !== undefined && getHourReport(line, secondDate, "16:00-17:00").length > 0 ? getHourReport(line, secondDate, "16:00-17:00")[0].quantity : null}</td>
                    <td>{getHourReport(line, thirdDate, "16:00-17:00") !== undefined && getHourReport(line, thirdDate, "16:00-17:00").length > 0 ? getHourReport(line, thirdDate, "16:00-17:00")[0].quantity : null}</td>
                </tr>
                <tr>
                    <td className={"table__hours-cell"}>17:00-18:00</td>
                    <td>{getHourReport(line, firstDate, "17:00-18:00") !== undefined && getHourReport(line, firstDate, "17:00-18:00").length > 0 ? getHourReport(line, firstDate, "17:00-18:00")[0].quantity : null}</td>
                    <td>{getHourReport(line, secondDate, "17:00-18:00") !== undefined && getHourReport(line, secondDate, "17:00-18:00").length > 0 ? getHourReport(line, secondDate, "17:00-18:00")[0].quantity : null}</td>
                    <td>{getHourReport(line, thirdDate, "17:00-18:00") !== undefined && getHourReport(line, thirdDate, "17:00-18:00").length > 0 ? getHourReport(line, thirdDate, "17:00-18:00")[0].quantity : null}</td>
                </tr>
                <tr>
                    <td className={"table__hours-cell"}>18:00-19:00</td>
                    <td>{getHourReport(line, firstDate, "18:00-19:00") !== undefined && getHourReport(line, firstDate, "18:00-19:00").length > 0 ? getHourReport(line, firstDate, "18:00-19:00")[0].quantity : null}</td>
                    <td>{getHourReport(line, secondDate, "18:00-19:00") !== undefined && getHourReport(line, secondDate, "18:00-19:00").length > 0 ? getHourReport(line, secondDate, "18:00-19:00")[0].quantity : null}</td>
                    <td>{getHourReport(line, thirdDate, "18:00-19:00") !== undefined && getHourReport(line, thirdDate, "18:00-19:00").length > 0 ? getHourReport(line, thirdDate, "18:00-19:00")[0].quantity : null}</td>
                </tr>
                <tr>
                    <td className={"table__hours-cell"}>19:00-20:00</td>
                    <td>{getHourReport(line, firstDate, "19:00-20:00") !== undefined && getHourReport(line, firstDate, "19:00-20:00").length > 0 ? getHourReport(line, firstDate, "19:00-20:00")[0].quantity : null}</td>
                    <td>{getHourReport(line, secondDate, "19:00-20:00") !== undefined && getHourReport(line, secondDate, "19:00-20:00").length > 0 ? getHourReport(line, secondDate, "19:00-20:00")[0].quantity : null}</td>
                    <td>{getHourReport(line, thirdDate, "19:00-20:00") !== undefined && getHourReport(line, thirdDate, "19:00-20:00").length > 0 ? getHourReport(line, thirdDate, "19:00-20:00")[0].quantity : null}</td>
                </tr>
                <tr>
                    <td className={"table__hours-cell"}>Итого за день</td>
                    <td>{getDaySum(firstDate)}/{Math.ceil(line.quantity / line.days)}</td>
                    <td>{getDaySum(secondDate)}/{Math.ceil(line.quantity / line.days)}</td>
                    <td>{getDaySum(thirdDate)}/{Math.ceil(line.quantity / line.days)}</td>
                </tr>
                <tr>
                    <td>Итого за все время</td>
                    <td colSpan={3}>{line.sum}/{line.quantity}</td>
                </tr>
                </tbody>
            </Table>
        </div>
    );
};

export default ClientPage;