import React, { useState } from 'react'

const MyForm = (props) => {
    // Destructuring Props
    const { userid, name, bankcode } = props.value

    // States
    const [weatherData, setWeatherData] = useState([])
    console.log(weatherData);

    const [bankDetails, setbankDetails] = useState([])
    console.log(bankDetails);

    // On Change Function on Inputs 
    const onChange = (e) => {
        e.preventDefault();
        // setting values of input tags via name property
        props.setValue({ ...props.value, [e.target.name]: e.target.value })
    }

    const fetchDataOnLoad = async () => {
        try {
          const response = await fetch(`http://localhost:5000/api/details/fetchalldetails`, {
              method: "GET", 
          });
          const json = await response.json()
          props.setState(json)
    
      } catch (error) {
          console.error(error.message)
      }
      }

    // Handle submit function handeling click on add btn
    const handlesubmit = async (e) => {
        e.preventDefault()
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
        try {
            const response = await fetch(`http://localhost:5000/api/details/adddetails`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            const json = await response.json()
            fetchDataOnLoad()
        } catch (error) {
            console.error(error.message)
        }
        
    }

    const handleClick = async (e) => {
        e.preventDefault();
        await fetchBankDetails()
    }

    //  Fetching Bank Details form razorpay API
    const fetchBankDetails = async () => {
        try {
            const response = await fetch(`https://ifsc.razorpay.com/${bankcode}`);
            const json = await response.json();
            if (json === "Not Found") {
                setWeatherData([])
            } else {
                setbankDetails(json)
            }

            await fetchWeatherDetails(json.DISTRICT)
        } catch (error) {
            alert("Unable To Fetch Weather Information")
        }
    }


    // fetching weather information form weather API
    const fetchWeatherDetails = async (city) => {
        try {
            const resp = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=fc9e2431d2c395aa59fbad92138c8958&units=metric`);
            const json = await resp.json();
            if (json.code === "404") {
                setWeatherData([])
                alert("Weather Data for city not found")
            } else {
                setWeatherData(json)
            }
        } catch (error) {

        }
    }


    return (
        <div className = 'mb-5'>
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
                    />
                </div>
                <button type="submit" onClick={handleClick} className="btn btn-primary me-4">
                    Verify
                </button>
                <button type="submit" className="btn btn-primary">
                    Add
                </button>
            </form>

        </div>
    )
}

export default MyForm