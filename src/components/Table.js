import React, { useRef, useState } from 'react'

const Table = (props) => {

    // Declaring ref for open bttn in Modal
    const ref = useRef(null)
    // Declaring ref for close bttn in Modal
    const closeRef = useRef(null)

    // State Variable from where Modal is being Populated
    const [state, setState] = useState({
        "user_id": "",
        "user_name": "",
        "back_accounts": [],
        "id": "",
        "name": "",
        "accounts": {
            "bank": "",
            "branch": "",
            "address": "",
            "city": "",
            "district": "",
            "state": "",
            "bank_code": "",
        }
    })

    // Function to Open Modal
    const openModal = async (elem) => {
        // Ref Click to Open Modal
        ref.current.click()
        // Provding Values of the particular Clicked Bank to Modal
        await setState(elem)
    }

    return (props.state.length !== 0 ?
        <>
            {/* Modal */}
            <button
                type="button"
                ref={ref} // ref loaction to open Modal
                className="btn btn-primary d-none" // bttn display set to none
                data-bs-toggle="modal"
                data-bs-target="#exampleModal">
                Launch demo Modal
                </button>
            <div
                className="modal fade"
                id="exampleModal"
                tabIndex={-1}
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">
                                Bank Details</h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            />
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-4">
                                    <p>Bank</p>
                                </div>
                                <div className="col-8">
                                    <p>{state.bank}</p>
                                </div>
                                <div className="col-4">
                                    <p>Branch</p>
                                </div>
                                <div className="col-8">
                                    <p>{state.branch}</p>
                                </div>
                                <div className="col-4">
                                    <p>Address</p>
                                </div>
                                <div className="col-8">
                                    <p>{state.address}</p>
                                </div>
                                <div className="col-4">
                                    <p>City</p>
                                </div>
                                <div className="col-8">
                                    <p>{state.city}</p>
                                </div>
                                <div className="col-4">
                                    <p>District</p>
                                </div>
                                <div className="col-8">
                                    <p>{state.district}</p>
                                </div>
                                <div className="col-4">
                                    <p>State</p>
                                </div>
                                <div className="col-8">
                                    <p>{state.state}</p>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                ref={closeRef}
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Close</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* Modal Ends */}

            {/* Table Starts */}
            {props.state.length === 0 ? <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div> :
                <div className='table-responsive'>
                    <table className="table table-dark table-striped-columns">
                        <thead>
                            <tr>
                                <th scope="col">User Id </th>
                                <th scope="col">Name</th>
                                <th scope="col">Bank</th>
                                <th scope="col">Account Details</th>
                                <th scope="col">Humidity</th>
                                <th scope="col">Temp</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Map Function To Populated Data Dyanmically for a user */}
                            {props.state.map((elem) => {
                                return <tr key={Math.random()}>
                                    <td>{elem.user_id}</td>
                                    <td>{elem.user_name}</td>
                                    {/*Map Function To Populated accounts of user Dyanmically */}
                                    <td>{elem.back_accounts.map((elem) => {
                                        return <p key={Math.random()}>{elem}</p>
                                    })}</td>
                                    {/*Map Function To Populated Bank of user Dyanmically */}
                                    <td>{elem.accounts.map((elem) => {
                                        return <p key={Math.random()} className="text-decoration-underline text-white" onClick={() => openModal(elem)}>{elem.bank}</p>
                                    })}</td>
                                    {/*Map Function To Populated Weather details of user Dyanmically */}
                                    <td>{elem.accounts.map((elem) => {
                                        return <p key={Math.random()}>{elem.weather.humidity}</p>
                                    })}</td>
                                    <td>{elem.accounts.map((elem) => {
                                        return <p key={Math.random()}>{elem.weather.temp.toFixed()}°C</p>
                                    })}</td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>
            }
        </>
        :
        // If No Data Avaliable on CLOUD
        <div className="conatiner d-flex align-items-center justify-content-center ">
            <h1>No Data on Cloud! Please Add some</h1>
        </div>
    )
}

export default Table