import React, { useState } from 'react'

const MyForm = (props) => {
    // Destructuring Props
    const { userid, name, bankcode } = props.value

    // States
    const [weatherData, setWeatherData] = useState([])
    const [bankDetails, setbankDetails] = useState([])

    // On Change Function on Inputs 
    const onChange = (e) => {
        // set Success to false if user changes the Input
        props.setSucess(false)
        e.preventDefault();// preventing from Reload
        // setting values of input tags via name property
        props.setValue({ ...props.value, [e.target.name]: e.target.value })
    }

    // Function to load data when Add bttn is clicked ------ Moved To App.js
    // const fetchDataOnLoad = async () => {
    //     try {
    //         // Fetching Details From Backend
    //         const response = await fetch(`http://localhost:5000/api/details/fetchalldetails`, {
    //             method: "GET",
    //         });
    //         const json = await response.json()
    //         // Adding Data from Backend in state Variable
    //         props.setState(json)
    //     } catch (error) {
    //         // If error occured during Fetching 
    //         console.error(error.message)
    //     }
    // }

    // Handle submit function handeling click on add btn
    const handlesubmit = async (e) => {
        e.preventDefault()// preventing from Reload
        props.setSucess(false)
        // Creating Data variable to send with fetch api in header body Filling data from API as Required
        const data = {
            "user_id": userid,
            "user_name": name,
            "back_accounts": [
                bankDetails.IFSC
            ],
            "id": weatherData.id,
            "name": name,
            "accounts": [{
                "bank": bankDetails.BANK,
                "branch": bankDetails.BRANCH,
                "address": bankDetails.ADDRESS,
                "city": bankDetails.CITY,
                "district": bankDetails.DISTRICT,
                "state": bankDetails.STATE,
                "bank_code": bankDetails.IFSC,
                "weather": {
                    "temp": weatherData.main.temp,
                    "humidity": weatherData.main.humidity
                }
            }]
        }

        // Fetch FUnction to Store Data in Cloud Via Backend
        try {
            const response = await fetch(`https://backend-assesment.onrender.com/api/details/adddetails`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            await response.json()
            // Running Load function
            props.fetchDataOnLoad()
        } catch (error) {
            console.error(error.message)
        }
        props.setValue({ userid: "", name: "", bankcode: "" })
    }

    // Funvtion to handle Verify Bttn 
    const handleClick = async (e) => {
        e.preventDefault();
        await fetchBankDetails()
    }

    //  Fetching Bank Details form razorpay API
    const fetchBankDetails = async () => {
        try {
            const response = await fetch(`https://ifsc.razorpay.com/${bankcode}`);
            const json = await response.json();
            // if no invalid IFSC provided
            if (json === "Not Found") {
                alert("Invalid IFSC Code Plese Try Again ")
                // Valid IFSC Code
            } else {
                await setbankDetails(json)
                alert("IFSC Code Verified ")
            }
            //Calling next fetch Weather Function to get weather deatils for district provided by Bank API
            await fetchWeatherDetails(json.DISTRICT)
        } catch (error) {
            alert("Unable To Fetch Bank Deatils")
        }
    }

    // fetching weather information form weather API 
    const fetchWeatherDetails = async (city) => {
        try {
            const resp = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=fc9e2431d2c395aa59fbad92138c8958&units=metric`);
            const json = await resp.json();
            // If no data is Avaliable for Provided City
            if (json.cod === "400") {
                props.setSucess(false)
                alert("Weather Data for city not found")
                // When Data found 
            } else {
                // Set Success to True to enable Add bttn
                props.setSucess(true)
                setWeatherData(json)
            }
        } catch (error) {
            console.error("Unable to fetch Weather Information")
        }
    }

    return (
        // Form To add Details
        <div className='mb-5' style = {{ position : "sticky", top : "25px"}}>
            <form onSubmit={handlesubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                        Enter User Id
                    </label>
                    <input
                        type="number"
                        className="form-control"
                        id="userid"
                        aria-describedby="emailHelp"
                        value={userid}
                        name='userid'
                        onChange={onChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">
                        Name
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={name}
                        name='name'
                        onChange={onChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">
                        Bank IFSC Code
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="bankcode"
                        value={bankcode}
                        name='bankcode'
                        onChange={onChange}
                        required
                        maxLength={11}
                    />
                </div>
                <button type="submit" onClick={handleClick} className="btn btn-primary me-4">
                    Verify IFSC
                </button>
                {/* Only Show Add Bttn When Success is true */}
                {props.success === true && <button type="submit" className="btn btn-primary">
                    Add Details
                </button>}
            </form>
        </div>
    )
}

export default MyForm