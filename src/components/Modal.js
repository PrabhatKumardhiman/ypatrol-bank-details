import React from 'react'

const Modal = (props) => {
    const {state, closeRef} = props.state
    return (state &&
        <div>
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
                                Bank Details
          </h1>
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
                                <div className="col-4">
                                    <p>Temp</p>
                                </div>
                                <div className="col-8">
                                    <p>{state.weather.temp}</p>
                                </div>
                                <div className="col-4">
                                    <p>Humidity</p>
                                </div>
                                <div className="col-8">
                                    <p>{state.weather.humidity}</p>
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
                                Close
          </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal
