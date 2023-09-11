
const restaurant = (db) => {

    async function getTables() {
      
            // get all the available tables
             return await db.manyOrNone('SELECT * FROM table_booking') 

    }
    async function getAllTables(){
        let allTables = await db.manyOrNone('SELECT * FROM table_booking') 

        if(allTables.length === 6){
            return true
        }
    }

    async function bookTable(tableName) {
        let tableCapacityObj = await db.oneOrNone('SELECT capacity FROM table_booking WHERE table_name = $1', [tableName.tableName])
        let tableCapacity = tableCapacityObj.capacity
        let bookingSeats = tableName.seats
        let nameInInfo = tableName.username
        
            // book a table by name
        if(bookingSeats > tableCapacity){
             'seats greater than the capacity'
        }
        else if(!nameInInfo){
             'Please enter a username'
        }
    }

    async function getBookedTables() {
        // get all the booked tables
        let booked = await db.manyOrNone(` SELECT * FROM table_booking WHERE booked = 't'`)
        if(booked.length <= 0){
            return false
        }

    }

    // async function isTableBooked(tableName) {
    //     // get booked table by name
    // }

    // async function cancelTableBooking(tableName) {
    //     // cancel a table by name
    // }

    async function getBookedTablesForUser(username) {
        // get user table booking
        return await db.manyOrNone()
    }

    return {
        getTables,
        bookTable,
        getBookedTables,
        getAllTables,
        // isTableBooked,
        // cancelTableBooking,
        // editTableBooking,
        // getBookedTablesForUser
    }
}

export default restaurant;