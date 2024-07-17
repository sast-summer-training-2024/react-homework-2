'use client'

import styles from "./page.module.css";
import "./page.module.css"
import { useRouter } from "next/router";
import React, { useState } from 'react';

const Login: React.FC = () => {
  //Bonus: 选择在前后端加上处理密码登录的逻辑
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  //处理登录
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // 这里可以添加登录逻辑，例如调用API
    fetch(`/api/login`, {
      method: "POST",
      body: JSON.stringify({
          username
      }),
    })
      .then((res) => res.json())
      .then((res) => {
          if (Number(res.code) === 0) {
              alert(username + "你好鸭，欢迎来贵系!");
              router.push(`/adminCourses`);
          }
          else {
              alert("登录失败");
          }
      })
      .catch((err) => alert("登录失败，错误信息:" + err));
  };

  return (
    <div className={styles.loginContainer}>
      <form onSubmit={handleLogin} className={styles.loginForm}>
        <h2>登录</h2>
        <div className={styles.formGroup}>
          <label htmlFor="username">用户名:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">密码:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <button type="submit">登录</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
