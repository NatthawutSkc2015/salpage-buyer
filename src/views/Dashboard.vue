<script setup>
import { onMounted } from 'vue'
onMounted(() => {
  var scripts = [
    "/src/assets/js/chart.min.js",
  ];

  
  setTimeout(function(){
    scripts.forEach(script => {
        let tag = document.createElement("script");
        tag.setAttribute("src", script);
        document.body.appendChild(tag);
    });     
  },1000)

})
</script>
<template>
    <!-- Breadcrumb -->
    <section class="breadcrumb">
        <h1>Dashboard</h1>
        <ul>
            <li><a href="#">Login</a></li>
            <li class="divider la la-arrow-right"></li>
            <li>Dashboard</li>
        </ul>
    </section>

    <div class="grid lg:grid-cols-2 gap-5">

        <!-- Summaries -->
        <div class="grid sm:grid-cols-3 gap-5">
            <div
                class="card px-4 py-8 flex justify-center items-center text-center lg:transform hover:scale-110 hover:shadow-lg transition-transform duration-200">
                <div>
                    <span class="text-primary text-5xl leading-none la la-sun"></span>
                    <p class="mt-2">Published Posts</p>
                    <div class="text-primary mt-5 text-3xl leading-none">18</div>
                </div>
            </div>
            <div
                class="card px-4 py-8 flex justify-center items-center text-center lg:transform hover:scale-110 hover:shadow-lg transition-transform duration-200">
                <div>
                    <span class="text-primary text-5xl leading-none la la-cloud"></span>
                    <p class="mt-2">Pending Posts</p>
                    <div class="text-primary mt-5 text-3xl leading-none">16</div>
                </div>
            </div>
            <div
                class="card px-4 py-8 flex justify-center items-center text-center lg:transform hover:scale-110 hover:shadow-lg transition-transform duration-200">
                <div>
                    <span class="text-primary text-5xl leading-none la la-layer-group"></span>
                    <p class="mt-2">Categories</p>
                    <div class="text-primary mt-5 text-3xl leading-none">9</div>
                </div>
            </div>
        </div>
        
    </div>
</template>
