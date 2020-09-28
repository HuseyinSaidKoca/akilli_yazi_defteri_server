const mongoose=require('mongoose');
const Int32=require('mongoose-int32');
const ogrenciSchema=new mongoose.Schema({
    ogretmen_id: Int32,  
    ogrenci_id: Int32,
    isim: String,
    ogrenci_no: Int32,
    zaman: String,
    sifre: String,
    seviye: Int32,
    toplam_yanlis: Int32,
    dogrular: Int32,
    hgdogrular: Int32,
    odev: Int32,
    gunluk_okuma:Int32,
    gunluk_yazma:Int32,
    elakin: Int32,
    omutuy: Int32,
    oridsb: Int32,
    zcgscp: Int32,
    hvgfj: Int32,  
    sinir1: Int32,
    sinir2: Int32,
    sinir3: Int32,
    sinir4: Int32,
    sinir5: Int32,  
     
})

mongoose.model("ogrenciler",ogrenciSchema)