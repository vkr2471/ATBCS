import React from "react";
import "./Book.css";

export default function Children(){
    const [children, setChildren] = React.useState({
        name: '',
        age: '',
        firstTimeFlier: 'false'
    });

    function HandleChange(event){
        const {name, value, type} = event.target;
        setChildren((prevValue) => {
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
        <div className="children">
            <div className="input">
                <label>Name</label>
                <input
                    type="text"
                    name="name"
                    value={children.name}
                    onChange={HandleChange}
                    required
                    className="child-name"
                />
            </div>
            <div className="input">
                <label>Age</label>
                <input
                    type="text"
                    name="age"
                    value={children.age}
                    onChange={HandleChange}
                    required
                    className="child-age"
                />
            </div>
            <div className="checkbox">
                <label>First Time Flier</label>
                <input
                    type="checkbox"
                    name="firstTimeFlier"
                    checked={children.firstTimeFlier}
                    onChange={HandleChange}
                    className="child-firstTimeFlier"
                />
            </div>
        </div>
    );
}