const express = require("express");
const app = express();
const fs = require("fs");
const path = require('path');
const cors = require("cors");

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.get("/items", (req, res) => {
  fs.readFile("Items.json", "utf8", (err, data) => {
    if (err) {
      return res.status(500).send("Internal Server Error");
    }
    res.json(JSON.parse(data));
  });
});

app.post("/writeBillData", (req, res) => {
  const postedData = req.body;

  fs.readFile("data.json", "utf8", (err, data) => {
    if (err) {
      return res.status(500).send("Internal Server Error");
    }
    const retrievedData = JSON.parse(data);
    retrievedData.push(postedData);
    fs.writeFile("data.json", JSON.stringify(retrievedData, null, 4), err => {
      if (err) {
        return res.status(500).send("cannot write data");
      }
      res.json({message: 'success'});
    });
  });
});

app.post("/writeStableBillData", (req, res) => {
  const postedData = req.body;

  fs.readFile("data1.json", "utf8", (err, data) => {
    if (err) {
      return res.status(500).send("Internal Server Error");
    }
    const retrievedData = JSON.parse(data);
    if(retrievedData.length < 100){
      retrievedData.push(postedData);
      fs.writeFile("data1.json", JSON.stringify(retrievedData, null, 4), err => {
        if (err) {
          return res.status(500).send("cannot write data");
        }
        res.json({message: 'success'});
      });
    }else{
      retrievedData.unshift()
      retrievedData.push(postedData);
      fs.writeFile("data1.json", JSON.stringify(retrievedData, null, 4), err => {
        if (err) {
          return res.status(500).send("cannot write data");
        }
        res.json({message: 'success'});
      });
    }
   
  });
});

app.get("/readBillData", (req, res) => {
  fs.readFile("data.json", "utf8", (err, data) => {
    if (err) {
      return res.status(500).send("cant read");
    }
    res.json(data);
  });
});

app.get("/readBillData1", (req, res) => {
  fs.readFile("data1.json", "utf8", (err, data) => {
    if (err) {
      return res.status(500).send("cant read");
    }
    res.json(data);
  });
});

app.get("/stores", (req, res) => {
  fs.readFile("Items.json", "utf8", (err, data) => {
    if (err) {
      return res.status(500).send("internal server error");
    }
    res.json(data);
  });
});

app.post("/submitEditedItemData", (req, res) => {
  let updatedData = req.body;
  let updatedArrayIndex = 0;
  let hasItemNameChanged = false;
  let hasBuyingPriceChanged = false;
  let hasSellingPriceChanged = false;
  let hasStockChanged = false;
  let hasUOMChanged = false;
  console.log(updatedData);
  fs.readFile("Items.json", "utf8", (err, data) => {
    if (err) {
      return res.status(500).send("internal server error");
    }
    let retrivedCrntData = JSON.parse(data);
    
    console.log(updatedData["id"]);
    retrivedCrntData.forEach((value, index) => {
      console.log(value.id);
      if (value.id == updatedData["id"]) {
        updatedArrayIndex = index;
      }
    });
    console.log(updatedArrayIndex);
   if(retrivedCrntData[updatedArrayIndex]["item Name"] != updatedData.itemName){
      hasItemNameChanged = true
   };
   if(Number(retrivedCrntData[updatedArrayIndex]["buying price"]) != Number(updatedData.buyingPrice)){
      hasBuyingPriceChanged = true
   };

   if(Number(retrivedCrntData[updatedArrayIndex]["selling price"]) != Number(updatedData.sellingPrice)){
     hasSellingPriceChanged = true
   };

   if(Number(retrivedCrntData[updatedArrayIndex]["available stock"]) != Number(updatedData.availableStock)){
     hasStockChanged = true
   }
  if(retrivedCrntData[updatedArrayIndex]["UOM"] != updatedData.UOM){
    hasUOMChanged = true
  }
    retrivedCrntData[updatedArrayIndex]["item Name"] = updatedData.itemName;
    retrivedCrntData[updatedArrayIndex]["buying price"] =
      updatedData.buyingPrice;
    retrivedCrntData[updatedArrayIndex]["selling price"] =
      updatedData.sellingPrice;
    retrivedCrntData[updatedArrayIndex]["available stock"] =
      updatedData.availableStock;
    retrivedCrntData[updatedArrayIndex]["UOM"] = updatedData.UOM;

    console.log(retrivedCrntData);
    fs.writeFile(
      "Items.json",
      JSON.stringify(retrivedCrntData, null, 3),
      err => {
        if (err) {
          return res.status(500).send("Internal Server Error");
        }
        if(hasStockChanged){
       fs.readFile('staticStore.json','utf8',(err,data)=>{
        if(err){
          return res.status(500).send('Internal Server Array')
        }
        let prevStaticStore = JSON.parse(data)
        prevStaticStore[updatedArrayIndex]['available stock'] = updatedData.availableStock
      
        fs.writeFile('staticStore.json',JSON.stringify(prevStaticStore,null,3),(err)=>{
            if(err){
                res.status(500).send('Internal Server Error from updating the static store')
            }
            res.json({message: "success"});
        })

      }) 
    }else{
      res.json({message: "success"});
    }
      });

   
  });
});

