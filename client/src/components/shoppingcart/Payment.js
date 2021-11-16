import React from 'react'

const Payment = ({deliveryAddress, setDeliveryAddress}) => {
    return (
        <div className="flex flex-col mt-5">
            <div className="font-semibold">Payment Details</div>
            <input className="border rounded-md p-2 w-full lg:w-auto focus:outline-none"
                type="text"
                placeholder="Name on card" 
                disabled="true"/>
            <input className="border rounded-md p-2 w-full lg:w-auto focus:outline-none"
                type="text"
                placeholder="0000 0000 0000 0000"
                disabled="true"
            />
            <select className="border rounded-md p-2 w-full lg:w-auto focus:outline-none"
                type="text"
                placeholder="01"
                disabled="true">
                <option value="01">01 - January</option>
                <option value="02">02 - February</option>
                <option value="03">03 - March</option>
                <option value="04">04 - April</option>
                <option value="05">05 - May</option>
                <option value="06">06 - June</option>
                <option value="07">07 - July</option>
                <option value="08">08 - August</option>
                <option value="09">09 - September</option>
                <option value="10">10 - October</option>
                <option value="11">11 - November</option>
                <option value="12">12 - December</option>
            </select>
            <select className="border rounded-md p-2 w-full lg:w-auto focus:outline-none"
                type="text"
                placeholder="01" disabled="true">
                <option value="2021">2021</option>
                <option value="2022">2022</option>
                <option value="2023">2023</option>
                <option value="2024">2024</option>
                <option value="2025">2025</option>
                <option value="2026">2026</option>
                <option value="2027">2027</option>
                <option value="2028">2028</option>
                <option value="2029">2029</option>
                <option value="2030">2030</option>
            </select>
            <input className="border rounded-md p-2 w-full lg:w-auto focus:outline-none"
                type="number"
                placeholder="CVV" disabled="true" />
            <textarea className="border rounded-md p-2 w-full lg:w-auto focus:outline-none"
                type="text"
                placeholder="Delivery Address"
                onChange={(e) => setDeliveryAddress(e.target.value)}
            />
        </div>
    )
}

export default Payment
