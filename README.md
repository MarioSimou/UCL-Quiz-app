# UCL-Quiz-app


**What is UCL Quiz app?**

The UCL Quiz app is a location-based smartphone/tablet app, which employs the user location and prompts him/her on a quiz test. The questions, which have a historical related content,  are based on the user’s proximity with respect to the buildings of UCL.

**Which devices does the mobile app support?**

The UCL quiz app can be used on any Android device that supports an android model above 2.3 (API Level 10) (Gingerbread), and is implemented based on the Cordova Phonegap build1. As a rule of thumb, Android versions become unsupported by Cordova as they dip below 5% of the Android users. A better intuition about the model’s compatibility can be taken by the following Google’s android device dashboard: https://developer.android.com/about/dashboards/ 

**How it works?**

The app automatically loads a POI (point of interest) dataset of UCL’s buildings and identifies the user location using a geolocation service. Based on the user location and its proximity with respect to the POI dataset, historical questions related to UCL are asked, which the user needs to answer. With that way, a quiz challenge starts and the user is provoked to successfully respond in most questions. Different functionalities are also supported that are described on the Mobile App Features section.

**Who can use it?**

The web application can be used by anyone of any age. The user does not need to have any experience in order to be able to use the application.

**How we can ensure the security of your location data?**

The normal execution of the app is succeeded using the location of the user, and therefore the user’s location plays an important role for the UCL Quiz app. Knowing that location consists part of user’s private information, the user location is stored in a well-secured database that only the app administrator and app developer have access. The initial aim of the app was to inform and educate the users about the UCL history, enable their interaction with the facilities of the campus, and this aim has not changed.

**How to install UCL Quiz mobile app?**

The app can be downloaded from this link (https://build.phonegap.com/apps/3145369/builds) using two different ways:
Download the APK (Android application Package) file and transfer it to you mobile device using a usb cable. Before you start the installation, you need to check the unknown sources2 options on your mobile, which can be found on the security settings tab (Fig. 1). 
This needs to be done as the mobile app is an unknown source app for your mobile device, and the user’s privileges are needed to accept the installation. Then, the UCL Quiz app can be normally installed on your device and an app icon is created on your home screen.
The application can be downloaded using a QR app reader (https://play.google.com/store/search?q=qr%20reader&hl=en_GB). Install one of the recommended QR apps, open it, and place the camera of your device over the QR code that is given for the UCL Quiz app. Then, download the app and install it. Similarly as step 1, the unknown sources option needs to be checked in order to permit the installation. After the installation, an app icon is created on your home screen.
