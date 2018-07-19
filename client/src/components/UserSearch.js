import React, { Fragment } from 'react';
import AccountAPI from '../API/accountAPI';
import UserTable from './UserTable';
import AdminUserProfile from './AdminUserProfile';

class UserSearch extends React.Component {
  Account = new AccountAPI();
  state={
    isSearchMode: true,
    isAccountView: false,
    search: '',
    accountForView: [],


  }

  changeValue = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  submitSearch = async (event) => {
    event.preventDefault();
    if (this.state.search === '') {
      return null;
    }
    try {
      const data = await this.Account.searchUser(this.state.search);
      this.setState({
        results: data,
        search: '',
      });
      console.log('Results yo ===>!', data);
    } catch (err) {
      console.log(err);
      localStorage.clear();
      this.props.history.push('/login');
    }
  }

  viewAccount = (id) => {
    console.log('ID', id);
    console.log(this.state.results.filter(x => x._id === id));
    this.setState({
      isAccountView: true,
      isSearchMode: false,
      search: '',
      accountForView: this.state.results.filter(x => x._id === id),
    });
  }

  searchModeReset = () => {
    this.setState({
      isAccountView: false,
      isSearchMode: true,
      results: null,
      accountForView: [],
    });
  }

  // swaps in and out the user table if results are available
  render() {
    return (
      <Fragment>
        { this.state.isSearchMode
          ? (
            <form>
              <label htmlFor="search">Search for User:</label>
              <input type="text" onChange={this.changeValue} value={this.state.search} name="search" />
              <button onClick={this.submitSearch}>Search</button>
            </form>
          ) : (
            <Fragment>
              <br />
              <input type="button" onClick={() => this.searchModeReset()} value="Back to Search" />
            </Fragment>
          )
        }


        {this.state.isSearchMode
          ? this.state.results && <UserTable data={this.state.results} viewAccount={this.viewAccount} />
          : null
        }
        {this.state.isAccountView && <AdminUserProfile userData={this.state.accountForView} /> }
      </Fragment>
    );
  }
}

export default UserSearch;
