import randomstring from "randomstring";
import db from '../app';

export const getBooks = (req,res) => {
    let book = req.body;
    if(req && req.body && req.body.searchText && req.body.searchText!=''){
         db.book.find({ $or:[{name:{$regex: book.searchText}},{description:{$regex: book.searchText}}] },(err,data)=>{
            return res.json(data);
        });
    }
    else{
        db.book.find({},function(err,data){
            return res.json(data);
        });
    }
}

export const updateBook = (req,res) => {
    let book = req.body;
    db.book.update({uid:book.uid},book,(err,data)=>{
        if(data){
            db.book.find({},function(err,data){
                return res.json(data);
            })
        }
        else return res.json({'success':false,'message':'Some Error'});
    });
}
export const addBook = (req,res) => {
    let book = req.body;
    book.uid = randomstring.generate();
    db.book.insert(book,(err,data)=>{
        if(data){
            db.book.find({},(err,data)=>{
                return res.json(data);
            })
        }
        else return res.json({'success':false,'message':'Some Error'});
    });
}

export const removeBook = (req,res) => {
    let uid = req.body.uid;
    db.book.remove({uid:uid},(err,data)=>{
        if(data){
            db.book.find({},(err,data)=>{
                return res.json(data);
            })
        }
        else return res.json({'success':false,'message':'Some Error'});
    });
} 

