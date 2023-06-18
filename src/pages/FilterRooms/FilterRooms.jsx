import React, {useEffect, useState} from 'react';
import InputGroup from "components/Input/InputGroup.jsx";
import Button from "components/Button/Button.jsx";
import useCustomReducer from "src/hooks/useReducer.jsx";
import {useDispatch, useSelector} from "react-redux";
import {useSearchParams} from "react-router-dom";
import roomTypeData from "src/store/roomTypeData.json"
import Room from "components/Room/Room"
import {filterRoomsAction} from "store/actions/roomAction.js";
import addresses from "store/addresses.json"
import getUniqueElem from "src/utils/getUniqueElem.js";
import Loader from "components/Loader/Loader.jsx";
import {toggleSidebarAction} from "store/slices/appSlice.js";
import {setBookingItemInfo} from "store/slices/hotelSlice.js";


const FilterRooms = () => {


    const dispatch = useDispatch()

    const [searchParams] = useSearchParams()
    let city = searchParams.get("city")
    let checkInDate = searchParams.get("checkInDate")
    let checkOutDate = searchParams.get("checkOutDate")
    let capacity = searchParams.get("capacity")

    const {openSidebar} = useSelector(state => state.appState)


    let nextDay = new Date()
    nextDay.setHours(0)
    nextDay.setDate(nextDay.getDate() + 1)

    const [filterInput, setFilterInput] = useCustomReducer({
        hotelId: "",
        roomType: "", // Standard //
        capacity: 2,
        city: "",
        checkInDate: new Date(),
        checkOutDate: nextDay,
        errorMessage: "",
        isLoading: false
    })

    const [rooms, setRooms] = useState([])


    useEffect(() => {
        let query = {}
        if (city) {
            query["city"] = city
        }
        if (capacity) {
            query["capacity"] = capacity
        }
        if (checkInDate) {
            checkInDate = new Date(checkInDate)
            if (checkInDate instanceof Date) {
                query["checkInDate"] = checkInDate
            }
        }
        if (checkOutDate) {
            checkOutDate = new Date(checkOutDate)
            if (checkOutDate instanceof Date) {
                query["checkOutDate"] = checkOutDate
            }
        }
        setFilterInput(query)
        handleFilterRoom(query)
    }, [checkInDate, checkOutDate, city, capacity])


    function handleChange({target: {name, value}}) {
        setFilterInput({[name]: value})
    }

    useEffect(() => {
        dispatch(setBookingItemInfo({
            checkOutDate: filterInput.checkOutDate.toISOString(),
            checkInDate: filterInput.checkInDate.toISOString(),
        }))
    }, [filterInput.checkOutDate, filterInput.checkInDate])

    function handleFilterRoom(filterInput) {

        setFilterInput({isLoading: true})

        dispatch(filterRoomsAction({
            checkInDate: filterInput.checkInDate,
            checkOutDate: filterInput.checkOutDate,
            capacity: filterInput.capacity,
            roomType: filterInput.roomType,
            city: filterInput.city

        })).unwrap().then(data => {
            setRooms(data)
        }).catch(err => {

        }).finally(() => {
            setFilterInput({isLoading: false})
        })
    }

    function handleShowBookingModal(room) {
        dispatch(setBookingItemInfo({
            room: room,
            checkOutDate: filterInput.checkOutDate.toISOString(),
            checkInDate: filterInput.checkInDate.toISOString(),
        }))
    }

    function toggleSidebar() {
        dispatch(toggleSidebarAction(""))
    }

    return (
        <div className="container dashboard-wrapper !px-0 ">
            <div className={`backdrop ${openSidebar === "dashboard" ? "backdrop-open" : ""}`}
                 onClick={toggleSidebar}></div>
            <div className={`sidebar  p-5 ${openSidebar === "dashboard" ? "sidebar-open" : ""}`}>
                <h4>Filter Rooms</h4>
                <InputGroup
                    selected={filterInput.checkInDate}
                    onChange={handleChange}
                    labelClass="text-xs font-medium text-gray-500 mb-2"
                    className="flex flex-col mt-5"
                    label={"CHECK-IN"}
                    name="checkInDate"
                    as="datepicker"
                />


                <InputGroup
                    selected={filterInput.checkOutDate}
                    onChange={handleChange}
                    labelClass="text-xs font-medium text-gray-500 mb-2"
                    className="flex flex-col mt-5"
                    label={"CHECK-OUT"}
                    name="checkOutDate"
                    as="datepicker"
                />


                <InputGroup
                    name="roomType"
                    value={filterInput.roomType}
                    onChange={handleChange}
                    labelClass="text-xs font-medium text-gray-500 mb-2"
                    className="flex flex-col mt-5"
                    label="ROOM TYPE"
                    // placeholder="Room name"
                    as="select"
                    renderOption={() => (
                        <>
                            <option value={""}>Any</option>
                            {
                                roomTypeData.map((type, i) => (
                                    <option key={i} value={type}>{type}</option>
                                ))
                            }
                        </>
                    )}
                />
                <InputGroup
                    value={filterInput.city}
                    onChange={handleChange}
                    labelClass="text-xs font-medium text-gray-500 mb-2"
                    className="flex flex-col mt-5"
                    label={"LOCATION"}
                    name="city"
                    placeholder={"Enter city"}
                    as="select"
                    renderOption={() => (
                        <>
                            <option value="">All City</option>
                            {getUniqueElem(addresses.map(add => add["city"])).map((elem, i) => (
                                <option key={i} value={elem}>{elem}</option>
                            ))}
                        </>
                    )}
                />

                <InputGroup
                    value={filterInput.capacity}
                    type="number"
                    name="capacity"
                    onChange={handleChange}
                    labelClass="text-xs font-medium text-gray-500 mb-2"
                    className="flex flex-col mt-5"
                    label="CAPACITY"
                    placeholder="Room Capacity"
                />

                {/* <InputGroup label="Room Type" placeholder="Select Room"></InputGroup> */}
                <Button onClick={() => handleFilterRoom(filterInput)} className="mt-4">Search</Button>


            </div>

            <div className="content">
                <div className="container">

                    {filterInput.isLoading && (
                        <div className="loader-v-position">
                            <Loader title="Room are finding..."/>
                        </div>
                    )}

                    {!filterInput.isLoading && (
                        <div
                            className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-center mt-10">
                            {rooms?.map((item) => (
                                <Room
                                    key={item._id}
                                    onBookNow={_ => handleShowBookingModal(item)}
                                    room={item}/>
                            ))}
                        </div>
                    )}


                </div>
            </div>


        </div>
    )
        ;
};


export default FilterRooms;