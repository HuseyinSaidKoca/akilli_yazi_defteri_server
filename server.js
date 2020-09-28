const express=require('express');
const app = express();
const bodyParser=require('body-parser');
var MongoClient = require('mongodb').MongoClient;
const cors = require("cors")
app.use(cors())
app.use(bodyParser.json());

const mongoUri='mongodb+srv://admin:admin1234@akilliyazidefteri.lhf4s.mongodb.net/<dbname>?retryWrites=true&w=majority';
var seviye_y=0;

app.post('/',(req, res) =>{
    res.send("welcome")
})

app.get('/',(req, res) =>{
    res.send("welcome")
})

app.post('/bul',(req, res) =>{
    console.log(req.body.ogrenci_id);
    MongoClient.connect(mongoUri,{useUnifiedTopology: true,useNewUrlParser: true} ,function(err, db) {
        if (err) throw err;
      var dbo = db.db("okul");
      dbo.collection("ogrenciler").findOne({ogrenci_id:req.body.ogrenci_id}, function(err, result) {
        if (err) throw err;
        console.log(result);
        res.json(result);
        db.close();
      });
    });
    
})

app.post('/zaman_send',(req, res) =>{
  console.log(req.body.ogrenci_id);
  MongoClient.connect(mongoUri,{useUnifiedTopology: true,useNewUrlParser: true} ,function(err, db) {
      if (err) throw err;
    var dbo = db.db("okul");
    dbo.collection("ogrenciler").findOne({ogrenci_id:req.body.ogrenci_id}, function(err, result) {
      if (err) throw err;
      console.log(result.zaman);
      res.json(result.zaman);
      db.close();
    });
  });
  
})

app.get('/bul',(req, res) =>{
    console.log(req.body.ogrenci_id);
    MongoClient.connect(mongoUri,{useUnifiedTopology: true,useNewUrlParser: true} ,function(err, db) {
        if (err) throw err;
      var dbo = db.db("okul");
      dbo.collection("ogrenciler").findOne({ogrenci_id:req.body.ogrenci_id}, function(err, result) {
        if (err) throw err;
        console.log(result);
        res.json(result);
        db.close();
      });
    });
    
})

app.post('/gunluk_yazi',(req, res) =>{
    console.log(req.body.ogrenci_id);
    MongoClient.connect(mongoUri,{useUnifiedTopology: true,useNewUrlParser: true} ,function(err, db) {
        if (err) throw err;
      var dbo = db.db("okul");
      dbo.collection("ogrenciler").updateOne({ogrenci_id:req.body.ogrenci_id},{ $inc:{gunluk_yazma: 1}},function(err, res){
        if (err) throw err;
        console.log();
        db.close();
      });
    });
    res.send('ok');
})

app.post('/gunluk_okuma',(req, res) =>{
    console.log(req.body.ogrenci_id);
    MongoClient.connect(mongoUri,{useUnifiedTopology: true,useNewUrlParser: true} ,function(err, db) {
        if (err) throw err;
      var dbo = db.db("okul");
      dbo.collection("ogrenciler").updateOne({ogrenci_id:req.body.ogrenci_id},{ $inc:{gunluk_okuma: 1}},function(err, res){
        if (err) throw err;
        console.log("1 document updated");
        db.close();
      });
    });
    res.send('ok');
    
})

app.post('/gunluk_yazi_sifirla',(req, res) =>{
  console.log(req.body.ogrenci_id);
  MongoClient.connect(mongoUri,{useUnifiedTopology: true,useNewUrlParser: true} ,function(err, db) {
      if (err) throw err;
    var dbo = db.db("okul");
    dbo.collection("ogrenciler").updateOne({ogrenci_id:req.body.ogrenci_id},{ $set:{gunluk_yazma: 1}},function(err, res){
      if (err) throw err;
      console.log();
      db.close();
    });
  });
  res.send('ok');
})

app.post('/gunluk_okuma_sifirla',(req, res) =>{
  console.log(req.body.ogrenci_id);
  MongoClient.connect(mongoUri,{useUnifiedTopology: true,useNewUrlParser: true} ,function(err, db) {
      if (err) throw err;
    var dbo = db.db("okul");
    dbo.collection("ogrenciler").updateOne({ogrenci_id:req.body.ogrenci_id},{ $set:{gunluk_okuma: 1}},function(err, res){
      if (err) throw err;
      console.log("1 document updated");
      db.close();
    });
  });
  res.send('ok');
  
})

app.post('/yanlis',(req, res) =>{
    console.log(req.body.ogrenci_id);
    MongoClient.connect(mongoUri,{useUnifiedTopology: true,useNewUrlParser: true} ,function(err, db) {
        if (err) throw err;
      var dbo = db.db("okul");
      dbo.collection("ogrenciler").updateOne({ogrenci_id:req.body.ogrenci_id},{ $inc:{toplam_yanlis: 1}},function(err, res){
        if (err) throw err;
        db.close();
      });

    });
    res.send('ok');
    
})