app.post("/submitNewItemData", (req, res) => {
  let submitedItemData = req.body;
  fs.readFile("Items.json", "utf8", (err, data) => {
    if (err) {
      return res.status(500).send("internal server error");
    }
    let availableData = JSON.parse(data);
    let newId = availableData.length + 1;

    let objectToPost = {};
    objectToPost["id"] = newId.toString().padStart(3, 0);
    objectToPost["item Name"] = submitedItemData["item Name"];
    objectToPost["available stock"] = Number(submitedItemData["available stock"]);
    objectToPost["UOM"] = submitedItemData["UOM"];
    objectToPost["buying price"] = Number(submitedItemData["buying price"]);
    objectToPost["selling price"] = Number(submitedItemData["selling price"]);

    availableData.push(objectToPost);
    fs.writeFile("Items.json", JSON.stringify(availableData, null, 3), err => {
      if (err) {
        return res.status(500).send("internal server error");
      }
      fs.readFile('staticStore.json','utf8',(err,data)=>{
        if(err){
          res.status(500).send('Internal Server Error')
        }
        let prevStaticData = JSON.parse(data)
        prevStaticData.push(objectToPost)
     
      fs.writeFile('staticStore.json',JSON.stringify(prevStaticData,null,3),(err)=>{
        if(err){
           return res.status(500).send('Internal Server Error from updating the static store')
        }
        fs.readFile('itemSalesRevenueProfits.json','utf8',(err,data)=>{
          if(err){
           return res.status(500).send('Internal Server Error')
        }
        res.json({message: "success"});
       /* let profitData = JSON.parse(data)
        let profitObjToPush = {}
        profitObjToPush['id'] = objectToPost["id"]
        profitObjToPush['item Name'] = submitedItemData["item Name"];
        profitObjToPush['UOM'] = submitedItemData["UOM"];
        profitObjToPush['totalSales'] = 0
        profitObjToPush['totalRevenue'] = 0
        profitObjToPush['totalCost'] = 0
        profitData.push(profitObjToPush)
        fs.writeFile('itemSalesRevenueProfits.json',JSON.stringify(profitData,null,3),(err)=>{
          if(err){
            return res.status(500).send('Internal Server Error')
         }
         
        })*/
        })
    })
  })
    });
  });
});

app.post('/updateStocks',(req,res)=>{
    const confirmedBill = req.body
    fs.readFile('Items.json','utf8',(err,data)=>{
        if(err){
           return res.status(500).send('Internal Server Error')
        }
        const myCurrntStocks = JSON.parse(data)
        confirmedBill['rows'].forEach((value,index)=>{
            const currentQuantity = Number(value['quantity'])
            const currntId = value['id'].toString()
            const crntValueIndex = myCurrntStocks.findIndex((value)=>value['id']== currntId)
            myCurrntStocks[crntValueIndex]['available stock'] = Number(myCurrntStocks[crntValueIndex]['available stock']) - currentQuantity
        })
        fs.writeFile('Items.json',JSON.stringify(myCurrntStocks,null,3),(err)=>{
            if(err){
                return res.status(500).send('Internal Server Error')
            }
            res.json({message:"success"})
        })
    })
})

app.get('/readStaticStore',(req,res)=>{
 
        fs.readFile('staticStore.json','utf8',(err,data)=>{
            if(err){
               return res.status(500).send('Internal Server Error')
            }
            const staticStoreData = JSON.parse(data)
             res.json(staticStoreData)
        })
    
})

