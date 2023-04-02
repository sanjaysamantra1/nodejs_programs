let express = require('express');
let categoryRouter = express.Router();
let mongodb = require('mongodb').MongoClient;
let url = 'mongodb://localhost:27017';


function router(menu){
    categoryRouter.route('/')
        .get(function(req,res){
        mongodb.connect(url,function(err,dc){
            if(err){
                res.status(500).send('Error While connecting')
            }else{
                let dbObj = dc.db('march2023');
                dbObj.collection('categories').find().toArray(function(err,result){
                    if(err){
                        res.status(203).send('Error While Fetching')
                    }else{
                        res.render('category',{title:'Category Page',data:result,menu})
                    }
                })
            }
        })
        
    })

    categoryRouter.route('/details')
        .get(function(req,res){
        res.send("Category Details")
    })

    return categoryRouter
}


module.exports = router;