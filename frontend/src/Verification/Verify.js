import React from 'react';
import './Verify.css'

export default function BookVerify() {
  return (
    <div className='verifying'>
      <div class="verify">
            <p>
                <strong>Verifying&ensp;</strong> 
                <i className=" w3-spin fa fa-refresh"></i>
                &emsp;Your Cowin certificate(s) are getting verified. Please check your mail for the results.
            </p>
    </div>
    </div>
  );
}