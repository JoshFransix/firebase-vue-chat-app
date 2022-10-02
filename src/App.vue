<template>
  <div class="main">
    <!-- <div
      class="view login"
      v-if="state.username === '' || state.username === null"
    >
      <form class="login-form" @submit.prevent="Login">
        <div class="form-inner">
          <h1>Login to Firechat</h1>
          <label for="username">Username</label>
          <input
            v-model="inputUsername"
            type="text"
            placeholder="Please enter your username..."
          />
          <input type="submit" value="Login" />
        </div>
      </form>
    </div> -->
    <div
      v-if="state.username === '' || state.username === null"
      class="container"
    >
      <h1>Text you</h1>
      <div class="form-container">
        <form @submit.prevent="Login">
          <p>Welcome</p>
          <input
            type="text"
            v-model="inputUsername"
            placeholder="Please enter your username..."
          /><br />
          <!-- <input type="password" placeholder="Password" /><br /> -->
          <input type="submit" value="Sign in" /><br />
          <!-- <a href="#">Forgot Password?</a> -->
        </form>
      </div>
    </div>
    <div v-else class="chat">
      <header>
        <h1>Welcome, {{ state.username }}</h1>
        <button class="logout" @click="Logout">Logout</button>
      </header>
      <section class="chat-box">
        <div
          v-for="message in state.messages"
          :key="message.key"
          :class="
            message.username === state.username
              ? 'message current-user'
              : 'message'
          "
        >
          <div class="message-inner">
            <div class="username">{{ message.username }}</div>
            <div class="content">{{ message.content }}</div>
          </div>
        </div>
      </section>
      <footer>
        <form @submit.prevent="sendMessage">
          <input
            type="text"
            v-model="inputMessage"
            placeholder="Write a message..."
          />
          <input type="submit" value="Send" />
        </form>
      </footer>
    </div>
  </div>
</template>

