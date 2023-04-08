import React from 'react';
import './Feedback.css';

export default function Feedback() {
    const [feedbackData, setFeedbackData] = React.useState({
        email: '',
        feedback: ''
    })

    function HandleChange(event) {
        const { name, value } = event.target;
        setFeedbackData((prevValue) => {
          return {
            ...prevValue,
            [name]: value,
          };
        });
      }
    return(
        <div>
            <div className='feedback'>
                <form className='feedback-form'>
                    <div>
                        <label className='email'>Email</label>
                        <input type='text' name='email' placeholder='Email' value={feedbackData.email} onChange={HandleChange} required/>
                    </div>
                    <div>
                        <label className='feed'>Feedback</label>
                        <textarea type='text' name='feedback' placeholder='Give your feedback here....' value={feedbackData.feedback} onChange={HandleChange}></textarea>
                    </div>
                    <button type='submit'>Submit</button>
                </form>
            </div>
        </div>
    );
}