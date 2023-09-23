import React from 'react'

const Table = (props) => {
    return ( props.state.length !== 0 &&
        <div className = 'table-responsive'>
            <table className="table table-dark table-striped-columns">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">User Id </th>
                        <th scope="col">Name</th>
                        <th scope="col">Bank</th>
                        <th scope="col">ID</th>
                        <th scope="col">Account Details</th>
                        <th scope="col">Bank</th>
                        <th scope="col">Bank</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td>{props.state.user_id}</td>
                        <td>{props.state.user_name}</td>
                        <td>{props.state.back_accounts.length !== 0 && props.state.back_accounts.map((e) => {
                            return <p>{e}</p>
                        })}</td>
                        <td>{props.state._id}</td>
                        <td>{props.state.accounts[0].bank}</td>
                        <td>{props.state.accounts[0].branch}</td>
                        <td>{props.state.accounts[0].weather}</td>
                        
                    </tr>
                    <tr>
                        <th scope="row">2</th>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                    </tr>
                    <tr>
                        <th scope="row">3</th>
                        <td colSpan={2}>Larry the Bird</td>
                        <td>@twitter</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Table