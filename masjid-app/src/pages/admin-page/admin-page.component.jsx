import React, { useState } from 'react';
import FormInput from '../../components/form-input/form-input.component';
import CustomButton from '../../components/custom-button/custom-button.component';
import BasicTable from '../../components/table/table.component';
import './admin-page.styles.scss';

const AdminPage = () => {
    const [user, setUser] = useState({ fullName: '', email: '' });
    


    const handleChange = async (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({...prevUser, [name]: value}));
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const requestParameters = {
            method: 'post',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        }
        const response = await fetch('http://localhost:8080/api/v1/admin/add-user', requestParameters);
        const data = await response.json();
        alert(data.message);
        window.location.reload(false);
    }


    return (
        <div className='admin'>
            <p> Admin Page </p>
            <div className='admin-form-container'>
                    <form className='admin-form' onSubmit={handleSubmit} >
                        <FormInput id='f1'
                            type='text'
                            name='fullName'
                            value={ user.fullName }
                            handleChange={handleChange}
                            placeholder='Full name'
                            required
                        />
                        <FormInput id='f2'
                            type='email'
                            name='email'
                            value={user.email}
                            handleChange={handleChange}
                            placeholder='Email'
                            required
                        />
                        <CustomButton id='c1' type='submit'>Add new user </CustomButton>
                    </form>
               </div>
               <div className='admin-table'>
                    <BasicTable/>
               </div>
        </div>
    );
}

export default AdminPage;
