import React from "react";
import './Book.css';

export default function Infant(){
    const [infant, setInfant] = React.useState({
        name: '',
        age: '',
        firstTimeFlier: 'false'
    });
    
    function HandleChange(event){
        const {name, value, type} = event.target;
        setInfant((prevValue) => {
            if(type === "checkbox"){
                return {
                    ...prevValue,
                    [name]: !prevValue[name]
                }
            }else{
            return {
                ...prevValue,
                [name]: value
            };  
        }
        });
    }

    return(
        <div className="infant">
            <div className="input">
                <label>Name</label>
                <input
                    type="text"
                    name="name"
                    value={infant.name}
                    onChange={HandleChange}
                    required
                    className="infant-name"
                />
            </div>
            <div className="input">
                <label>Age</label>
                <input
                    type="text"
                    name="age"
                    value={infant.age}
                    onChange={HandleChange}
                    required
                    className="infant-age"
                />
            </div>
            <div className="checkbox">
                <label>First Time Flier</label>
                <input
                    type="checkbox"
                    name="firstTimeFlier"
                    checked={infant.firstTimeFlier}
                    onChange={HandleChange}
                    className="infant-firstTimeFlier"
                />
            </div>
        </div>
    );
}