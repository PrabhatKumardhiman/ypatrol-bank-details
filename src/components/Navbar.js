import React from 'react'

const Navbar = () => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-dark " data-bs-theme="dark">
                <div className="container-fluid">

                    <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link active fw-bolder" aria-current="page" href="/">
                                YPatrol Assesment
                                </a>
                        </li>
                    </ul>

                </div>
            </nav>
        </div>
    )
}

export default Navbar