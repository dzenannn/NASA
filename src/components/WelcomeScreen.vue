<template>
  <div class="welcomeScreen">
    <div class="welcomeImg">
      <img :src="welcomeData.hdurl" />
    </div>
    <div class="title">{{ welcomeData.title }}</div>
    <div class="text">{{ welcomeData.explanation }}</div>
  </div>
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
.welcomeScreen {
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}

.welcomeImg {
  width: 100%;
  height: 100%;
  position: relative;
}

.welcomeImg > img {
  width: 100%;
  height: 100%;
}

.title {
  font-size: 32px;
  position: absolute;
  top: 50px;
  left: 15%;
  font-weight: 500;
  color: #fff;
}

.text {
  font-size: 20px;
  position: absolute;
  top: 90px;
  left: 15%;
  font-weight: 400;
  color: #fff;
  width: 65vw;

  letter-spacing: 2px;
}
</style>
