import React from 'react'

const Table = (props) => {
    console.log(props.state)
    return (props.state.length !== 0 &&
        <>
            {/* Button trigger modal */}
            <button
                type="button"
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
            >
                Launch demo modal
  </button>
            {/* Modal */}
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
                                Modal title
          </h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            />
                        </div>
                        <div className="modal-body">...</div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Close
          </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className='table-responsive'>
                <table className="table table-dark table-striped-columns">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">User Id </th>
                            <th scope="col">Name</th>
                            <th scope="col">Bank</th>
                            <th scope="col">ID</th>
                            <th scope="col">Account Details</th>
                            <th scope="col">Wind Speed</th>
                            <th scope="col">Temp</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.state.map((elem) => {
                            return <tr key={Math.random()}>
                                <th scope="row">1</th>
                                <td>{elem.user_id}</td>
                                <td>{elem.user_name}</td>
                                <td>{elem.back_accounts.map((elem) => {
                                    return <p key={Math.random()}>{elem}</p>
                                })}</td>
                                <td>{elem.id}</td>
                                <td>{elem.accounts.map((elem) => {
                                    return <p key={Math.random()}><a className="text-decoration-underline text-white" href="/">{elem.bank}</a></p>
                                })}</td>
                                <td>{elem.accounts.map((elem) => {
                                    return <p key={Math.random()}>{elem.weather.humidity}</p>
                                })}</td>
                                <td>{elem.accounts.map((elem) => {
                                    return <p key={Math.random()}>{elem.weather.temp}</p>
                                })}</td>
                            </tr>
                        })}

                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Table