import React, {useState} from 'react';
import Button from "components/Button/Button.jsx";
import Room from "components/Room/Room.jsx";

const FilterRooms = () => {

    const [selectRoomTypeId, setSelectRoomTypeId] = useState("")

    const categories = [
        {label: "All Rooms", id: ""},
        {label: "Economy", id: "economy"},
        {label: "Luxe", id: "luxe"},
        {label: "Standard", id: "standard"},
    ]


    const data = [
        {
            title: "asasdf",
            price: "234",
            thumb: "/images/room-1.jpg",
            categoryId: "economy",
        },
        {
            title: "asasdf",
            price: "234",
            thumb: "/images/room-2.jpg",
            categoryId: "standard",
        },
        {
            title: "asasdf",
            price: "234",
            thumb: "/images/room-3.jpg",
            categoryId: "luxe",
        },
        {
            title: "asasdf",
            price: "234",
            thumb: "/images/room-4.jpg",
            categoryId: "luxe",
        },
        {
            title: "asasdf",
            price: "234",
            thumb: "/images/room-5-950x634.jpg",
            categoryId: "standard",
        },
        {
            title: "asasdf",
            price: "234",
            thumb: "/images/room-6.jpg",
            categoryId: "economy",
        },
        {
            title: "asasdf",
            price: "234",
            thumb: "/images/room-7.jpg",
            categoryId: "standard",
        }
    ]

    function filterByCategory(rooms) {
        return rooms.filter(room => selectRoomTypeId === "" ? true : room.categoryId === selectRoomTypeId)
    }

    return (
        <section>

            <h3 className="section-title text-center">Choose your Room</h3>

            <div className="flex justify-center gap-x-4 mt-10">
                {categories.map((category, i) => (
                    <div key={i}>
                        <Button onClick={() => setSelectRoomTypeId(category.id)}
                                variant={`${category.id === selectRoomTypeId ? "primary" : "default"}`}>
                            {category.label}
                        </Button>
                    </div>
                ))}
            </div>


            <div>

                <div className="grid grid-cols-3 gap-4 justify-center mt-10">
                    {filterByCategory(data).map(item => (
                        <Room room={item} />
                    ))}
                </div>
            </div>


        </section>
    );
};

export default FilterRooms;