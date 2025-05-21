<template>
   <div class="container">
      <div class="card card-box1"> <video class="card-video" src="@/assets/video/lr1.mp4" autoplay loop muted> </video>
      </div>
      <div class="card card-box2"> <video class="card-video" src="@/assets/video/lr2.mp4" autoplay loop muted> </video>
      </div>
      <div class="card card-box3"> <video class="card-video" src="@/assets/video/lr3.mp4" autoplay loop muted> </video>
      </div>
      <div class="card card-box4"> <video class="card-video" src="@/assets/video/lr4.mp4" autoplay loop muted> </video>
      </div>
   </div>
</template>
<style scoped>
.container {
   display: flex;
   justify-content: center;
   align-items: center;
   height: 100vh;
   background-color: #eeeae2;
}

.card {
   width: 200px;
   height: 200px;
   padding: 20px 20px 60px;
   background-color: #dfe1de;
   box-shadow: 2px 2px 4px 1px #00000036;
}

.card-box1 {
   position: absolute;
   top: 10px;
   left: 10px;
   transform: rotate(-12deg);
}

.card-box2 {
   position: absolute;
   top: 60px;
   right: 30px;
   transform: rotate(2deg);

}

.card-box3 {
   position: absolute;
   bottom: 30px;
   left: 50px;
   transform: rotate(-3deg);
}

.card-box4 {
   position: absolute;
   bottom: 30px;
   right: 20px;
   transform: rotate(6deg);
}

.card-video {
   width: 100%;
   height: 100%;
   object-fit: cover;
}
</style>