app.post('/zaman',(req, res) =>{
    console.log(req.body.ogrenci_id);
    MongoClient.connect(mongoUri,{useUnifiedTopology: true,useNewUrlParser: true} ,function(err, db) {
        if (err) throw err;
      var dbo = db.db("okul");
      var dayNames = ['Pzt', 'Salı', 'Çrş', 'Prş', 'Cuma', 'Cmt', 'Pazar']
      var monthNames = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık']
      var date = new Date();
      var dayOfMonth = date.getDate()
      var dayOfWeekIndex = date.getDay()
      var monthIndex = date.getMonth()
      var year = date.getFullYear()
      var hour = date.getHours();
      hour = (hour < 10 ? "0" : "") + hour;
      var min  = date.getMinutes();
      min = (min < 10 ? "0" : "") + min;
      var sec  = date.getSeconds();
      sec = (sec < 10 ? "0" : "") + sec;
      zaman= year + ' ' + monthNames[monthIndex] +' ' +  dayOfMonth + ' ' + dayNames[dayOfWeekIndex] + ' '+ hour+':'+ min+':'+sec ;
      dbo.collection("ogrenciler").updateOne({ogrenci_id:req.body.ogrenci_id},{ $set:{zaman: zaman}},function(err, res){
        if (err) throw err;
        db.close();
      });

    });
    res.send('ok');
    
})

app.post('/elakin',(req, res) =>{
    console.log(req.body.ogrenci_id);
    MongoClient.connect(mongoUri,{useUnifiedTopology: true,useNewUrlParser: true} ,function(err, db) {
        if (err) throw err;
      var dbo = db.db("okul");
      dbo.collection("ogrenciler").updateOne({ogrenci_id:req.body.ogrenci_id},{ $inc:{elakin: 1}},function(err, result){
        if (err) throw err;
        db.close();
      });
    });
    res.send('ok');
    
})

app.post('/omutuy',(req, res) =>{
    console.log(req.body.ogrenci_id);
    MongoClient.connect(mongoUri,{useUnifiedTopology: true,useNewUrlParser: true} ,function(err, db) {
        if (err) throw err;
      var dbo = db.db("okul");
      dbo.collection("ogrenciler").updateOne({ogrenci_id:req.body.ogrenci_id},{ $inc:{omutuy: 1}},function(err, result){
        if (err) throw err;
        db.close();
      });
    });
    res.send('ok');
    
})

app.post('/oridsb',(req, res) =>{
    console.log(req.body.ogrenci_id);
    MongoClient.connect(mongoUri,{useUnifiedTopology: true,useNewUrlParser: true} ,function(err, db) {
        if (err) throw err;
      var dbo = db.db("okul");
      dbo.collection("ogrenciler").updateOne({ogrenci_id:req.body.ogrenci_id},{ $inc:{oridsb: 1}},function(err, result){
        if (err) throw err;
        db.close();
      });
    });
    res.send('ok');
    
})

app.post('/zcgscp',(req, res) =>{
    console.log(req.body.ogrenci_id);
    MongoClient.connect(mongoUri,{useUnifiedTopology: true,useNewUrlParser: true} ,function(err, db) {
        if (err) throw err;
      var dbo = db.db("okul");
      dbo.collection("ogrenciler").updateOne({ogrenci_id:req.body.ogrenci_id},{ $inc:{zcgscp: 1}},function(err, result){
        if (err) throw err;
        db.close();
      });
    });
    res.send('ok');
    
})

app.post('/hvgfj',(req, res) =>{
    console.log(req.body.ogrenci_id);
    MongoClient.connect(mongoUri,{useUnifiedTopology: true,useNewUrlParser: true} ,function(err, db) {
        if (err) throw err;
      var dbo = db.db("okul");
      dbo.collection("ogrenciler").updateOne({ogrenci_id:req.body.ogrenci_id},{ $inc:{hvgfj: 1}},function(err, result){
        if (err) throw err;
        db.close();
      });
    });
    res.send('ok');
    
})

app.post('/dogru',(req, res) =>{
    console.log(req.body.ogrenci_id);
    MongoClient.connect(mongoUri,{useUnifiedTopology: true,useNewUrlParser: true} ,function(err, db) {
        if (err) throw err;
      var dbo = db.db("okul");
      dbo.collection("ogrenciler").updateOne({ogrenci_id:req.body.ogrenci_id},{ $inc:{dogrular: 1}},function(err, res){
        if (err) throw err;
        console.log("1 document updated");
        db.close();
      });
    });
    res.send('ok');
    
})

app.post('/hg_dogru',(req, res) =>{
  console.log(req.body.ogrenci_id);
  MongoClient.connect(mongoUri,{useUnifiedTopology: true,useNewUrlParser: true} ,function(err, db) {
      if (err) throw err;
    var dbo = db.db("okul");
    dbo.collection("ogrenciler").updateOne({ogrenci_id:req.body.ogrenci_id},{ $inc:{hgdogrular: 1}},function(err, res){
      if (err) throw err;
      console.log("1 document updated");
      db.close();
    });
  });
  res.send('ok');
  
})

app.post('/hesap_degistir',(req, res) =>{
  console.log(req.body.ogrenci_id);
  console.log(req.body.isim);
  MongoClient.connect(mongoUri,{useUnifiedTopology: true,useNewUrlParser: true} ,function(err, db) {
      if (err) throw err;
    var dbo = db.db("okul");
    dbo.collection("hesaplar").updateOne({},{ $set:{isim: req.body.isim, ogrenci_id: req.body.ogrenci_id}},function(err, res){
      if (err) throw err;
      console.log("1 document updated");
      db.close();
    });
  });
  res.send('ok');
  
})

app.post('/hesap_bilgileri',(req, res) =>{
  console.log(req.body.isim);
  MongoClient.connect(mongoUri,{useUnifiedTopology: true,useNewUrlParser: true} ,function(err, db) {
      if (err) throw err;
    var dbo = db.db("okul");
    dbo.collection("hesaplar").findOne({}, function(err, result) {
      if (err) throw err;
      console.log(result);
      res.json(result);
      db.close();
    });
  });
  
})


app.listen(3000, () => {
    console.log('server running')
})













