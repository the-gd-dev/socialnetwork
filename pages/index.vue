<template>
  <div class="container m-auto pb-12">
    <div class="flex justify-center lg:space-x-20">
      <!-- Hero Image -->
      <div class="hidden lg:flex lg:w-1/3 py-12">
        <img
          src="http://socialnetwork.io/india-map.png"
          alt=""
          srcset=""
          class="m-auto"
        />
      </div>
      <!-- Forms -->
      <div class="w-full lg:w-1/3 bg-gray-900 rounded-3xl">
        <div
          v-if="!signup"
          class="flex h-full w-full items-start"
          :class="loggingIn ? 'animate-pulse' : ''"
        >
          <div class="w-full m-auto p-8">
            <div class="flex flex-col">
              <div class="flex mb-10">
                <span class="text-3xl text-white"
                  >Explore India at socialnetwork.</span
                >
              </div>
              <div class="mb-4">
                <input
                  v-model="signinCredentials.email"
                  type="text"
                  class="bg-white text-lg h-12 px-2 w-full rounded-md"
                  placeholder="Email or Phone number"
                />
                <div v-if="errors.email" class="invalid-field">
                  {{ errors.email[0] }}
                </div>
              </div>
              <div class="mb-4">
                <input
                  v-model="signinCredentials.password"
                  type="password"
                  class="bg-white text-lg h-12 px-2 w-full rounded-md"
                  placeholder="Password"
                />
                <div v-if="errors.password" class="invalid-field">
                  {{ errors.password[0] }}
                </div>
              </div>
              <div class="">
                <button
                  :disabled="loggingIn"
                  @click="signIn"
                  type="text"
                  :class="
                    loggingIn
                      ? 'bg-gray-800 cursor-not-allowed'
                      : 'bg-gray-700 hover:bg-gray-800'
                  "
                  class="text-white text-lg h-12 w-full rounded-md"
                >
                  Login
                </button>
              </div>
              <div
                class="flex flex-col h-32 justify-center items-center text-white"
              >
                <span class="text-xl">
                  I am not registered to socialnetwork.</span
                >
                <button
                  @click="signup = true"
                  class="bg-gray-700 hover:bg-gray-800 text-white text-lg h-10 px-4 mt-2 rounded-md"
                >
                  Sign Me Up
                </button>
              </div>
            </div>
          </div>
          <!-- <div class="w-full lg:w-1/2  p-12"></div> -->
        </div>
        <div
          v-if="signup"
          class="flex h-full w-full items-start"
          :class="regsitering ? 'animate-pulse' : ''"
        >
          <div class="w-full m-auto p-8">
            <div class="flex flex-col">
              <div class="flex mb-10 justify-between items-center">
                <span class="text-3xl text-white">Let's Explore.</span>
                <span class="text-xl text-gray-100">Step 1</span>
              </div>
              <div class="mb-4">
                <input
                  type="text"
                  v-model="registerDetails.name"
                  class="bg-white text-lg h-12 px-2 w-full rounded-md"
                  placeholder="Name  (eg. Sameer Mohan Bhagwat) "
                />
                <div v-if="errors.name" class="invalid-field">
                  {{ errors.name[0] }}
                </div>
              </div>
              <div class="mb-4">
                <input
                  v-model="registerDetails.email"
                  type="email"
                  class="bg-white text-lg h-12 px-2 w-full rounded-md"
                  placeholder="Email Address"
                />
                <div v-if="errors.email" class="invalid-field">
                  {{ errors.email[0] }}
                </div>
              </div>
              <div class="mb-4">
                <input
                  v-model="registerDetails.phone_number"
                  type="text"
                  class="bg-white text-lg h-12 px-2 w-full rounded-md"
                  placeholder="Phone number"
                  maxlength="10"
                />
                <div v-if="errors.phone_number" class="invalid-field">
                  {{ errors.phone_number[0] }}
                </div>
              </div>
              <div class="mb-4">
                <input
                  v-model="registerDetails.password"
                  type="password"
                  class="bg-white text-lg h-12 px-2 w-full rounded-md"
                  placeholder="Password"
                />
                <div v-if="errors.password" class="invalid-field">
                  {{ errors.password[0] }}
                </div>
              </div>
              <div class="mb-4">
                <input
                  v-model="registerDetails.password_confirmation"
                  type="password"
                  class="bg-white text-lg h-12 px-2 w-full rounded-md"
                  placeholder="Confirm Password"
                />
              </div>
              <div class="flex">
                <button
                  :disabled="regsitering"
                  @click="registerHandle"
                  :class="
                    regsitering
                      ? 'bg-gray-800 cursor-not-allowed'
                      : 'bg-gray-700 hover:bg-gray-800'
                  "
                  class="text-white text-lg h-12 w-full rounded-md"
                >
                  Register Now
                </button>
              </div>
              <div
                class="flex flex-col h-32 justify-center items-center text-white"
              >
                <span class="text-xl">
                  I am already registered to socialnetwork.</span
                >
                <button
                  @click="signup = false"
                  class="bg-gray-700 hover:bg-gray-800 text-white text-lg h-10 px-4 mt-2 rounded-md"
                >
                  Sign Me In
                </button>
              </div>
            </div>
          </div>
          <!-- <div class="w-full lg:w-1/2  p-12"></div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "IndexPage",
  data() {
    return {
      signinCredentials: {
        email: "",
        password: "",
      },
      registerDetails: {
        name: "",
        first_name: "",
        middle_name: "",
        last_name: "",
        email: "",
        phone_number: "",
        password: "",
        password_confirmation: "",
      },
      errors: {},
      signup: false,
      loggingIn: false,
      regsitering: false,
    };
  },
  methods: {
    async registerHandle() {
      this.regsitering = true;
      try {
        let name = this.registerDetails.name.split(" ");
        this.registerDetails.first_name = name[0] || "";
        this.registerDetails.middle_name = name[2] && name[1] ? name[1] : "";
        this.registerDetails.last_name = name[2] || name[1] || "";
        await this.$axios.post("register", { ...this.registerDetails });
      } catch (error) {
        this.errors = [];
        if (error.response.status === 422) {
          this.errors = error.response.data;
        }
      }
      this.regsitering = false;
    },
    signIn() {
      this.loggingIn = true;
      let store = this.$store;
      store
        .dispatch("auth/login", { ...this.signinCredentials })
        .then((response) => {
          store.dispatch("auth/fetch").then((data) => {
            this.$router.push("/home");
          });
        })
        .catch((response) => {
          this.errors = [];
          if (response && response.status === 422) {
            this.errors = response.data;
          }
        });

      this.loggingIn = false;
    },
  },
};
</script>
<style scoped>
.invalid-field {
  color: #d1d1d1;
  font-size: 18px;
}
</style>
