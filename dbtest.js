const db = require('./db')



db.insertMany([{a:1}], 'dbtest', (res)=>{
    console.log('===', res)
})

// db.find({a:0}, 'dbtest', res=>console.log(res))

// db.deleteMany({a:0}, 'dbtest', res=>console.log(res))


// db.updateOne({a:0}, {a:10}, 'dbtest', res=>console.log(res))
// db.updateMany({c:2}, {c:30}, 'dbtest', res=>console.log(res))


// db.sort({a:-1}, 'dbtest', res=>console.log(res))

// db.findSection(0, 3, 'dbtest',res=>console.log(res))