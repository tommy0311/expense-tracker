## **Expense-tracker**

此專案提供使用者新增、修改與刪除「支出紀錄」

## 功能列表

1.  註冊帳號  
    \- 註冊之後，可以登入/登出  
    \- 只有登入狀態的使用者可以看到 app 內容，否則一律被導向登入頁  
2.  在首頁一次瀏覽所有支出的清單  
    \- 使用者只能看到自己建立的資料  
3.  在首頁看到所有支出清單的總金額  
4.  新增一筆支出  
5.  編輯支出的屬性 (一次只能編輯一筆)  
6.  刪除任何一筆支出 (一次只能刪除一筆)  
7.  根據「**類別**」篩選支出；總金額的計算只會包括被篩選出來的支出總和

### 安裝

1.開啟終端機(Terminal)cd 到存放專案本機位置並執行:

```plaintext
git clone https://github.com/tommy0311/expense-tracker.git
```

2.初始

```plaintext
cd expense-tracker //切至專案資料夾
```

```plaintext
npm install  //安裝套件
```

3.參考 .env.example，在根目錄建立 .env

4.載入種子資料

```plaintext
npm run seed
```

5.開啟程式

```plaintext
npm run start
```

終端顯示 `db is connected!` 即啟動完成，請至[http://localhost:3000](http://localhost:3000)開始使用程式

## Test Data

## Screen Photo

*   首頁

![expense-tracker](https://user-images.githubusercontent.com/12669644/174266640-1dc18cce-c41b-4125-9a28-90584444657d.png)

*   修改

![edit](https://user-images.githubusercontent.com/12669644/174267495-deb08ee6-fa27-4ab7-8fb4-937e614cedaa.png)

*   登入

![login](https://user-images.githubusercontent.com/12669644/174267521-edf0fa96-36ab-475f-87d2-fc7c2bfd8d66.png)

*   註冊

![register](https://user-images.githubusercontent.com/12669644/174267566-5cbf553c-a46d-474c-859a-3e164238f85b.png)

## 使用工具

*   [Express](https://www.npmjs.com/package/express) - 應用程式架構
*   [Express-Handlebars](https://www.npmjs.com/package/express-handlebars) - 模板引擎
*   [Mongoose](https://www.npmjs.com/package/mongoose) - Mongoose is a MongoDB object modeling tool
