const restaurant = (db) => {

    async function getTables() {
        // get all the available tables
        return await db.manyOrNone('SELECT * FROM table_booking') 
    }

    // async function bookTable(tableName) {
    //     // book a table by name
    // }

    // async function getBookedTables() {
    //     // get all the booked tables
    // }

    // async function isTableBooked(tableName) {
    //     // get booked table by name
    // }

    // async function cancelTableBooking(tableName) {
    //     // cancel a table by name
    // }

    // async function getBookedTablesForUser(username) {
    //     // get user table booking
    // }

    return {
        getTables,
        // bookTable,
        // getBookedTables,
        // isTableBooked,
        // cancelTableBooking,
        // editTableBooking,
        // getBookedTablesForUser
    }
}

export default restaurant;