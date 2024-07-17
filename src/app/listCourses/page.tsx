'use client'

import React, { useState, useEffect } from 'react';
import { List, Pagination, message, Button } from 'antd';
import 'antd/dist/reset.css';
import styles from './CourseSelection.module.css';
import { useRouter } from 'next/router';

interface Course {
  id: Number,
  name: String,
  teacher: String,
  department: String,
  time: String
}

const CourseSelection: React.FC = () => {
  const router = useRouter();
  const [selectedCourses, setSelectedCourses] = useState<Course[]>([]);
  //课程示例
  const [availableCourses, setAvailableCourses] = useState<Course[]>([
    { id: 1, name: '程序设计基础', teacher: '张三', department: '计算机科学与技术', time: '周一 8:00-10:00' },
    { id: 2, name: '面向对象程序设计基础', teacher: '李四', department: '计算机科学与技术', time: '周二 10:00-12:00' },
    { id: 3, name: '计算机系统概率', teacher: '王五', department: '计算机科学与技术', time: '周三 14:00-16:00'},
    { id: 4, name: '软件工程', teacher: '赵六', department: '计算机科学与技术', time: '周四 16:00-18:00'},
    { id: 5, name: '数据结构', teacher: '钱七', department: '计算机科学与技术', time: '周五 8:00-10:00' },
    { id: 6, name: '离散数学(1)', teacher: '孙八', department: '计算机科学与技术', time: '周一 10:00-12:00'},
    { id: 7, name: '离散数学(2)', teacher: '周九', department: '计算机科学与技术', time: '周二 14:00-16:00' },
    { id: 8, name: '原神圣遗物分数计算', teacher: '王司徒', department: '计算机科学与技术', time: '周三 16:00-18:00'},
    { id: 9, name: '崩铁回合与行动机制探究', teacher: '赵铁柱', department: '计算机科学与技术', time: '周四 8:00-10:00' },
  ]);

  //获取可选课程列表的逻辑

  const fetchAvailableCourses = async () => { 
    fetch(`/api/listCourses`, {
      method: "GET",
      body: sessionStorage.getItem("username"),
    })
      .then((res) => res.json())
      .then((res) => {
          if (res.code === 0) {
            setAvailableCourses(res.data);
          }
          else {
            alert("选课列表获取失败");
          }
      })
      .catch((err) => alert("选课列表获取失败，错误信息:" + err));
  };

  useEffect(() => {
    fetchAvailableCourses();
  },[router])

  //TODO: 实现获取已选课程列表的逻辑





  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5; // 每页显示的课程数量

  const handleLogout = () => {
    // TODO: 在这里实现登出逻辑，重定向到初始页面
    message.info('您已成功登出');

  };

  // TODO: 实现选择课程函数
  const handleSelectCourse = (course: Course) => {
    if (selectedCourses.some((c) => c.id === course.id)) {
      message.warning('该课程已被选择');
      return;
    }
    // TODO: 增加选课的网络请求
    // 如果选课成功，执行以下代码
    // setSelectedCourses([...selectedCourses, course]);
    // Bonus: 从可选课程列表中移除已选择的课程
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const paginatedCourses = availableCourses.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className={styles.container}>
      <div className={styles.courseList}>
        <h2>可选课程</h2>
        <List
          dataSource={paginatedCourses}
          renderItem={(course) => (
            <List.Item
              actions={[<a onClick={() => handleSelectCourse(course)}>选择</a>]}
            >
              {course.name}
            </List.Item>
          )}
        />
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={availableCourses.length}
          onChange={handlePageChange}
        />
      </div>
      <div className={styles.selectedCourses}>
        <h2>已选课程</h2>
        <List
          dataSource={selectedCourses}
          renderItem={(course) => (
            <List.Item>
              {course.name}
            </List.Item>
          )}
        />
      </div>
      <div className={styles.logoutButton}>
        <Button type="default" onClick={handleLogout} block>
          登出
        </Button>
      </div>
    </div>
  );
};

export default CourseSelection;
