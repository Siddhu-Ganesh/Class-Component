import React from 'react';
import validator from 'validator';
import { Modal, ModalHeader, ModalTitle, ModalBody, ModalFooter, Button } from 'react-bootstrap';
import { AgGridReact} from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: ' ',
      password: ' ',
      emailerror: ' ',
      passworderror: ' ',
      show: false,
      validEmail: false,
      columndef:
        [{ headerName: 'First Name', field: 'firstname' },
        { headerName: 'Last Name', field: 'lastname' },
        { headerName: 'Email', field: 'signinEmail' },
        { headerName: 'phone Number', field: 'phonenumber' },
        { headerName: 'Password', field: 'signinpassword' },
        {headerName: 'Confirm Password', field: 'cnfpassword'}
        ],
      rowdata: {
        firstname: '',
        lastname: '',
        signinEmail: '',
        phonenumber: '',
        signinpassword: '',
        cnfpassword: ''
      },
      firstname: ' ',
      lastname: ' ',
      signinEmail: ' ',
      phonenumber: ' ',
      signinpassword: ' ',
      cnfpassword: ' ',
      firstnameError: ' ',
      signinEmailError: ' ',
      validmobilenumber: ' ',
      SigninpasswordError: ' ',
      cnfpasswordError: ' ',
      data:[]


    };
  }

  //Login Page Email validation and set to state
  handleChange = (e) => {

    const email=e.target.value;
    const emailRegex= /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const validEmail= emailRegex.test(email);
    this.setState({email,validEmail});
    if(!validEmail){
      this.setState({emailerror:'Please enter valid email'});
      }
      else{
        this.setState({emailerror:''});
      }


    // this.setState({ email: e.target.value });
    // if (validator.isEmail(e.target.value)) {
    //   this.setState({ emailerror: ' ' });
    //   return;
    // }
    // else {
    //   this.setState({ emailerror: 'please Enter a valid email' })
    // }


  }

  //Login Page password set to state
  handlePassword = (e) => {
    this.setState({ password: e.target.value });

  }

  //Login button onClick event 
  handleLogin = () => {
    //verify login page password
    if (validator.isStrongPassword(this.state.password)) {
      this.setState({ passworderror: '' });
      console.log(this.state.email);
      console.log(this.state.password);
    } else {
      this.setState({ passworderror: ' please Enter valid passsword' })
    }
  }
  //sign in page firstname set value to State
  handleFirstname = (e) => {
    this.setState({ firstname: e.target.value });
  }
  //sign in page lastname set value to State
  handleLastName = (e) => {
    this.setState({ lastname: e.target.value });
  }
  //sign in page Email set value to State
  handleSigninEmail = (e) => {
    this.setState({ signinEmail: e.target.value });
  }
  //sign in page phone Number set value to State
  handleSigninPhonenumber = (e) => {
    this.setState({ phonenumber: e.target.value });
  }
  //sign in page password set value to State
  handleSigninPasssword = (e) => {
    this.setState({ signinpassword: e.target.value });
  }
  //sign in page Confirm Password set value to State
  handleSignincnfPassword = (e) => {
    this.setState({ cnfpassword: e.target.value });
  }
  //Handle Model bootstrap to show
  handleShow = () => {
    this.setState({ show: true });
    console.log('Sign in ')
  }
  //Handle Model bootstrap to close
  handleClose = () => {
    this.setState({ show: false });
  }
  //sign in page submit button onClick event
  handleSubmit = (e) => {
    e.preventDefault();

    //verify Firstname is Entered or not
    if (!this.state.firstname.trim()) {
      this.setState({ firstnameError: 'please Enter your firstname' })
    } else {
      this.setState({ firstnameError: ' ' })
    }

    //verify sign in page Email
    if (validator.isEmail(this.state.signinEmail)) {
      this.setState({ signinEmailError: ' ' });
    } else {
      this.setState({ signinEmailError: 'please Enter a valid email' });
    }

    //verify signin page phone nnumber
    if (validator.isMobilePhone(this.state.phonenumber)) {
      this.setState({ validmobilenumber: ' ' });
    }
    else {
      this.setState({ validmobilenumber: 'please Enter valid mobile number' })
    }

    //verify signin page password
    if (validator.isStrongPassword(this.state.signinpassword)) {
      this.setState({ SigninpasswordError: ' ' })
    }
    else {
      this.setState({ SigninpasswordError: 'please Enter valid password' })
    }

    //condition for  confirm password = password 
    if (this.state.signinpassword === this.state.cnfpassword) {
      this.setState({ cnfpasswordError: ' ' })
    } else {
      this.setState({ cnfpasswordError: 'password did not match ' })
    }

    //verify Email is already exist
    const isduplicate= this.state.data.some(item=>
      item.signinEmail === this.state.signinEmail
    )

    //verify name already exist
    const duplicatename= this.state.data.some(item=>
      item.firstname === this.state.firstname &&
      item.lastname === this.state.lastname
    )

    //Toastify for if name already exist
    if(duplicatename){
      toast.error('Name already exists!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });
  } 
  //Toastify for Email already exist
  else if(isduplicate){
    toast.error('Email already exists!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
  });

  }
  //Storing values in state component data and closing Modal
  else{
  const { firstname, lastname, signinEmail, phonenumber,signinpassword, cnfpassword } = this.state;
      this.setState(prevState => ({
        data: [...prevState.data, { firstname, lastname, signinEmail, phonenumber,signinpassword, cnfpassword}]
      }));
      this.handleClose();
    }
  }

 //handle Edit button and save changes into data state component and Closing Modal
  handleSave = (e) => {
    e.preventDefault();
    const updatedData = this.state.data.map(item => (item.id === this.state.id ? this.state : item)); 
    this.setState({data:updatedData})
    this.handleClose();
};

  render() {
    // const {email,password,emailerror,passworderror}=this.state;

    return (

      <div className='container text-center my-4'>
        <h3>Login Page</h3>
        <form style={{ marginTop: '90px' }}>
          <label htmlFor='email' className='m-2' >Email</label> <br />
          <input type='email' id='email' name='email' placeholder='Enter Email' value={this.state.email} onChange={this.handleChange} className='m-2' /> <br />
          {this.state.emailerror && <span className='text-danger'>{this.state.emailerror}</span>} <br />

          <label htmlFor='password' className='m-1' >Password</label> <br />
          <input type='text' id='password' name='password' placeholder='Enter Password' value={this.state.password} onChange={this.handlePassword} className='m-1' /> <br />
          {this.state.passworderror && <span className='text-danger'>{this.state.passworderror}</span>} <br />

          <button className='m-3' onClick={this.handleLogin} type='button'>Login</button> <br />
        </form>
        <span style={{ color: 'blue', fontSize: '12px', cursor: 'pointer' }}>Forgot Password</span> <br />

        <p style={{ marginTop: '30px' }}>New User?<a style={{ color: 'blue', cursor: 'pointer' }} onClick={this.handleShow}>  Sign in</a></p>

        <Modal show={this.state.show} onHide={this.handleClose} className='' >

          <ModalHeader closeButton>
            <ModalTitle>Sign in </ModalTitle>
          </ModalHeader>
          <ModalBody>
            <form style={{ display: 'flex', flexWrap: 'wrap', rowGap: '20px', columnGap: '20px' }}>

              <div className='form-group'>
                <label htmlFor='firstname'>First Name</label> <br />
                <input type='text' id='firstname' name='firstname' value={this.state.firstname} onChange={this.handleFirstname} /><br />
                <span className='text-danger'>{this.state.firstnameError}</span>
              </div>
              <div className='form-group'>
                <label htmlFor='lastname'>Last Name</label> <br />
                <input type='text' id='lastname' name='lastname' value={this.state.lastname} onChange={this.handleLastName} />
              </div>
              <div className='form-group'>
                <label htmlFor='email'>Email</label> <br />
                <input type='email' id='email' name='email' value={this.state.signinEmail} onChange={this.handleSigninEmail} /><br />
                <span className='text-danger'>{this.state.signinEmailError}</span>
              </div>
              <div className='form-group'>
                <label htmlFor='phonenumber'>Phone Number</label> <br />
                <input type='text' id='phonenumber' name='phonenumber' value={this.state.phonenumber} onChange={this.handleSigninPhonenumber} /><br />
                <span className='text-danger'>{this.state.validmobilenumber}</span>
              </div>
              <div className='form-group'>
                <label htmlFor='password'>Password</label> <br />
                <input type='text' id='password' name='password' value={this.state.signinpassword} onChange={this.handleSigninPasssword} /><br />
                <span className='text-danger'>{this.state.SigninpasswordError}</span>
              </div>
              <div className='form-group'>
                <label htmlFor='cnfpassword'>Confirm Password</label> <br />
                <input type='text' id='cnfpassword' name='cnfpassword' value={this.state.cnfpassword} onChange={this.handleSignincnfPassword} /> <br />
                <span className='text-danger'>{this.state.cnfpasswordError}</span>
              </div>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button variant='success' onClick={this.handleSave}>Edit</Button>
            <Button variant='secondary' onClick={this.handleClose}>Cancel</Button>
            <Button variant='primary' onClick={this.handleSubmit}>Submit</Button>
          </ModalFooter>


        </Modal>
        <div className="ag-theme-quartz" style={{ height:'500px' }}>
          <AgGridReact
            columnDefs={this.state.columndef}
            rowData={this.state.data}
            onRowDoubleClicked={this.handleShow}

          />
        </div>


        
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </div>
    )
  }



}

export default App;
