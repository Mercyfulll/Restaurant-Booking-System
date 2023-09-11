
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

        let nameInInfo = tableName.username
        if(!nameInInfo){
            //req.flash('error', 'Please enter a username')
            return 'Please enter a username'
       }
        
        let nameOfTable = ('SELECT * FROM table_booking WHERE table_name = $1',[tableName.tableName])
        if(!nameOfTable){
                //req.flash('error', 'Invalid table name provided')
                return 'Invalid table name provided'
            
       }
       
       let contact = tableName.phoneNumber
       if(!contact){
        // req.flash('error', 'Please enter a contact number')
           return 'Please enter a contact number'
       }

        let tableCapacityObj = await db.oneOrNone('SELECT capacity FROM table_booking WHERE table_name = $1', [tableName.tableName])
        let tableCapacity = tableCapacityObj.capacity
        let bookingSeats = tableName.seats
            // book a table by name
        if(bookingSeats > tableCapacity){
            // req.flash('error', 'seats greater than the capacity')
           return 'seats greater than the capacity'
        }
                // if (nameInInfo && nameOfTable && contact && tableCapacity > bookingSeats ){
        //     await db.none(` UPDATE table_booking
        //                     SET
        //                     username = $1,
        //                     number_of_people = $2,
        //                     contact_number = $3,
        //                     booked = 't'
        //                     WHERE
        //                     table_name = $4
        //     `,[nameInInfo,contact,bookingSeats,nameOfTable])
        // }
        try {
            await db.none(`
                UPDATE table_booking
                SET
                    username = $1,
                    number_of_people = $2,
                    contact_number = $3,
                    booked = 't'
                WHERE
                    table_name = $4
            `, [nameInInfo, bookingSeats, contact, nameOfTable]);
            // req.flash('success', 'Table booked successfully')
            
        } catch (error) {
            // Handle database update error
            console.error('Error booking table:', error);
            return 'Error booking table';
        }
    }

    
    
    
    
    
    


        
       
        


    async function getBookedTables() {
        // get all the booked tables
        let booked = await db.manyOrNone(` SELECT * FROM table_booking WHERE booked = 't'`)
        if(booked.length <= 0){
            return false
        }
        else if(booked.length > 0){
            return booked
        }

    }

    async function isTableBooked(tableName) {
        // get booked table by name
        let booked = await db.oneOrNone(`SELECT * FROM table_booking WHERE booked = 't'`,[tableName])
        if(booked){
            
        }

    }

    // async function cancelTableBooking(tableName) {
    //     // cancel a table by name
    // }

    // async function getBookedTablesForUser(username) {
    //     // get user table booking
    //     return await db.manyOrNone()
    // }

    return {
        getTables,
        bookTable,
        getBookedTables,
        getAllTables,
        isTableBooked,
        // cancelTableBooking,
        // editTableBooking,
        // getBookedTablesForUser
    }
}

export default restaurant;