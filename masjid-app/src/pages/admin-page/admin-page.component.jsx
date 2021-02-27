import React, { useState, useEffect } from 'react';
import FormInput from '../../components/form-input/form-input.component';
import CustomButton from '../../components/custom-button/custom-button.component';
import BasicTable from '../../components/table/table.component';
import './admin-page.styles.scss';

const AdminPage = () => {
    const [user, setUser] = useState({ fullName: '', email: '' });
    const [tabs, setTabs] = useState({userList: false, addedSolah: false, registeredSolah: []});


    const url = process.env.REACT_APP_URL ? 
        `${process.env.REACT_APP_URL}` : 'http://localhost:8080'

    console.log(url);

    useEffect(()=>{
        const requestParameters = {
            method: 'get',
        }
        fetch(`${url}/api/v1/admin/all-solah`, requestParameters)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setTabs((prevUser) => ({...prevUser, registeredSolah: data.data}))
        }).catch(error => {
            console.log(error.message)
        });
    }, [url]);
    
    
    
    const handleChange = async (e) => {
        if(e.target.id === 'f1' || 'f2'){
            const { name, value } = e.target;
            setUser((prevUser) => ({...prevUser, [name]: value}));
        } 
    }

    const handleClick = async (e) => {
        const { userList, addedSolah } = tabs;
        if(e.target.id === 'but1'){
            setTabs((prevUser) => ({...prevUser, userList: !userList }));
        }else{
            setTabs((prevUser) => ({...prevUser, addedSolah: !addedSolah }));
            
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
            const response = await fetch(`${url}/api/v1/admin/add-solah`, requestParameters);
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
            const response = await fetch(`${url}/api/v1/admin/add-user`, requestParameters);
            const data = await response.json();
            alert(data.message);
            window.location.reload(false);
        } 
        
    }

    const { userList, addedSolah, registeredSolah } = tabs;

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
            <section className='user-list container'>
                <CustomButton id='but1' handleClick={handleClick}> View user list </CustomButton>
                {userList &&
                    <div className="table">
                        <h2 className='my-3'>Users list</h2>
                        <BasicTable/>
                    </div>
                }   
            </section> 

            {/* Registered Solah */}
            <section className='registered-solah'>
                <CustomButton id='but2' handleClick={handleClick}> View recently registered solah </CustomButton>
                {addedSolah &&
                    <div className="container">
                        <ul>
                           {registeredSolah.map((solah) =>
                               (<li key={solah._id}> 
                                    <p>Prayer: {solah.prayer}</p>
                                    <p>Time: {solah.time}</p>
                                    <p>Batch: {solah.batch}</p>
                                    <p>Batches: {solah.batches}</p>
                                    <p>Date: {solah.registeredDate}</p>
                               </li>)
                           )} 
                        </ul>
                    </div>
                }
            </section>
        </div>
    );
}

export default AdminPage;
