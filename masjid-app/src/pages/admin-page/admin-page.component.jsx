import React, { useState } from 'react';
import FormInput from '../../components/form-input/form-input.component';
import CustomButton from '../../components/custom-button/custom-button.component';
import BasicTable from '../../components/table/table.component';
import './admin-page.styles.scss';

const AdminPage = () => {
    const [user, setUser] = useState({ fullName: '', email: '' });
    // const [solah, setSolah] = useState({prayer: '',batch: '', batches: '', time: '', date: ''})

    const handleChange = async (e) => {
        if(e.target.id === 'f1' || 'f2'){
            const { name, value } = e.target;
            setUser((prevUser) => ({...prevUser, [name]: value}));
        } 
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        if(e.target.className === 'flex'){
            const test = new FormData(e.target);
            const values = Object.fromEntries(test.entries())
            console.log(JSON.stringify(values));
            const requestParameters = {
                method: 'post',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            }
            const response = await fetch('http://localhost:8080/api/v1/admin/add-solah', requestParameters);
            const data = await response.json();
            alert(data.message);
            window.location.reload(false);

        }else{
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
        
    }


    return (
        <div className='admin container'>
            {/* Add user */}
            <section className='add-user'>
                <form className='ad-grid my-3' onSubmit={handleSubmit} >
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
            </section>
            
            {/* Register solah */}
            <section className='register-solah'>
                <div className="contain">
                    <h2 className='my-3'>Register solat</h2>
                    <form className='flex' onSubmit={handleSubmit}>
                        <select id='solah' name='prayer' required>
                            <option>Select solat</option>
                            <option value='subhi'>Subhi</option>
                            <option value='zuhur'>Zuhur</option>
                            <option value='sunrise'>Sunrise</option>
                            <option value='asr'>Asr</option>
                            <option value='maghrib'>Maghrib</option>
                            <option value='ishai'>Ishai</option>
                            <option value='jummah'>Jummah</option>
                        </select>
                        <select id='batch' name='batches' required>
                            <option>Number of Batches:</option> 
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                        </select>
                        <select id='batch1' name='batch' required>
                            <option>Batch Number:</option> 
                            <option value='1'>Batch 1</option>
                            <option value='2'>Batch 2</option>
                            <option value='3'>Batch 3</option>
                            <option value='4'>Batch 4</option>
                        </select> 
                        <FormInput 
                            id='f3'
                            name='date' 
                            type='date'
                            required/>   
                        <FormInput 
                            id='f4' 
                            type='time'
                            name='time'
                            required/>
                        <CustomButton id='c2' type='submit'>Register solah</CustomButton>
                    </form>
                </div>
            </section>

            {/* Users list */}
            <section className='user-list'>
                <h2 className='my-3'>Users list</h2>
                <div>
                    <BasicTable/>
                </div>
            </section>            
        </div>
    );
}

export default AdminPage;
