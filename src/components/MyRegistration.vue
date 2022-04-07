<template>
  <form class="form-signin" @submit.prevent="registration">
    <div class="form-signin-heading text-center">
      <h1 class="sign-title">Registration</h1>
      <img src="static/login-logo.png" alt=""/>
    </div>

    <div class="login-wrap">
      <p>Enter your personal details below</p>
      <input type="text" autofocus="" placeholder="Full Name" class="form-control" v-model="username">
      <input type="text" autofocus="" placeholder="Address" class="form-control" v-model="native">
      <input type="text" autofocus="" placeholder="Phone" class="form-control" v-model="phone">
      <input type="text" autofocus="" placeholder="Password" class="form-control" v-model="password">
      <input type="text" autofocus="" placeholder="age" class="form-control" v-model="age">
      <div class="radios">
        <label for="radio-01" class="label_radio col-lg-6 col-sm-6">
          <input type="radio" checked="" value="1" id="radio-01" name="sample-radio"> Male
        </label>
        <label for="radio-02" class="label_radio col-lg-6 col-sm-6">
          <input type="radio" value="1" id="radio-02" name="sample-radio"> Female
        </label>
      </div>

      <p> Enter your account details below</p>
      <input type="text" autofocus="" placeholder="User Name" class="form-control">
      <input type="password" placeholder="Password" class="form-control">
      <input type="password" placeholder="Re-type Password" class="form-control">
      <label class="checkbox">
        <input type="checkbox" value="agree this condition"> I agree to the Terms of Service and Privacy Policy
      </label>
      <button type="submit" class="btn btn-lg btn-login btn-block">
        <i class="fa fa-check"></i>
      </button>

      <div class="registration">
        Already Registered.
        <!--      <a href="login.html" class="">-->
        <!--        Login-->
        <!--      </a>-->
      </div>

    </div>

  </form>
</template>

<script>

export default {
  name: "MyRegistration",
  data() {
    return {
      username: '',
      phone: '',
      password:'',
      native: '',
      age: ''
    }
  },
  methods: {
    registration() {
      let _this = this;
      this.$http({
        method: 'post',
        url: '/user/registration',
        data: {
          username: _this.username,
          phoneNumber: _this.phone,
          native: _this.native,
          age: _this.age
        }
      });
    }
  }
}
</script>

<style scoped>

</style>