import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const UserTable = props => (
// handle if no results are found

  <Fragment>
    {props.data.length === 0
      ? (
        <h3>No Results Found</h3>
      ) : (
        <Fragment>
          <h3>Results:</h3>
          <table>
            <thead>

              <tr>
                <th>First Name:</th>
                <th>Last Name:</th>
                <th>Email:</th>
                <th>Phone:</th>
                <th>Role:</th>
              </tr>

            </thead>
            <tbody>
              {props.data.map(info => (

                <tr key={info._id} onClick={() => props.viewAccount(info._id)}>
                  <td>
                    {info.firstName}
                  </td>
                  <td>
                    {info.lastName}
                  </td>
                  <td>
                    {info.email}
                  </td>
                  <td>
                    {info.phone}
                  </td>
                  <td>
                    {info.role}
                  </td>
                </tr>


            ))}
            </tbody>

          </table>
        </Fragment>
      )
    }

  </Fragment>
);
export default UserTable;
