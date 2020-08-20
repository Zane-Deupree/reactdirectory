import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import axios from 'axios';

interface IState {
    employees: any[];
}

export default class Home extends React.Component<RouteComponentProps, IState> {
    constructor(props: RouteComponentProps) {
        super(props);
        this.state = { employees: [] }
    }
    public componentDidMount(): void {
        axios.get(`http://localhost:5000/employees`).then(data => {
            this.setState({ employees: data.data })
        })
    }
    public deleteEmployee(id: number) {
        axios.delete(`http://localhost:5000/employees/${id}`).then(data => {
            const index = this.state.employees.findIndex(employees => employees.id === id);
            this.state.employees.splice(index, 1);
            this.props.history.push('/');
        })
    }

public render() {
    const employees = this.state.employees;
    return (
        <div>
            {employees.length === 0 && (
                <div className="text-center">
                    <h2>No employee found at the moment</h2>
                </div>
            )}
            <div className="container">
                <div className="row">
                    <table className="table table-bordered">
                        <thead className="thead-light">
                            <tr>
                                <th scope="col">Firstname</th>
                                <th scope="col">Lastname</th>
                                <th scope="col">Email</th>
                                <th scope="col">Phone</th>
                                <th scope="col">Address</th>
                                <th scope="col">Description</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees && employees.map(employees =>
                                <tr key={employees.id}>
                                    <td>{employees.first_name}</td>
                                    <td>{employees.last_name}</td>
                                    <td>{employees.email}</td>
                                    <td>{employees.phone}</td>
                                    <td>{employees.address}</td>
                                    <td>{employees.description}</td>
                                    <td>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className="btn-group" style={{ marginBottom: "20px" }}>
                                                <Link to={`edit/${employees.id}`} className="btn btn-sm btn-outline-secondary">Edit Employees </Link>
                                                <button className="btn btn-sm btn-outline-secondary" onClick={() => this.deleteEmployee(employees.id)}>Delete Employees</button>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

}