app.post('/deleteItem',(req,res)=>{
  let deletedItemBody = req.body
  fs.readFile('Items.json','utf8',(err,data)=>{
    if(err){
     return res.status(500).send('Internal Server error')
    }
    let crntStockData = JSON.parse(data)
    const updatedItems = crntStockData.filter((value,i)=>value['id'] != deletedItemBody['id'])
    fs.readFile('staticStore.json','utf8',(err,data)=>{
      if(err){
        return res.status(500).send('Internal Server Error')
      }
      let staticStoreData = JSON.parse(data)
      const updatedStaticStore = staticStoreData.filter((value,i)=>value['id'] != deletedItemBody['id'])
      fs.writeFile('Items.json',JSON.stringify(updatedItems,null,3),(err)=>{
        if(err){
           return res.status(500).send('Internal Server Error')
        }
        fs.writeFile('staticStore.json',JSON.stringify(updatedStaticStore,null,3),(err)=>{
          if(err){
           return res.status(500).send('Internal Server Error')
          }
          res.json({message:"success"})
        }) 
      })
    })
  })
})

app.post('/updateSalesRevProf',(req,res)=>{
   let thisBillSalseRevProf = req.body
   fs.readFile('itemSalesRevenueProfits.json','utf8',(err,data)=>{
    if(err){
      return res.status(500).send('Internal Server Error')
     }
     let crntSalesRevProfData = JSON.parse(data)

     thisBillSalseRevProf.forEach((value,ind)=>{
      let thisId = value['id']
      let theObjGoingToUpdate = crntSalesRevProfData.findIndex((val,i)=>val['id'] == thisId)
     
      crntSalesRevProfData[theObjGoingToUpdate]['totalSales'] += Number(value['quantity'])
      crntSalesRevProfData[theObjGoingToUpdate]['totalRevenue'] += Number(value['total'].substring(3,value['total'].length))
      crntSalesRevProfData[theObjGoingToUpdate]['totalCost'] += Number(value['totalCost'])
    
       })
  fs.writeFile('itemSalesRevenueProfits.json',JSON.stringify(crntSalesRevProfData,null,3),(err)=>{
    if(err){
      return res.status(500).send('Internal Server Error')
     }
     res.json({message:"success"})
   })
   })
})


app.get('/profitsAndSales/:id/:sDate/:eDate',(req,res)=>{
  let requestingId = req.params.id
  fs.readFile('data.json','utf8',(err,data)=>{
    if(err){
      return res.status(500).send('Internal Server Error')
     }
     console.log(req.params.sDate)
     let allBilldata = []
     if(req.params.sDate == 0  && req.params.eDate == 0){
      allBilldata = JSON.parse(data)
     } else if(req.params.sDate == 0 && req.params.eDate != 0){
      if(JSON.parse(data).length > 0){
        allBilldata = JSON.parse(data).filter((val,i)=>Number(val['refId'].split(' ').join('').substring(0,8)) <= Number(req.params.eDate.split('-').join('')))
      }
     } else if(req.params.sDate != 0 && req.params.eDate == 0){
      if(JSON.parse(data).length > 0){
        allBilldata = JSON.parse(data).filter((val,i)=>Number(val['refId'].split(' ').join('').substring(0,8)) >= Number(req.params.sDate.split('-').join('')))
      }
    }else if(req.params.sDate  != 0 && req.params.eDate != 0){

      if(JSON.parse(data).length > 0){
        let firstStep =  JSON.parse(data).filter((val,i)=>Number(val['refId'].split(' ').join('').substring(0,8)) <= Number(req.params.eDate.split('-').join('')))
        allBilldata = firstStep.filter((val,i)=>Number(val['refId'].split(' ').join('').substring(0,8)) >= Number(req.params.sDate.split('-').join('')))
      }
    }
      
    
     let totalProfitForthisId = 0
     let totalSalseForthisId = 0
     let totalRevenueForThisId = 0
     allBilldata.forEach((value,index)=>{
      value['rows'].forEach((val,ind)=>{
        if(val['id'] == requestingId){
        totalSalseForthisId += Number(val['quantity'])
        totalRevenueForThisId += Number(val['total'].substring(3,val['total'].length))
        totalProfitForthisId += (Number(val['total'].substring(3,val['total'].length))-Number(val['totalCost']))
      }
      })
     })
     res.json({totalSalseForthisId:totalSalseForthisId,
               totalRevenueForThisId:totalRevenueForThisId.toFixed(2),
               totalProfitForthisId:totalProfitForthisId.toFixed(2) })
  })
})

app.listen(5000, () => {
  console.log("server is up and running...");
});
