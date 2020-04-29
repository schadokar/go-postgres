import React, { Component } from "react";
import { Table, Form, Button, Modal, Loader } from "semantic-ui-react";
import axios from "axios";
import AppHeader from "./Header";

import "./user.css";

const endpoint = "http://localhost:8080/api";

class User extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      location: "",
      age: "",
      users: [],
      userlist: [],
      modalOpen: false,
      updateModalOpen: false,
      loading: false
    };
  }

  componentDidMount = async () => {
    this.getUserList();
  };

  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  onSubmit = async () => {
    // start loading
    this.setState({
      loading: true
    });

    const { name, location, age } = this.state;

    this.handleClose();
    const res = await axios.post(
      `${endpoint}/newuser`,
      {
        name: name,
        location: location,
        age: parseInt(age)
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }
    );

    if (res.status === 200) {
      this.getUserList();
    }
  };

  onUpdate = async id => {
    // start loading
    this.setState({
      loading: true
    });

    const { name, location, age } = this.state;

    this.handleUpdateClose();
    const res = await axios.put(
      `${endpoint}/user/${id}`,
      {
        name: name,
        location: location,
        age: parseInt(age)
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }
    );

    if (res.status === 200) {
      this.getUserList();
    }
  };

  handleOpen = () => this.setState({ modalOpen: true });
  handleClose = () => this.setState({ modalOpen: false });

  createUserForm = () => {
    return (
      <Modal
        trigger={
          <Button primary floated="right" onClick={this.handleOpen}>
            Create User
          </Button>
        }
        open={this.state.modalOpen}
        onClose={this.handleClose}
      >
        <Modal.Content>
          <Modal.Description>
            <Form>
              <Form.Field>
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  onChange={this.onChange}
                  value={this.state.name}
                  placeholder="Name"
                />
              </Form.Field>
              <Form.Field>
                <label>Location</label>
                <input
                  type="text"
                  name="location"
                  onChange={this.onChange}
                  value={this.state.location}
                  placeholder="Location"
                />
              </Form.Field>
              <Form.Field>
                <label>Age</label>
                <input
                  type="number"
                  name="age"
                  onChange={this.onChange}
                  value={this.state.age}
                  placeholder="Age"
                />
              </Form.Field>
              <Button primary onClick={() => this.onSubmit()}>
                Submit
              </Button>
            </Form>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  };

  createUserList = () => {
    const { users } = this.state;

    if (users != null) {
      const table = users.map(user => {
        return (
          <Table.Row key={user.id}>
            <Table.Cell>{user.id}</Table.Cell>
            <Table.Cell>{user.name}</Table.Cell>
            <Table.Cell>{user.age}</Table.Cell>
            <Table.Cell>{user.location}</Table.Cell>
            <Table.Cell>
              {" "}
              {this.updateUserForm(user)}
              <Button color="red" onClick={() => this.deleteUser(user.id)}>
                Delete
              </Button>
            </Table.Cell>
          </Table.Row>
        );
      });

      this.setState({
        userlist: table
      });
    }
  };

  getUserList = async () => {
    // start loading
    this.setState({
      loading: true
    });

    // fetch the user list from the db
    const res = await axios.get(`${endpoint}/user`);

    this.setState({
      users: res.data
    });

    if (this.state.users.length) {
      this.createUserList();
    }

    // stop loading
    this.setState({
      loading: false
    });
  };

  handleUpdateOpen = () => this.setState({ updateModalOpen: true });
  handleUpdateClose = () => this.setState({ updateModalOpen: false });

  updateUserForm = user => {
    const { id, name, location, age } = user;

    return (
      <Modal
        trigger={
          <Button primary onClick={this.handleUpdateOpen}>
            Edit
          </Button>
        }
        open={this.state.updateModalOpen}
        onClose={this.handleUpdateClose}
      >
        <Modal.Content>
          <Modal.Description>
            <Form>
              <Form.Field>
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  onChange={this.onChange}
                  value={this.state.name || name}
                  placeholder={name}
                />
              </Form.Field>
              <Form.Field>
                <label>Location</label>
                <input
                  type="text"
                  name="location"
                  onChange={this.onChange}
                  value={this.state.location}
                  placeholder={location}
                />
              </Form.Field>
              <Form.Field>
                <label>Age</label>
                <input
                  type="number"
                  name="age"
                  onChange={this.onChange}
                  value={this.state.age}
                  placeholder={age}
                />
              </Form.Field>
              <Button primary onClick={() => this.onUpdate(id)}>
                Update
              </Button>
            </Form>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  };

  deleteUser = async id => {
    // start loading
    this.setState({
      loading: true
    });

    const res = await axios.delete(`${endpoint}/deleteuser/${id}`);

    if (res.status === 200) {
      this.getUserList();
    }
  };

  loading = () => {
    if (this.state.loading) {
      return <Loader active />;
    }
  };

  render() {
    return (
      <div className="user-container">
        <AppHeader />
        <div style={{ marginBottom: "60px" }}>{this.createUserForm()}</div>
        <div>
          <Table>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>ID</Table.HeaderCell>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Age</Table.HeaderCell>
                <Table.HeaderCell>Location</Table.HeaderCell>
                <Table.HeaderCell>Action</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>{this.state.userlist}</Table.Body>
          </Table>
        </div>
        {this.loading()}
      </div>
    );
  }
}

export default User;
