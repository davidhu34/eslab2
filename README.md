# ESLab Lab 2
**ES Lab - Lab 2 Group 9**
##使用說明
```bash
	$ git clone https://github.com/davidhu34/eslab2
	$ npm install
	$ npm start
	
	# run tessel sensor program
	# need to connect to WiFi first
	
	$ cd tessel
	$ npm install
	$ tessel run main.js
	
	# run tessel controller program
	$ tessel run servo.js
```

網頁數據呈現：[http://140.112.174.137:4007/]()
##模組
###main.js
Ports

* A Accelerometer
* B Climate
* C GPS
* D Ambient

###servo.js
Ports

* A RFID
* C Servo

##作業說明

### 傳感器模組
顯示資料圖表的網頁伺服器使用和Lab1相同的架構(express + nedb + react)，並選擇了accelerometer, climate, ambient, gps四個模組。

網頁部分利用React和Chart.js 呈現資料。我們將不同類型資料以不同圖表呈現：加速度器的三圍維資料以三角形的雷達圖，表示一個時間點下的讀數，並且每秒刷新一筆資料來顯現一段時間內三維讀數的比較動態。至於環境和氣候讀數則用比較單純的”讀數-資料”關係圖。GPS則是將經緯資料的點狀分布圖按時間連接，已獲得收集資料的路徑圖。
Tessel的收集到的資料透過wifi傳送http給同一伺服器。傳送資料格式為含有多個陣列(多筆資料)的JSON，在經過伺服器的櫥裡儲存置資料庫並提供前端資料。

Tessel本身則是利用setInterval的方式(GPS除外)，每隔一段時間蒐集一次資料，並在每集滿十筆數據後利用post的方式傳到後端server進行儲存。使用setInterval的原因是因為tessel本身的socket數有限，因此若每筆數據皆直接傳送，容易造成傳輸失敗。

###執行器模組

執行器模組採用的是伺服模組，並配合RFID模組進行控制。控制原理是利用RFID模組進行感測，當偵測到不同卡片時便會toggle伺服馬達到達不同位置。



這次實驗和實驗一最大的不同便是在版子上進行開發，因此有些即時性及與硬體相關的操作和過去在電腦上開發有所不同，像是連線的資源較少、處理能力的上限，這些都是進行嵌入式系統開發時需要特別注意的地方。


## 作業目標

- [x] 傳感器模組x4 ( accelerometer, climate, ambient, gps )
- [x] 執行器模組 (servo)
- [x] 網頁呈現 

--

By 2015 NTUEE ES Lab G9 林秉民、胡明衛

