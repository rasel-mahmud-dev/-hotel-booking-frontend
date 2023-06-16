import React from 'react';

const TopPopularRooms = () => {

    const data = [
        {
            title: "asasdf",
            price: "234"
        },
        {
            title: "asasdf",
            price: "234"
        },
        {
            title: "asasdf",
            price: "234"
        }
    ]

    return (
        <section>

            <h3 className="section-title text-center">Top Popular Rooms</h3>

           <div className="grid grid-cols-3 gap-4 justify-center">
               {data.map(item=>(
                   <div>
                       <h4>{item.title}</h4>
                   </div>
               ))}
           </div>

        </section>
    );
};

export default TopPopularRooms;