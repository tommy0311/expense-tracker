function clickCategoryBtn( categoryId ){
  if(categoryId > 0 && categoryId <=5 ) {
    const categoryName = [
      "全部", 
      "家居物業", 
      "交通出行",
      "休閒娛樂",
      "餐飲食品",
      "其他" ]

    document.getElementById("categoryBtn").innerText  = categoryName[categoryId];
    document.getElementById("categoryId").value  = categoryId;
  }
};

function getDate(){
  let today = new Date();
  document.getElementById("dateInput").value =
    today.getFullYear() + '-' +
    ('0' + (today.getMonth() + 1)).slice(-2) + '-' + 
    ('0' + today.getDate()).slice(-2);
};

window.onload = function() {
  getDate(); 
};

