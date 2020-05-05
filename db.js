const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";
const dbName = 'mail'

let createCollection = (collectionName) => {
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
        if (err) throw err;
        console.log('数据库已创建');
        var dbase = db.db(dbName);
        dbase.createCollection(collectionName, function (err, res) {
            if (err) throw err;
            console.log("创建集合!");
            db.close();
        });
    });
}

let insertOne = (obj, collectionName, callback) => {
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
        if (err) throw err;

        var dbCollection = db.db(dbName).collection(collectionName)

        dbCollection.insertOne(obj, function (err, res) {
            if (err) throw err;
            console.log("文档插入成功");
            db.close();

            callback && callback(res);
        });
    });
}

let insertMany = (objArr, collectionName, callback) => {
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
        if (err) throw err;
        var dbCollection = db.db(dbName).collection(collectionName)

        dbCollection.insertMany(objArr, function (err, res) {
            if (err) throw err;
            console.log("插入的文档数量为: " + res.insertedCount);
            db.close();

            callback && callback(res);

        });
    });
}

let find = (whereStr, collectionName, callback) => {
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
        if (err) throw err;
        var dbCollection = db.db(dbName).collection(collectionName)
        whereStr === 'all' ? whereStr = {} : true;
        dbCollection.find(whereStr).toArray(function (err, result) { // 返回集合中所有数据
            if (err) throw err;
            // console.log(result);
            db.close();
            callback && callback(result);

        });
    });
}

let updateOne = (whereStr, updateStr, collectionName, callback) => {
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
        if (err) throw err;
        var dbCollection = db.db(dbName).collection(collectionName)
        dbCollection.updateOne(whereStr, { $set: updateStr }, function (err, res) {
            if (err) throw err;
            console.log("文档更新成功" + res.result.ok);
            db.close();
            callback && callback(res);
        })
    })
}

let updateMany = (whereStr, updateStr, collectionName, callback) => {
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
        if (err) throw err;
        var dbCollection = db.db(dbName).collection(collectionName)
        dbCollection.updateMany(whereStr, { $set: updateStr }, function (err, res) {
            if (err) throw err;
            console.log(res.modifiedCount + " 条文档被更新");
            db.close();
            callback && callback(res);
        })
    })
}

let deleteOne = (whereStr, collectionName, callback) => {
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
        if (err) throw err;
        var dbCollection = db.db(dbName).collection(collectionName)
        dbCollection.deleteOne(whereStr, function (err, res) {
            if (err) throw err;
            console.log('删除成功' + res.result.ok);
            db.close();
            callback && callback(res);
        })
    })
}

let deleteMany = (whereStr, collectionName, callback) => {
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
        if (err) throw err;
        var dbCollection = db.db(dbName).collection(collectionName)
        dbCollection.deleteMany(whereStr, function (err, res) {
            if (err) throw err;
            console.log(res.deletedCount + " 条文档被删除");
            db.close();
            callback && callback(res);
        })
    })
}



// sortType: { type: 1 }  1升序，-1降序
let sort = (sortType, collectionName, callback) => {
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
        if (err) throw err;
        var dbCollection = db.db(dbName).collection(collectionName)
        dbCollection.find().sort(sortType).toArray(function (err, result) {
            if (err) throw err;
            // console.log(result)
            db.close();
            callback && callback(result);
        })
    })
}


// 利用limit和skip查询分页
let findSection = (skipCount, limitCount, collectionName, callback) => {
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
        if (err) throw err;
        var dbCollection = db.db(dbName).collection(collectionName)
        dbCollection.find().skip(skipCount).limit(limitCount).toArray(function (err, result) {
            if (err) throw err;
            // console.log(result);
            db.close(); 
            callback && callback(result);
        })
    })
}

module.exports = {
    createCollection,
    insertOne,
    insertMany,
    find,
    updateOne,
    updateMany,
    deleteOne,
    deleteMany,

    sort,
    findSection
}