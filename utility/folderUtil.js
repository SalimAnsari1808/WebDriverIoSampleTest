const path = require('path');
const fs = require('fs');
const csv = require('fast-csv');


class FolderUtil {

    removeDirectory(dir) {
        var list = fs.readdirSync(dir);
        for(var i = 0; i < list.length; i++) {
            var filename = path.join(dir, list[i]);
            var stat = fs.statSync(filename);
        
            if(filename == "." || filename == "..") {
            // pass these files
            } else if(stat.isDirectory()) {
                // rmdir recursively
                rmdir(filename);
            } else {
                // rm fiilename
                fs.unlinkSync(filename);
            }
        }

        fs.rmdirSync(dir);
    }

    waitForFileExists(filePath, timeout) {
        return new Promise(function (resolve, reject) {

            var timer = setTimeout(function () {
                watcher.close();
                reject(new Error('File did not exists and was not created during the timeout.'));
            }, timeout);

            fs.access(filePath, fs.constants.R_OK, function (err) {
                if (!err) {
                    clearTimeout(timer);
                    watcher.close();
                    resolve();
                }
            });

            var dir = path.dirname(filePath);
            var basename = path.basename(filePath);
            var watcher = fs.watch(dir, function (eventType, filename) {
                if (eventType === 'rename' && filename === basename) {
                    clearTimeout(timer);
                    watcher.close();
                    resolve();
                }
            });
        });
    }

    getMostRecentFile(dir) {
        const files = this.orderReccentFiles(dir);
        return files.length ? files[0] : undefined;
      };
      
    orderReccentFiles(dir) {
        return fs.readdirSync(dir)
          .filter((file) => fs.lstatSync(path.join(dir, file)).isFile())
          .map((file) => ({ file, mtime: fs.lstatSync(path.join(dir, file)).mtime }))
          .sort((a, b) => b.mtime.getTime() - a.mtime.getTime());
    };

    verifyFileExist(filePath){
        try{
            if(fs.existsSync(filePath)){
                return true;
            }else{
                return false;
            }
        }catch(err){
            console.log("Error message in method 'verifyFileExist' is:"+err)
            return false;
        }
    }

    deleteFile(filePath){
        if(this.verifyFileExist(filePath)){
            fs.unlinkSync(filePath)
        }else{
            console.log("Unable to delete file in method 'deleteFile'")
        }
    }

    getCSVFileHeaders(filePath){

        var fileHeaders = browser.call(()=>{
            return new Promise( resolve =>{
                csv.parseFile(filePath, {headers : true})
                   .on('headers',(headers)=>{
                        resolve(headers)
                   })
             })
        });                            
        
        return fileHeaders;

    }

    updateSampleCSVFile(filePath, fieldCSV){
        //const readStream = fs.createReadStream('./test/specs/claim-sample.csv'); 

        var queryParameter = browser.call(()=>{
            return new Promise( resolve =>{
                let returnLit = []
                csv.parseFile(filePath, {headers : true})
                   .on('data',(data)=>{
                       returnLit.push(data)
                   })
                   .on('end',()=>{
                       resolve(returnLit)
                   })
             })
        });                            
        
        const data = [];

        data.push(queryParameter[0]);

        const writeStream = fs.createWriteStream(filePath);

        data[0].carrier = "Ansari";

        csv.write(data,{headers:true}).pipe(writeStream);
    }

    checkCSVExportLatestCSVFileLoaded(){
        browser.waitUntil(()=>{
            return this.getMostRecentFile(global.downloadDir).file != undefined
        },{timeout:5000,timeoutMsg:"file is not found"})

        browser.waitUntil(()=>{
            return this.getMostRecentFile(global.downloadDir).file.match(/^claims_datatable_[0-9]{10}.csv$/gi)
        },{timeout:5000,timeoutMsg:"latest file is not csv"})
    }

    checkCSVExportLatestExcelFileLoaded(){
        browser.waitUntil(()=>{
            return this.getMostRecentFile(global.downloadDir).file != undefined
        },{timeout:5000,timeoutMsg:"file is not found"})

        browser.waitUntil(()=>{
            return this.getMostRecentFile(global.downloadDir).file.match(/^claims_datatable_[0-9]{10}.xlsx$/gi)
        },{timeout:5000,timeoutMsg:"latest file is not excel"})
    }

    checkCSVExportLatestPDFFileLoaded(){
        browser.waitUntil(()=>{
            return this.getMostRecentFile(global.downloadDir).file != undefined
        },{timeout:5000,timeoutMsg:"file is not found"})

        browser.waitUntil(()=>{
            return this.getMostRecentFile(global.downloadDir).file.match(/^claims_datatable_[0-9]{10}.pdf$/gi)
        },{timeout:5000,timeoutMsg:"latest file is not pdf"})
    }

}

module.exports = new FolderUtil();