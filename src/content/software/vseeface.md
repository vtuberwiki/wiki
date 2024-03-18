---
title: VSeeFace
pubDate: 2023-10-24
description: VSeeFace is a free, highly configurable face and hand tracking VRM and VSFAvatar avatar puppeteering program for virtual youtubers with a focus on robust tracking and high image quality.
author: 0xyami
image: https://www.vseeface.icu/assets/img/VSeeFaceScreenshot.png
main_image: https://www.vseeface.icu/assets/img/VSeeFaceScreenshot.png
---

VSeeFace offers functionality similar to Luppet, 3tene, Wakaru and similar programs. VSeeFace runs on Windows 8 and above (64 bit only). Perfect sync is supported through iFacialMocap/FaceMotion3D/VTube Studio/MeowFace. VSeeFace can send, receive and combine tracking data using the VMC protocol, which also allows support for tracking through Virtual Motion Capture, Tracking World, Waidayo and more. Capturing with native transparency is supported through OBS’s game capture, Spout2 and a virtual camera.


Face tracking, including eye gaze, blink, eyebrow and mouth tracking, is done through a regular webcam. For the optional hand tracking, a Leap Motion device is required. You can see a comparison of the face tracking performance compared to other popular vtuber applications here. In this comparison, VSeeFace is still listed under its former name OpenSeeFaceDemo.


## VSFAvatar



Starting with VSeeFace v1.13.36, a new Unity asset bundle and VRM based avatar format called VSFAvatar is supported by VSeeFace. This format allows various Unity functionality such as custom animations, shaders and various other components like dynamic bones, constraints and even window captures to be added to VRM models. This is done by re-importing the VRM into Unity and adding and changing various things. To learn more about it, you can watch this tutorial by @Virtual_Deat, who worked hard to bring this new feature about!

<iframe width="560" height="315" src="https://www.youtube.com/embed/jhQ8DF87I5I?si=b0fWH_oFHl1yoVmY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

A README file with various important information is included in the SDK, but you can also read it [here](https://github.com/emilianavt/VSeeFaceSDK/blob/master/README.md). The README file also contains informations on compatible versions for Unity and UniVRM as well as supported versions of other components, so make sure to refer to it if you need any of this information.
