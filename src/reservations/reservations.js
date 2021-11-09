const reservations = [
    { date: '2021-12-05', bedroom: 1, id: 1, status: 'pending'},
    { date: '2021-12-03', bedroom: 1, id: 2, status: 'pending'},
    { date: '2021-12-03', bedroom: 2, id: 3, status: 'pending'},
    { date: '2021-12-06', bedroom: 2, id: 4, status: 'pending'}
]
module.exports.update = (event,contex,callback) => {
    console.log('-------------RESERVATION------------')
    console.log(event)
    if(event.confirmed) {
        const index = reservations.findIndex(
            reservation => Number(reservation.id) === Number(event.id)
        )
        console.log('INDEX: ', index)
        reservations[index].status = 'accepted'
        
        console.log(reservations);
        
        info = Object.assign(event, {
            ...reservations[index]
        })
        callback(null, info);
    } else {
        const index = reservations.findIndex(
            reservation => Number(reservation.id) === Number(event.id)
        )
        reservations[index].status = 'cancelled'
        
        console.log(reservations);
        
        info = Object.assign(event, {
            ...reservations[index]
        })
        callback(null, info);
    }
}