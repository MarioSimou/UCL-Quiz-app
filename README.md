# UCL-Quiz-app

**What is UCL Quiz app?**

The UCL Quiz app is a location-based smartphone/tablet app, which employs the user location and prompts him/her on a quiz test. The questions, which have a historical related content,  are based on the user’s proximity with respect to the buildings of UCL.

**Which devices does the mobile app support?**

The UCL quiz app can be used on any Android device that supports an android model above 2.3 (API Level 10) (Gingerbread), and is implemented based on the Cordova Phonegap build1. As a rule of thumb, Android versions become unsupported by Cordova as they dip below 5% of the Android users. A better intuition about the model’s compatibility can be taken by the following Google’s android device dashboard: [here](https://developer.android.com/about/dashboards/)

**How it works?**

The app automatically loads a POI (point of interest) dataset of UCL’s buildings and identifies the user location using a geolocation service. Based on the user location and its proximity with respect to the POI dataset, historical questions related to UCL are asked, which the user needs to answer. With that way, a quiz challenge starts and the user is provoked to successfully respond in most questions. Different functionalities are also supported that are described on the Mobile App Features section.

**Who can use it?**

The web application can be used by anyone of any age. The user does not need to have any experience in order to be able to use the application.

**How we can ensure the security of your location data?**

The normal execution of the app is succeeded using the location of the user, and therefore the user’s location plays an important role for the UCL Quiz app. Knowing that location consists part of user’s private information, the user location is stored in a well-secured database that only the app administrator and app developer have access. The initial aim of the app was to inform and educate the users about the UCL history, enable their interaction with the facilities of the campus, and this aim has not changed.

**How to install UCL Quiz mobile app?**

The app can be downloaded from this [link](https://build.phonegap.com/apps/3145369/builds) using two different ways:
Download the APK (Android application Package) file and transfer it to you mobile device using a usb cable. Before you start the installation, you need to check the unknown sources2 options on your mobile, which can be found on the security settings tab. 
This needs to be done as the mobile app is an unknown source app for your mobile device, and the user’s privileges are needed to accept the installation. Then, the UCL Quiz app can be normally installed on your device and an app icon is created on your home screen.
The application can be downloaded using a QR app reader [link](https://play.google.com/store/search?q=qr%20reader&hl=en_GB). Install one of the recommended QR apps, open it, and place the camera of your device over the QR code that is given for the UCL Quiz app. Then, download the app and install it. Similarly as step 1, the unknown sources option needs to be checked in order to permit the installation. After the installation, an app icon is created on your home screen.



-----------------------------------------------------------------------------------------------------------------------------

**Mobile App Features**

Besides the main purpose of the mobile app to inform a user and prompts him/her on a quiz challenge, the app’s deployment was attained so that a user can interact with the facilities of the campus of UCL. A variety of commands and operations are supported, which are described in that section.
The commands that are supported are categorised in two different categories, the menu-based and the map-based commands.

**1. Menu-based Options**
A menu bar is available that the user might use and changes some of the functionalities of the app (Fig. 1). The menu bar options are described below:

![1](https://user-images.githubusercontent.com/32243459/39732432-3485a39c-5265-11e8-8577-420d82c4204f.png)

Fig. 1

*```Basemaps:```*

The app supports the Street, Imagery, and Topo basemaps that are provided by Esri ArcGIS. Both, the user location and the buildings of UCL are formulated in a such way that changes on the map layers do not interrupt the normal operation of the datasets. The Street map layer is by default loaded when the mobile app launches. The layer that is activated, is shown with a different font weight (Fig. 2).

![2](https://user-images.githubusercontent.com/32243459/39713944-7090f098-5220-11e8-96c2-0b91215a0260.png)

Fig.2

*```Layers:```*

The buildings of UCL are activated or deactivated with that option (Fig. 3). This option can be extended to accommodate more datasets and functionalities. 

![3](https://user-images.githubusercontent.com/32243459/39713983-8e90c73a-5220-11e8-99be-a120407b6cd3.png)

Fig. 3

*```Quiz Time:```*

The app supports two different types of quiz tests, the Time and Proximity Quiz (Fig. 4), which are based on different implementations. These options are responsible to start a quiz challenge or even to stop. The content of the label of each option determines whether the quiz is activated.  

![4](https://user-images.githubusercontent.com/32243459/39714023-aaca1bfe-5220-11e8-9138-6cbccd135b33.png)

Fig. 4

> *Time Quiz:*
A question over a constant time interval is shown to the user that needs to answer. Therefore, for constant time intervals, the location of the user is compared with the location of all the buildings of UCL, and a question is constructed related to the closest building. When the difference between the latest asked question and the upcoming question exceeds the specified value of the interval, the question pops up on the user. The user is able to choose different time intervals picking a different option from the Quiz Level option. 

> *Proximity Quiz:*
The location of the user and the buildings of UCL are compared. Based on a specified Quiz Level option, the building that has the closest distance, its distance is compared with a threshold value, and if that distance is less than the threshold value, a question pops up related to the closest building. The process is repeatedly executed every thirty seconds. The proximity quiz is the default option that is loaded when a user launches the app.

*```Time vs Proximity Quiz```*

Both are location based options, meaning that the questions that are asked are constructed based on the closest building with respect to the user location. However, their implementation deviates with respect on when the question is asked. The time option performs questions based on a temporal criterion (specifying a temporal value that defines the difference between the latest asked and the upcoming question), while the proximity option pops up question according to a distance criterion (if the distance of the user is less than a specified threshold value). 

*```Quiz Level:```*
Three different options are available for the time and proximity options that each one depends on its implementation details. A label of High, Medium and Easy is given for each option that represents the level of difficulty of the quiz (Fig. 5). The high, medium and easy option for the time quiz corresponds on a 60, 120 and 300 interval counted in seconds, respectively. For example, if a user picks the option of high difficulty, a question will pop up to him/her every one minute.
On the other hand, the proximity quiz is equipped with distance-related options. In that case, a high, medium and easy difficulty option corresponds to a 50, 100 and 500 metres distance, respectively. In conjunction with the geolocation service that operates every thirty seconds, a question is shown to the user if his/her distance with respect to a UCL building is less than the specified threshold distance. For example, if the user chooses the option of high difficulty, then a question is only displayed on the user if his/her distance is less than 50 metres from the closest UCL building. The process is continuously executed every thirty seconds.
The selected option is shown with different font weight.

![5](https://user-images.githubusercontent.com/32243459/39714104-f29dafe0-5220-11e8-9fed-ac0ea0a51399.png)

Fig. 5

```Help```

Pressing this command, a new site opens with the corresponded documentation of the app (Fig. 6).

![doc](https://user-images.githubusercontent.com/32243459/39732200-e2021138-5263-11e8-9397-bceceb6fa229.png)

Fig. 6The documentation of the quiz app can be accessed through the Help option of the menu bar.

**2. Map-based Options**

The app is also equipped with more commands that operate over the UCL POI dataset. These commands are described below:

![6](https://user-images.githubusercontent.com/32243459/39714162-15bccc04-5221-11e8-8722-93e21c6906b2.png)  
>Search Command

A building might be searched based on its corresponded question using this command. A marker is used to represent the building that is found.

![7](https://user-images.githubusercontent.com/32243459/39714472-166610c4-5222-11e8-9ba2-1cc70becd522.png)
> Clean Command

Markers that may remain from a search process or the geolocation are cleaned from the map.

![8](https://user-images.githubusercontent.com/32243459/39714506-36b6acee-5222-11e8-863d-d9efd0a300d8.png)

> Full Zoom Command

The map zoom changes so that a full display of the data is given.

**3. More Capabilities**

When a user clicks on a POI, a pop up that contains information related to the clicked point is shown. The pop up contains information such as the department name, the question that is asked for that point, its correct answer, and its geographical coordinates [Fig 7 (A)].

Hovering over the map and the POI dataset, information related to their content is shown at the bottom-left corner of the map [Fig. 7 (B)]. This information is similar with what is given in the pop up window.

![7a](https://user-images.githubusercontent.com/32243459/39714629-9642614e-5222-11e8-94ec-cf9eca64cade.png)

Fig. 7 (A)

![7b](https://user-images.githubusercontent.com/32243459/39714666-b4f1fb54-5222-11e8-8a4f-911d60093a59.png)

Fig. 7 (B)

In order to make the map display more visually attractive, the buildings of UCL are concentrated in small clusters (Fig. 8). Each building that may fell within the buffer zone of a cluster, is added on that cluster and removed from the display. As a zoom level of the map changes, and the display reaches to its maximum zoom level, the cluster dissolves.

![9](https://user-images.githubusercontent.com/32243459/39714689-c753bf62-5222-11e8-8d76-caf5dcdad0d7.png)

Fig. 8: 

Lastly, the map is equipped with a scale bar [(Fig. 9)], which uses metre or foot as the measurement unit. The scale bar is often important when a user wants to estimate a distance from his/her location.  

![10](https://user-images.githubusercontent.com/32243459/39714734-e3e25206-5222-11e8-8a8a-b15eaae3469f.png)

Fig. 9 

---------------------------------------------------------------------------------------------------------------------------

**Sources:**

[Markercluster plugin](https://github.com/Leaflet/Leaflet.markercluster)

[Awesome Markers Plugin](https://github.com/lvoogdt/Leaflet.awesome-markers)

[Bootstrap](https://getbootstrap.com/docs/3.3/getting-started/)

[Leaflet](https://leafletjs.com/)

[Leaflet Providers](https://github.com/leaflet-extras/leaflet-providers)

[Leaflet Search](https://github.com/stefanocudini/leaflet-search)
