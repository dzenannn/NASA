<template>
  <div class="welcomeImg">
    <img :src="welcomeData.hdurl" />
  </div>
  <div class="title">{{ welcomeData.title }}</div>
  <div class="text">{{ welcomeData.explanation }}</div>
</template>

<script>
export default {
  name: 'WelcomeScreen',
  created() {
    const apiKey = process.env.VUE_APP_API_KEY;
    fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`)
      .then((res) => res.json())
      .then((data) => {
        this.welcomeData = {
          hdurl: data.hdurl,
          title: data.title,
          explanation: data.explanation,
        };
      })
      .catch((error) => console.error('Greška:', error));
  },
  data() {
    return {
      welcomeData: {
        hdurl: '',
        title: '',
        explanation: '',
      },
    };
  },
};
</script>

<style scoped>
.welcomeImg {
  width: 100vw;
  height: 100vh;
  position: relative;
}

.welcomeImg > img {
  width: 100vw;
  height: 100vh;
}

.title {
  font-size: 32px;
  position: absolute;
  top: 20px;
  left: 15%;
  font-weight: 500;
  color: #fff;
}

.text {
  font-size: 20px;
  position: absolute;
  top: 60px;
  left: 15%;
  font-weight: 400;
  color: #fff;
  width: 65vw;

  letter-spacing: 2px;
}
</style>
