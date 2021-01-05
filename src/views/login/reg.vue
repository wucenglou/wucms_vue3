<template>
  <div class="reg-container">
    <el-form
      ref="regForm"
      :model="regForm"
      :rules="regRules"
      autocomplete="on"
      class="reg-form"
    >
      <div class="title-container">
        <h3 class="title">WU CMS <small>注册</small></h3>
      </div>
      <el-form-item prop="username">
        <span class="svg-container">
          <i class="el-icon-user-solid"></i>
          <!-- <svg-icon icon-class="user" /> -->
        </span>
        <el-input
          ref="username"
          v-model="regForm.username"
          placeholder="你的昵称"
          name="username"
          type="text"
          autocomplete="on"
        />
      </el-form-item>

      <el-tooltip
        v-model="capsTooltip"
        content="已开启大写锁定"
        placement="right"
        manual
      >
        <el-form-item prop="password">
          <span class="svg-container">
            <i class="el-icon-key"></i>
            <!-- <svg-icon icon-class="password" /> -->
          </span>
          <el-input
            ref="password"
            v-model="regForm.password"
            :type="passwordType"
            @keyup="checkCapslock"
            @blur="capsTooltip = false"
            autocomple="on"
            placeholder="密码"
            name="password"
            tabindex="2"
          />

          <!-- <span class="show-pwd" @click="showPwd">
            <svg-icon
              :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
            />
          </span> -->
        </el-form-item>
      </el-tooltip>
      <el-button
        :loading="loading"
        @click.prevent="handlereg"
        type="primary"
        style="width: 100%; margin-bottom: 30px"
        >注册</el-button
      >
      <div style="position: relative">
        <div class="tips">
          <span>用户名 : admin</span>
          <span>密码 : 123456</span>
        </div>
        <div class="tips">
          <span style="margin-right: 18px"></span>
        </div>

        <el-button
          class="thirdparty-button"
          type="primary"
          @click="showDialog = true"
        >
          第三方注册
        </el-button>
      </div>
    </el-form>
    <el-dialog title="第三方注册" v-model="showDialog">
      开发中...
      <br />
      <br />
      <br />
      <!-- <social-sign /> -->
    </el-dialog>
  </div>
</template>

<script>
import { validUsername } from "@/utils/validate";

export default {
  name: "reg",
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error("请输入正确用户名"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("密码不少于6位"));
      } else {
        callback();
      }
    };
    return {
      regForm: {
        username: "",
        password: "",
      },
      regRules: {
        username: [
          { required: true, trigger: "blur", validator: validateUsername },
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePassword },
        ],
      },
      passwordType: "password",
      capsTooltip: false,
      loading: false,
      showDialog: false,
    };
  },
  methods: {
    // 检查字母大小写
    checkCapslock(e) {
      const { key } = e;
      this.capsTooltip = key && key.length === 1 && key >= "A" && key <= "Z";
    },
    handlereg() {
      this.$refs.regForm.validate((valid) => {
        if (valid) {
            console.log(process.env.VUE_APP_BASE_API);
          this.loading = true;
          this.$store
            .dispatch("user/reg", this.regForm)
            .then(() => {
              this.$router.push({
                path: this.redirect || "/",
                query: this.otherQuery,
              });
              this.loading = false;
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
  mounted() {
    if (this.regForm.username === "") {
      this.$refs.username.focus();
    } else if (this.regForm.password === "") {
      this.$refs.password.focus();
    }
  },
  watch: {},
};
</script>

<style lang="scss">
$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .reg-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.reg-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.reg-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .reg-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>
