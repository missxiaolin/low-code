<template>
  <div class="login-container">
    <div class="login-card">
      <div class="title">
        <img src="@/assets/img/logo.png" />
      </div>
      <div class="content">
        <a-form
          id="formLogin"
          name="basic"
          class="user-layout-login"
          :label-col="{ span: 4 }"
          @finish="onFinish"
          :model="formRef"
        >
          <a-form-item
            :rules="[
              { required: true, message: 'Please input your username!' },
            ]"
            name="username"
          >
            <a-input
              size="large"
              type="text"
              placeholder="请输入用户名"
              v-model:value="formRef.username"
            >
              <template #prefix>
                <UserOutlined />
              </template>
            </a-input>
          </a-form-item>

          <a-form-item
            :rules="[
              { required: true, message: 'Please input your password!' },
            ]"
            name="password"
          >
            <a-input-password
              size="large"
              placeholder="请输入密码"
              v-model:value="formRef.password"
              autocomplete
            >
              <template #prefix>
                <LockOutlined />
              </template>
            </a-input-password>
          </a-form-item>
          <a-form-item>
            <a-button block html-type="submit" size="large">登 录</a-button>
          </a-form-item>
        </a-form>
      </div>
    </div>
  </div>
</template>

<script>
import { message } from "ant-design-vue";
import { reactive } from "vue";
import { Form } from "ant-design-vue";
import { login } from "@/api/user";
import { setToken } from "@/utils/cache/cookies";
import { useRouter } from "vue-router";

export default {
  setup(props) {
    const [messageApi, contextHolder] = message.useMessage();
    const useForm = Form.useForm;
    const router = useRouter();

    const formRef = reactive({
      username: "admin",
      password: "12345678",
    });
    const rulesRef = reactive({
      username: [
        {
          required: true,
          message: "请输入用户名",
        },
      ],
      password: [{ required: true, message: "请输入密码" }, {}],
    });
    const { validate, validateInfos } = useForm(formRef, rulesRef);
    const onFinish = () => {
      console.log("finish");
      login(formRef).then((res) => {
        console.log(res);
        if (!res.success) {
          messageApi.error(res.errorMessage);
          return;
        }
        setToken(res.model.token || "");
        router.push("/");
      });
    };

    return {
      formRef,
      rulesRef,
      validateInfos,
      validate,
      onFinish,
    };
  },
};
</script>

<style lang="scss" scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  .login-card {
    width: 480px;
    border-radius: 20px;
    box-shadow: 0 0 10px #dcdfe6;
    background-color: #fff;
    overflow: hidden;
    .title {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 150px;
      img {
        height: 100px;
      }
    }
    .content {
      padding: 20px 50px 50px 50px;
      :deep(.el-input-group__append) {
        padding: 0;
        overflow: hidden;
        .el-image {
          width: 100px;
          height: 40px;
          border-left: 0px;
          user-select: none;
          cursor: pointer;
          text-align: center;
        }
      }
      .el-button {
        width: 100%;
        margin-top: 10px;
      }
    }
  }
}
</style>
