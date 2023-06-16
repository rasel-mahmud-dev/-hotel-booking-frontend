import React, {useState} from 'react';
import Button from "components/Button/Button.jsx";

const FilterRooms = () => {

    const [selectRoomTypeId, setSelectRoomTypeId] = useState("")

    const categories = [
        {label: "All Rooms", id: ""},
        {label: "Economy", id: "economy"},
        {label: "Luxe", id: "luxe"},
        {label: "Standard", id: "standard"},
    ]



    return (
        <section>

            <h3 className="section-title text-center">Choose your Room</h3>

            <div className="flex justify-center gap-x-4">
                {categories.map((category, i)=>(
                    <div key={i}>
                        <Button onClick={()=>setSelectRoomTypeId(category.id)} variant={`${category.id === selectRoomTypeId ? "primary" : "default" }`}>
                            {category.label}
                        </Button>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default FilterRooms;