<script>
import { reactive, onMounted, ref } from "vue";
import db from "./db";
export default {
  setup() {
    const inputUsername = ref("");
    const inputMessage = ref("");

    const state = reactive({
      username: "",
      messages: [],
    });

    const Login = () => {
      if (inputUsername.value != "" || inputUsername.value != null) {
        state.username = inputUsername.value;
        inputUsername.value = "";
      }
    };

    const Logout = () => {
      state.username = "";
    };

    const sendMessage = () => {
      const messagesRef = db.database().ref("messages");
      if (inputMessage.value === "" || inputMessage.value === null) {
        return;
      }
      const message = {
        username: state.username,
        content: inputMessage.value,
      };

      messagesRef.push(message);
      inputMessage.value = "";
    };

    onMounted(() => {
      const messagesRef = db.database().ref("messages");
      messagesRef.on("value", (snapshot) => {
        const data = snapshot.val();
        let messages = [];

        Object.keys(data).forEach((key) => {
          messages.push({
            id: key,
            username: data[key].username,
            content: data[key].content,
          });
        });

        state.messages = messages;
      });
    });

    return {
      inputUsername,
      Login,
      Logout,
      state,
      inputMessage,
      sendMessage,
    };
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Montserrat&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Passions+Conflict&family=Poppins&display=swap");

* {
  position: relative;
  font-family: "Poppins", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  transition: all 0.3s ease-in-out;

  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: 100vh;
    align-items: center;
    background: linear-gradient(to left, #283593, #1976d2);

    h1 {
      font-family: "Passions Conflict", sans-serif;
      margin-bottom: 2rem;
      color: #fff;
      font-size: 49px;
    }

    .form-container {
      width: 100%;
      position: relative;
      form {
        margin: auto;
        background: rgba(255, 255, 255, 0.06);
        padding: 2em;
        width: 30%;
        height: max-content;
        border-radius: 20px;
        border-left: 1px solid rgba(255, 255, 255, 0.3);
        border-top: 1px solid rgba(255, 255, 255, 0.3);
        -webkit-backdrop-filter: blur(10px);
        backdrop-filter: blur(10px);
        box-shadow: 20px 20px 40px -6px rgba(0, 0, 0, 0.2);
        text-align: center;
        position: relative;
        -webkit-transition: all 0.2s ease-in-out;
        transition: all 0.2s ease-in-out;

        p {
          font-weight: 500;
          color: #fff;
          opacity: 0.7;
          font-size: 1.4rem;
          margin-top: 0;
          margin-bottom: 60px;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
        }
        a {
          text-decoration: none;
          color: #ddd;
          font-size: 12px;
          &:hover {
            text-shadow: 2px 2px 6px #00000040;
          }
          &:active {
            text-shadow: none;
          }
        }

        input {
          background: transparent;
          width: 100%;
          padding: 1em;
          margin-bottom: 2em;
          border: none;
          border-left: 1px solid rgba(255, 255, 255, 0.3);
          border-top: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 5000px;
          -webkit-backdrop-filter: blur(5px);
          backdrop-filter: blur(5px);
          box-shadow: 4px 4px 60px rgba(0, 0, 0, 0.2);
          color: #fff;
          font-family: Montserrat, sans-serif;
          font-weight: 500;
          -webkit-transition: all 0.2s ease-in-out;
          transition: all 0.2s ease-in-out;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
          &:hover {
            background: rgba(255, 255, 255, 0.1);
            box-shadow: 4px 4px 60px 8px rgba(0, 0, 0, 0.2);
          }
          &[type="text"]:focus,
          &[type="password"]:focus {
            background: rgba(255, 255, 255, 0.1);
            box-shadow: 4px 4px 60px 8px rgba(0, 0, 0, 0.2);
          }
          &[type="submit"] {
            margin-top: 10px;
            width: 40%;
            font-size: 1rem;
          }
          &[type="submit"]:hover {
            cursor: pointer;
          }
          &[type="submit"]:active {
            background: rgba(255, 255, 255, 0.2);
          }
        }
      }
    }

    ::-webkit-input-placeholder {
      font-family: Montserrat, sans-serif;
      font-weight: 400;
      color: #fff;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);
    }

    ::-moz-placeholder {
      font-family: Montserrat, sans-serif;
      font-weight: 400;
      color: #fff;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);
    }

    :-ms-input-placeholder {
      font-family: Montserrat, sans-serif;
      font-weight: 400;
      color: #fff;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);
    }

    ::-ms-input-placeholder {
      font-family: Montserrat, sans-serif;
      font-weight: 400;
      color: #fff;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);
    }

    ::placeholder {
      font-family: Montserrat, sans-serif;
      font-weight: 400;
      color: #fff;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);
    }

    a,
    input:focus,
    select:focus,
    textarea:focus,
    button:focus {
      outline: none;
    }
  }

  .chat {
    display: flex;
    justify-content: center;
    min-height: 100vh;
    flex-direction: column;
    background: linear-gradient(to left, #283593, #1976d2);

    header {
      position: relative;
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      padding: 20px;

      .logout {
        outline: none;
        appearance: none;
        border: none;
        background: rgba(255, 255, 255, 0.06);
        padding: 0.5rem 1.8rem;
        border-radius: 10px;
        border-left: 1px solid rgba(255, 255, 255, 0.3);
        border-top: 1px solid rgba(255, 255, 255, 0.3);
        cursor: pointer;
        color: #fff;
        font-size: 18px;

        &:hover {
          background: rgba(255, 255, 255, 0.1);
          box-shadow: 4px 4px 60px 8px rgba(0, 0, 0, 0.2);
        }
      }

      h1 {
        color: #fff;
        font-size: 18px;
      }
    }

    .chat-box {
      border-radius: 24px 24px 0px 0px;
      background-color: #fff;
      box-shadow: 0px 0px 12px rgba(100, 100, 100, 0.2);
      flex: 1 1 100%;
      padding: 30px;

      .message {
        display: flex;
        margin-bottom: 15px;

        .message-inner {
          .username {
            color: #888;
            font-size: 16px;
            margin-bottom: 5px;
            padding-left: 15px;
            padding-right: 15px;
          }

          .content {
            display: inline-block;
            padding: 10px 20px;
            background-color: #f3f3f3;
            border-radius: 999px;
            color: #333;
            font-size: 18px;
            line-height: 1.2em;
            text-align: left;
          }
        }

        &.current-user {
          margin-top: 30px;
          justify-content: flex-end;
          text-align: right;

          .message-inner {
            max-width: 75%;

            .content {
              color: #fff;
              font-weight: 600;
              background: linear-gradient(to left, #283593, #1976d2);
            }
          }
        }
      }
    }

    footer {
      position: sticky;
      bottom: 0px;
      background-color: #fff;
      padding: 30px;
      box-shadow: 0px 0px 12px rgba(100, 100, 100, 0.2);

      form {
        display: flex;

        input[type="text"] {
          flex: 1 1 100%;
          appearance: none;
          border: none;
          outline: none;
          background: none;
          display: block;
          width: 100%;
          padding: 10px 15px;
          border-radius: 8px 0px 0px 8px;

          color: #333;
          font-size: 18px;
          box-shadow: 0px 0px 0px rgba(0, 0, 0, 0);
          background-color: #f3f3f3;
          transition: 0.4s;

          &::placeholder {
            color: #888;
            transition: 0.4s;
          }
        }

        input[type="submit"] {
          appearance: none;
          border: none;
          outline: none;
          display: block;
          cursor: pointer;
          padding: 10px 15px;
          border-radius: 0px 8px 8px 0px;
          background: linear-gradient(to left, #283593, #1976d2);
          color: #fff;
          font-size: 18px;
          font-weight: 700;
        }
      }
    }
  }
}

@media screen and (max-width: 1240px) {
  .container {
    .form-container {
      form {
        width: 50%;

        input {
          &[type="submit"] {
            width: 30%;
          }
        }
      }
    }
  }
}
@media screen and (max-width: 740px) {
  .container {
    .form-container {
      form {
        width: 90%;

        input {
          &[type="submit"] {
            width: 60%;
          }
        }
      }
    }
  }
  .chat {
    header {
      h1 {
        font-size: 15px;
      }
      .logout {
        font-size: 15px;
      }
    }
    .chat-box {
      .message {
        .message-inner {
          .username {
            font-size: 12px;
          }
          .content {
            font-size: 14px;
          }
        }
      }
    }

    footer {
      form {
        input[type="submit"],
        input[type="text"] {
          font-size: 14px;
        }
      }
    }
  }
}
</style>
